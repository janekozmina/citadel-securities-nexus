import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Globe, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CrossBorderSettlementPage() {
  const crossBorderMetrics = [
    {
      title: 'Active Cross-Border',
      value: '12',
      change: '+3',
      changeType: 'neutral' as const,
      icon: Globe
    },
    {
      title: 'Settled Today',
      value: '8',
      change: '+2',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Avg Settlement Time',
      value: '4.2 hrs',
      change: '+0.8 hrs',
      changeType: 'negative' as const,
      icon: Clock
    },
    {
      title: 'Pending Approval',
      value: '3',
      change: '0',
      changeType: 'neutral' as const,
      icon: AlertTriangle
    }
  ];

  const crossBorderData = [
    { txnId: 'CBT001', counterparty: 'Euroclear', security: 'INT-BOND-001', amount: 'USD 5,000,000', status: 'In Progress', csd: 'Euroclear Bank', country: 'Belgium', initTime: '09:15:22' },
    { txnId: 'CBT002', counterparty: 'Clearstream', security: 'EUR-BOND-002', amount: 'EUR 3,200,000', status: 'Settled', csd: 'Clearstream Banking', country: 'Luxembourg', initTime: '10:30:45' },
    { txnId: 'CBT003', counterparty: 'DTC', security: 'US-TREASURY', amount: 'USD 2,800,000', status: 'Pending', csd: 'Depository Trust Company', country: 'USA', initTime: '11:45:12' },
    { txnId: 'CBT004', counterparty: 'Euroclear', security: 'CORP-BOND', amount: 'EUR 1,500,000', status: 'In Progress', csd: 'Euroclear Bank', country: 'Belgium', initTime: '13:20:08' },
    { txnId: 'CBT005', counterparty: 'CDS Canada', security: 'CAD-GOVT', amount: 'CAD 4,100,000', status: 'Settled', csd: 'CDS Clearing', country: 'Canada', initTime: '14:55:33' }
  ];

  const regionDistribution = [
    { name: 'Europe', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'North America', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'Asia Pacific', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Middle East', value: 10, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Cross-Border Settlement"
        description="Monitor and manage cross-border securities settlement transactions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {crossBorderMetrics.map((metric, index) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              config={{
                type: "pie",
                title: "Settlement by Region",
                data: regionDistribution,
                height: 400
              }}
              pieChartSize="medium"
              className="h-full"
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Daily Settlement Volume",
                data: [
                  { name: 'Mon', value: 15, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 22, color: 'hsl(var(--chart-2))' },
                  { name: 'Wed', value: 18, color: 'hsl(var(--chart-3))' },
                  { name: 'Thu', value: 28, color: 'hsl(var(--chart-4))' },
                  { name: 'Fri', value: 24, color: 'hsl(var(--chart-1))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Cross-Border Transactions"
            data={crossBorderData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'counterparty', label: 'Counterparty CSD' },
              { key: 'security', label: 'Security' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'country', label: 'Country' },
              { key: 'initTime', label: 'Initiation Time' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Pending', 'In Progress', 'Settled', 'Failed'] },
              { key: 'country', label: 'Country', options: ['Belgium', 'Luxembourg', 'USA', 'Canada'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="cross-border-settlement" systemType="csd" />
        </div>
      </div>
    </div>
  );
}