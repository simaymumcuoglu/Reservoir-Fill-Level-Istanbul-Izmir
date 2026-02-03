# Reservoir Fill Level – Istanbul & Izmir

Web app for reservoir fill level data and city info (population, per capita consumption) for Istanbul and Izmir. Built with PostgreSQL, NestJS, Next.js, and a Python analysis script for trend and risk levels.

## Features

- **Dashboard per city**: Remaining days (estimate), status (Normal / Risky / Critical), daily decrease and need (m³), fill rate chart, and records table.
- **Python analysis**: Linear regression on reservoir data; outputs JSON for the API (run via NestJS).
- **API**: REST + Swagger at `/api` when backend is running.
- **Data sources**: Istanbul — [İSKİ](https://iski.istanbul/baraj-doluluk/); Izmir — [İZSU](https://izsu.gov.tr/bilgi-merkezi/barajlar/su-durumu) (see footer in the app).

## Requirements

- Node.js 18+
- Python 3 with: `pandas`, `scikit-learn`, `numpy`, `psycopg2`
- Docker (for PostgreSQL, optional)

## Database (e.g. port 5431)

From the project root, start PostgreSQL with Docker:

```bash
docker-compose up -d
```

Configure the database in the backend via **environment variables** (see below). Do **not** put real credentials in the README or in code.

## Backend (NestJS)

```bash
cd backend
cp .env.example .env    # then edit .env with your DB_HOST, DB_USER, DB_PASSWORD, etc.
npm install
npm run seed            # loads cities, reservoirs, dam_records (CSV + SQL)
npm run start:dev       # default http://localhost:3000; set PORT in .env if needed, e.g. 3003)
```

- **Env**: Backend reads `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (or `DATABASE_URL`). The Python script `scripts/analiz.py` uses the same env vars when run by NestJS.
- **Seed**: If `cities` is empty, `seed_cities_reservoirs.sql` runs; then `transformed_dam_data.csv` fills `dam_records`. You can also trigger seed via `POST /seed` while the backend is running.
- **Swagger**: With backend running, open `http://localhost:<PORT>/api` (e.g. `http://localhost:3003/api`).

## Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local   # if you have one; set NEXT_PUBLIC_API_URL to your backend URL
npm run dev                   # default http://localhost:3000)
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend base URL (e.g. `http://localhost:3003`) so the app calls the correct API.

## API endpoints (summary)

- `GET /cities` – List cities (id, name, population, dailyConsumptionPerCapitaL)
- `GET /cities/:name` – City detail, reservoirs, average fill rate
- `GET /cities/:name/dam-records` – Dam records (date, reservoir, fill rate)
- `GET /cities/:name/dashboard` – **Dashboard payload**: Python analysis stats + `tableData` (dam records) for charts and tables
- `POST /seed` – Run seed (cities, reservoirs, dam_records)
- **Swagger**: `GET /api` – Interactive API docs

## Project structure

- **backend/** – NestJS, TypeORM, PostgreSQL; `scripts/analiz.py` (Python) for analysis; seed (SQL + CSV)
- **frontend/** – Next.js (App Router), React-Bootstrap, TanStack Query, Recharts
- **backend/data/** – `seed_cities_reservoirs.sql`, `transformed_dam_data.csv` (Istanbul & Izmir, last 13 months)

Home page shows two city cards (Istanbul, Izmir). Clicking a city opens `/city/istanbul` or `/city/izmir` with the dashboard: status bar (Normal / Risky / Critical), remaining days, daily decrease/need, fill rate chart, and records table.

## Security

- **Never commit** `.env` or `.env.local`. Use `.env.example` as a template only (no real passwords).
- Backend and Python script read credentials from environment variables only.
