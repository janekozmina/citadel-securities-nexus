import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';

export default function CSDDWHBIReportsPage() {
  useEffect(() => {
    document.title = 'CSD BI Reports | CBB Portal';
  }, []);

  const handleQuickActionClick = (actionId: string) => {
    if (actionId === 'access-bi-configuration') {
      window.open('http://superset.k8s1.moscow.cma.ru/superset/dashboard/csd-overview/?permalink_key=CSDOverview', '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="CSD BI Reports"
        description="Central Securities Depository business intelligence reports and analytics"
      />

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* First Row - Securities Settlement Overview */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Securities Settlement Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/CSDSettlement/?standalone=1&height=100%"
                className="w-full h-[500px] border-0"
                title="Securities Settlement Overview Report"
              />
            </CardContent>
          </Card>

          {/* Second Row - Two iframes side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Actions Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/CSDCorporateActions/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Corporate Actions Performance Report"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instrument Trading Volumes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/CSDTradingVolumes/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Instrument Trading Volumes Report"
                />
              </CardContent>
            </Card>
          </div>

          {/* Third Row - Additional CSD Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Custody Holdings Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/CSDCustodyHoldings/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Custody Holdings Analysis Report"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Failed Transactions Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/CSDFailedTransactions/?standalone=1&height=100%"
                  className="w-full h-[400px] border-0"
                  title="Failed Transactions Analysis Report"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="bi-reports" 
            systemType="csd"
            onActionClick={handleQuickActionClick}
          />
        </div>
      </div>
    </div>
  );
}