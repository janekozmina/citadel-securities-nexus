import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Archive, TrendingUp, Users, Clock } from 'lucide-react';

export default function DepositFacilitiesPage() {
  const depositMetrics = [
    {
      title: 'Total Deposits',
      value: 'BHD 258.3M',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: Archive
    },
    {
      title: 'Deposit Rate',
      value: '3.25%',
      change: '+0.10%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Active Depositors',
      value: '16',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Avg Maturity',
      value: '28 Days',
      change: '-3 Days',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const depositData = [
    { depositId: 'DF001', bank: 'National Bank of Bahrain', amount: 'BHD 45,000,000', rate: '3.25%', maturity: '30 Days', type: 'Fixed Term', status: 'Active' },
    { depositId: 'DF002', bank: 'Ahli United Bank', amount: 'BHD 32,500,000', rate: '3.20%', maturity: '14 Days', type: 'Short Term', status: 'Active' },
    { depositId: 'DF003', bank: 'BBK', amount: 'BHD 28,750,000', rate: '3.30%', maturity: '60 Days', type: 'Fixed Term', status: 'Pending' },
    { depositId: 'DF004', bank: 'Gulf International Bank', amount: 'BHD 52,200,000', rate: '3.15%', maturity: '90 Days', type: 'Long Term', status: 'Active' },
    { depositId: 'DF005', bank: 'Al Salam Bank', amount: 'BHD 18,900,000', rate: '3.35%', maturity: '7 Days', type: 'Overnight', status: 'Matured' }
  ];

  const maturityBreakdown = [
    { name: 'Overnight', value: 20, color: 'hsl(var(--chart-1))' },
    { name: '7 Days', value: 25, color: 'hsl(var(--chart-2))' },
    { name: '14 Days', value: 18, color: 'hsl(var(--chart-3))' },
    { name: '30 Days', value: 22, color: 'hsl(var(--chart-4))' },
    { name: '60+ Days', value: 15, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Deposit Facilities"
        description="Manage central bank deposit facilities and overnight deposits"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {depositMetrics.map((metric, index) => (
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
                title: 'Deposits by Maturity',
                data: maturityBreakdown,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'line',
                title: 'Daily Deposit Inflows',
                data: [
                  { name: 'Mon', value: 258, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 245, color: 'hsl(var(--chart-1))' },
                  { name: 'Wed', value: 268, color: 'hsl(var(--chart-1))' },
                  { name: 'Thu', value: 275, color: 'hsl(var(--chart-1))' },
                  { name: 'Fri', value: 251, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Deposit Facility Transactions"
            data={depositData}
            columns={[
              { key: 'depositId', label: 'Deposit ID' },
              { key: 'bank', label: 'Bank' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'type', label: 'Type' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Matured'] },
              { key: 'type', label: 'Type', options: ['Overnight', 'Short Term', 'Fixed Term', 'Long Term'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="deposit-facilities" systemType="common" />
        </div>
      </div>
    </div>
  );
}