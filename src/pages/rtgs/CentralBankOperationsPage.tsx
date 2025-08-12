import { useEffect } from 'react';

export default function CentralBankOperationsPage() {
  useEffect(() => {
    document.title = 'Central Bank Operations | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Central Bank Operations</h1>
        <p className="text-muted-foreground">Placeholder for central bank operations controls and dashboards.</p>
      </section>
    </main>
  );
}
