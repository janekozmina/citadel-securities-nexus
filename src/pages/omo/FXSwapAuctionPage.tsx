import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ArrowRightLeft, DollarSign, Repeat, Clock } from 'lucide-react';

export default function FXSwapAuctionPage() {
  const fxSwapMetrics = [
    {
      title: 'Active FX Swaps',
      value: '7',
      change: '+2',
      changeType: 'positive' as const,
      icon: ArrowRightLeft
    },
    {
      title: 'Total Swap Value',
      value: 'USD 185.2M',
      change: '+24.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Swap Points',
      value: '18.5',
      change: '+2.1',
      changeType: 'neutral' as const,
      icon: Repeat
    },
    {
      title: 'Avg Tenor',
      value: '35 Days',
      change: '-3 days',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const fxSwapData = [
    { auctionId: 'FXS001', currencyPair: 'USD/BHD', nearLeg: 'Buy USD 20M', farLeg: 'Sell USD 20M', nearRate: '0.3770', farRate: '0.3775', tenor: '30 Days', participants: 8, status: 'Active', nearDate: '2024-01-22', farDate: '2024-02-21' },
    { auctionId: 'FXS002', currencyPair: 'EUR/BHD', nearLeg: 'Sell EUR 15M', farLeg: 'Buy EUR 15M', nearRate: '0.4105', farRate: '0.4108', tenor: '60 Days', participants: 6, status: 'Completed', nearDate: '2024-01-18', farDate: '2024-03-19' },
    { auctionId: 'FXS003', currencyPair: 'GBP/BHD', nearLeg: 'Buy GBP 10M', farLeg: 'Sell GBP 10M', nearRate: '0.4685', farRate: '0.4690', tenor: '90 Days', participants: 5, status: 'Active', nearDate: '2024-01-23', farDate: '2024-04-23' },
    { auctionId: 'FXS004', currencyPair: 'USD/BHD', nearLeg: 'Sell USD 25M', farLeg: 'Buy USD 25M', nearRate: '0.3770', farRate: '0.3772', tenor: '14 Days', participants: 9, status: 'Pending', nearDate: '2024-01-24', farDate: '2024-02-07' },
    { auctionId: 'FXS005', currencyPair: 'AED/BHD', nearLeg: 'Buy AED 60M', farLeg: 'Sell AED 60M', nearRate: '0.1026', farRate: '0.1027', tenor: '45 Days', participants: 4, status: 'Active', nearDate: '2024-01-25', farDate: '2024-03-11' }
  ];

  const tenorDistribution = [
    { name: 'Short Term (≤30d)', value: 40, color: 'hsl(var(--chart-1))' },
    { name: 'Medium Term (31-60d)', value: 35, color: 'hsl(var(--chart-2))' },
    { name: 'Long Term (>60d)', value: 25, color: 'hsl(var(--chart-3))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="FX SWAP Auctions"
        description="Manage foreign exchange swap auctions for simultaneous spot and forward transactions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fxSwapMetrics.map((metric, index) => (
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
                title: 'Swaps by Tenor',
                data: tenorDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Weekly Swap Volume',
                data: [
                  { name: 'Week 1', value: 185, color: 'hsl(var(--chart-1))' },
                  { name: 'Week 2', value: 205, color: 'hsl(var(--chart-2))' },
                  { name: 'Week 3', value: 175, color: 'hsl(var(--chart-3))' },
                  { name: 'Week 4', value: 220, color: 'hsl(var(--chart-4))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="FX SWAP Auctions"
            data={fxSwapData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'currencyPair', label: 'Currency Pair' },
              { key: 'nearLeg', label: 'Near Leg' },
              { key: 'farLeg', label: 'Far Leg' },
              { key: 'nearRate', label: 'Near Rate' },
              { key: 'farRate', label: 'Far Rate' },
              { key: 'tenor', label: 'Tenor' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'nearDate', label: 'Near Date', type: 'date' },
              { key: 'farDate', label: 'Far Date', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'currencyPair', label: 'Currency Pair', options: ['USD/BHD', 'EUR/BHD', 'GBP/BHD', 'AED/BHD'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="fx-swap-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}