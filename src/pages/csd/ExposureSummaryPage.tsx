import React, { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { getPageConfig } from '@/config/pageConfig';

export default function ExposureSummaryPage() {
  useEffect(() => {
    document.title = 'Exposure Summary | CBB Portal';
  }, []);
  
  const config = getPageConfig('csd', 'exposureSummary');
  const exposureMetrics = [
    {
      title: 'Total Exposure',
      value: 'BHD 24.5M',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'High Risk Positions',
      value: '12',
      change: '-1',
      changeType: 'positive' as const,
      icon: AlertTriangle
    },
    {
      title: 'Concentration Risk',
      value: '15.8%',
      change: '+0.5%',
      changeType: 'negative' as const,
      icon: TrendingUp
    },
    {
      title: 'Diversification Index',
      value: '0.85',
      change: '+0.02',
      changeType: 'positive' as const,
      icon: TrendingDown
    }
  ];

  const exposureData = [
    { counterparty: 'National Bank of Bahrain (NBB)', sector: 'Banking', exposure: 'BHD 5.2M', rating: 'AA-', limit: 'BHD 8.0M', utilization: '65%' },
    { counterparty: 'Ahli United Bank B.S.C.', sector: 'Banking', exposure: 'BHD 3.8M', rating: 'A+', limit: 'BHD 5.0M', utilization: '76%' },
    { counterparty: 'Bank of Bahrain and Kuwait (BBK)', sector: 'Banking', exposure: 'BHD 4.1M', rating: 'A', limit: 'BHD 6.0M', utilization: '68%' },
    { counterparty: 'Gulf International Bank B.S.C. (GIB)', sector: 'Banking', exposure: 'BHD 6.5M', rating: 'AAA', limit: 'BHD 10.0M', utilization: '65%' },
    { counterparty: 'Bahrain Islamic Bank B.S.C. (BisB)', sector: 'Banking', exposure: 'BHD 2.9M', rating: 'BBB+', limit: 'BHD 4.0M', utilization: '73%' }
  ];

  const securityTypeData = [
    { name: 'Government Bonds', value: 45, exposure: 'BHD 11.0M', color: 'hsl(var(--chart-1))' },
    { name: 'Corporate Bonds', value: 25, exposure: 'BHD 6.1M', color: 'hsl(var(--chart-2))' },
    { name: 'Treasury Bills', value: 15, exposure: 'BHD 3.7M', color: 'hsl(var(--chart-3))' },
    { name: 'Sukuk', value: 10, exposure: 'BHD 2.5M', color: 'hsl(var(--chart-4))' },
    { name: 'Others', value: 5, exposure: 'BHD 1.2M', color: 'hsl(var(--chart-5))' }
  ];

  const maturityBucketData = [
    { name: 'Short-term (<1M)', value: 9.0, color: 'hsl(var(--chart-1))' },
    { name: 'Medium (1-12M)', value: 8.0, color: 'hsl(var(--chart-2))' },
    { name: 'Long-term (>1Y)', value: 4.5, color: 'hsl(var(--chart-3))' }
  ];

  // Helper function to determine utilization color for conditional formatting
  const getUtilizationColor = (utilization: string) => {
    const percentage = parseFloat(utilization.replace('%', ''));
    if (percentage >= 90) return 'text-red-600 font-bold';
    if (percentage >= 75) return 'text-yellow-600 font-medium';
    return 'text-slate-700';
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* Exposure Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exposureMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              config={{
                type: "pie",
                title: "Exposure Breakdown by Security Type",
                data: securityTypeData,
                height: 400
              }}
              pieChartSize="medium"
              className="h-full"
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Exposure Breakdown by Maturity Bucket",
                data: maturityBucketData,
                height: 400
              }}
              className="h-full"
            />
          </div>

          {/* Counterparty Exposures Table */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Counterparty Exposures</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Counterparty</th>
                      <th className="text-left p-2 font-medium">Sector</th>
                      <th className="text-left p-2 font-medium">Exposure</th>
                      <th className="text-left p-2 font-medium">Rating</th>
                      <th className="text-left p-2 font-medium">Limit</th>
                      <th className="text-left p-2 font-medium">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exposureData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-2">{row.counterparty}</td>
                        <td className="p-2">{row.sector}</td>
                        <td className="p-2 font-medium">{row.exposure}</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-slate-100 rounded text-sm">{row.rating}</span>
                        </td>
                        <td className="p-2">{row.limit}</td>
                        <td className={`p-2 ${getUtilizationColor(row.utilization)}`}>
                          {row.utilization}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-64">
          <ConditionalQuickActions 
            pageKey="exposure-summary"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}