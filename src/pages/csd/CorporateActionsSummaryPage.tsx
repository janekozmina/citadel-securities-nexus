import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function CorporateActionsSummaryPage() {
  const caMetrics = [
    {
      title: 'Pending Actions',
      value: '8',
      change: '+2',
      changeType: 'neutral' as const,
      icon: Clock
    },
    {
      title: 'Processed Today',
      value: '15',
      change: '+3',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Upcoming Actions',
      value: '23',
      change: '+5',
      changeType: 'neutral' as const,
      icon: Calendar
    },
    {
      title: 'Failed Actions',
      value: '2',
      change: '-1',
      changeType: 'positive' as const,
      icon: AlertCircle
    }
  ];

  const corporateActionsData = [
    { security: 'GOV001', type: 'Coupon Payment', recordDate: '2024-01-15', payDate: '2024-01-20', amount: 'BD 250,000', status: 'Pending' },
    { security: 'CORP002', type: 'Dividend', recordDate: '2024-01-12', payDate: '2024-01-18', amount: 'BD 180,000', status: 'Processed' },
    { security: 'GOV003', type: 'Redemption', recordDate: '2024-01-10', payDate: '2024-01-25', amount: 'BD 1,200,000', status: 'Scheduled' },
    { security: 'SUKUK001', type: 'Profit Distribution', recordDate: '2024-01-08', payDate: '2024-01-22', amount: 'BD 320,000', status: 'Pending' },
    { security: 'BOND004', type: 'Early Redemption', recordDate: '2024-01-14', payDate: '2024-01-30', amount: 'BD 850,000', status: 'Approved' }
  ];

  const typeDistribution = [
    { name: 'Coupon Payment', value: 40, count: 12 },
    { name: 'Dividend', value: 25, count: 8 },
    { name: 'Redemption', value: 20, count: 6 },
    { name: 'Profit Distribution', value: 15, count: 4 }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Corporate Actions Summary"
        description="Monitor and manage corporate actions across all securities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {caMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>
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
                type: "pie",
                title: "Actions by Type",
                data: typeDistribution.map((item, index) => ({ ...item, color: `hsl(var(--chart-${index + 1}))` })),
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Processing Timeline",
                data: [
                  { name: 'Week 1', value: 18, color: 'hsl(var(--chart-1))' },
                  { name: 'Week 2', value: 25, color: 'hsl(var(--chart-2))' },
                  { name: 'Week 3', value: 25, color: 'hsl(var(--chart-3))' },
                  { name: 'Week 4', value: 25, color: 'hsl(var(--chart-4))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Corporate Actions Schedule"
            data={corporateActionsData}
            columns={[
              { key: 'security', label: 'Security' },
              { key: 'type', label: 'Action Type' },
              { key: 'recordDate', label: 'Record Date' },
              { key: 'payDate', label: 'Pay Date' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="corporate-actions-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}