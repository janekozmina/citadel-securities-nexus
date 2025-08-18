import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { RefreshCw, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export default function RedemptionsPage() {
  const redemptionMetrics = [
    {
      title: 'Total Redemptions',
      value: 'BD 15.2M',
      change: '+8.5%',
      changeType: 'neutral' as const,
      icon: DollarSign
    },
    {
      title: 'Processed Today',
      value: '8',
      change: '+3',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Scheduled',
      value: '15',
      change: '+2',
      changeType: 'neutral' as const,
      icon: Calendar
    },
    {
      title: 'Matured Securities',
      value: '23',
      change: '+5',
      changeType: 'neutral' as const,
      icon: RefreshCw
    }
  ];

  const redemptionData = [
    { security: 'GOV-TB-001', issuer: 'Government of Bahrain', maturityDate: '2024-01-20', redemptionAmount: 'BD 5,000,000', principal: 'BD 5,000,000', interest: 'BD 125,000', status: 'Matured' },
    { security: 'CORP-BD-002', issuer: 'National Bank', maturityDate: '2024-01-25', redemptionAmount: 'BD 2,500,000', principal: 'BD 2,500,000', interest: 'BD 85,000', status: 'Scheduled' },
    { security: 'GOV-TB-003', issuer: 'Government of Bahrain', maturityDate: '2024-01-28', redemptionAmount: 'BD 3,200,000', principal: 'BD 3,200,000', interest: 'BD 96,000', status: 'Processing' },
    { security: 'SUKUK-ISL-004', issuer: 'Islamic Development Bank', maturityDate: '2024-01-30', redemptionAmount: 'BD 1,800,000', principal: 'BD 1,800,000', interest: 'BD 45,000', status: 'Approved' },
    { security: 'CORP-BD-005', issuer: 'Bahrain Petroleum', maturityDate: '2024-02-02', redemptionAmount: 'BD 2,700,000', principal: 'BD 2,700,000', interest: 'BD 108,000', status: 'Pending' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Redemptions"
        description="Manage security redemptions and maturity processing"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {redemptionMetrics.map((metric, index) => (
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
            title="Redemption Schedule"
            data={redemptionData}
            columns={[
              { key: 'security', label: 'Security ID' },
              { key: 'issuer', label: 'Issuer' },
              { key: 'maturityDate', label: 'Maturity Date', type: 'date' },
              { key: 'redemptionAmount', label: 'Total Amount' },
              { key: 'principal', label: 'Principal' },
              { key: 'interest', label: 'Interest' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="redemptions" systemType="csd" />
        </div>
      </div>
    </div>
  );
}