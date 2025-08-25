import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { DollarSign, Clock, Users, TrendingUp } from 'lucide-react';

export default function ILFPage() {
  const ilfMetrics = [
    {
      title: 'ILF Balance',
      value: 'BHD 85.2M',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Active Transactions',
      value: '24',
      change: '+8',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Participating Banks',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Average Rate',
      value: '4.25%',
      change: '+0.15%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const ilfData = [
    { transactionId: 'ILF001', bank: 'National Bank of Bahrain', amount: 'BHD 15,000,000', rate: '4.25%', tenor: '30 Days', status: 'Active', date: '2024-01-15' },
    { transactionId: 'ILF002', bank: 'Ahli United Bank', amount: 'BHD 12,500,000', rate: '4.20%', tenor: '14 Days', status: 'Active', date: '2024-01-14' },
    { transactionId: 'ILF003', bank: 'BBK', amount: 'BHD 8,750,000', rate: '4.30%', tenor: '7 Days', status: 'Matured', date: '2024-01-10' },
    { transactionId: 'ILF004', bank: 'Gulf International Bank', amount: 'BHD 20,000,000', rate: '4.15%', tenor: '90 Days', status: 'Active', date: '2024-01-12' },
    { transactionId: 'ILF005', bank: 'Al Salam Bank', amount: 'BHD 6,200,000', rate: '4.35%', tenor: 'Overnight', status: 'Pending', date: '2024-01-16' }
  ];

  const tenorDistribution = [
    { name: 'Overnight', value: 25, color: 'hsl(var(--chart-1))' },
    { name: '7 Days', value: 30, color: 'hsl(var(--chart-2))' },
    { name: '14 Days', value: 20, color: 'hsl(var(--chart-3))' },
    { name: '30 Days', value: 15, color: 'hsl(var(--chart-4))' },
    { name: '90 Days', value: 10, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Islamic Liquidity Facility (ILF)"
        description="Manage Islamic liquidity facility operations and transactions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ilfMetrics.map((metric, index) => (
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
                title: 'ILF by Tenor',
                data: tenorDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Weekly ILF Volume',
                data: [
                  { name: 'Week 1', value: 85, color: 'hsl(var(--chart-1))' },
                  { name: 'Week 2', value: 92, color: 'hsl(var(--chart-2))' },
                  { name: 'Week 3', value: 78, color: 'hsl(var(--chart-3))' },
                  { name: 'Week 4', value: 89, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="ILF Transactions"
            data={ilfData}
            columns={[
              { key: 'transactionId', label: 'Transaction ID' },
              { key: 'bank', label: 'Bank' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'tenor', label: 'Tenor' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'date', label: 'Date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Matured'] },
              { key: 'tenor', label: 'Tenor', options: ['Overnight', '7 Days', '14 Days', '30 Days', '90 Days'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="ilf" systemType="common" />
        </div>
      </div>
    </div>
  );
}