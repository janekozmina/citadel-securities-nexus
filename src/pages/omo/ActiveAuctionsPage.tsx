import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Activity, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function ActiveAuctionsPage() {
  const auctionMetrics = [
    {
      title: 'Active Auctions',
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Total Value',
      value: 'BHD 85.4M',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Duration',
      value: '4.2 hrs',
      change: '-15 min',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Success Rate',
      value: '94.8%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const auctionData = [
    { auctionId: 'AUC001', type: 'Repo', maturity: '7 Days', amount: 'BHD 15,000,000', rate: '4.25%', participants: 8, status: 'Active', endTime: '14:30:00' },
    { auctionId: 'AUC002', type: 'Reverse Repo', maturity: '14 Days', amount: 'BHD 10,000,000', rate: '4.15%', participants: 6, status: 'Active', endTime: '15:00:00' },
    { auctionId: 'AUC003', type: 'Deposit', maturity: '30 Days', amount: 'BHD 25,000,000', rate: '4.35%', participants: 12, status: 'Active', endTime: '16:00:00' },
    { auctionId: 'AUC004', type: 'FX Forward', maturity: '90 Days', amount: 'BHD 8,500,000', rate: '4.10%', participants: 5, status: 'Closing Soon', endTime: '13:45:00' },
    { auctionId: 'AUC005', type: 'Outright', maturity: '180 Days', amount: 'BHD 20,000,000', rate: '4.50%', participants: 9, status: 'Active', endTime: '17:30:00' }
  ];

  const typeDistribution = [
    { name: 'Repo', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Deposit', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'FX Operations', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Outright', value: 20, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Active Auctions"
        description="Monitor and manage currently active open market operations auctions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {auctionMetrics.map((metric, index) => (
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
                title: 'Auctions by Type',
                data: typeDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Daily Auction Volume',
                data: [
                  { name: 'Mon', value: 65, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 78, color: 'hsl(var(--chart-2))' },
                  { name: 'Wed', value: 85, color: 'hsl(var(--chart-3))' },
                  { name: 'Thu', value: 92, color: 'hsl(var(--chart-4))' },
                  { name: 'Fri', value: 88, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Active Auctions"
            data={auctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'type', label: 'Type' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Rate' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'endTime', label: 'End Time' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Closing Soon', 'Ended'] },
              { key: 'type', label: 'Type', options: ['Repo', 'Reverse Repo', 'Deposit', 'FX Forward', 'Outright'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="active-auctions" systemType="common" />
        </div>
      </div>
    </div>
  );
}