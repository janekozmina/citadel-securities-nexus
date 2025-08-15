import { useEffect } from 'react';

export default function CashOperationsPage() {
  useEffect(() => {
    document.title = 'Cash Operations | CBB Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Cash Operations</h1>
        <p className="text-muted-foreground">Central Bank cash operations and liquidity management.</p>
      </section>
    </main>
  );
}