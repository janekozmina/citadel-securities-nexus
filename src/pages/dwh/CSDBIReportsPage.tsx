import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { BarChart3, Settings, ExternalLink, Activity, Database, TrendingUp, Users } from 'lucide-react';

export default function CSDDWHBIReportsPage() {
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'access-bi-configuration':
        window.open('http://superset.k8s1.moscow.cma.ru/superset/dashboard/csd-overview/?permalink_key=CSDOverview', '_blank');
        break;
      case 'refresh-bi-data':
        console.log('Refreshing CSD BI Data Sources...');
        break;
      case 'export-bi-report':
        console.log('Exporting CSD BI Report...');
        break;
      case 'schedule-bi-report':
        console.log('Scheduling CSD BI Report...');
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const biMetrics = [
    {
      title: 'Active Dashboards',
      value: '31',
      change: '+2',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Data Sources',
      value: '8',
      change: '+1',
      changeType: 'positive' as const,
      icon: Database
    },
    {
      title: 'Monthly Users',
      value: '203',
      change: '+28',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Report Views',
      value: '1,256',
      change: '+167',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  const usageData = [
    { name: 'Mon', views: 189, users: 22, exports: 8, color: 'hsl(var(--chart-1))' },
    { name: 'Tue', views: 223, users: 28, exports: 12, color: 'hsl(var(--chart-2))' },
    { name: 'Wed', views: 167, users: 19, exports: 6, color: 'hsl(var(--chart-3))' },
    { name: 'Thu', views: 245, users: 31, exports: 15, color: 'hsl(var(--chart-4))' },
    { name: 'Fri', views: 198, users: 24, exports: 9, color: 'hsl(var(--chart-5))' }
  ];

  const dashboardsData = [
    {
      id: 1,
      dashboardName: 'Securities Settlement Overview',
      category: 'Settlement',
      owner: 'Settlement Team',
      lastAccessed: '2025-01-16',
      viewCount: 1547,
      status: 'Active',
      dataFreshness: '5 mins',
      url: 'http://csd-bi-server:8080/dashboard/settlement-overview'
    },
    {
      id: 2,
      dashboardName: 'Corporate Actions Performance',
      category: 'Corporate Actions',
      owner: 'Corporate Actions Team',
      lastAccessed: '2025-01-15',
      viewCount: 932,
      status: 'Active',
      dataFreshness: '15 mins',
      url: 'http://csd-bi-server:8080/dashboard/corporate-actions'
    },
    {
      id: 3,
      dashboardName: 'Instrument Trading Volumes',
      category: 'Trading',
      owner: 'Trading Team',
      lastAccessed: '2025-01-16',
      viewCount: 756,
      status: 'Active',
      dataFreshness: '10 mins',
      url: 'http://csd-bi-server:8080/dashboard/trading-volumes'
    },
    {
      id: 4,
      dashboardName: 'Custody Holdings Analysis',
      category: 'Custody',
      owner: 'Custody Team',
      lastAccessed: '2025-01-14',
      viewCount: 623,
      status: 'Active',
      dataFreshness: '30 mins',
      url: 'http://csd-bi-server:8080/dashboard/custody-holdings'
    },
    {
      id: 5,
      dashboardName: 'Failed Transactions Monitor',
      category: 'Risk',
      owner: 'Risk Team',
      lastAccessed: '2025-01-13',
      viewCount: 445,
      status: 'Active',
      dataFreshness: '1 hour',
      url: 'http://csd-bi-server:8080/dashboard/failed-transactions'
    }
  ];

  const dataSourcesData = [
    {
      id: 1,
      sourceName: 'CSD Core Database',
      type: 'PostgreSQL',
      status: 'Connected',
      lastSync: '2025-01-16 10:15:00',
      recordCount: 3247891,
      refreshFrequency: '5 minutes',
      connectionString: 'csd-db.internal:5432'
    },
    {
      id: 2,
      sourceName: 'Securities Registry',
      type: 'Oracle',
      status: 'Connected',
      lastSync: '2025-01-16 10:12:00',
      recordCount: 156789,
      refreshFrequency: '15 minutes',
      connectionString: 'securities-registry.internal:1521'
    },
    {
      id: 3,
      sourceName: 'Trading Engine',
      type: 'MongoDB',
      status: 'Connected',
      lastSync: '2025-01-16 10:10:00',
      recordCount: 234567,
      refreshFrequency: '1 minute',
      connectionString: 'trading-engine.internal:27017'
    },
    {
      id: 4,
      sourceName: 'Settlement System',
      type: 'REST API',
      status: 'Connected',
      lastSync: '2025-01-16 10:08:00',
      recordCount: 89234,
      refreshFrequency: '5 minutes',
      connectionString: 'settlement-api.internal'
    },
    {
      id: 5,
      sourceName: 'Corporate Actions Feed',
      type: 'XML Feed',
      status: 'Warning',
      lastSync: '2025-01-16 09:30:00',
      recordCount: 12345,
      refreshFrequency: '1 hour',
      connectionString: 'corp-actions.external'
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
          title="CSD BI Reports"
          description="Central Securities Depository business intelligence dashboards and analytics"
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
          systemType="csd" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}