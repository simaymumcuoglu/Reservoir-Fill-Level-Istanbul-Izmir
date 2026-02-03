'use client';

import Link from 'next/link';
import { Card } from 'react-bootstrap';
import type { City } from '@/lib/api';

interface CityCardProps {
  city: City;
  averageFillRatePct?: number | null;
}

export function CityCard({ city, averageFillRatePct }: CityCardProps) {
  const displayName = city.name === 'istanbul' ? 'Istanbul' : 'Izmir';
  const pop = typeof city.population === 'number' ? city.population : Number(city.population);
  const consumption = typeof city.dailyConsumptionPerCapitaL === 'number'
    ? city.dailyConsumptionPerCapitaL
    : Number(city.dailyConsumptionPerCapitaL);

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{displayName}</Card.Title>
        <Card.Text>
          <strong>Population:</strong> {pop.toLocaleString('en-US')}
          <br />
          <strong>Per capita consumption:</strong> {consumption} L/day
          {averageFillRatePct != null && (
            <>
              <br />
              <strong>Average fill rate:</strong> {averageFillRatePct.toFixed(1)}%
            </>
          )}
        </Card.Text>
        <Link href={`/city/${city.name}`} className="btn btn-primary text-white text-decoration-none">
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}
