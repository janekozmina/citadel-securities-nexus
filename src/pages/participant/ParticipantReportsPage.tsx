import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileBarChart,
  Calendar,
  BarChart3,
  Server,
  Download,
  Clock,
  FileText,
  Settings,
  Play
} from 'lucide-react';

const ParticipantReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const scheduledReports = [
    { 
      id: 'daily-balance', 
      name: 'Daily Balance Report', 
      schedule: 'Daily at 18:00', 
      lastRun: '2024-01-10 18:00:03',
      status: 'Active',
      format: 'PDF, Excel'
    },
    { 
      id: 'weekly-transactions', 
      name: 'Weekly Transaction Summary', 
      schedule: 'Monday at 08:00', 
      lastRun: '2024-01-08 08:00:15',
      status: 'Active',
      format: 'Excel'
    },
    { 
      id: 'monthly-positions', 
      name: 'Monthly Position Statement', 
      schedule: 'Last day of month at 20:00', 
      lastRun: '2023-12-31 20:00:45',
      status: 'Active',
      format: 'PDF'
    },
    { 
      id: 'regulatory-compliance', 
      name: 'Regulatory Compliance Report', 
      schedule: 'Weekly Friday at 16:00', 
      lastRun: '2024-01-05 16:00:22',
      status: 'Active',
      format: 'PDF, XML'
    }
  ];

  const biReports = [
    { 
      id: 'transaction-analytics', 
      name: 'Transaction Analytics Dashboard', 
      description: 'Real-time transaction analytics and trends',
      category: 'Operations'
    },
    { 
      id: 'risk-analysis', 
      name: 'Risk Analysis Report', 
      description: 'Portfolio risk assessment and exposure analysis',
      category: 'Risk Management'
    },
    { 
      id: 'performance-metrics', 
      name: 'Performance Metrics', 
      description: 'KPI dashboard and performance indicators',
      category: 'Performance'
    },
    { 
      id: 'liquidity-analysis', 
      name: 'Liquidity Analysis', 
      description: 'Liquidity position and forecasting',
      category: 'Liquidity'
    },
    { 
      id: 'settlement-efficiency', 
      name: 'Settlement Efficiency Report', 
      description: 'Settlement processing analytics',
      category: 'Settlement'
    }
  ];

  const centralSystemReports = [
    { 
      id: 'system-status', 
      name: 'System Status Report', 
      description: 'Overall system health and availability',
      lastGenerated: '2024-01-10 15:30'
    },
    { 
      id: 'audit-trail', 
      name: 'Audit Trail Report', 
      description: 'Complete audit trail of system activities',
      lastGenerated: '2024-01-10 14:45'
    },
    { 
      id: 'security-events', 
      name: 'Security Events Report', 
      description: 'Security-related events and alerts',
      lastGenerated: '2024-01-10 16:00'
    },
    { 
      id: 'participant-activity', 
      name: 'Participant Activity Summary', 
      description: 'Summary of participant system usage',
      lastGenerated: '2024-01-10 13:20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Access scheduled reports, BI analytics, and central system reports</p>
        </div>
      </div>

      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled">
            <Calendar className="w-4 h-4 mr-2" />
            Scheduled Reports
          </TabsTrigger>
          <TabsTrigger value="bi">
            <BarChart3 className="w-4 h-4 mr-2" />
            BI Reports
          </TabsTrigger>
          <TabsTrigger value="central">
            <Server className="w-4 h-4 mr-2" />
            Central System Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Automated reports generated on a schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{report.name}</span>
                        <Badge variant={getStatusColor(report.status)} className="text-xs">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Schedule: {report.schedule}</p>
                      <p className="text-xs text-muted-foreground">Last run: {report.lastRun}</p>
                      <p className="text-xs text-muted-foreground">Format: {report.format}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Run Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bi">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Business Intelligence Reports
              </CardTitle>
              <CardDescription>Interactive analytics and business intelligence dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {biReports.map((report) => (
                  <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{report.category}</Badge>
                        <Button onClick={() => setSelectedReport(report.id)}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="central">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Central System Reports
              </CardTitle>
              <CardDescription>System-generated reports from central infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centralSystemReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Last generated: {report.lastGenerated}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Viewer Modal */}
      {selectedReport && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Report Viewer: {selectedReport}</CardTitle>
            <CardDescription>Interactive report dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Report dashboard would load here</p>
                <p className="text-sm text-slate-500">Interactive charts and analytics</p>
                <Button className="mt-4" onClick={() => setSelectedReport(null)}>
                  Close Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParticipantReportsPage;