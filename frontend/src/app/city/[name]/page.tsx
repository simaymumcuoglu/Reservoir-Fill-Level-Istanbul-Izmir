'use client';

import { useParams } from 'next/navigation';
import { CityDashboard } from '@/components/CityDashboard';

const displayNames: Record<string, string> = {
  istanbul: 'Istanbul',
  izmir: 'Izmir',
};

export default function CityPage() {
  const params = useParams();
  const name = typeof params.name === 'string' ? params.name : params.name?.[0] ?? '';
  const displayName = displayNames[name.toLowerCase()] ?? name;

  return <CityDashboard cityName={name} displayName={displayName} />;
}
