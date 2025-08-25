import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { CreditCard, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PaymentsStatusPage() {
  const paymentMetrics = [
    {
      title: 'Payments Today',
      value: '167',
      change: '+23',
      changeType: 'positive' as const,
      icon: CreditCard
    },
    {
      title: 'Completed',
      value: '148',
      change: '+20',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Pending',
      value: '15',
      change: '+3',
      changeType: 'neutral' as const,
      icon: Clock
    },
    {
      title: 'Failed',
      value: '4',
      change: '0',
      changeType: 'neutral' as const,
      icon: AlertTriangle
    }
  ];

  const paymentsData = [
    { paymentId: 'PAY001', type: 'DvP Settlement', participant: 'NBB', amount: 'BHD 2,500,000', currency: 'BHD', status: 'Completed', initTime: '09:15:22', completionTime: '09:18:45' },
    { paymentId: 'PAY002', type: 'Coupon Payment', participant: 'AUB', amount: 'BHD 185,000', currency: 'BHD', status: 'Pending', initTime: '10:30:15', completionTime: '-' },
    { paymentId: 'PAY003', type: 'Redemption', participant: 'BBK', amount: 'BHD 1,200,000', currency: 'BHD', status: 'Completed', initTime: '11:45:33', completionTime: '11:47:12' },
    { paymentId: 'PAY004', type: 'Dividend', participant: 'BHB', amount: 'BHD 95,000', currency: 'BHD', status: 'Failed', initTime: '13:20:08', completionTime: '-' },
    { paymentId: 'PAY005', type: 'Cross-Border', participant: 'GIB', amount: 'USD 850,000', currency: 'USD', status: 'In Progress', initTime: '14:35:42', completionTime: '-' }
  ];

  const paymentTypeDistribution = [
    { name: 'DvP Settlement', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Corporate Actions', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Cross-Border', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Other', value: 10, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Payments Status"
        description="Monitor payment processing and settlement status"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMetrics.map((metric, index) => (
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
                title: "Payments by Type",
                data: paymentTypeDistribution,
                height: 400
              }}
              pieChartSize="medium"
              className="h-full"
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Payment Processing Time",
                data: [
                  { name: '< 1 min', value: 120, color: 'hsl(var(--chart-1))' },
                  { name: '1-3 min', value: 35, color: 'hsl(var(--chart-2))' },
                  { name: '3-5 min', value: 8, color: 'hsl(var(--chart-3))' },
                  { name: '> 5 min', value: 4, color: 'hsl(var(--chart-4))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Payment Transactions"
            data={paymentsData}
            columns={[
              { key: 'paymentId', label: 'Payment ID' },
              { key: 'type', label: 'Type' },
              { key: 'participant', label: 'Participant' },
              { key: 'amount', label: 'Amount' },
              { key: 'currency', label: 'Currency' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'initTime', label: 'Initiated' },
              { key: 'completionTime', label: 'Completed' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Pending', 'In Progress', 'Completed', 'Failed'] },
              { key: 'type', label: 'Payment Type', options: ['DvP Settlement', 'Coupon Payment', 'Redemption', 'Dividend', 'Cross-Border'] },
              { key: 'currency', label: 'Currency', options: ['BHD', 'USD', 'EUR', 'SAR'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="payments-status" systemType="csd" />
        </div>
      </div>
    </div>
  );
}