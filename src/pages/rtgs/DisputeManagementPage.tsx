import { useEffect } from 'react';

export default function DisputeManagementPage() {
  useEffect(() => {
    document.title = 'RTGS Dispute Management | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Dispute Management</h1>
        <p className="text-muted-foreground">Placeholder for dispute case management workflows.</p>
      </section>
    </main>
  );
}
