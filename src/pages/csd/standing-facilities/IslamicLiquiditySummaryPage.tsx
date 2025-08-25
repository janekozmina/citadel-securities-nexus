import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { BarChart3, DollarSign, TrendingUp, Activity } from 'lucide-react';

export default function IslamicLiquiditySummaryPage() {
  const liquidityMetrics = [
    {
      title: 'Total Islamic Liquidity',
      value: 'BHD 142.5M',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Active Facilities',
      value: '8',
      change: '+2',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Utilization Rate',
      value: '72.3%',
      change: '+3.1%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Daily Volume',
      value: 'BHD 18.2M',
      change: '-2.5%',
      changeType: 'negative' as const,
      icon: BarChart3
    }
  ];

  const facilityData = [
    { facility: 'Wakala Deposits', amount: 'BHD 45,000,000', rate: '4.15%', maturity: '30 Days', participants: 12, status: 'Active' },
    { facility: 'Murabaha Deposits', amount: 'BHD 38,500,000', rate: '4.25%', maturity: '14 Days', participants: 8, status: 'Active' },
    { facility: 'ISLI', amount: 'BHD 25,000,000', rate: '4.35%', maturity: '7 Days', participants: 6, status: 'Active' },
    { facility: 'Islamic Repo', amount: 'BHD 22,000,000', rate: '4.10%', maturity: 'Overnight', participants: 10, status: 'Active' },
    { facility: 'ILF', amount: 'BHD 12,000,000', rate: '4.50%', maturity: '90 Days', participants: 4, status: 'Pending' }
  ];

  const facilityDistribution = [
    { name: 'Wakala', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Murabaha', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'ISLI', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Islamic Repo', value: 15, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Islamic Liquidity Summary"
        description="Overview of Islamic liquidity facilities and operations"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liquidityMetrics.map((metric, index) => (
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
                title: 'Islamic Facilities Distribution',
                data: facilityDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'line',
                title: 'Daily Liquidity Trend',
                data: [
                  { name: 'Mon', value: 142, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 138, color: 'hsl(var(--chart-1))' },
                  { name: 'Wed', value: 145, color: 'hsl(var(--chart-1))' },
                  { name: 'Thu', value: 149, color: 'hsl(var(--chart-1))' },
                  { name: 'Fri', value: 143, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Islamic Liquidity Facilities"
            data={facilityData}
            columns={[
              { key: 'facility', label: 'Facility Type' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Closed'] },
              { key: 'facility', label: 'Facility', options: ['Wakala Deposits', 'Murabaha Deposits', 'ISLI', 'Islamic Repo', 'ILF'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="islamic-liquidity-summary" systemType="common" />
        </div>
      </div>
    </div>
  );
}