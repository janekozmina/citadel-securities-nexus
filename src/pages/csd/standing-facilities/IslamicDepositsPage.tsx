import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { BookOpen, TrendingUp, Users, PieChart } from 'lucide-react';

export default function IslamicDepositsPage() {
  const islamicDepositMetrics = [
    {
      title: 'Total Islamic Deposits',
      value: 'BHD 325.8M',
      change: '+22.4%',
      changeType: 'positive' as const,
      icon: BookOpen
    },
    {
      title: 'Wakala Share',
      value: '65.2%',
      change: '+3.8%',
      changeType: 'positive' as const,
      icon: PieChart
    },
    {
      title: 'Average Return',
      value: '4.35%',
      change: '+0.15%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Active Banks',
      value: '14',
      change: '+1',
      changeType: 'positive' as const,
      icon: Users
    }
  ];

  const islamicDepositData = [
    { depositId: 'ID001', bank: 'Al Salam Bank', type: 'Wakala', amount: 'BHD 45,000,000', return: '4.35%', maturity: '30 Days', status: 'Active' },
    { depositId: 'ID002', bank: 'Ithmaar Bank', type: 'Murabaha', amount: 'BHD 32,500,000', return: '4.40%', maturity: '60 Days', status: 'Active' },
    { depositId: 'ID003', bank: 'ABC Islamic Bank', type: 'Wakala', amount: 'BHD 28,750,000', return: '4.30%', maturity: '14 Days', status: 'Pending' },
    { depositId: 'ID004', bank: 'Gulf Finance House', type: 'Murabaha', amount: 'BHD 52,200,000', return: '4.25%', maturity: '90 Days', status: 'Active' },
    { depositId: 'ID005', bank: 'Khaleeji Commercial Bank', type: 'Wakala', amount: 'BHD 18,900,000', return: '4.45%', maturity: '7 Days', status: 'Maturing' }
  ];

  const typeDistribution = [
    { name: 'Wakala', value: 65.2, color: 'hsl(var(--chart-1))' },
    { name: 'Murabaha', value: 34.8, color: 'hsl(var(--chart-2))' }
  ];

  const maturityBreakdown = [
    { name: '1-7 Days', value: 18, color: 'hsl(var(--chart-1))' },
    { name: '8-14 Days', value: 22, color: 'hsl(var(--chart-2))' },
    { name: '15-30 Days', value: 35, color: 'hsl(var(--chart-3))' },
    { name: '31-60 Days', value: 15, color: 'hsl(var(--chart-4))' },
    { name: '60+ Days', value: 10, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Islamic Deposits (Wakala/Murabaha)"
        description="Manage Sharia-compliant deposit facilities including Wakala and Murabaha structures"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {islamicDepositMetrics.map((metric, index) => (
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
                title: 'Islamic Deposit Types',
                data: typeDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'pie',
                title: 'Maturity Distribution',
                data: maturityBreakdown,
                height: 400
              }}
              pieChartSize="medium"
            />
          </div>

          <DataTable
            title="Islamic Deposit Facilities"
            data={islamicDepositData}
            columns={[
              { key: 'depositId', label: 'Deposit ID' },
              { key: 'bank', label: 'Islamic Bank' },
              { key: 'type', label: 'Structure Type' },
              { key: 'amount', label: 'Amount' },
              { key: 'return', label: 'Expected Return' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Maturing', 'Matured'] },
              { key: 'type', label: 'Structure', options: ['Wakala', 'Murabaha'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="islamic-deposits" systemType="common" />
        </div>
      </div>
    </div>
  );
}