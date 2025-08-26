import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { BarChart3, Settings, ExternalLink, Activity, Database, TrendingUp, Users } from 'lucide-react';

export default function BIReportsPage() {
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'access-bi-configuration':
        window.open('http://superset.k8s1.moscow.cma.ru/superset/dashboard/24a553bf-8ef4-4b78-b0c4-22ddeb63fd09/?permalink_key=JnOlGOxZlj0', '_blank');
        break;
      case 'refresh-bi-data':
        console.log('Refreshing BI Data Sources...');
        break;
      case 'export-bi-report':
        console.log('Exporting BI Report...');
        break;
      case 'schedule-bi-report':
        console.log('Scheduling BI Report...');
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const biMetrics = [
    {
      title: 'Active Dashboards',
      value: '47',
      change: '+3',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Data Sources',
      value: '12',
      change: '+1',
      changeType: 'positive' as const,
      icon: Database
    },
    {
      title: 'Monthly Users',
      value: '284',
      change: '+45',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Report Views',
      value: '1,847',
      change: '+256',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const usageData = [
    { name: 'Mon', views: 245, users: 28, exports: 12, color: 'hsl(var(--chart-1))' },
    { name: 'Tue', views: 267, users: 32, exports: 15, color: 'hsl(var(--chart-2))' },
    { name: 'Wed', views: 198, users: 25, exports: 8, color: 'hsl(var(--chart-3))' },
    { name: 'Thu', views: 289, users: 35, exports: 18, color: 'hsl(var(--chart-4))' },
    { name: 'Fri', views: 234, users: 29, exports: 14, color: 'hsl(var(--chart-5))' }
  ];

  const dashboardsData = [
    {
      id: 1,
      dashboardName: 'Collateral Risk Overview',
      category: 'Risk Management',
      owner: 'Risk Team',
      lastAccessed: '2025-01-16',
      viewCount: 1247,
      status: 'Active',
      dataFreshness: '5 mins',
      url: 'http://cms-bi-server:8080/dashboard/risk-overview'
    },
    {
      id: 2,
      dashboardName: 'Counterparty Exposure Analysis',
      category: 'Credit Risk',
      owner: 'Credit Team',
      lastAccessed: '2025-01-15',
      viewCount: 856,
      status: 'Active',
      dataFreshness: '15 mins',
      url: 'http://cms-bi-server:8080/dashboard/counterparty-exposure'
    },
    {
      id: 3,
      dashboardName: 'Collateral Optimization Metrics',
      category: 'Operations',
      owner: 'Operations Team',
      lastAccessed: '2025-01-16',
      viewCount: 634,
      status: 'Active',
      dataFreshness: '30 mins',
      url: 'http://cms-bi-server:8080/dashboard/optimization-metrics'
    },
    {
      id: 4,
      dashboardName: 'Regulatory Compliance Monitor',
      category: 'Compliance',
      owner: 'Compliance Team',
      lastAccessed: '2025-01-14',
      viewCount: 423,
      status: 'Active',
      dataFreshness: '1 hour',
      url: 'http://cms-bi-server:8080/dashboard/compliance-monitor'
    },
    {
      id: 5,
      dashboardName: 'Market Risk Indicators',
      category: 'Market Risk',
      owner: 'Market Risk Team',
      lastAccessed: '2025-01-13',
      viewCount: 389,
      status: 'Maintenance',
      dataFreshness: '2 hours',
      url: 'http://cms-bi-server:8080/dashboard/market-risk'
    }
  ];

  const dataSourcesData = [
    {
      id: 1,
      sourceName: 'CMS Core Database',
      type: 'PostgreSQL',
      status: 'Connected',
      lastSync: '2025-01-16 10:15:00',
      recordCount: 2847293,
      refreshFrequency: '5 minutes',
      connectionString: 'cms-db.internal:5432'
    },
    {
      id: 2,
      sourceName: 'Market Data Feed',
      type: 'REST API',
      status: 'Connected',
      lastSync: '2025-01-16 10:12:00',
      recordCount: 45678,
      refreshFrequency: '1 minute',
      connectionString: 'market-data-api.external'
    },
    {
      id: 3,
      sourceName: 'Risk Engine',
      type: 'MongoDB',
      status: 'Connected',
      lastSync: '2025-01-16 10:10:00',
      recordCount: 156789,
      refreshFrequency: '10 minutes',
      connectionString: 'risk-engine.internal:27017'
    },
    {
      id: 4,
      sourceName: 'Credit Rating Service',
      type: 'Web Service',
      status: 'Connected',
      lastSync: '2025-01-16 09:45:00',
      recordCount: 23456,
      refreshFrequency: '1 hour',
      connectionString: 'credit-ratings.external'
    },
    {
      id: 5,
      sourceName: 'Audit Trail',
      type: 'File System',
      status: 'Warning',
      lastSync: '2025-01-16 08:30:00',
      recordCount: 789234,
      refreshFrequency: '6 hours',
      connectionString: '/audit/logs/cms'
    }
  ];

  const dashboardColumns = [
    { key: 'dashboardName', label: 'Dashboard Name', type: 'text' as const, sortable: true },
    { key: 'category', label: 'Category', type: 'text' as const, sortable: true },
    { key: 'owner', label: 'Owner', type: 'text' as const, sortable: true },
    { key: 'viewCount', label: 'Views', type: 'number' as const, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', type: 'date' as const, sortable: true },
    { key: 'dataFreshness', label: 'Data Freshness', type: 'text' as const },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Maintenance', label: 'Maintenance' },
        { value: 'Offline', label: 'Offline' }
      ]
    }
  ];

  const dataSourceColumns = [
    { key: 'sourceName', label: 'Data Source', type: 'text' as const, sortable: true },
    { key: 'type', label: 'Type', type: 'text' as const, sortable: true },
    { key: 'recordCount', label: 'Records', type: 'number' as const, sortable: true },
    { key: 'lastSync', label: 'Last Sync', type: 'date' as const, sortable: true },
    { key: 'refreshFrequency', label: 'Refresh Freq.', type: 'text' as const },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Connected', label: 'Connected' },
        { value: 'Warning', label: 'Warning' },
        { value: 'Disconnected', label: 'Disconnected' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader 
          title="BI Reports"
          description="Business Intelligence dashboards and analytics for collateral management system"
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {biMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                      </span>
                      {' '}this month
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <metric.icon className="h-8 w-8 text-primary mb-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Weekly BI Usage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveChart
              config={{
                type: "bar",
                title: "",
                data: usageData.map(item => ({ 
                  name: item.name, 
                  value: item.views, 
                  color: item.color 
                })),
                height: 300
              }}
            />
          </CardContent>
        </Card>

        {/* Active Dashboards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Active BI Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Available Business Intelligence Dashboards"
              columns={dashboardColumns}
              data={dashboardsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Connected Data Sources & Feeds"
              columns={dataSourceColumns}
              data={dataSourcesData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="bi-reports" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}