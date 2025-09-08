import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Clock,
  CheckCircle,
  Target
} from 'lucide-react';

const ParticipantReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportType, setReportType] = useState('');

  const reportCategories = [
    {
      title: 'Position Reports',
      icon: PieChart,
      reports: [
        { id: 'portfolio-summary', name: 'Portfolio Summary Report', description: 'Comprehensive portfolio holdings overview' },
        { id: 'position-statement', name: 'Position Statement', description: 'Detailed position by instrument type' },
        { id: 'holdings-analysis', name: 'Holdings Analysis', description: 'Analysis of securities holdings' },
        { id: 'exposure-report', name: 'Exposure Report', description: 'Risk exposure analysis' }
      ]
    },
    {
      title: 'Transaction Reports',
      icon: BarChart3,
      reports: [
        { id: 'transaction-summary', name: 'Transaction Summary', description: 'Summary of all transactions' },
        { id: 'settlement-report', name: 'Settlement Report', description: 'Detailed settlement information' },
        { id: 'failed-transactions', name: 'Failed Transactions Report', description: 'Analysis of failed transactions' },
        { id: 'dvp-activity', name: 'DvP Activity Report', description: 'Delivery vs Payment activity' }
      ]
    },
    {
      title: 'Auction Reports',
      icon: Target,
      reports: [
        { id: 'auction-participation', name: 'Auction Participation Report', description: 'Auction bidding history' },
        { id: 'allocation-summary', name: 'Allocation Summary', description: 'Auction allocation results' },
        { id: 'bid-analysis', name: 'Bid Analysis Report', description: 'Analysis of bidding patterns' },
        { id: 'auction-performance', name: 'Auction Performance', description: 'Performance metrics in auctions' }
      ]
    },
    {
      title: 'Regulatory Reports',
      icon: FileText,
      reports: [
        { id: 'compliance-report', name: 'Compliance Report', description: 'Regulatory compliance summary' },
        { id: 'risk-metrics', name: 'Risk Metrics Report', description: 'Risk management indicators' },
        { id: 'operational-risk', name: 'Operational Risk Report', description: 'Operational risk assessment' },
        { id: 'audit-trail', name: 'Audit Trail Report', description: 'Complete audit trail' }
      ]
    }
  ];

  const recentReports = [
    {
      id: 'RPT001',
      name: 'Portfolio Summary Report',
      type: 'Position Reports',
      period: 'December 2024',
      generatedDate: '2024-01-01',
      status: 'Ready',
      size: '2.5 MB'
    },
    {
      id: 'RPT002',
      name: 'Transaction Summary',
      type: 'Transaction Reports',
      period: 'Q4 2024',
      generatedDate: '2024-01-01',
      status: 'Ready',
      size: '1.8 MB'
    },
    {
      id: 'RPT003',
      name: 'Auction Participation Report',
      type: 'Auction Reports',
      period: 'December 2024',
      generatedDate: '2023-12-31',
      status: 'Processing',
      size: '-'
    },
    {
      id: 'RPT004',
      name: 'Compliance Report',
      type: 'Regulatory Reports',
      period: 'December 2024',
      generatedDate: '2023-12-30',
      status: 'Ready',
      size: '950 KB'
    }
  ];

  const scheduledReports = [
    {
      id: 'SCH001',
      name: 'Monthly Portfolio Summary',
      frequency: 'Monthly',
      nextGeneration: '2024-02-01',
      recipients: 'Operations Team',
      status: 'Active'
    },
    {
      id: 'SCH002',
      name: 'Weekly Transaction Report',
      frequency: 'Weekly',
      nextGeneration: '2024-01-08',
      recipients: 'Risk Management',
      status: 'Active'
    },
    {
      id: 'SCH003',
      name: 'Quarterly Compliance Report',
      frequency: 'Quarterly',
      nextGeneration: '2024-04-01',
      recipients: 'Compliance Officer',
      status: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready': return 'default';
      case 'processing': return 'secondary';
      case 'failed': return 'destructive';
      case 'active': return 'default';
      case 'paused': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reporting</h1>
          <p className="text-muted-foreground">Business Intelligence and Analytics - Participant Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="px-3 py-1">
            <FileText className="w-3 h-3 mr-1" />
            Participant Portal
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <div className="grid gap-6">
            {reportCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    Generate {category.title.toLowerCase()} for your securities operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.reports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{report.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`${report.id}-period`} className="text-xs">Period</Label>
                              <Select>
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="today">Today</SelectItem>
                                  <SelectItem value="week">This Week</SelectItem>
                                  <SelectItem value="month">This Month</SelectItem>
                                  <SelectItem value="quarter">This Quarter</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor={`${report.id}-format`} className="text-xs">Format</Label>
                              <Select>
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pdf">PDF</SelectItem>
                                  <SelectItem value="excel">Excel</SelectItem>
                                  <SelectItem value="csv">CSV</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Download className="w-3 h-3 mr-1" />
                              Generate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Reports
              </CardTitle>
              <CardDescription>Your recently generated reports and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{report.name}</h4>
                        <Badge variant={getStatusColor(report.status)} className="text-xs">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.type} • {report.period}</p>
                      <p className="text-xs text-muted-foreground">
                        Generated: {new Date(report.generatedDate).toLocaleDateString()}
                        {report.size !== '-' && ` • Size: ${report.size}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {report.status === 'Ready' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      {report.status === 'Processing' && (
                        <Button size="sm" variant="outline" disabled>
                          <Clock className="w-3 h-3 mr-1" />
                          Processing...
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Manage your automated report generation schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{schedule.name}</h4>
                        <Badge variant={getStatusColor(schedule.status)} className="text-xs">
                          {schedule.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {schedule.frequency} • Recipients: {schedule.recipients}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next Generation: {new Date(schedule.nextGeneration).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        {schedule.status === 'Active' ? 'Pause' : 'Resume'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Create New Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Report Usage Analytics
                </CardTitle>
                <CardDescription>Most frequently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Portfolio Summary Report</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-[80%]"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">24 times</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transaction Summary</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">18 times</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auction Participation</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-[45%]"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">12 times</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance Report</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-[30%]"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">8 times</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Report Insights
                </CardTitle>
                <CardDescription>Key metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Reports Generated</span>
                      <span className="text-lg font-bold">147</span>
                    </div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Average Generation Time</span>
                      <span className="text-lg font-bold">2.3 min</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Improved by 15%</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Most Active Period</span>
                      <span className="text-lg font-bold">Month-end</span>
                    </div>
                    <p className="text-xs text-muted-foreground">65% of reports</p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Preferred Format</span>
                      <span className="text-lg font-bold">PDF</span>
                    </div>
                    <p className="text-xs text-muted-foreground">78% of downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantReporting;