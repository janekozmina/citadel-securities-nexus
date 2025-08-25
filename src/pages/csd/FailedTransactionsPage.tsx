import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { XCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

export default function FailedTransactionsPage() {
  const failedMetrics = [
    {
      title: 'Failed Today',
      value: '7',
      change: '+2',
      changeType: 'negative' as const,
      icon: XCircle
    },
    {
      title: 'Under Investigation',
      value: '3',
      change: '0',
      changeType: 'neutral' as const,
      icon: AlertTriangle
    },
    {
      title: 'Avg Resolution Time',
      value: '12.4 hrs',
      change: '-2.1 hrs',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Retry Attempts',
      value: '15',
      change: '+8',
      changeType: 'neutral' as const,
      icon: RefreshCw
    }
  ];

  const failedData = [
    { txnId: 'TXN020', type: 'DvP Transfer', counterparty: 'Test Bank', amount: 'BHD 800,000', security: 'GOV-TB-010', failTime: '2024-01-18 16:30', reason: 'Insufficient Securities', retryCount: 2, status: 'Under Review' },
    { txnId: 'TXN021', type: 'Cross-Border', counterparty: 'External CSD', amount: 'BHD 1,200,000', security: 'CORP-BD-011', failTime: '2024-01-18 14:15', reason: 'Network Timeout', retryCount: 3, status: 'Retry Scheduled' },
    { txnId: 'TXN022', type: 'Exchange Trade', counterparty: 'BHB', amount: 'BHD 2,500,000', security: 'SUKUK-003', failTime: '2024-01-18 11:45', reason: 'Invalid Instruction', retryCount: 1, status: 'Investigation' },
    { txnId: 'TXN023', type: 'Repo Settlement', counterparty: 'Investment Corp', amount: 'BHD 1,800,000', security: 'BOND-012', failTime: '2024-01-17 15:20', reason: 'Settlement Cut-off', retryCount: 0, status: 'Manual Review' },
    { txnId: 'TXN024', type: 'DvF Transfer', counterparty: 'Islamic Finance', amount: 'BHD 900,000', security: 'GOV-TB-013', failTime: '2024-01-17 13:10', reason: 'Duplicate Transaction', retryCount: 1, status: 'Resolved' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Failed Transactions"
        description="Monitor and resolve failed transaction attempts"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {failedMetrics.map((metric, index) => (
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

          <DataTable
            title="Failed Transactions"
            data={failedData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'amount', label: 'Amount' },
              { key: 'security', label: 'Security' },
              { key: 'failTime', label: 'Fail Time' },
              { key: 'reason', label: 'Failure Reason' },
              { key: 'retryCount', label: 'Retry Count' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Under Review', 'Retry Scheduled', 'Investigation', 'Manual Review', 'Resolved'] },
              { key: 'reason', label: 'Failure Reason', options: ['Insufficient Securities', 'Network Timeout', 'Invalid Instruction', 'Settlement Cut-off', 'Duplicate Transaction'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="failed-transactions" systemType="csd" />
        </div>
      </div>
    </div>
  );
}