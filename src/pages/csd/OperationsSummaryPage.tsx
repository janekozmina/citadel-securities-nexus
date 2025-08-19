import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Building2, DollarSign, Clock, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

export default function OperationsSummaryPage() {
  const operationsMetrics = [
    {
      title: 'Active Facilities',
      value: '6',
      change: '+1',
      changeType: 'positive' as const,
      icon: Building2
    },
    {
      title: 'Total Committed',
      value: 'BHD 1.8B',
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Utilization Rate',
      value: '68%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Avg Processing Time',
      value: '2.3 hrs',
      change: '-0.5 hrs',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const facilityStatusData = [
    { name: 'Active', value: 6, color: 'hsl(var(--chart-1))' },
    { name: 'Scheduled', value: 3, color: 'hsl(var(--chart-2))' },
    { name: 'Under Review', value: 2, color: 'hsl(var(--chart-3))' },
    { name: 'Suspended', value: 1, color: 'hsl(var(--chart-4))' }
  ];

  const utilizationTrendData = [
    { name: 'Jan', value: 62, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', value: 58, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', value: 65, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', value: 71, color: 'hsl(var(--chart-4))' },
    { name: 'May', value: 68, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', value: 73, color: 'hsl(var(--chart-1))' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Scheduled': return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Under Review': return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'Suspended': return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Repo': return 'bg-blue-100 text-blue-800';
      case 'Reverse Repo': return 'bg-green-100 text-green-800';
      case 'Term Deposit': return 'bg-purple-100 text-purple-800';
      case 'Overnight': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const operationsData = [
    {
      facilityId: 'SF-001',
      type: 'Repo',
      participant: 'National Bank of Bahrain',
      amount: 250000000,
      rate: '2.75%',
      maturity: '2025-01-25',
      status: 'Active',
      utilization: '85%',
      collateral: 'Government Bonds'
    },
    {
      facilityId: 'SF-002',
      type: 'Reverse Repo',
      participant: 'Ahli United Bank',
      amount: 180000000,
      rate: '2.85%',
      maturity: '2025-01-22',
      status: 'Active',
      utilization: '72%',
      collateral: 'Treasury Bills'
    },
    {
      facilityId: 'SF-003',
      type: 'Term Deposit',
      participant: 'Arab Banking Corporation',
      amount: 320000000,
      rate: '3.15%',
      maturity: '2025-02-15',
      status: 'Scheduled',
      utilization: '0%',
      collateral: 'Cash'
    },
    {
      facilityId: 'SF-004',
      type: 'Overnight',
      participant: 'BBK Bank',
      amount: 150000000,
      rate: '3.25%',
      maturity: '2025-01-19',
      status: 'Active',
      utilization: '95%',
      collateral: 'Corporate Bonds'
    },
    {
      facilityId: 'SF-005',
      type: 'Repo',
      participant: 'Gulf International Bank',
      amount: 200000000,
      rate: '2.95%',
      maturity: '2025-01-28',
      status: 'Under Review',
      utilization: '45%',
      collateral: 'Government Bonds'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Operations Summary"
        description="Monitor and manage standing facilities operations and utilization"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operationsMetrics.map((metric, index) => (
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
                title: "Facility Status Distribution",
                data: facilityStatusData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "line",
                title: "Monthly Utilization Trend (%)",
                data: utilizationTrendData,
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Standing Facilities Operations"
            data={operationsData}
            columns={[
              { key: 'facilityId', label: 'Facility ID' },
              { key: 'type', label: 'Type' },
              { key: 'participant', label: 'Participant' },
              { key: 'amount', label: 'Amount', type: 'currency' },
              { key: 'rate', label: 'Rate' },
              { key: 'maturity', label: 'Maturity', type: 'date' },
              { key: 'utilization', label: 'Utilization' },
              { key: 'collateral', label: 'Collateral' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="operations-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}