import json
import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import psycopg2


def get_connection():
    """Create and return database connection. Uses env vars (e.g. from backend .env)."""
    try:
        host = os.environ.get("DB_HOST", "localhost")
        port = int(os.environ.get("DB_PORT", "5431"))
        database = os.environ.get("DB_NAME", "dam_datas")
        user = os.environ.get("DB_USER", "")
        password = os.environ.get("DB_PASSWORD", "")
        conn = psycopg2.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password,
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}", file=__import__("sys").stderr)
        return None


def analyze_data(conn):
    """Load joined city/reservoir/record data, compute water volume, run per-city regression; return dict for JSON."""
    if conn is None:
        return {}

    query = """
        SELECT
            c.name AS city,
            c.population AS population,
            c.daily_consumption_per_capita_l AS daily_consumption_per_capita_l,
            r.name AS reservoir_name,
            r.capacity_m3 AS total_capacity_m3,
            dr.date AS date,
            dr.fill_rate_pct AS fill_rate_pct
        FROM dam_records dr
        JOIN reservoirs r ON dr.reservoir_id = r.id
        JOIN cities c ON r.city_id = c.id
        ORDER BY dr.date ASC;
    """
    df = pd.read_sql(query, conn)

    df["date"] = pd.to_datetime(df["date"])
    df["current_water_m3"] = (
        df["total_capacity_m3"].astype(float) * (df["fill_rate_pct"].astype(float) / 100)
    )

    cities = df["city"].unique()
    results = {}

    for city in cities:
        city_df = df[df["city"] == city].copy()
        daily_total = city_df.groupby("date")["current_water_m3"].sum().reset_index()

        first_date = daily_total["date"].min()
        daily_total["days_offset"] = (daily_total["date"] - first_date).dt.days

        X = daily_total[["days_offset"]]
        y = daily_total["current_water_m3"]

        model = LinearRegression()
        model.fit(X, y)

        decrease_rate_per_day = float(model.coef_[0])
        latest_water_m3 = float(y.iloc[-1])

        population = float(city_df["population"].iloc[0])
        per_capita_l = float(city_df["daily_consumption_per_capita_l"].iloc[0])
        city_daily_need_m3 = (population * per_capita_l) / 1000

        if decrease_rate_per_day < 0:
            days_until_depletion = latest_water_m3 / abs(decrease_rate_per_day)
            remaining_days = int(round(days_until_depletion))
            status = "critical" if remaining_days < 90 else "risky"
        else:
            days_supply_by_consumption = latest_water_m3 / city_daily_need_m3
            remaining_days = int(round(days_supply_by_consumption))
            status = "ok"
            decrease_rate_per_day = 0

        city_key = str(city).lower()
        results[city_key] = {
            "remainingDays": remaining_days,
            "dailyDecreaseM3": int(round(abs(decrease_rate_per_day))),
            "dailyNeedM3": int(round(city_daily_need_m3)),
            "status": status,
        }

    return results


if __name__ == "__main__":
    conn = get_connection()
    results = analyze_data(conn)
    if conn:
        try:
            conn.close()
        except Exception:
            pass
    print(json.dumps(results))
