import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { TrendingUp, Clock, CheckCircle, DollarSign } from 'lucide-react';

export default function ExchangeTradesSettlementPage() {
  const exchangeMetrics = [
    {
      title: 'Trades Settled',
      value: '156',
      change: '+24',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Settlement Value',
      value: 'BD 78.4M',
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Settlement Time',
      value: '1.8 hrs',
      change: '-0.2 hrs',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Settlement Rate',
      value: '99.2%',
      change: '+0.3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const exchangeTradesData = [
    { tradeId: 'ET001', exchange: 'BSE', security: 'EQUITY-001', buyer: 'NBB Fund', seller: 'AUB Invest', amount: 'BD 850,000', quantity: '10,000', settlementDate: '2024-01-18', status: 'Settled' },
    { tradeId: 'ET002', exchange: 'BSE', security: 'SUKUK-002', buyer: 'BBK Capital', seller: 'BHB Asset', amount: 'BD 1,200,000', quantity: '5,000', settlementDate: '2024-01-18', status: 'Pending' },
    { tradeId: 'ET003', exchange: 'BSE', security: 'BOND-003', buyer: 'GIB', seller: 'SICO', amount: 'BD 2,100,000', quantity: '7,500', settlementDate: '2024-01-17', status: 'Settled' },
    { tradeId: 'ET004', exchange: 'OTC', security: 'GOVT-TB-001', buyer: 'AAIB', seller: 'KFH Bahrain', amount: 'BD 3,500,000', quantity: '15,000', settlementDate: '2024-01-17', status: 'Settled' },
    { tradeId: 'ET005', exchange: 'BSE', security: 'EQUITY-004', buyer: 'Investcorp', seller: 'Al Salam Bank', amount: 'BD 950,000', quantity: '8,200', settlementDate: '2024-01-18', status: 'In Progress' }
  ];

  const exchangeDistribution = [
    { name: 'BSE', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'OTC', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Cross-Listed', value: 10, color: 'hsl(var(--chart-3))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Exchange Trades Settlement"
        description="Monitor settlement of exchange-traded securities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exchangeMetrics.map((metric, index) => (
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
                title: "Settlement by Exchange",
                data: exchangeDistribution,
                height: 300
              }}
              pieChartSize="medium"
              className="h-full"
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Settlement Timeline",
                data: [
                  { name: 'T+0', value: 45, color: 'hsl(var(--chart-1))' },
                  { name: 'T+1', value: 85, color: 'hsl(var(--chart-2))' },
                  { name: 'T+2', value: 26, color: 'hsl(var(--chart-3))' },
                  { name: 'T+3', value: 8, color: 'hsl(var(--chart-4))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Exchange Trade Settlements"
            data={exchangeTradesData}
            columns={[
              { key: 'tradeId', label: 'Trade ID' },
              { key: 'exchange', label: 'Exchange' },
              { key: 'security', label: 'Security' },
              { key: 'buyer', label: 'Buyer' },
              { key: 'seller', label: 'Seller' },
              { key: 'amount', label: 'Amount' },
              { key: 'quantity', label: 'Quantity' },
              { key: 'settlementDate', label: 'Settlement Date', type: 'date' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'exchange', label: 'Exchange', options: ['BSE', 'OTC', 'Cross-Listed'] },
              { key: 'status', label: 'Status', options: ['Pending', 'In Progress', 'Settled'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="exchange-trades-settlement" systemType="csd" />
        </div>
      </div>
    </div>
  );
}