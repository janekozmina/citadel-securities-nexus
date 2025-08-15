import { useEffect } from 'react';

export default function BIReportsPage() {
  useEffect(() => {
    document.title = 'BI Reports | CBB Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — BI Reports</h1>
        <p className="text-muted-foreground">Business intelligence reports and analytics for RTGS operations.</p>
      </section>
    </main>
  );
}