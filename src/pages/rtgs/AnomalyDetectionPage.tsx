import { useEffect } from 'react';

export default function AnomalyDetectionPage() {
  useEffect(() => {
    document.title = 'RTGS Anomaly Detection | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Anomaly Detection</h1>
        <p className="text-muted-foreground">Placeholder for anomaly detection insights and alerts.</p>
      </section>
    </main>
  );
}
