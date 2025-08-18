import { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BIReportsPage() {
  useEffect(() => {
    document.title = 'BI Reports | CBB Portal';
  }, []);

  return (
    <main className="container mx-auto p-6 space-y-6">
      <PageHeader 
        title="RTGS — BI Reports"
        description="Business intelligence reports and analytics for RTGS operations."
      />
      
      {/* First Row - Warehoused Payments */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Warehoused Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/zrDZxDBpZ95/?standalone=1&height=100%"
            className="w-full h-[500px] border-0"
            title="Warehoused Payments Report"
          />
        </CardContent>
      </Card>

      {/* Second Row - Two iframes side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Money Flow Avg Monthly Top 5 Banks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/6jz4n5xMO9A/?standalone=1&height=100%"
              className="w-full h-[400px] border-0"
              title="Money Flow Avg Monthly Top 5 Banks Report"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Money Flow Top 5 Banks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/ALawzoBnZnB/?standalone=1&height=100%"
              className="w-full h-[400px] border-0"
              title="Money Flow Top 5 Banks Report"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}