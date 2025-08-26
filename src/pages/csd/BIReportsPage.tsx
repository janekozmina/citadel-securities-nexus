import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';

export default function BIReportsPage() {
  useEffect(() => {
    document.title = 'BI Reports | CBB Portal';
  }, []);

  const handleQuickActionClick = (actionId: string) => {
    if (actionId === 'access-bi-configuration') {
      window.open('http://superset.k8s1.moscow.cma.ru/superset/dashboard/24a553bf-8ef4-4b78-b0c4-22ddeb63fd09/?permalink_key=JnOlGOxZlj0', '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* First Row - Settlement Statistics */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Settlement Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/zrDZxDBpZ95/?standalone=1&height=100%"
                className="w-full h-[500px] border-0"
                title="Settlement Statistics Report"
              />
            </CardContent>
          </Card>

          {/* Second Row - Two iframes side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/6jz4n5xMO9A/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Transaction Volume Analysis Report"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participant Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/j3o4YJrjwl9/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Participant Activity Summary Report"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="bi-reports" 
            systemType="common"
            onActionClick={handleQuickActionClick}
          />
        </div>
      </div>
    </div>
  );
}