import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Lock, AlertTriangle, CheckCircle, Activity, BarChart3, Users } from 'lucide-react';

export default function LimitsSummaryPage() {
  const limitsMetrics = [
    {
      title: 'Active Limits',
      value: '24',
      change: '+2',
      changeType: 'positive' as const,
      icon: Lock
    },
    {
      title: 'Limit Breaches',
      value: '3',
      change: '-1',
      changeType: 'positive' as const,
      icon: AlertTriangle
    },
    {
      title: 'Avg Utilization',
      value: '72%',
      change: '+5%',
      changeType: 'neutral' as const,
      icon: BarChart3
    },
    {
      title: 'Compliant Participants',
      value: '89%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: CheckCircle
    }
  ];

  const limitStatusData = [
    { name: 'Within Limits', value: 18, color: 'hsl(var(--chart-1))' },
    { name: 'Near Threshold', value: 3, color: 'hsl(var(--chart-2))' },
    { name: 'Breached', value: 3, color: 'hsl(var(--chart-3))' },
    { name: 'Suspended', value: 0, color: 'hsl(var(--chart-4))' }
  ];

  const utilizationTrendData = [
    { name: 'Jan', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', value: 68, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', value: 70, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', value: 73, color: 'hsl(var(--chart-4))' },
    { name: 'May', value: 71, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', value: 72, color: 'hsl(var(--chart-1))' }
  ];

  const getStatusBadge = (utilization: number) => {
    if (utilization >= 95) return <Badge variant="destructive">Breached</Badge>;
    if (utilization >= 85) return <Badge className="bg-yellow-100 text-yellow-800">Near Threshold</Badge>;
    return <Badge className="bg-green-100 text-green-800">Within Limits</Badge>;
  };

  const getLimitTypeColor = (type: string) => {
    switch (type) {
      case 'Credit': return 'bg-blue-100 text-blue-800';
      case 'Liquidity': return 'bg-green-100 text-green-800';
      case 'Exposure': return 'bg-purple-100 text-purple-800';
      case 'Settlement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const limitsData = [
    {
      participantId: 'NBB001',
      participantName: 'National Bank of Bahrain',
      limitType: 'Credit',
      limitAmount: 500000000,
      utilizedAmount: 425000000,
      utilization: 85,
      remainingLimit: 75000000,
      lastUpdate: '2025-01-18 14:30',
      status: 'Near Threshold'
    },
    {
      participantId: 'AUB002',
      participantName: 'Ahli United Bank',
      limitType: 'Liquidity',
      limitAmount: 400000000,
      utilizedAmount: 380000000,
      utilization: 95,
      remainingLimit: 20000000,
      lastUpdate: '2025-01-18 15:15',
      status: 'Breached'
    },
    {
      participantId: 'ABC003',
      participantName: 'Arab Banking Corporation',
      limitType: 'Exposure',
      limitAmount: 350000000,
      utilizedAmount: 245000000,
      utilization: 70,
      remainingLimit: 105000000,
      lastUpdate: '2025-01-18 13:45',
      status: 'Within Limits'
    },
    {
      participantId: 'BBK004',
      participantName: 'BBK Bank',
      limitType: 'Settlement',
      limitAmount: 300000000,
      utilizedAmount: 285000000,
      utilization: 95,
      remainingLimit: 15000000,
      lastUpdate: '2025-01-18 16:20',
      status: 'Breached'
    },
    {
      participantId: 'GIB005',
      participantName: 'Gulf International Bank',
      limitType: 'Credit',
      limitAmount: 450000000,
      utilizedAmount: 315000000,
      utilization: 70,
      remainingLimit: 135000000,
      lastUpdate: '2025-01-18 12:10',
      status: 'Within Limits'
    },
    {
      participantId: 'BIB006',
      participantName: 'Bahrain Islamic Bank',
      limitType: 'Liquidity',
      limitAmount: 280000000,
      utilizedAmount: 238000000,
      utilization: 85,
      remainingLimit: 42000000,
      lastUpdate: '2025-01-18 14:50',
      status: 'Near Threshold'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Limits Summary"
        description="Monitor participant limits, utilization, and compliance across all limit types"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {limitsMetrics.map((metric, index) => (
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
                title: "Limit Status Distribution",
                data: limitStatusData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "line",
                title: "Monthly Average Utilization (%)",
                data: utilizationTrendData,
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Participant Limits Status"
            data={limitsData}
            columns={[
              { key: 'participantId', label: 'Participant ID' },
              { key: 'participantName', label: 'Participant Name' },
              { key: 'limitType', label: 'Limit Type' },
              { key: 'limitAmount', label: 'Limit Amount', type: 'currency' },
              { key: 'utilizedAmount', label: 'Utilized', type: 'currency' },
              { key: 'utilization', label: 'Utilization %' },
              { key: 'remainingLimit', label: 'Remaining', type: 'currency' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'lastUpdate', label: 'Last Update', type: 'date' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="limits-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}