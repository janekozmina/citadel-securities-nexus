import { useEffect } from 'react';

export default function FinancialMonitoringPage() {
  useEffect(() => {
    document.title = 'RTGS Financial Monitoring | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Financial Monitoring</h1>
        <p className="text-muted-foreground">Placeholder for monitoring financial flows and liquidity metrics.</p>
      </section>
    </main>
  );
}
