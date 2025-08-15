import { useEffect } from 'react';

export default function FinancialMonitoringPage() {
  useEffect(() => {
    document.title = 'Financial Monitoring | CBB Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Financial Monitoring</h1>
        <p className="text-muted-foreground">Comprehensive financial monitoring and oversight dashboard.</p>
      </section>
    </main>
  );
}