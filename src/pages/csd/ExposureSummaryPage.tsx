import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { getPageConfig } from '@/config/pageConfig';

export default function ExposureSummaryPage() {
  const config = getPageConfig('csd', 'exposureSummary');
  const exposureMetrics = [
    {
      title: 'Total Exposure',
      value: 'BD 24.5M',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'High Risk Positions',
      value: '12',
      change: '-1',
      changeType: 'positive' as const,
      icon: AlertTriangle
    },
    {
      title: 'Concentration Risk',
      value: '15.8%',
      change: '+0.5%',
      changeType: 'negative' as const,
      icon: TrendingUp
    },
    {
      title: 'Diversification Index',
      value: '0.85',
      change: '+0.02',
      changeType: 'positive' as const,
      icon: TrendingDown
    }
  ];

  const exposureData = [
    { counterparty: 'Bank A', sector: 'Banking', exposure: 'BD 5.2M', rating: 'AA-', limit: 'BD 8.0M', utilization: '65%' },
    { counterparty: 'Corp B', sector: 'Manufacturing', exposure: 'BD 3.8M', rating: 'A+', limit: 'BD 5.0M', utilization: '76%' },
    { counterparty: 'Bank C', sector: 'Banking', exposure: 'BD 4.1M', rating: 'A', limit: 'BD 6.0M', utilization: '68%' },
    { counterparty: 'Gov D', sector: 'Government', exposure: 'BD 6.5M', rating: 'AAA', limit: 'BD 10.0M', utilization: '65%' },
    { counterparty: 'Corp E', sector: 'Energy', exposure: 'BD 2.9M', rating: 'BBB+', limit: 'BD 4.0M', utilization: '73%' }
  ];

  const chartData = [
    { name: 'Banking', value: 42, exposure: 'BD 9.3M' },
    { name: 'Government', value: 26, exposure: 'BD 6.5M' },
    { name: 'Manufacturing', value: 15, exposure: 'BD 3.8M' },
    { name: 'Energy', value: 12, exposure: 'BD 2.9M' },
    { name: 'Others', value: 5, exposure: 'BD 1.2M' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={config.title}
        description={config.description}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exposureMetrics.map((metric, index) => (
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
                title: "Exposure by Sector",
                data: chartData.map(item => ({ ...item, color: `hsl(var(--chart-${chartData.indexOf(item) + 1}))` })),
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Risk Distribution",
                data: [
                  { name: 'Low Risk', value: 45, color: 'hsl(var(--chart-1))' },
                  { name: 'Medium Risk', value: 35, color: 'hsl(var(--chart-2))' },
                  { name: 'High Risk', value: 20, color: 'hsl(var(--chart-3))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title={config.tableTitle}
            data={exposureData}
            columns={[
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'sector', label: 'Sector' },
              { key: 'exposure', label: 'Exposure' },
              { key: 'rating', label: 'Rating' },
              { key: 'limit', label: 'Limit' },
              { key: 'utilization', label: 'Utilization' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="exposure-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}