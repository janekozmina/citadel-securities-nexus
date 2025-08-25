import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ShoppingCart, DollarSign, Percent, TrendingDown } from 'lucide-react';

export default function BuybackAuctionPage() {
  const buybackMetrics = [
    {
      title: 'Active Buybacks',
      value: '5',
      change: '+2',
      changeType: 'positive' as const,
      icon: ShoppingCart
    },
    {
      title: 'Total Buyback Value',
      value: 'BHD 75.4M',
      change: '+28.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Buyback Yield',
      value: '3.85%',
      change: '-0.15%',
      changeType: 'positive' as const,
      icon: Percent
    },
    {
      title: 'Market Impact',
      value: '0.08%',
      change: '-0.03%',
      changeType: 'positive' as const,
      icon: TrendingDown
    }
  ];

  const buybackData = [
    { auctionId: 'BB001', security: 'TB-2024-3M', maturity: '2024-04-18', amount: 'BHD 18,000,000', buybackPrice: '99.85%', yield: '3.75%', participants: 7, status: 'Active', settlement: '2024-01-22' },
    { auctionId: 'BB002', security: 'BOND-2024-6M', maturity: '2024-07-18', amount: 'BHD 15,000,000', buybackPrice: '98.95%', yield: '3.95%', participants: 5, status: 'Completed', settlement: '2024-01-19' },
    { auctionId: 'BB003', security: 'SUKUK-2024-9M', maturity: '2024-10-18', amount: 'BHD 22,000,000', buybackPrice: '99.15%', yield: '3.65%', participants: 8, status: 'Active', settlement: '2024-01-23' },
    { auctionId: 'BB004', security: 'CB-CERT-2024', maturity: '2024-05-18', amount: 'BHD 12,500,000', buybackPrice: '99.75%', yield: '3.55%', participants: 6, status: 'Pending', settlement: '2024-01-24' },
    { auctionId: 'BB005', security: 'TB-2024-12M', maturity: '2024-12-18', amount: 'BHD 20,000,000', buybackPrice: '98.45%', yield: '4.15%', participants: 9, status: 'Active', settlement: '2024-01-25' }
  ];

  const maturityDistribution = [
    { name: '0-3 Months', value: 30, color: 'hsl(var(--chart-1))' },
    { name: '3-6 Months', value: 35, color: 'hsl(var(--chart-2))' },
    { name: '6-12 Months', value: 25, color: 'hsl(var(--chart-3))' },
    { name: '12+ Months', value: 10, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Buyback Auctions"
        description="Manage government securities buyback operations for debt management and liquidity provision"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {buybackMetrics.map((metric, index) => (
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
                title: 'Buybacks by Maturity',
                data: maturityDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Monthly Buyback Volume',
                data: [
                  { name: 'Jan', value: 75, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 85, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 65, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 95, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 78, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Buyback Auctions"
            data={buybackData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'security', label: 'Security' },
              { key: 'maturity', label: 'Maturity', type: 'date' },
              { key: 'amount', label: 'Amount' },
              { key: 'buybackPrice', label: 'Buyback Price' },
              { key: 'yield', label: 'Yield' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlement', label: 'Settlement', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'security', label: 'Security Type', options: ['Treasury Bills', 'Government Bonds', 'Sukuk', 'CB Certificates'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="buyback-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}