import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function CBAuctionPage() {
  const cbMetrics = [
    {
      title: 'CB Auctions Today',
      value: '3',
      change: '+1',
      changeType: 'positive' as const,
      icon: Building2
    },
    {
      title: 'Total Allocated',
      value: 'BHD 45.2M',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Weighted Avg Rate',
      value: '4.25%',
      change: '+0.05%',
      changeType: 'neutral' as const,
      icon: TrendingUp
    },
    {
      title: 'Participating Banks',
      value: '14',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    }
  ];

  const cbAuctionData = [
    { auctionId: 'CB001', instrument: 'CB Certificate', maturity: '91 Days', amount: 'BHD 20,000,000', cutoffRate: '4.25%', allotmentRatio: '78%', status: 'Completed', date: '2024-01-18' },
    { auctionId: 'CB002', instrument: 'CB Bill', maturity: '182 Days', amount: 'BHD 15,000,000', cutoffRate: '4.35%', allotmentRatio: '85%', status: 'Completed', date: '2024-01-17' },
    { auctionId: 'CB003', instrument: 'CB Bond', maturity: '1 Year', amount: 'BHD 10,000,000', cutoffRate: '4.45%', allotmentRatio: '92%', status: 'Completed', date: '2024-01-16' },
    { auctionId: 'CB004', instrument: 'CB Certificate', maturity: '28 Days', amount: 'BHD 25,000,000', cutoffRate: '4.15%', allotmentRatio: '65%', status: 'Active', date: '2024-01-18' },
    { auctionId: 'CB005', instrument: 'CB Bill', maturity: '273 Days', amount: 'BHD 12,000,000', cutoffRate: '4.50%', allotmentRatio: '88%', status: 'Pending', date: '2024-01-19' }
  ];

  const instrumentDistribution = [
    { name: 'CB Certificates', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'CB Bills', value: 35, color: 'hsl(var(--chart-2))' },
    { name: 'CB Bonds', value: 20, color: 'hsl(var(--chart-3))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Central Bank Auctions"
        description="Manage Central Bank liquidity management instruments and auctions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cbMetrics.map((metric, index) => (
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
                title: 'Instruments by Type',
                data: instrumentDistribution,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'bar',
                title: 'Monthly Auction Volume',
                data: [
                  { name: 'Jan', value: 180, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 165, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 195, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 210, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 188, color: 'hsl(var(--chart-1))' }
                ],
                height: 400
              }}
            />
          </div>

          <DataTable
            title="Central Bank Auctions"
            data={cbAuctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'instrument', label: 'Instrument' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'amount', label: 'Amount' },
              { key: 'cutoffRate', label: 'Cutoff Rate' },
              { key: 'allotmentRatio', label: 'Allotment Ratio' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'date', label: 'Date', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Completed', 'Pending'] },
              { key: 'instrument', label: 'Instrument', options: ['CB Certificate', 'CB Bill', 'CB Bond'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="cb-auction" systemType="common" />
        </div>
      </div>
    </div>
  );
}