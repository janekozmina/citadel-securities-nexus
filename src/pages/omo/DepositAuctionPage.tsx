import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Banknote, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function DepositAuctionPage() {
  const depositMetrics = [
    {
      title: 'Active Deposits',
      value: '8',
      change: '+3',
      changeType: 'positive' as const,
      icon: Banknote
    },
    {
      title: 'Total Deposits',
      value: 'BHD 195.4M',
      change: '+22.1%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Deposit Rate',
      value: '3.85%',
      change: '+0.10%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Maturity',
      value: '45 Days',
      change: '+5 days',
      changeType: 'neutral' as const,
      icon: Calendar
    }
  ];

  const depositAuctionData = [
    { auctionId: 'DEP001', type: 'Term Deposit', amount: 'BHD 35,000,000', rate: '3.75%', maturity: '30 Days', minBid: 'BHD 1,000,000', participants: 12, status: 'Active', valueDate: '2024-01-19' },
    { auctionId: 'DEP002', type: 'Callable Deposit', amount: 'BHD 25,000,000', rate: '3.90%', maturity: '60 Days', minBid: 'BHD 500,000', participants: 8, status: 'Completed', valueDate: '2024-01-18' },
    { auctionId: 'DEP003', type: 'Fixed Deposit', amount: 'BHD 40,000,000', rate: '4.00%', maturity: '90 Days', minBid: 'BHD 2,000,000', participants: 15, status: 'Active', valueDate: '2024-01-20' },
    { auctionId: 'DEP004', type: 'Islamic Deposit', amount: 'BHD 20,000,000', rate: '3.65%', maturity: '45 Days', minBid: 'BHD 750,000', participants: 6, status: 'Pending', valueDate: '2024-01-21' },
    { auctionId: 'DEP005', type: 'Structured Deposit', amount: 'BHD 15,000,000', rate: '4.15%', maturity: '120 Days', minBid: 'BHD 1,500,000', participants: 4, status: 'Active', valueDate: '2024-01-22' }
  ];

  const depositTypeDistribution = [
    { name: 'Term Deposit', value: 40, color: 'hsl(var(--chart-1))' },
    { name: 'Fixed Deposit', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'Callable Deposit', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Islamic Deposit', value: 10, color: 'hsl(var(--chart-4))' },
    { name: 'Structured Deposit', value: 5, color: 'hsl(var(--chart-5))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Deposit Auctions"
        description="Manage deposit facility auctions for surplus liquidity absorption"
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
                title: 'Deposits by Type',
                data: depositTypeDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Monthly Deposit Volume',
                data: [
                  { name: 'Jan', value: 195, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 218, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 185, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 235, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 205, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Deposit Auctions"
            data={depositAuctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'type', label: 'Deposit Type' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'minBid', label: 'Min Bid' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'valueDate', label: 'Value Date', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'type', label: 'Type', options: ['Term Deposit', 'Fixed Deposit', 'Callable Deposit', 'Islamic Deposit', 'Structured Deposit'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="deposit-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}