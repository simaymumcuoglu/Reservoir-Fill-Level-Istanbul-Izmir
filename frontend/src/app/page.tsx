'use client';

import { useQuery } from '@tanstack/react-query';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { CityCard } from '@/components/CityCard';
import { fetchCities, fetchCityByName } from '@/lib/api';

export default function Home() {
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const istanbulDetail = useQuery({
    queryKey: ['city', 'istanbul'],
    queryFn: () => fetchCityByName('istanbul'),
    enabled: !!cities?.length,
  });

  const izmirDetail = useQuery({
    queryKey: ['city', 'izmir'],
    queryFn: () => fetchCityByName('izmir'),
    enabled: !!cities?.length,
  });

  if (isLoading || !cities?.length) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Failed to load data. Is the backend running? (npm run start:dev)
      </Alert>
    );
  }

  const istanbul = cities.find((c) => c.name === 'istanbul');
  const izmir = cities.find((c) => c.name === 'izmir');

  return (
    <>
      <h1 className="mb-4">Reservoir Fill Level – Istanbul & Izmir</h1>
      <p className="lead text-muted mb-4">
        Reservoir fill data and per capita water consumption for each city.
      </p>
      <Row xs={1} md={2} className="g-4">
        {istanbul && (
          <Col>
            <CityCard
              city={istanbul}
              averageFillRatePct={istanbulDetail.data?.averageFillRatePct}
            />
          </Col>
        )}
        {izmir && (
          <Col>
            <CityCard
              city={izmir}
              averageFillRatePct={izmirDetail.data?.averageFillRatePct}
            />
          </Col>
        )}
      </Row>
    </>
  );
}
