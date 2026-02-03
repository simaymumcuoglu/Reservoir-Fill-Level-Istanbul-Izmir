'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { DamRecord } from '@/lib/api';

interface FillRateChartProps {
  records: DamRecord[];
}

function toPct(v: number | string | null): number | null {
  if (v == null) return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isNaN(n) ? null : n;
}

export function FillRateChart({ records }: FillRateChartProps) {
  const byDate = new Map<string, Record<string, number | string>>();
  const reservoirs = new Set<string>();

  for (const r of records) {
    const resName = r.reservoir?.name ?? r.reservoirId;
    reservoirs.add(resName);
    const pct = toPct(r.fillRatePct) ?? 0;
    const dateStr = r.date;
    let row = byDate.get(dateStr);
    if (!row) {
      row = { date: dateStr };
      byDate.set(dateStr, row);
    }
    row[resName] = pct;
  }

  const data = Array.from(byDate.keys())
    .sort()
    .map((d) => ({ ...byDate.get(d), date: d }));

  if (data.length === 0) return <p className="text-muted">No data</p>;

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#a4de6c', '#d084d0', '#ffb347'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(value: number | undefined) => [value != null ? `${value}%` : '—', 'Fill rate']} />
        <Legend />
        {Array.from(reservoirs).map((res, i) => (
          <Line
            key={res}
            type="monotone"
            dataKey={res}
            stroke={colors[i % colors.length]}
            dot={{ r: 3 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
