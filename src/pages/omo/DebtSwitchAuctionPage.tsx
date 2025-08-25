import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Shuffle, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function DebtSwitchAuctionPage() {
  const debtSwitchMetrics = [
    {
      title: 'Active Switches',
      value: '3',
      change: '+1',
      changeType: 'positive' as const,
      icon: Shuffle
    },
    {
      title: 'Total Switch Value',
      value: 'BHD 45.8M',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Switch Ratio',
      value: '1.05:1',
      change: '+0.02',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Maturity Extension',
      value: '2.3 Years',
      change: '+6 months',
      changeType: 'neutral' as const,
      icon: Calendar
    }
  ];

  const debtSwitchData = [
    { auctionId: 'DS001', oldSecurity: 'TB-2024-6M', newSecurity: 'TB-2026-2Y', oldAmount: 'BHD 15,000,000', newAmount: 'BHD 15,750,000', switchRatio: '1.05:1', participants: 6, status: 'Active', settlement: '2024-01-25' },
    { auctionId: 'DS002', oldSecurity: 'BOND-2025-1Y', newSecurity: 'BOND-2028-3Y', oldAmount: 'BHD 20,000,000', newAmount: 'BHD 21,000,000', switchRatio: '1.05:1', participants: 8, status: 'Completed', settlement: '2024-01-20' },
    { auctionId: 'DS003', oldSecurity: 'SUKUK-2024-9M', newSecurity: 'SUKUK-2027-3Y', oldAmount: 'BHD 10,000,000', newAmount: 'BHD 10,400,000', switchRatio: '1.04:1', participants: 5, status: 'Active', settlement: '2024-01-26' },
    { auctionId: 'DS004', oldSecurity: 'CB-CERT-6M', newSecurity: 'CB-CERT-18M', oldAmount: 'BHD 12,500,000', newAmount: 'BHD 13,125,000', switchRatio: '1.05:1', participants: 7, status: 'Pending', settlement: '2024-01-28' },
    { auctionId: 'DS005', oldSecurity: 'BOND-2025-6M', newSecurity: 'BOND-2030-5Y', oldAmount: 'BHD 18,000,000', newAmount: 'BHD 19,080,000', switchRatio: '1.06:1', participants: 4, status: 'Active', settlement: '2024-01-30' }
  ];

  const securityTypeDistribution = [
    { name: 'Treasury Bills', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Government Bonds', value: 40, color: 'hsl(var(--chart-2))' },
    { name: 'Sukuk', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'CB Certificates', value: 10, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Debt Switch Auctions"
        description="Manage debt switching operations to optimize maturity profile and market liquidity"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {debtSwitchMetrics.map((metric, index) => (
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
                type: 'pie',
                title: 'Securities by Type',
                data: securityTypeDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Quarterly Switch Volume',
                data: [
                  { name: 'Q1', value: 45, color: 'hsl(var(--chart-1))' },
                  { name: 'Q2', value: 52, color: 'hsl(var(--chart-2))' },
                  { name: 'Q3', value: 38, color: 'hsl(var(--chart-3))' },
                  { name: 'Q4', value: 48, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Debt Switch Auctions"
            data={debtSwitchData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'oldSecurity', label: 'Old Security' },
              { key: 'newSecurity', label: 'New Security' },
              { key: 'oldAmount', label: 'Old Amount' },
              { key: 'newAmount', label: 'New Amount' },
              { key: 'switchRatio', label: 'Switch Ratio' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlement', label: 'Settlement', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'oldSecurity', label: 'Security Type', options: ['Treasury Bills', 'Government Bonds', 'Sukuk', 'CB Certificates'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="debt-switch-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}