import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Coins, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export default function CouponRewardPage() {
  const couponMetrics = [
    {
      title: 'Total Coupons Due',
      value: 'BHD 2.8M',
      change: '+5.2%',
      changeType: 'neutral' as const,
      icon: DollarSign
    },
    {
      title: 'Payments Processed',
      value: '45',
      change: '+8',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Upcoming Payments',
      value: '12',
      change: '+3',
      changeType: 'neutral' as const,
      icon: Calendar
    },
    {
      title: 'Total Securities',
      value: '67',
      change: '+2',
      changeType: 'positive' as const,
      icon: Coins
    }
  ];

  const couponData = [
    { security: 'GOV-TB-001', issuer: 'Government of Bahrain', couponRate: '3.50%', paymentDate: '2024-01-20', amount: 'BHD 450,000', status: 'Scheduled' },
    { security: 'CORP-BD-002', issuer: 'National Bank', couponRate: '4.25%', paymentDate: '2024-01-22', amount: 'BHD 320,000', status: 'Pending Approval' },
    { security: 'SUKUK-ISL-003', issuer: 'Islamic Development Bank', couponRate: '2.75%', paymentDate: '2024-01-25', amount: 'BHD 180,000', status: 'Approved' },
    { security: 'GOV-TB-004', issuer: 'Government of Bahrain', couponRate: '3.75%', paymentDate: '2024-01-28', amount: 'BHD 650,000', status: 'Processed' },
    { security: 'CORP-BD-005', issuer: 'Bahrain Petroleum', couponRate: '5.00%', paymentDate: '2024-01-30', amount: 'BHD 280,000', status: 'Scheduled' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Coupon/Reward Processing"
        description="Manage coupon payments and reward distributions for securities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {couponMetrics.map((metric, index) => (
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
            title="Coupon Payment Schedule"
            data={couponData}
            columns={[
              { key: 'security', label: 'Security ID' },
              { key: 'issuer', label: 'Issuer' },
              { key: 'couponRate', label: 'Coupon Rate' },
              { key: 'paymentDate', label: 'Payment Date', type: 'date' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="coupon-reward" systemType="csd" />
        </div>
      </div>
    </div>
  );
}