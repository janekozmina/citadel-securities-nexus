import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Shield, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export default function ClearingManagerPage() {
  const clearingMetrics = [
    {
      title: 'Cleared Today',
      value: '234',
      change: '+18',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Clearing Rate',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Clear Time',
      value: '45 min',
      change: '-5 min',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Risk Exposures',
      value: '12',
      change: '-2',
      changeType: 'positive' as const,
      icon: Shield
    }
  ];

  const clearingData = [
    { clearingId: 'CLR001', member: 'NBB', trade: 'EQUITY-001', amount: 'BD 2,500,000', margin: 'BD 125,000', status: 'Cleared', clearingTime: '14:25:12', riskScore: 'Low' },
    { clearingId: 'CLR002', member: 'AUB', trade: 'BOND-002', amount: 'BD 1,800,000', margin: 'BD 180,000', status: 'Pending', clearingTime: '-', riskScore: 'Medium' },
    { clearingId: 'CLR003', member: 'BBK', trade: 'SUKUK-003', amount: 'BD 3,200,000', margin: 'BD 160,000', status: 'Cleared', clearingTime: '13:45:33', riskScore: 'Low' },
    { clearingId: 'CLR004', member: 'BHB', trade: 'GOVT-TB', amount: 'BD 5,000,000', margin: 'BD 250,000', status: 'Cleared', clearingTime: '15:10:08', riskScore: 'Very Low' },
    { clearingId: 'CLR005', member: 'GIB', trade: 'EQUITY-004', amount: 'BD 1,200,000', margin: 'BD 120,000', status: 'Risk Review', clearingTime: '-', riskScore: 'High' }
  ];

  const memberDistribution = [
    { name: 'Tier 1 Members', value: 55, color: 'hsl(var(--chart-1))' },
    { name: 'Tier 2 Members', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'Tier 3 Members', value: 15, color: 'hsl(var(--chart-3))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Clearing Manager"
        description="Monitor and manage clearing operations and member activities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clearingMetrics.map((metric, index) => (
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
                title: "Clearing by Member Tier",
                data: memberDistribution,
                height: 300
              }}
              pieChartSize="medium"
              className="h-full"
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Daily Clearing Volume",
                data: [
                  { name: 'Mon', value: 180, color: 'hsl(var(--chart-1))' },
                  { name: 'Tue', value: 220, color: 'hsl(var(--chart-2))' },
                  { name: 'Wed', value: 195, color: 'hsl(var(--chart-3))' },
                  { name: 'Thu', value: 234, color: 'hsl(var(--chart-4))' },
                  { name: 'Fri', value: 205, color: 'hsl(var(--chart-1))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Clearing Operations"
            data={clearingData}
            columns={[
              { key: 'clearingId', label: 'Clearing ID' },
              { key: 'member', label: 'Member' },
              { key: 'trade', label: 'Trade Reference' },
              { key: 'amount', label: 'Trade Value' },
              { key: 'margin', label: 'Margin Required' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'clearingTime', label: 'Clearing Time' },
              { key: 'riskScore', label: 'Risk Score' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Pending', 'Cleared', 'Risk Review', 'Failed'] },
              { key: 'riskScore', label: 'Risk Score', options: ['Very Low', 'Low', 'Medium', 'High'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="clearing-manager" systemType="csd" />
        </div>
      </div>
    </div>
  );
}