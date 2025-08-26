import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { Database, BarChart3, Server, Activity, FileText, Clock, CheckCircle } from 'lucide-react';

export default function CSDDWHDashboard() {
  useEffect(() => {
    document.title = 'DWH Dashboard | CBB Portal';
  }, []);

  const dwhMetrics = [
    {
      title: 'Data Sources',
      value: '15',
      change: '+2',
      changeType: 'positive' as const,
      icon: Database
    },
    {
      title: 'Active Reports',
      value: '128',
      change: '+12',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Data Volume (TB)',
      value: '847.3',
      change: '+45.2',
      changeType: 'positive' as const,
      icon: Server
    },
    {
      title: 'Daily Queries',
      value: '2,456',
      change: '+189',
      changeType: 'positive' as const,
      icon: Activity
    }
  ];

  const consolidatedReports = [
    {
      name: 'Daily Liquidity Utilization Report',
      status: 'Generated',
      lastUpdated: '2025-08-26 06:00',
      frequency: 'Daily'
    },
    {
      name: 'Settlement Timeliness & Failures Report',
      status: 'Generated',
      lastUpdated: '2025-08-26 17:30',
      frequency: 'Daily'
    },
    {
      name: 'End-of-Day Liquidity & Collateral Summary',
      status: 'Generated',
      lastUpdated: '2025-08-26 18:00',
      frequency: 'Daily'
    },
    {
      name: 'Liquidity Risk Heatmap',
      status: 'Pending',
      lastUpdated: '2025-08-25 16:00',
      frequency: 'Daily'
    },
    {
      name: 'High-Value Payment & Securities Oversight Report',
      status: 'Generated',
      lastUpdated: '2025-08-26 19:15',
      frequency: 'Daily'
    }
  ];

  const handleQuickActionClick = (actionId: string) => {
    if (actionId === 'access-bi-configuration') {
      window.open('http://superset.k8s1.moscow.cma.ru/superset/dashboard/24a553bf-8ef4-4b78-b0c4-22ddeb63fd09/?permalink_key=JnOlGOxZlj0', '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Data Warehouse Dashboard"
        description="Centralized data warehouse and business intelligence portal"
      />

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dwhMetrics.map((metric, index) => (
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

          {/* System Reports Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  RTGS BI Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Real-time gross settlement system business intelligence and analytics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Dashboards</span>
                    <span className="text-sm font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Sources</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Users</span>
                    <span className="text-sm font-medium">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  CSD BI Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Central securities depository business intelligence and analytics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Dashboards</span>
                    <span className="text-sm font-medium">31</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Sources</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Users</span>
                    <span className="text-sm font-medium">203</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  CMS BI Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Collateral management system business intelligence and analytics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Dashboards</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Sources</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Users</span>
                    <span className="text-sm font-medium">284</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Consolidated Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Consolidated Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Frequency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consolidatedReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            report.status === 'Generated' ? 'default' : 
                            report.status === 'Generating' ? 'secondary' : 
                            'destructive'
                          }
                          className="flex items-center gap-1 w-fit"
                        >
                          {report.status === 'Generated' && <CheckCircle className="h-3 w-3" />}
                          {report.status === 'Generating' && <Clock className="h-3 w-3" />}
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.lastUpdated}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="dwh-dashboard" 
            systemType="common"
            onActionClick={handleQuickActionClick}
          />
        </div>
      </div>
    </div>
  );
}