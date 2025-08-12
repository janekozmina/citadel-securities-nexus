import { useEffect } from 'react';

export default function KnowledgeHubPage() {
  useEffect(() => {
    document.title = 'Knowledge Hub | Unified Portal';
  }, []);

  return (
    <main>
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">Knowledge Hub</h1>
        <p className="text-muted-foreground">Central access to documentation search and AI findings.</p>
      </section>
    </main>
  );
}
