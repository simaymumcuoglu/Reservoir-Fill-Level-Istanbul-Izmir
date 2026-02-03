'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { fetchCityDashboard } from '@/lib/api';
import { DamRecordsTable } from '@/components/DamRecordsTable';
import { FillRateChart } from '@/components/FillRateChart';
import { StatusBar, type StatusLevel } from '@/components/StatusBar';

interface CityDashboardProps {
  cityName: string;
  displayName?: string;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

export function CityDashboard({ cityName, displayName }: CityDashboardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['city-dashboard', cityName],
    queryFn: () => fetchCityDashboard(cityName),
    enabled: !!cityName,
  });

  if (!cityName) {
    return <Alert variant="warning">City name is missing.</Alert>;
  }

  if (isLoading || !data) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Failed to load dashboard. Is the backend (and Python analysis) running?
      </Alert>
    );
  }

  const title = displayName ?? cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const stats = data.stats;
  const statusLevel: StatusLevel = stats?.status === 'ok' || stats?.status === 'risky' || stats?.status === 'critical'
    ? stats.status
    : 'ok';

  return (
    <>
      <h1 className="mb-4">{title} – Reservoir Analysis</h1>

      {stats && (
        <div className="mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Card>
            <Card.Header className="py-2">Remaining days (estimate)</Card.Header>
            <Card.Body className="py-3">
              <p className="mb-0 fs-5">{formatNumber(stats.remainingDays)}</p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="py-2">Status</Card.Header>
            <Card.Body className="py-3">
              <StatusBar status={statusLevel} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="py-2">Daily decrease (m³)</Card.Header>
            <Card.Body className="py-3">
              <p className="mb-0 fs-5">{formatNumber(stats.dailyDecreaseM3)}</p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="py-2">Daily need (m³)</Card.Header>
            <Card.Body className="py-3">
              <p className="mb-0 fs-5">{formatNumber(stats.dailyNeedM3)}</p>
            </Card.Body>
          </Card>
        </div>
      )}

      {!stats && (
        <Alert variant="info" className="mb-4">
          No analysis result for this city (Python analysis failed or city not found).
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>Last 13 months fill rate chart</Card.Header>
        <Card.Body>
          {data.tableData.length > 0 ? (
            <FillRateChart records={data.tableData} />
          ) : (
            <p className="text-muted">No data</p>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Fill rate by date (table)</Card.Header>
        <Card.Body>
          <DamRecordsTable records={data.tableData} />
        </Card.Body>
      </Card>
    </>
  );
}
