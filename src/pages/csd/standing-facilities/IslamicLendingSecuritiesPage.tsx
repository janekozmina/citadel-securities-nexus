import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ShieldCheck, TrendingUp, Users, Activity } from 'lucide-react';

export default function IslamicLendingSecuritiesPage() {
  const isliMetrics = [
    {
      title: 'Total ISLI Volume',
      value: 'BHD 128.5M',
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: ShieldCheck
    },
    {
      title: 'Active Facilities',
      value: '15',
      change: '+3',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Average Return',
      value: '4.65%',
      change: '+0.25%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Participating Banks',
      value: '9',
      change: '+1',
      changeType: 'positive' as const,
      icon: Users
    }
  ];

  const isliData = [
    { facilityId: 'ISLI001', bank: 'Al Salam Bank', amount: 'BHD 25,000,000', return: '4.65%', collateral: 'Sukuk Government', maturity: '30 Days', status: 'Active' },
    { facilityId: 'ISLI002', bank: 'Ithmaar Bank', amount: 'BHD 18,500,000', return: '4.70%', collateral: 'Sukuk Corporate', maturity: '14 Days', status: 'Active' },
    { facilityId: 'ISLI003', bank: 'ABC Islamic Bank', amount: 'BHD 32,750,000', return: '4.60%', collateral: 'Islamic Bonds', maturity: '60 Days', status: 'Pending' },
    { facilityId: 'ISLI004', bank: 'Gulf Finance House', amount: 'BHD 22,200,000', return: '4.55%', collateral: 'Sukuk Government', maturity: '21 Days', status: 'Active' },
    { facilityId: 'ISLI005', bank: 'Khaleeji Commercial Bank', amount: 'BHD 15,900,000', return: '4.75%', collateral: 'Sukuk Corporate', maturity: '7 Days', status: 'Maturing' }
  ];

  const collateralTypes = [
    { name: 'Sukuk Government', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Sukuk Corporate', value: 35, color: 'hsl(var(--chart-2))' },
    { name: 'Islamic Bonds', value: 20, color: 'hsl(var(--chart-3))' }
  ];

  const riskProfile = [
    { name: 'Low Risk', value: 60, color: 'hsl(var(--chart-1))' },
    { name: 'Medium Risk', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'Medium-High Risk', value: 10, color: 'hsl(var(--chart-3))' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Islamic Lending against Securities (ISLI)"
        description="Manage Sharia-compliant securities lending facilities and collateral management"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isliMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
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
                type: 'pie',
                title: 'Collateral Types',
                data: collateralTypes,
                height: 400
              }}
              pieChartSize="medium"
            />

            <InteractiveChart
              config={{
                type: 'pie',
                title: 'Risk Profile Distribution',
                data: riskProfile,
                height: 400
              }}
              pieChartSize="medium"
            />
          </div>

          <DataTable
            title="ISLI Facility Transactions"
            data={isliData}
            columns={[
              { key: 'facilityId', label: 'Facility ID' },
              { key: 'bank', label: 'Islamic Bank' },
              { key: 'amount', label: 'Amount' },
              { key: 'return', label: 'Expected Return' },
              { key: 'collateral', label: 'Collateral Type' },
              { key: 'maturity', label: 'Maturity' },
              { key: 'status', label: 'Status', type: 'status' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Maturing', 'Matured'] },
              { key: 'collateral', label: 'Collateral', options: ['Sukuk Government', 'Sukuk Corporate', 'Islamic Bonds'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="islamic-lending-securities" systemType="common" />
        </div>
      </div>
    </div>
  );
}