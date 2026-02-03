const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

export interface City {
  id: number;
  name: string;
  population: number;
  dailyConsumptionPerCapitaL: number;
}

export interface Reservoir {
  id: number;
  cityId: number;
  name: string;
  capacityM3: number | string;
}

export interface CityDetail extends City {
  reservoirs: Reservoir[];
  averageFillRatePct: number | null;
}

export interface DamRecord {
  id: number;
  reservoirId: number;
  date: string;
  fillRatePct: number | string | null;
  reservoir?: Reservoir & { city?: City };
}

export async function fetchCities(): Promise<City[]> {
  const res = await fetch(`${API_URL}/cities`);
  if (!res.ok) throw new Error('Failed to fetch cities');
  return res.json();
}

export async function fetchCityByName(name: string): Promise<CityDetail> {
  const res = await fetch(`${API_URL}/cities/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error(`Failed to fetch city ${name}`);
  return res.json();
}

export async function fetchDamRecords(cityName: string): Promise<DamRecord[]> {
  const res = await fetch(`${API_URL}/cities/${encodeURIComponent(cityName)}/dam-records`);
  if (!res.ok) throw new Error(`Failed to fetch dam records for ${cityName}`);
  return res.json();
}

export interface CityDashboardStats {
  remainingDays: number;
  dailyDecreaseM3: number;
  dailyNeedM3: number;
  status: string;
}

export interface CityDashboardResponse {
  stats: CityDashboardStats | null;
  tableData: DamRecord[];
}

export async function fetchCityDashboard(cityName: string): Promise<CityDashboardResponse> {
  const res = await fetch(`${API_URL}/cities/${encodeURIComponent(cityName)}/dashboard`);
  if (!res.ok) throw new Error(`Failed to fetch dashboard for ${cityName}`);
  return res.json();
}
