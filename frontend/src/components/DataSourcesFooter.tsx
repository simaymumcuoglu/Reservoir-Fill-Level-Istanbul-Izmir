'use client';

export function DataSourcesFooter() {
  return (
    <footer className="mt-5 py-3 border-top text-muted small">
      <p className="mb-1"><strong>Data sources</strong></p>
      <ul className="mb-0 list-unstyled">
        <li>
          Istanbul reservoir fill data:{' '}
          <a href="https://iski.istanbul/baraj-doluluk/" target="_blank" rel="noopener noreferrer">
            İSKİ – İstanbul Su ve Kanalizasyon İdaresi (baraj doluluk)
          </a>
        </li>
        <li>
          Izmir reservoir fill data:{' '}
          <a href="https://izsu.gov.tr/bilgi-merkezi/barajlar/su-durumu" target="_blank" rel="noopener noreferrer">
            İZSU – İzmir Su ve Kanalizasyon İdaresi (su durumu)
          </a>
        </li>
      </ul>
    </footer>
  );
}
