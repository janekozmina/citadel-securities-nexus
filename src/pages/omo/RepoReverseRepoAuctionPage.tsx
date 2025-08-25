import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ArrowRightLeft, DollarSign, Percent, Clock } from 'lucide-react';

export default function RepoReverseRepoAuctionPage() {
  const repoMetrics = [
    {
      title: 'Active Repo Auctions',
      value: '5',
      change: '+2',
      changeType: 'positive' as const,
      icon: ArrowRightLeft
    },
    {
      title: 'Total Outstanding',
      value: 'BHD 125.8M',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Repo Rate',
      value: '4.18%',
      change: '+0.03%',
      changeType: 'neutral' as const,
      icon: Percent
    },
    {
      title: 'Avg Maturity',
      value: '12 Days',
      change: '-2 days',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const repoAuctionData = [
    { auctionId: 'REP001', type: 'Repo', collateral: 'Government Securities', amount: 'BHD 25,000,000', rate: '4.15%', maturity: '7 Days', participants: 8, status: 'Active', settlement: '2024-01-19' },
    { auctionId: 'REP002', type: 'Reverse Repo', collateral: 'CB Certificates', amount: 'BHD 15,000,000', rate: '4.25%', maturity: '14 Days', participants: 6, status: 'Completed', settlement: '2024-01-18' },
    { auctionId: 'REP003', type: 'Repo', collateral: 'Treasury Bills', amount: 'BHD 30,000,000', rate: '4.10%', maturity: '21 Days', participants: 10, status: 'Active', settlement: '2024-01-20' },
    { auctionId: 'REP004', type: 'Reverse Repo', collateral: 'Sukuk', amount: 'BHD 20,000,000', rate: '4.20%', maturity: '28 Days', participants: 7, status: 'Pending', settlement: '2024-01-21' },
    { auctionId: 'REP005', type: 'Repo', collateral: 'Corporate Bonds', amount: 'BHD 18,500,000', rate: '4.30%', maturity: '35 Days', participants: 9, status: 'Active', settlement: '2024-01-22' }
  ];

  const operationDistribution = [
    { name: 'Repo', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'Reverse Repo', value: 35, color: 'hsl(var(--chart-2))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Repo/Reverse Repo Auctions"
        description="Manage repurchase and reverse repurchase agreement auctions for liquidity operations"
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
                title: 'Operations Distribution',
                data: operationDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Weekly Operation Volume',
                data: [
                  { name: 'Week 1', value: 85, color: 'hsl(var(--chart-1))' },
                  { name: 'Week 2', value: 92, color: 'hsl(var(--chart-2))' },
                  { name: 'Week 3', value: 78, color: 'hsl(var(--chart-3))' },
                  { name: 'Week 4', value: 105, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Repo/Reverse Repo Auctions"
            data={repoAuctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'type', label: 'Type' },
              { key: 'collateral', label: 'Collateral Type' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlement', label: 'Settlement', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'type', label: 'Type', options: ['Repo', 'Reverse Repo'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="repo-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}