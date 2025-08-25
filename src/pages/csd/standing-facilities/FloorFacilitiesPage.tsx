import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { TrendingDown, Activity, Clock, BarChart3 } from 'lucide-react';

export default function FloorFacilitiesPage() {
  const floorMetrics = [
    {
      title: 'Floor Rate',
      value: '3.75%',
      change: '+0.25%',
      changeType: 'positive' as const,
      icon: TrendingDown
    },
    {
      title: 'Daily Usage',
      value: 'BHD 25.4M',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Avg Duration',
      value: '2.5 hrs',
      change: '-0.5 hrs',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Utilization',
      value: '65.8%',
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: BarChart3
    }
  ];

  const floorData = [
    { transactionId: 'FL001', bank: 'National Bank of Bahrain', amount: 'BHD 8,500,000', rate: '3.75%', duration: '3.2 hrs', status: 'Active', timestamp: '09:30:00' },
    { transactionId: 'FL002', bank: 'Ahli United Bank', amount: 'BHD 6,200,000', rate: '3.75%', duration: '1.8 hrs', status: 'Completed', timestamp: '11:15:00' },
    { transactionId: 'FL003', bank: 'BBK', amount: 'BHD 4,750,000', rate: '3.75%', duration: '4.1 hrs', status: 'Active', timestamp: '08:45:00' },
    { transactionId: 'FL004', bank: 'Gulf International Bank', amount: 'BHD 3,200,000', rate: '3.75%', duration: '2.3 hrs', status: 'Pending', timestamp: '14:20:00' },
    { transactionId: 'FL005', bank: 'Al Salam Bank', amount: 'BHD 2,850,000', rate: '3.75%', duration: '1.5 hrs', status: 'Completed', timestamp: '10:30:00' }
  ];

  const usagePattern = [
    { name: '00:00', value: 12, color: 'hsl(var(--chart-1))' },
    { name: '04:00', value: 8, color: 'hsl(var(--chart-1))' },
    { name: '08:00', value: 45, color: 'hsl(var(--chart-1))' },
    { name: '12:00', value: 65, color: 'hsl(var(--chart-1))' },
    { name: '16:00', value: 38, color: 'hsl(var(--chart-1))' },
    { name: '20:00', value: 22, color: 'hsl(var(--chart-1))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Floor Facilities"
        description="Monitor floor facility operations and overnight lending"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {floorMetrics.map((metric, index) => (
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
                type: 'line',
                title: 'Hourly Usage Pattern',
                data: usagePattern,
                height: 400
              }}
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Daily Floor Facility Volume',
                data: [
                  { name: 'Mon', value: 25.4, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 28.7, color: 'hsl(var(--chart-2))' },
                  { name: 'Wed', value: 22.1, color: 'hsl(var(--chart-3))' },
                  { name: 'Thu', value: 31.2, color: 'hsl(var(--chart-4))' },
                  { name: 'Fri', value: 26.8, color: 'hsl(var(--chart-5))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Floor Facility Transactions"
            data={floorData}
            columns={[
              { key: 'transactionId', label: 'Transaction ID' },
              { key: 'bank', label: 'Bank' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'duration', label: 'Duration' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'timestamp', label: 'Time' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Completed'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="floor-facilities" systemType="common" />
        </div>
      </div>
    </div>
  );
}