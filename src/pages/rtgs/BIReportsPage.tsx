import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

export default function BIReportsPage() {
  useEffect(() => {
    document.title = 'BI Reports | CBB Portal';
  }, []);

  const handleQuickActionClick = (actionId: string) => {
    if (actionId === 'access-bi-full-view') {
      window.open('http://ifp.k8s1.cma.se/business-monitoring', '_blank');
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl font-bold">RTGS — BI Reports</h1>
          <p className="text-muted-foreground">Business intelligence reports and analytics for RTGS operations.</p>
        </section>
        
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
      </div>

      {/* Right Sidebar with Quick Actions */}
      <div className="w-64 space-y-4">
        <QuickActionsManager 
          pageKey="bi-reports"
          systemType="rtgs"
          onActionClick={handleQuickActionClick}
        />
      </div>
    </div>
  );
}