import { useEffect } from 'react';

export default function KnowledgeSearchPage() {
  useEffect(() => {
    document.title = 'Documentation Search | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">Documentation Search</h1>
        <p className="text-muted-foreground">Placeholder for AI-powered documentation search.</p>
      </section>
    </main>
  );
}
