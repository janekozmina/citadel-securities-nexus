import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { RefreshCw, Activity, TrendingUp, Clock } from 'lucide-react';

export default function RepoPage() {
  const repoMetrics = [
    {
      title: 'Active Repos',
      value: '32',
      change: '+5',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Total Volume',
      value: 'BHD 195.8M',
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: RefreshCw
    },
    {
      title: 'Average Rate',
      value: '4.15%',
      change: '+0.20%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Maturity',
      value: '12 Days',
      change: '-2 Days',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const repoData = [
    { repoId: 'RP001', counterparty: 'National Bank of Bahrain', amount: 'BHD 25,000,000', rate: '4.15%', maturity: '14 Days', collateral: 'Treasury Bills', status: 'Active' },
    { repoId: 'RP002', counterparty: 'Ahli United Bank', amount: 'BHD 18,500,000', rate: '4.10%', maturity: '7 Days', collateral: 'Government Bonds', status: 'Active' },
    { repoId: 'RP003', counterparty: 'BBK', amount: 'BHD 32,750,000', rate: '4.20%', maturity: '21 Days', collateral: 'Corporate Bonds', status: 'Pending' },
    { repoId: 'RP004', counterparty: 'Gulf International Bank', amount: 'BHD 12,200,000', rate: '4.05%', maturity: 'Overnight', collateral: 'Treasury Bonds', status: 'Active' },
    { repoId: 'RP005', counterparty: 'Al Salam Bank', amount: 'BHD 8,900,000', rate: '4.25%', maturity: '30 Days', collateral: 'Sukuk', status: 'Maturing' }
  ];

  const maturityProfile = [
    { name: 'Overnight', value: 25, color: 'hsl(var(--chart-1))' },
    { name: '1-7 Days', value: 35, color: 'hsl(var(--chart-2))' },
    { name: '8-14 Days', value: 20, color: 'hsl(var(--chart-3))' },
    { name: '15-30 Days', value: 15, color: 'hsl(var(--chart-4))' },
    { name: '30+ Days', value: 5, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Repo Operations"
        description="Manage repurchase agreement operations and collateral management"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {repoMetrics.map((metric, index) => (
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
                title: 'Repo Maturity Profile',
                data: maturityProfile,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Weekly Repo Volume',
                data: [
                  { name: 'Week 1', value: 180, color: 'hsl(var(--chart-1))' },
                  { name: 'Week 2', value: 195, color: 'hsl(var(--chart-2))' },
                  { name: 'Week 3', value: 165, color: 'hsl(var(--chart-3))' },
                  { name: 'Week 4', value: 205, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Active Repo Transactions"
            data={repoData}
            columns={[
              { key: 'repoId', label: 'Repo ID' },
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
          <QuickActionsManager pageKey="repo" systemType="common" />
        </div>
      </div>
    </div>
  );
}