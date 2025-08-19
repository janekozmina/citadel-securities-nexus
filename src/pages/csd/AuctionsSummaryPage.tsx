import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Gavel, DollarSign, Users, Clock, TrendingUp, Calendar } from 'lucide-react';

export default function AuctionsSummaryPage() {
  const auctionMetrics = [
    {
      title: 'Active Auctions',
      value: '3',
      change: '+1',
      changeType: 'positive' as const,
      icon: Gavel
    },
    {
      title: 'Total Bid Amount',
      value: 'BHD 2.8B',
      change: '+15%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Participating Banks',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Avg Completion Time',
      value: '45 min',
      change: '-8 min',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const auctionStatusData = [
    { name: 'Live Auctions', value: 3, color: 'hsl(var(--chart-1))' },
    { name: 'Scheduled', value: 5, color: 'hsl(var(--chart-2))' },
    { name: 'Completed Today', value: 2, color: 'hsl(var(--chart-3))' },
    { name: 'Cancelled', value: 1, color: 'hsl(var(--chart-4))' }
  ];

  const auctionVolumeData = [
    { name: 'Jan', value: 2.1, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', value: 2.5, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', value: 2.8, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', value: 3.2, color: 'hsl(var(--chart-4))' },
    { name: 'May', value: 2.9, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', value: 3.4, color: 'hsl(var(--chart-1))' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Live': return <Badge className="bg-green-100 text-green-800">Live</Badge>;
      case 'Scheduled': return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Completed': return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const auctionData = [
    {
      auctionId: 'AUC-2025-001',
      instrument: 'Treasury Bills 91-Day',
      targetAmount: 500000000,
      bidAmount: 720000000,
      coverageRatio: '1.44x',
      cutoffRate: '2.85%',
      participants: 8,
      status: 'Live',
      maturityDate: '2025-04-19'
    },
    {
      auctionId: 'AUC-2025-002',
      instrument: 'Government Bonds 5-Year',
      targetAmount: 300000000,
      bidAmount: 445000000,
      coverageRatio: '1.48x',
      cutoffRate: '3.15%',
      participants: 6,
      status: 'Live',
      maturityDate: '2030-01-18'
    },
    {
      auctionId: 'AUC-2025-003',
      instrument: 'Islamic Sukuk 2-Year',
      targetAmount: 200000000,
      bidAmount: 280000000,
      coverageRatio: '1.40x',
      cutoffRate: '2.95%',
      participants: 5,
      status: 'Scheduled',
      maturityDate: '2027-01-20'
    },
    {
      auctionId: 'AUC-2024-089',
      instrument: 'Treasury Bills 182-Day',
      targetAmount: 400000000,
      bidAmount: 590000000,
      coverageRatio: '1.48x',
      cutoffRate: '2.75%',
      participants: 9,
      status: 'Completed',
      maturityDate: '2025-07-17'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Auctions Summary"
        description="Monitor and manage open market operations auctions and bidding processes"
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
                type: "pie",
                title: "Auction Status Distribution",
                data: auctionStatusData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Monthly Auction Volume (BHD Billions)",
                data: auctionVolumeData,
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Active and Scheduled Auctions"
            data={auctionData}
            columns={[
              { key: 'auctionId', label: 'Auction ID' },
              { key: 'instrument', label: 'Instrument' },
              { key: 'targetAmount', label: 'Target Amount', type: 'currency' },
              { key: 'bidAmount', label: 'Total Bids', type: 'currency' },
              { key: 'coverageRatio', label: 'Coverage' },
              { key: 'cutoffRate', label: 'Cut-off Rate' },
              { key: 'participants', label: 'Participants' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'maturityDate', label: 'Maturity', type: 'date' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="auctions-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}