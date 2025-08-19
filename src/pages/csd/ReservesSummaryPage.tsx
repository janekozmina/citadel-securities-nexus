import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Vault, DollarSign, Percent, TrendingUp, Activity, Shield } from 'lucide-react';

export default function ReservesSummaryPage() {
  const reserveMetrics = [
    {
      title: 'Total Reserves',
      value: 'BHD 4.2B',
      change: '+3.5%',
      changeType: 'positive' as const,
      icon: Vault
    },
    {
      title: 'Required Reserves',
      value: 'BHD 3.8B',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Shield
    },
    {
      title: 'Reserve Ratio',
      value: '12.5%',
      change: 'Stable',
      changeType: 'neutral' as const,
      icon: Percent
    },
    {
      title: 'Excess Reserves',
      value: 'BHD 400M',
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const reserveTypeData = [
    { name: 'Cash Reserves', value: 60, color: 'hsl(var(--chart-1))' },
    { name: 'Government Securities', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Foreign Exchange', value: 10, color: 'hsl(var(--chart-3))' },
    { name: 'Other Assets', value: 5, color: 'hsl(var(--chart-4))' }
  ];

  const reserveTrendData = [
    { name: 'Jan', required: 3.5, actual: 3.8, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', required: 3.6, actual: 3.9, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', required: 3.7, actual: 4.0, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', required: 3.8, actual: 4.1, color: 'hsl(var(--chart-4))' },
    { name: 'May', required: 3.8, actual: 4.2, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', required: 3.8, actual: 4.2, color: 'hsl(var(--chart-1))' }
  ];

  const getComplianceStatus = (ratio: number) => {
    if (ratio >= 1.05) return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
    if (ratio >= 1.0) return <Badge className="bg-yellow-100 text-yellow-800">Marginal</Badge>;
    return <Badge variant="destructive">Non-Compliant</Badge>;
  };

  const reserveData = [
    {
      bankName: 'National Bank of Bahrain',
      totalDeposits: 8500000000,
      requiredReserves: 1062500000,
      actualReserves: 1150000000,
      excessDeficit: 87500000,
      complianceRatio: 1.082,
      status: 'Compliant',
      lastUpdate: '2025-01-18'
    },
    {
      bankName: 'Ahli United Bank',
      totalDeposits: 6200000000,
      requiredReserves: 775000000,
      actualReserves: 820000000,
      excessDeficit: 45000000,
      complianceRatio: 1.058,
      status: 'Compliant',
      lastUpdate: '2025-01-18'
    },
    {
      bankName: 'Arab Banking Corporation',
      totalDeposits: 5800000000,
      requiredReserves: 725000000,
      actualReserves: 730000000,
      excessDeficit: 5000000,
      complianceRatio: 1.007,
      status: 'Marginal',
      lastUpdate: '2025-01-18'
    },
    {
      bankName: 'BBK Bank',
      totalDeposits: 4100000000,
      requiredReserves: 512500000,
      actualReserves: 495000000,
      excessDeficit: -17500000,
      complianceRatio: 0.966,
      status: 'Non-Compliant',
      lastUpdate: '2025-01-18'
    },
    {
      bankName: 'Gulf International Bank',
      totalDeposits: 3900000000,
      requiredReserves: 487500000,
      actualReserves: 520000000,
      excessDeficit: 32500000,
      complianceRatio: 1.067,
      status: 'Compliant',
      lastUpdate: '2025-01-18'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Reserves Summary"
        description="Monitor bank reserve requirements and compliance across the financial system"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reserveMetrics.map((metric, index) => (
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
                title: "Reserve Composition (%)",
                data: reserveTypeData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Required vs Actual Reserves (BHD Billions)",
                data: reserveTrendData.map(item => ({ 
                  name: item.name, 
                  value: item.actual, 
                  color: item.color 
                })),
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Bank Reserve Compliance Status"
            data={reserveData}
            columns={[
              { key: 'bankName', label: 'Bank Name' },
              { key: 'totalDeposits', label: 'Total Deposits', type: 'currency' },
              { key: 'requiredReserves', label: 'Required Reserves', type: 'currency' },
              { key: 'actualReserves', label: 'Actual Reserves', type: 'currency' },
              { key: 'excessDeficit', label: 'Excess/Deficit', type: 'currency' },
              { key: 'complianceRatio', label: 'Compliance Ratio' },
              { key: 'status', label: 'Status', type: 'custom',
                render: (value, row) => getComplianceStatus(row.complianceRatio) },
              { key: 'lastUpdate', label: 'Last Update', type: 'date' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="reserves-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}