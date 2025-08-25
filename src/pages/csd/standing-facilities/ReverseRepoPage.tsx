import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { RefreshCw, Activity, TrendingDown, Clock } from 'lucide-react';

export default function ReverseRepoPage() {
  const reverseRepoMetrics = [
    {
      title: 'Active Reverse Repos',
      value: '28',
      change: '+4',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Total Volume',
      value: 'BHD 165.4M',
      change: '+12.8%',
      changeType: 'positive' as const,
      icon: RefreshCw
    },
    {
      title: 'Average Rate',
      value: '3.95%',
      change: '-0.10%',
      changeType: 'negative' as const,
      icon: TrendingDown
    },
    {
      title: 'Avg Maturity',
      value: '9 Days',
      change: '-1 Day',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const reverseRepoData = [
    { rrpId: 'RRP001', counterparty: 'National Bank of Bahrain', amount: 'BHD 35,000,000', rate: '3.95%', maturity: '14 Days', collateral: 'Treasury Bills', status: 'Active' },
    { rrpId: 'RRP002', counterparty: 'Ahli United Bank', amount: 'BHD 22,500,000', rate: '3.90%', maturity: '7 Days', collateral: 'Government Bonds', status: 'Active' },
    { rrpId: 'RRP003', counterparty: 'BBK', amount: 'BHD 18,750,000', rate: '4.00%', maturity: '21 Days', collateral: 'Corporate Bonds', status: 'Pending' },
    { rrpId: 'RRP004', counterparty: 'Gulf International Bank', amount: 'BHD 28,200,000', rate: '3.85%', maturity: 'Overnight', collateral: 'Treasury Bonds', status: 'Active' },
    { rrpId: 'RRP005', counterparty: 'Al Salam Bank', amount: 'BHD 15,900,000', rate: '4.05%', maturity: '30 Days', collateral: 'Sukuk', status: 'Maturing' }
  ];

  const liquidityImpact = [
    { name: 'Overnight', value: 30, color: 'hsl(var(--chart-1))' },
    { name: '1-7 Days', value: 40, color: 'hsl(var(--chart-2))' },
    { name: '8-14 Days', value: 18, color: 'hsl(var(--chart-3))' },
    { name: '15-30 Days', value: 10, color: 'hsl(var(--chart-4))' },
    { name: '30+ Days', value: 2, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Reverse Repo Operations"
        description="Manage reverse repurchase agreement operations and liquidity absorption"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reverseRepoMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              config={{
                type: 'pie',
                title: 'Reverse Repo Maturity Profile',
                data: liquidityImpact,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'line',
                title: 'Daily Liquidity Absorption',
                data: [
                  { name: 'Mon', value: 165, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 158, color: 'hsl(var(--chart-1))' },
                  { name: 'Wed', value: 172, color: 'hsl(var(--chart-1))' },
                  { name: 'Thu', value: 168, color: 'hsl(var(--chart-1))' },
                  { name: 'Fri', value: 175, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Active Reverse Repo Transactions"
            data={reverseRepoData}
            columns={[
              { key: 'rrpId', label: 'RRP ID' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'collateral', label: 'Collateral' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Maturing', 'Matured'] },
              { key: 'collateral', label: 'Collateral', options: ['Treasury Bills', 'Government Bonds', 'Corporate Bonds', 'Treasury Bonds', 'Sukuk'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="reverse-repo" systemType="common" />
        </div>
      </div>
    </div>
  );
}