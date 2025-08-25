import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function FXForwardAuctionPage() {
  const fxForwardMetrics = [
    {
      title: 'Active Forward Auctions',
      value: '4',
      change: '+1',
      changeType: 'positive' as const,
      icon: Calendar
    },
    {
      title: 'Total Forward Value',
      value: 'USD 95.5M',
      change: '+12.8%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Forward Points',
      value: '25.5',
      change: '+3.2',
      changeType: 'neutral' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Maturity',
      value: '85 Days',
      change: '+5 days',
      changeType: 'neutral' as const,
      icon: Clock
    }
  ];

  const fxForwardData = [
    { auctionId: 'FXF001', currencyPair: 'USD/BHD', operation: 'Forward Sale', amount: 'USD 30,000,000', spotRate: '0.3770', forwardRate: '0.3775', maturity: '90 Days', participants: 6, status: 'Active', settlement: '2024-04-18' },
    { auctionId: 'FXF002', currencyPair: 'EUR/BHD', operation: 'Forward Purchase', amount: 'EUR 20,000,000', spotRate: '0.4105', forwardRate: '0.4110', maturity: '60 Days', participants: 5, status: 'Completed', settlement: '2024-03-19' },
    { auctionId: 'FXF003', currencyPair: 'GBP/BHD', operation: 'Forward Sale', amount: 'GBP 15,000,000', spotRate: '0.4685', forwardRate: '0.4690', maturity: '120 Days', participants: 4, status: 'Active', settlement: '2024-05-18' },
    { auctionId: 'FXF004', currencyPair: 'USD/BHD', operation: 'Forward Purchase', amount: 'USD 25,000,000', spotRate: '0.3770', forwardRate: '0.3772', maturity: '30 Days', participants: 7, status: 'Pending', settlement: '2024-02-18' },
    { auctionId: 'FXF005', currencyPair: 'AED/BHD', operation: 'Forward Sale', amount: 'AED 75,000,000', spotRate: '0.1026', forwardRate: '0.1027', maturity: '180 Days', participants: 3, status: 'Active', settlement: '2024-07-17' }
  ];

  const maturityDistribution = [
    { name: '30 Days', value: 25, color: 'hsl(var(--chart-1))' },
    { name: '60 Days', value: 30, color: 'hsl(var(--chart-2))' },
    { name: '90 Days', value: 25, color: 'hsl(var(--chart-3))' },
    { name: '120+ Days', value: 20, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="FX Forward Auctions"
        description="Manage foreign exchange forward contract auctions for future settlement"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fxForwardMetrics.map((metric, index) => (
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
                title: 'Forwards by Maturity',
                data: maturityDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Monthly Forward Volume',
                data: [
                  { name: 'Jan', value: 95, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 108, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 88, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 115, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 102, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="FX Forward Auctions"
            data={fxForwardData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'currencyPair', label: 'Currency Pair' },
              { key: 'operation', label: 'Operation' },
              { key: 'amount', label: 'Amount' },
              { key: 'spotRate', label: 'Spot Rate' },
              { key: 'forwardRate', label: 'Forward Rate' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlement', label: 'Settlement', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'operation', label: 'Operation', options: ['Forward Purchase', 'Forward Sale'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="fx-forward-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}