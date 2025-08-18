import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Clock, AlertTriangle, DollarSign, TrendingDown } from 'lucide-react';

export default function PendingTransactionsPage() {
  const pendingMetrics = [
    {
      title: 'Pending Transactions',
      value: '23',
      change: '+8',
      changeType: 'neutral' as const,
      icon: Clock
    },
    {
      title: 'Total Value',
      value: 'BD 12.8M',
      change: '+2.5M',
      changeType: 'neutral' as const,
      icon: DollarSign
    },
    {
      title: 'Avg Wait Time',
      value: '6.2 hrs',
      change: '+1.1 hrs',
      changeType: 'negative' as const,
      icon: TrendingDown
    },
    {
      title: 'At Risk',
      value: '5',
      change: '+2',
      changeType: 'negative' as const,
      icon: AlertTriangle
    }
  ];

  const pendingData = [
    { txnId: 'TXN010', type: 'DvP Transfer', counterparty: 'BMMI Bank', amount: 'BD 1,200,000', security: 'GOV-TB-005', submitTime: '2024-01-18 09:30', waitTime: '8.5 hrs', reason: 'Insufficient Collateral' },
    { txnId: 'TXN011', type: 'Cross-Border', counterparty: 'External CSD', amount: 'BD 2,800,000', security: 'CORP-BD-006', submitTime: '2024-01-18 11:15', waitTime: '6.3 hrs', reason: 'Awaiting Confirmation' },
    { txnId: 'TXN012', type: 'Exchange Trade', counterparty: 'BHB', amount: 'BD 1,500,000', security: 'SUKUK-002', submitTime: '2024-01-18 13:20', waitTime: '4.2 hrs', reason: 'Settlement Validation' },
    { txnId: 'TXN013', type: 'DvF Transfer', counterparty: 'Islamic Bank', amount: 'BD 3,100,000', security: 'GOV-TB-007', submitTime: '2024-01-18 14:45', waitTime: '2.8 hrs', reason: 'Document Review' },
    { txnId: 'TXN014', type: 'Repo Settlement', counterparty: 'Investment Bank', amount: 'BD 2,200,000', security: 'BOND-008', submitTime: '2024-01-18 15:30', waitTime: '2.1 hrs', reason: 'Counterparty Approval' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Pending Transactions"
        description="Monitor transactions awaiting settlement or approval"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pendingMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
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
            title="Pending Transactions Queue"
            data={pendingData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'amount', label: 'Amount' },
              { key: 'security', label: 'Security' },
              { key: 'submitTime', label: 'Submit Time' },
              { key: 'waitTime', label: 'Wait Time' },
              { key: 'reason', label: 'Pending Reason' }
            ]}
            searchable
            filters={[
              { key: 'type', label: 'Transaction Type', options: ['DvP Transfer', 'DvF Transfer', 'Cross-Border', 'Exchange Trade', 'Repo Settlement'] },
              { key: 'reason', label: 'Pending Reason', options: ['Insufficient Collateral', 'Awaiting Confirmation', 'Settlement Validation', 'Document Review', 'Counterparty Approval'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="pending-transactions" systemType="csd" />
        </div>
      </div>
    </div>
  );
}