import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ArrowUpDown, DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function TransactionsSummaryPage() {
  const transactionMetrics = [
    {
      title: 'Total Transactions',
      value: '1,234',
      change: '+45',
      changeType: 'positive' as const,
      icon: ArrowUpDown
    },
    {
      title: 'Transaction Value',
      value: 'BD 125.8M',
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Settlement Rate',
      value: '98.2%',
      change: '+0.3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Settlement Time',
      value: '2.4 hrs',
      change: '-0.2 hrs',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const transactionData = [
    { txnId: 'TXN001', type: 'DvP Transfer', counterparty: 'NBB', amount: 'BD 2,500,000', security: 'GOV-TB-001', status: 'Settled', settlementDate: '2024-01-18' },
    { txnId: 'TXN002', type: 'Cross-Border', counterparty: 'External CSD', amount: 'BD 1,800,000', security: 'CORP-BD-002', status: 'Pending', settlementDate: '2024-01-19' },
    { txnId: 'TXN003', type: 'Exchange Trade', counterparty: 'BHB', amount: 'BD 3,200,000', security: 'SUKUK-001', status: 'Processing', settlementDate: '2024-01-19' },
    { txnId: 'TXN004', type: 'DvF Transfer', counterparty: 'AUB', amount: 'BD 1,500,000', security: 'GOV-TB-003', status: 'Settled', settlementDate: '2024-01-18' },
    { txnId: 'TXN005', type: 'Repo Settlement', counterparty: 'BBK', amount: 'BD 2,100,000', security: 'BOND-004', status: 'Failed', settlementDate: '2024-01-18' }
  ];

  const statusDistribution = [
    { name: 'Settled', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'Pending', value: 20, color: 'hsl(var(--chart-2))' },
    { name: 'Processing', value: 12, color: 'hsl(var(--chart-3))' },
    { name: 'Failed', value: 3, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Transactions Summary"
        description="Overview of all transaction activities and settlement status"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {transactionMetrics.map((metric, index) => (
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
                title: "Transaction Status Distribution",
                data: statusDistribution,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Transaction Volume by Type",
                data: [
                  { name: 'DvP', value: 45, color: 'hsl(var(--chart-1))' },
                  { name: 'DvF', value: 25, color: 'hsl(var(--chart-2))' },
                  { name: 'Cross-Border', value: 15, color: 'hsl(var(--chart-3))' },
                  { name: 'Exchange', value: 15, color: 'hsl(var(--chart-4))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Recent Transactions"
            data={transactionData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'amount', label: 'Amount' },
              { key: 'security', label: 'Security' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlementDate', label: 'Settlement Date', type: 'date' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="transactions-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}