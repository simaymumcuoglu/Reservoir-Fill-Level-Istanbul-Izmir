'use client';

import { Table } from 'react-bootstrap';
import type { City } from '@/lib/api';

interface CityTableProps {
  city: City;
}

export function CityTable({ city }: CityTableProps) {
  const displayName = city.name === 'istanbul' ? 'Istanbul' : 'Izmir';
  const pop = typeof city.population === 'number' ? city.population : Number(city.population);
  const consumption = typeof city.dailyConsumptionPerCapitaL === 'number'
    ? city.dailyConsumptionPerCapitaL
    : Number(city.dailyConsumptionPerCapitaL);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>City</th>
          <th>Population</th>
          <th>Per capita consumption (L/day)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{displayName}</td>
          <td>{pop.toLocaleString('en-US')}</td>
          <td>{consumption}</td>
        </tr>
      </tbody>
    </Table>
  );
}
