import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Wallet, Users, TrendingUp, Clock } from 'lucide-react';

export default function LendingFacilitiesPage() {
  const lendingMetrics = [
    {
      title: 'Total Lending',
      value: 'BHD 185.7M',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Wallet
    },
    {
      title: 'Active Borrowers',
      value: '18',
      change: '+3',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Average Rate',
      value: '4.85%',
      change: '+0.25%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Maturity',
      value: '45 Days',
      change: '+5 Days',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const lendingData = [
    { loanId: 'LF001', bank: 'National Bank of Bahrain', amount: 'BHD 25,000,000', rate: '4.85%', maturity: '30 Days', collateral: 'Treasury Bills', status: 'Active' },
    { loanId: 'LF002', bank: 'Ahli United Bank', amount: 'BHD 18,500,000', rate: '4.90%', maturity: '60 Days', collateral: 'Government Bonds', status: 'Active' },
    { loanId: 'LF003', bank: 'BBK', amount: 'BHD 12,750,000', rate: '4.80%', maturity: '14 Days', collateral: 'Corporate Bonds', status: 'Pending' },
    { loanId: 'LF004', bank: 'Gulf International Bank', amount: 'BHD 32,200,000', rate: '4.75%', maturity: '90 Days', collateral: 'Treasury Bonds', status: 'Active' },
    { loanId: 'LF005', bank: 'Al Salam Bank', amount: 'BHD 8,900,000', rate: '4.95%', maturity: '21 Days', collateral: 'Sukuk', status: 'Under Review' }
  ];

  const collateralTypes = [
    { name: 'Treasury Bills', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Government Bonds', value: 28, color: 'hsl(var(--chart-2))' },
    { name: 'Corporate Bonds', value: 22, color: 'hsl(var(--chart-3))' },
    { name: 'Sukuk', value: 15, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Lending Facilities"
        description="Manage central bank lending facilities and secured lending operations"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lendingMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${
                        metric.changeType === 'positive' ? 'text-green-600' : 
                        metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
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
                title: 'Collateral Distribution',
                data: collateralTypes,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Monthly Lending Volume',
                data: [
                  { name: 'Jan', value: 165, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 175, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 185, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 180, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 186, color: 'hsl(var(--chart-5))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Active Lending Facilities"
            data={lendingData}
            columns={[
              { key: 'loanId', label: 'Loan ID' },
              { key: 'bank', label: 'Bank' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'collateral', label: 'Collateral Type' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Under Review', 'Expired'] },
              { key: 'collateral', label: 'Collateral', options: ['Treasury Bills', 'Government Bonds', 'Corporate Bonds', 'Sukuk'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="lending-facilities" systemType="common" />
        </div>
      </div>
    </div>
  );
}