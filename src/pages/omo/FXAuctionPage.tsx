import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { DollarSign, TrendingUp, Globe, ArrowUpDown } from 'lucide-react';

export default function FXAuctionPage() {
  const fxMetrics = [
    {
      title: 'Active FX Auctions',
      value: '6',
      change: '+2',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Total FX Volume',
      value: 'USD 125.8M',
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Currency Pairs',
      value: '8',
      change: '+1',
      changeType: 'positive' as const,
      icon: Globe
    },
    {
      title: 'Avg Spread',
      value: '0.15%',
      change: '-0.02%',
      changeType: 'positive' as const,
      icon: ArrowUpDown
    }
  ];

  const fxAuctionData = [
    { auctionId: 'FX001', currencyPair: 'USD/BHD', operation: 'Sale', amount: 'USD 25,000,000', rate: '0.3770', participants: 8, status: 'Active', settlement: '2024-01-22' },
    { auctionId: 'FX002', currencyPair: 'EUR/BHD', operation: 'Purchase', amount: 'EUR 18,000,000', rate: '0.4105', participants: 6, status: 'Completed', settlement: '2024-01-19' },
    { auctionId: 'FX003', currencyPair: 'GBP/BHD', operation: 'Sale', amount: 'GBP 12,000,000', rate: '0.4685', participants: 5, status: 'Active', settlement: '2024-01-23' },
    { auctionId: 'FX004', currencyPair: 'JPY/BHD', operation: 'Purchase', amount: 'JPY 3,500,000,000', rate: '0.0025', participants: 4, status: 'Pending', settlement: '2024-01-24' },
    { auctionId: 'FX005', currencyPair: 'AED/BHD', operation: 'Sale', amount: 'AED 85,000,000', rate: '0.1026', participants: 7, status: 'Active', settlement: '2024-01-25' }
  ];

  const currencyDistribution = [
    { name: 'USD', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'EUR', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'GBP', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Others', value: 15, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="FX Auctions"
        description="Manage foreign exchange spot auctions for currency intervention operations"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fxMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
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
                title: 'FX Volume by Currency',
                data: currencyDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Daily FX Volume',
                data: [
                  { name: 'Mon', value: 125, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 138, color: 'hsl(var(--chart-2))' },
                  { name: 'Wed', value: 142, color: 'hsl(var(--chart-3))' },
                  { name: 'Thu', value: 155, color: 'hsl(var(--chart-4))' },
                  { name: 'Fri', value: 148, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="FX Auctions"
            data={fxAuctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'currencyPair', label: 'Currency Pair' },
              { key: 'operation', label: 'Operation' },
              { key: 'amount', label: 'Amount' },
              { key: 'rate', label: 'Exchange Rate' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlement', label: 'Settlement', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'operation', label: 'Operation', options: ['Purchase', 'Sale'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="fx-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}