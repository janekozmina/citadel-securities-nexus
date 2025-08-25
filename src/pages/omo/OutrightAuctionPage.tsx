import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { TrendingDown, DollarSign, ShoppingCart, BarChart3 } from 'lucide-react';

export default function OutrightAuctionPage() {
  const outrightMetrics = [
    {
      title: 'Active Outright Auctions',
      value: '4',
      change: '+1',
      changeType: 'positive' as const,
      icon: TrendingDown
    },
    {
      title: 'Total Purchase Value',
      value: 'BHD 65.8M',
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Purchase Price',
      value: '98.45%',
      change: '+0.25%',
      changeType: 'positive' as const,
      icon: ShoppingCart
    },
    {
      title: 'Market Impact',
      value: '0.15%',
      change: '-0.05%',
      changeType: 'positive' as const,
      icon: BarChart3
    }
  ];

  const outrightAuctionData = [
    { auctionId: 'OUT001', operation: 'Purchase', security: 'Government Bond 5Y', amount: 'BHD 20,000,000', price: '98.75%', yield: '4.12%', participants: 7, status: 'Active', settlement: '2024-01-22' },
    { auctionId: 'OUT002', operation: 'Sale', security: 'Treasury Bill 6M', amount: 'BHD 15,000,000', price: '97.85%', yield: '4.25%', participants: 5, status: 'Completed', settlement: '2024-01-19' },
    { auctionId: 'OUT003', operation: 'Purchase', security: 'CB Certificate 3M', amount: 'BHD 25,000,000', price: '99.15%', yield: '3.95%', participants: 9, status: 'Active', settlement: '2024-01-23' },
    { auctionId: 'OUT004', operation: 'Sale', security: 'Sukuk 2Y', amount: 'BHD 12,000,000', price: '98.95%', yield: '4.05%', participants: 6, status: 'Pending', settlement: '2024-01-24' },
    { auctionId: 'OUT005', operation: 'Purchase', security: 'Corporate Bond 1Y', amount: 'BHD 8,500,000', price: '97.65%', yield: '4.35%', participants: 4, status: 'Active', settlement: '2024-01-25' }
  ];

  const operationDistribution = [
    { name: 'Purchase', value: 70, color: 'hsl(var(--chart-1))' },
    { name: 'Sale', value: 30, color: 'hsl(var(--chart-2))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Outright Auctions"
        description="Manage outright purchase and sale operations for permanent liquidity adjustments"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outrightMetrics.map((metric, index) => (
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
                title: 'Operations Distribution',
                data: operationDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Quarterly Volume Trend',
                data: [
                  { name: 'Q1', value: 185, color: 'hsl(var(--chart-1))' },
                  { name: 'Q2', value: 205, color: 'hsl(var(--chart-2))' },
                  { name: 'Q3', value: 195, color: 'hsl(var(--chart-3))' },
                  { name: 'Q4', value: 220, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Outright Auctions"
            data={outrightAuctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'operation', label: 'Operation' },
              { key: 'security', label: 'Security' },
              { key: 'amount', label: 'Amount' },
              { key: 'price', label: 'Price' },
              { key: 'yield', label: 'Yield' },
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
          <QuickActionsManager pageKey="outright-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}