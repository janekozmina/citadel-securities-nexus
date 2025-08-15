import { useEffect } from 'react';

export default function TransactionStatusPage() {
  useEffect(() => {
    document.title = 'Transaction Status Amount / Volume | CBB Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">RTGS — Transaction Status Amount / Volume</h1>
        <p className="text-muted-foreground">Monitor transaction status, amounts, and volumes in real-time.</p>
      </section>
    </main>
  );
}