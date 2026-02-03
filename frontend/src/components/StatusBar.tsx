'use client';

export type StatusLevel = 'ok' | 'risky' | 'critical';

interface StatusBarProps {
  status: StatusLevel;
}

const SEGMENTS: { key: StatusLevel; label: string; color: string }[] = [
  { key: 'ok', label: 'Normal', color: '#22c55e' },
  { key: 'risky', label: 'Risky', color: '#eab308' },
  { key: 'critical', label: 'Critical', color: '#ef4444' },
];

export function StatusBar({ status }: StatusBarProps) {
  return (
    <div className="w-100">
      <div
        className="d-flex rounded overflow-hidden border border-secondary"
        style={{ height: 28 }}
      >
        {SEGMENTS.map((seg) => (
          <div
            key={seg.key}
            className="d-flex align-items-center justify-content-center text-dark text-center small fw-medium"
            style={{
              flex: 1,
              backgroundColor: seg.color,
              opacity: status === seg.key ? 1 : 0.45,
              minWidth: 0,
            }}
          >
            {seg.label}
          </div>
        ))}
      </div>
      <p className="mb-0 mt-1 small text-muted text-center">
        Current level: <strong className="text-uppercase">{status}</strong>
      </p>
      <ul className="mb-0 mt-2 small text-muted list-unstyled">
        <li><strong style={{ color: '#22c55e' }}>Normal:</strong> Water level increasing (no depletion forecast)</li>
        <li><strong style={{ color: '#eab308' }}>Risky:</strong> 90+ days until depletion at current trend</li>
        <li><strong style={{ color: '#ef4444' }}>Critical:</strong> &lt; 90 days until depletion at current trend</li>
      </ul>
    </div>
  );
}
