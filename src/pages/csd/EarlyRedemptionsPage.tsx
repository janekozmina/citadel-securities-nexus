import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Zap, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EarlyRedemptionsPage() {
  const earlyRedemptionMetrics = [
    {
      title: 'Early Redemption Requests',
      value: '5',
      change: '+2',
      changeType: 'neutral' as const,
      icon: Zap
    },
    {
      title: 'Total Value',
      value: 'BHD 8.5M',
      change: '+15%',
      changeType: 'neutral' as const,
      icon: DollarSign
    },
    {
      title: 'Pending Approvals',
      value: '3',
      change: '0',
      changeType: 'neutral' as const,
      icon: AlertTriangle
    },
    {
      title: 'Processed This Month',
      value: '12',
      change: '+4',
      changeType: 'positive' as const,
      icon: CheckCircle
    }
  ];

  const earlyRedemptionData = [
    { security: 'GOV-TB-001', issuer: 'Government of Bahrain', requestDate: '2024-01-15', callDate: '2024-01-30', notionalAmount: 'BHD 2,000,000', penalty: 'BHD 50,000', netAmount: 'BHD 1,950,000', status: 'Pending Review' },
    { security: 'CORP-BD-002', issuer: 'National Bank', requestDate: '2024-01-12', callDate: '2024-01-25', notionalAmount: 'BHD 1,500,000', penalty: 'BHD 30,000', netAmount: 'BHD 1,470,000', status: 'Approved' },
    { security: 'SUKUK-ISL-003', issuer: 'Islamic Development Bank', requestDate: '2024-01-18', callDate: '2024-02-01', notionalAmount: 'BHD 3,000,000', penalty: 'BHD 75,000', netAmount: 'BHD 2,925,000', status: 'Under Review' },
    { security: 'GOV-TB-004', issuer: 'Government of Bahrain', requestDate: '2024-01-10', callDate: '2024-01-20', notionalAmount: 'BHD 1,000,000', penalty: 'BHD 20,000', netAmount: 'BHD 980,000', status: 'Processed' },
    { security: 'CORP-BD-005', issuer: 'Bahrain Petroleum', requestDate: '2024-01-20', callDate: '2024-02-05', notionalAmount: 'BHD 1,000,000', penalty: 'BHD 25,000', netAmount: 'BHD 975,000', status: 'Rejected' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Early Redemptions"
        description="Manage early redemption requests and call options"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {earlyRedemptionMetrics.map((metric, index) => (
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
            title="Early Redemption Requests"
            data={earlyRedemptionData}
            columns={[
              { key: 'security', label: 'Security ID' },
              { key: 'issuer', label: 'Issuer' },
              { key: 'requestDate', label: 'Request Date', type: 'date' },
              { key: 'callDate', label: 'Call Date', type: 'date' },
              { key: 'notionalAmount', label: 'Notional Amount' },
              { key: 'penalty', label: 'Penalty' },
              { key: 'netAmount', label: 'Net Amount' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="early-redemptions" systemType="csd" />
        </div>
      </div>
    </div>
  );
}