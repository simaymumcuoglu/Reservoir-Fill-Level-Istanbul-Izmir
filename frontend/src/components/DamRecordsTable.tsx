'use client';

import { Table } from 'react-bootstrap';
import type { DamRecord } from '@/lib/api';

interface DamRecordsTableProps {
  records: DamRecord[];
}

function toPct(v: number | string | null): string {
  if (v == null) return '—';
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isNaN(n) ? '—' : `${n.toFixed(2)}%`;
}

export function DamRecordsTable({ records }: DamRecordsTableProps) {
  if (records.length === 0) return <p className="text-muted">No records</p>;

  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Reservoir</th>
          <th>Fill rate %</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <td>{r.date}</td>
            <td>{r.reservoir?.name ?? r.reservoirId}</td>
            <td>{toPct(r.fillRatePct)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
