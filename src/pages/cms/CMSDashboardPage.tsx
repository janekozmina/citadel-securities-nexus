import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Shield, DollarSign, Activity, AlertTriangle, TrendingUp, Users } from 'lucide-react';

export default function CMSDashboardPage() {
  const cmsMetrics = [
    {
      title: 'Total Collateral',
      value: 'BHD 8.7B',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Active Participants',
      value: '24',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Utilization Rate',
      value: '78%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Risk Alerts',
      value: '3',
      change: '-2',
      changeType: 'positive' as const,
      icon: AlertTriangle
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="CMS Dashboard"
        description="Central Bank Collateral Management System overview and monitoring"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cmsMetrics.map((metric, index) => (
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
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="cms-dashboard" systemType="cms" />
        </div>
      </div>
    </div>
  );
}