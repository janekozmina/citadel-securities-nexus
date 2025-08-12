import { useEffect } from 'react';

export default function RTGSConfigurationPage() {
  useEffect(() => {
    document.title = 'RTGS Configuration | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS Configuration</h1>
        <p className="text-muted-foreground">Placeholder to configure various RTGS-related forms and settings.</p>
      </section>
    </main>
  );
}
