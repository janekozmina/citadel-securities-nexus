import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { CheckCircle, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function SettledTransactionsPage() {
  const settledMetrics = [
    {
      title: 'Settled Today',
      value: '89',
      change: '+12',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Settlement Value',
      value: 'BD 45.6M',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Settlement Time',
      value: '2.1 hrs',
      change: '-0.3 hrs',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Settlement Rate',
      value: '98.7%',
      change: '+0.5%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const settledData = [
    { txnId: 'TXN001', type: 'DvP Transfer', counterparty: 'NBB', amount: 'BD 2,500,000', security: 'GOV-TB-001', settlementDate: '2024-01-18', settlementTime: '14:35:22' },
    { txnId: 'TXN002', type: 'DvF Transfer', counterparty: 'AUB', amount: 'BD 1,800,000', security: 'CORP-BD-002', settlementDate: '2024-01-18', settlementTime: '13:22:15' },
    { txnId: 'TXN003', type: 'Repo Settlement', counterparty: 'BBK', amount: 'BD 3,200,000', security: 'SUKUK-001', settlementDate: '2024-01-18', settlementTime: '16:45:08' },
    { txnId: 'TXN004', type: 'Exchange Trade', counterparty: 'BHB', amount: 'BD 1,500,000', security: 'GOV-TB-003', settlementDate: '2024-01-17', settlementTime: '11:18:42' },
    { txnId: 'TXN005', type: 'Cross-Border', counterparty: 'External CSD', amount: 'BD 2,100,000', security: 'BOND-004', settlementDate: '2024-01-17', settlementTime: '15:30:18' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Settled Transactions"
        description="View completed and settled transactions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {settledMetrics.map((metric, index) => (
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

          <DataTable
            title="Settled Transactions"
            data={settledData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'amount', label: 'Amount' },
              { key: 'security', label: 'Security' },
              { key: 'settlementDate', label: 'Settlement Date', type: 'date' },
              { key: 'settlementTime', label: 'Settlement Time' }
            ]}
            searchable
            filters={[
              { key: 'type', label: 'Transaction Type', options: ['DvP Transfer', 'DvF Transfer', 'Repo Settlement', 'Exchange Trade', 'Cross-Border'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="settled-transactions" systemType="csd" />
        </div>
      </div>
    </div>
  );
}