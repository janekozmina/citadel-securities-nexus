import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { CheckCircle, AlertTriangle, XCircle, Clock, FileCheck, Activity } from 'lucide-react';

export default function TransactionReconciliationPage() {
  const reconciliationMetrics = [
    {
      title: 'Total Transactions',
      value: '1,247',
      change: '+89',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Reconciled',
      value: '1,198',
      change: '+85',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Pending',
      value: '35',
      change: '+4',
      changeType: 'neutral' as const,
      icon: Clock
    },
    {
      title: 'Failed',
      value: '14',
      change: '0',
      changeType: 'positive' as const,
      icon: XCircle
    }
  ];

  const reconciliationStatusData = [
    { name: 'Reconciled', value: 1198, color: 'hsl(var(--chart-1))' },
    { name: 'Pending', value: 35, color: 'hsl(var(--chart-2))' },
    { name: 'Failed', value: 14, color: 'hsl(var(--chart-3))' }
  ];

  const dailyReconciliationData = [
    { name: 'Mon', reconciled: 245, pending: 8, failed: 3, color: 'hsl(var(--chart-1))' },
    { name: 'Tue', reconciled: 267, pending: 6, failed: 2, color: 'hsl(var(--chart-2))' },
    { name: 'Wed', reconciled: 198, pending: 12, failed: 4, color: 'hsl(var(--chart-3))' },
    { name: 'Thu', reconciled: 234, pending: 5, failed: 3, color: 'hsl(var(--chart-4))' },
    { name: 'Fri', reconciled: 254, pending: 4, failed: 2, color: 'hsl(var(--chart-5))' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reconciled': return <Badge className="bg-green-100 text-green-800">Reconciled</Badge>;
      case 'Pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Failed': return <Badge variant="destructive">Failed</Badge>;
      case 'In Progress': return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Settlement': return 'bg-blue-100 text-blue-800';
      case 'Payment': return 'bg-green-100 text-green-800';
      case 'Trade': return 'bg-purple-100 text-purple-800';
      case 'Transfer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const reconciliationData = [
    {
      transactionId: 'TXN-2025-001247',
      type: 'Settlement',
      participant: 'National Bank of Bahrain',
      amount: 2500000,
      timestamp: '2025-01-18 15:45:23',
      status: 'Reconciled',
      reconciliationTime: '2025-01-18 15:47:12',
      variance: 0,
      reference: 'STL-NBB-001247'
    },
    {
      transactionId: 'TXN-2025-001246',
      type: 'Payment',
      participant: 'Ahli United Bank',
      amount: 850000,
      timestamp: '2025-01-18 15:42:18',
      status: 'Pending',
      reconciliationTime: null,
      variance: null,
      reference: 'PAY-AUB-001246'
    },
    {
      transactionId: 'TXN-2025-001245',
      type: 'Trade',
      participant: 'Arab Banking Corporation',
      amount: 1750000,
      timestamp: '2025-01-18 15:38:45',
      status: 'Failed',
      reconciliationTime: '2025-01-18 15:41:22',
      variance: 25000,
      reference: 'TRD-ABC-001245'
    },
    {
      transactionId: 'TXN-2025-001244',
      type: 'Transfer',
      participant: 'BBK Bank',
      amount: 320000,
      timestamp: '2025-01-18 15:35:12',
      status: 'Reconciled',
      reconciliationTime: '2025-01-18 15:36:45',
      variance: 0,
      reference: 'TRF-BBK-001244'
    },
    {
      transactionId: 'TXN-2025-001243',
      type: 'Settlement',
      participant: 'Gulf International Bank',
      amount: 4200000,
      timestamp: '2025-01-18 15:32:08',
      status: 'In Progress',
      reconciliationTime: null,
      variance: null,
      reference: 'STL-GIB-001243'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Transaction Reconciliation"
        description="Monitor and manage transaction reconciliation processes and status"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reconciliationMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
                      }`}>
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
                title: "Reconciliation Status Distribution",
                data: reconciliationStatusData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Daily Reconciliation Summary",
                data: dailyReconciliationData.map(item => ({ 
                  name: item.name, 
                  value: item.reconciled, 
                  color: item.color 
                })),
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Recent Transaction Reconciliation"
            data={reconciliationData}
            columns={[
              { key: 'transactionId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'participant', label: 'Participant' },
              { key: 'amount', label: 'Amount', type: 'currency' },
              { key: 'timestamp', label: 'Transaction Time', type: 'date' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'reconciliationTime', label: 'Reconciled At', type: 'date' },
              { key: 'variance', label: 'Variance', type: 'currency' },
              { key: 'reference', label: 'Reference' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="transaction-reconciliation" systemType="csd" />
        </div>
      </div>
    </div>
  );
}