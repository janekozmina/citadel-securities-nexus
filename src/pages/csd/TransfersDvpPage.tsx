import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ArrowUpDown, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function TransfersDvpPage() {
  const transferMetrics = [
    {
      title: "Today's Transfers",
      value: '45',
      change: '+8',
      changeType: 'positive' as const,
      icon: ArrowUpDown
    },
    {
      title: 'Total Value',
      value: 'BD 28.5M',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Successful DvP',
      value: '42',
      change: '+7',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Avg Processing Time',
      value: '1.8 hrs',
      change: '-0.4 hrs',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const transferData = [
    { transferId: 'DVP001', type: 'DvP', deliverer: 'NBB', receiver: 'AUB', security: 'GOV-TB-001', quantity: '1,000,000', cashAmount: 'BD 2,500,000', status: 'Settled', settlementDate: '2024-01-18' },
    { transferId: 'DVF002', type: 'DvF', deliverer: 'BBK', receiver: 'Al Salam Bank', security: 'CORP-BD-002', quantity: '500,000', cashAmount: 'BD 0', status: 'Pending', settlementDate: '2024-01-19' },
    { transferId: 'DVP003', type: 'DvP', deliverer: 'Islamic Bank', receiver: 'BMMI Bank', security: 'SUKUK-001', quantity: '2,000,000', cashAmount: 'BD 3,200,000', status: 'Processing', settlementDate: '2024-01-19' },
    { transferId: 'DVF004', type: 'DvF', deliverer: 'Investment Bank', receiver: 'NBB', security: 'GOV-TB-003', quantity: '800,000', cashAmount: 'BD 0', status: 'Settled', settlementDate: '2024-01-18' },
    { transferId: 'DVP005', type: 'DvP', deliverer: 'AUB', receiver: 'BBK', security: 'BOND-004', quantity: '1,500,000', cashAmount: 'BD 2,100,000', status: 'Validated', settlementDate: '2024-01-19' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Transfers (DvF / DvP)"
        description="Manage delivery versus payment and delivery versus free transfers"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {transferMetrics.map((metric, index) => (
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
            title="Transfer Instructions"
            data={transferData}
            columns={[
              { key: 'transferId', label: 'Transfer ID' },
              { key: 'type', label: 'Type' },
              { key: 'deliverer', label: 'Deliverer' },
              { key: 'receiver', label: 'Receiver' },
              { key: 'security', label: 'Security' },
              { key: 'quantity', label: 'Quantity' },
              { key: 'cashAmount', label: 'Cash Amount' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlementDate', label: 'Settlement Date', type: 'date' }
            ]}
            searchable
            filters={[
              { key: 'type', label: 'Transfer Type', options: ['DvP', 'DvF'] },
              { key: 'status', label: 'Status', options: ['Settled', 'Pending', 'Processing', 'Validated'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="transfers-dvp" systemType="csd" />
        </div>
      </div>
    </div>
  );
}