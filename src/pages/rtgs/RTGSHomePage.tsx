import { useEffect } from 'react';

export default function RTGSHomePage() {
  useEffect(() => {
    document.title = 'RTGS | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS</h1>
        <p className="text-muted-foreground">Overview placeholder for Real-Time Gross Settlement operations.</p>
      </section>
    </main>
  );
}
