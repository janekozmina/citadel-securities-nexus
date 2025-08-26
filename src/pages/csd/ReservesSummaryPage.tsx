import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Vault, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Activity, 
  Shield, 
  Calculator, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Users,
  FileText,
  Bell,
  Edit,
  Send,
  Eye,
  ChevronDown,
  ChevronRight,
  Building2,
  Database,
  Target
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function ReservesSummaryPage() {
  const { toast } = useToast();
  const [expandedBanks, setExpandedBanks] = useState<Set<string>>(new Set());
  const [selectedBanks, setSelectedBanks] = useState<Set<string>>(new Set());

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'update-reserve-ratios':
        toast({
          title: "Reserve Ratios",
          description: "Opening reserve ratio configuration panel...",
        });
        break;
      case 'generate-compliance-report':
        toast({
          title: "Compliance Report",
          description: "Generating daily compliance report...",
        });
        break;
      case 'send-notification':
        toast({
          title: "Notification Sent",
          description: "Reserve requirement notification sent to selected banks.",
        });
        break;
      case 'manual-adjustment':
        toast({
          title: "Manual Adjustment",
          description: "Opening manual reserve adjustment form...",
        });
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const toggleBankExpansion = (bankId: string) => {
    const newExpanded = new Set(expandedBanks);
    if (newExpanded.has(bankId)) {
      newExpanded.delete(bankId);
    } else {
      newExpanded.add(bankId);
    }
    setExpandedBanks(newExpanded);
  };

  // Key Metrics for Primary Dashboard
  const keyMetrics = [
    {
      title: 'System-Wide Compliance Rate',
      value: '87.5%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      clickable: false
    },
    {
      title: 'Total Qualified Liabilities (QL)',
      value: 'BHD 47.2B',
      change: '+3.8%',
      changeType: 'positive' as const,
      icon: Database,
      clickable: false
    },
    {
      title: 'Total Reserve Shortfall',
      value: 'BHD 125M',
      change: '-15%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      clickable: true,
      description: 'Click to filter non-compliant banks'
    },
    {
      title: 'Active Participants',
      value: '24',
      change: 'Stable',
      changeType: 'neutral' as const,
      icon: Building2,
      clickable: false
    }
  ];

  // Reserve Balances vs Requirements Over Time
  const reserveTrendData = [
    { name: 'Day 1', required: 4.2, actual: 4.5, color: 'hsl(var(--chart-1))' },
    { name: 'Day 2', required: 4.3, actual: 4.4, color: 'hsl(var(--chart-2))' },
    { name: 'Day 3', required: 4.1, actual: 4.6, color: 'hsl(var(--chart-3))' },
    { name: 'Day 4', required: 4.4, actual: 4.3, color: 'hsl(var(--chart-4))' },
    { name: 'Day 5', required: 4.2, actual: 4.7, color: 'hsl(var(--chart-5))' },
    { name: 'Day 6', required: 4.5, actual: 4.4, color: 'hsl(var(--chart-1))' },
    { name: 'Day 7', required: 4.3, actual: 4.8, color: 'hsl(var(--chart-2))' }
  ];

  // Distribution of Compliance
  const complianceDistribution = [
    { name: 'Fully Compliant', value: 15, color: 'hsl(142 71% 45%)' },
    { name: 'MCB Shortfall', value: 4, color: 'hsl(48 96% 53%)' },
    { name: 'MLA Shortfall', value: 3, color: 'hsl(25 95% 53%)' },
    { name: 'Non-Compliant', value: 2, color: 'hsl(0 84% 60%)' }
  ];

  // Participant Reserve Ratios
  const participantRatios = [
    {
      id: '1',
      participantName: 'National Bank of Bahrain',
      licenseCode: 'CB/BL/001',
      mcbRatio: 5.0,
      mlaRatio: 12.5,
      effectiveStart: '2024-01-01',
      effectiveEnd: '2024-12-31',
      status: 'Active'
    },
    {
      id: '2',
      participantName: 'Ahli United Bank',
      licenseCode: 'CB/BL/002',
      mcbRatio: 5.0,
      mlaRatio: 12.5,
      effectiveStart: '2024-01-01',
      effectiveEnd: '2024-12-31',
      status: 'Active'
    },
    {
      id: '3',
      participantName: 'Arab Banking Corporation',
      licenseCode: 'CB/BL/003',
      mcbRatio: 5.0,
      mlaRatio: 15.0,
      effectiveStart: '2024-01-01',
      effectiveEnd: '2024-12-31',
      status: 'Active'
    }
  ];

  // Bank Reserve Status with detailed breakdown capability
  const bankReserveStatus = [
    {
      id: 'nbb',
      bankName: 'National Bank of Bahrain',
      currentQL: 8500000000,
      mcbRequired: 425000000,
      mcbActual: 450000000,
      mcbShortfall: 0,
      mcbSurplus: 25000000,
      mlaRequired: 1062500000,
      mlaActual: 1100000000,
      mlaShortfall: 0,
      mlaSurplus: 37500000,
      overallStatus: 'Compliant',
      lastSubmission: '2025-01-18 09:30:00',
      securities: [
        { type: 'Government Bonds', marketValue: 800000000, haircut: 2, adjustedValue: 784000000 },
        { type: 'Corporate Bonds', marketValue: 350000000, haircut: 8, adjustedValue: 322000000 }
      ],
      transactions: [
        { time: '09:15:00', type: 'Inflow', amount: 50000000, description: 'Customer deposits' },
        { time: '14:30:00', type: 'Outflow', amount: 25000000, description: 'Interbank transfer' }
      ]
    },
    {
      id: 'aub',
      bankName: 'Ahli United Bank',
      currentQL: 6200000000,
      mcbRequired: 310000000,
      mcbActual: 290000000,
      mcbShortfall: 20000000,
      mcbSurplus: 0,
      mlaRequired: 775000000,
      mlaActual: 780000000,
      mlaShortfall: 0,
      mlaSurplus: 5000000,
      overallStatus: 'MCB Shortfall',
      lastSubmission: '2025-01-18 10:15:00',
      securities: [
        { type: 'Government Securities', marketValue: 600000000, haircut: 1, adjustedValue: 594000000 },
        { type: 'Bank Securities', marketValue: 200000000, haircut: 5, adjustedValue: 190000000 }
      ],
      transactions: [
        { time: '08:45:00', type: 'Outflow', amount: 30000000, description: 'Reserve requirement' },
        { time: '16:20:00', type: 'Inflow', amount: 15000000, description: 'Bond maturity' }
      ]
    }
  ];

  // Alerts and Notifications
  const alerts = [
    {
      id: 1,
      type: 'Breach',
      severity: 'Critical',
      message: 'BBK Bank failed to maintain MCB requirement at EOD',
      timestamp: '2025-01-18 17:30:00',
      status: 'Open'
    },
    {
      id: 2,
      type: 'Warning',
      severity: 'Medium',
      message: 'Gulf International Bank projected EOD balance below requirement',
      timestamp: '2025-01-18 15:45:00',
      status: 'Acknowledged'
    },
    {
      id: 3,
      type: 'Data',
      severity: 'Low',
      message: 'Delayed QL submission from Al Salam Bank',
      timestamp: '2025-01-18 11:20:00',
      status: 'Resolved'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Compliant</Badge>;
      case 'MCB Shortfall':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">MCB Shortfall</Badge>;
      case 'MLA Shortfall':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">MLA Shortfall</Badge>;
      case 'Non-Compliant':
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAlertBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'Low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader
          title="Reserves Summary"
          description="Central hub for monitoring, managing, and enforcing reserve requirements for all participating banks"
        />

        {/* 1. Primary Dashboard - Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              System Overview - Real-Time Compliance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className={metric.clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className={`text-xs ${
                          metric.changeType === 'positive' ? 'text-green-600' : 
                          metric.changeType === 'neutral' ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </p>
                        {metric.description && (
                          <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                        )}
                      </div>
                      <metric.icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aggregate Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Reserve Balances vs. Requirements (Daily)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "line",
                  title: "",
                  data: reserveTrendData.map(item => ({ 
                    name: item.name, 
                    value: item.actual,
                    required: item.required,
                    color: item.color 
                  })),
                  height: 280
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Distribution of Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "pie",
                  title: "",
                  data: complianceDistribution,
                  height: 280
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* 2. Reserve Calculation & Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Reserve Calculation & Configuration Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Participant Reserve Ratios Table */}
            <div>
              <h4 className="font-medium mb-4">Participant Reserve Ratios</h4>
              <DataTable
                title="Active Reserve Ratio Configuration"
                columns={[
                  { key: 'participantName', label: 'Participant Bank Name', type: 'text', sortable: true },
                  { key: 'licenseCode', label: 'CB License Code', type: 'text', sortable: true },
                  { key: 'mcbRatio', label: 'MCB Ratio (%)', type: 'number', sortable: true },
                  { key: 'mlaRatio', label: 'MLA Ratio (%)', type: 'number', sortable: true },
                  { key: 'effectiveStart', label: 'Effective Start', type: 'date', sortable: true },
                  { key: 'effectiveEnd', label: 'Effective End', type: 'date', sortable: true },
                  { 
                    key: 'status', 
                    label: 'Status', 
                    type: 'status'
                  }
                ]}
                data={participantRatios}
                searchable={true}
                itemsPerPage={10}
              />
            </div>

            {/* Policy Configuration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Maintenance Period Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Period:</span>
                      <span className="font-medium">Daily</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">MCB Requirement:</span>
                      <span className="font-medium">5% of eligible liabilities</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Averaging Provision:</span>
                      <span className="font-medium">50% of daily MCB requirement</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Configure Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Exemptions & Tiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tier 1 (0-100M):</span>
                      <span className="font-medium">3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tier 2 (100M+):</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Islamic Banks:</span>
                      <span className="font-medium">Special Rules</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Tiers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 3. Bank-Level Compliance Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Bank-Level Compliance Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bankReserveStatus.map((bank) => (
                <Card key={bank.id} className="border">
                  <Collapsible
                    open={expandedBanks.has(bank.id)}
                    onOpenChange={() => toggleBankExpansion(bank.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="p-4 cursor-pointer hover:bg-muted/50">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-1 flex items-center">
                            {expandedBanks.has(bank.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                          <div className="col-span-2 font-medium">{bank.bankName}</div>
                          <div className="col-span-1 text-sm">BHD {(bank.currentQL / 1000000).toFixed(0)}M</div>
                          <div className="col-span-2 text-sm">
                            <div>Req: BHD {(bank.mcbRequired / 1000000).toFixed(0)}M</div>
                            <div>Act: BHD {(bank.mcbActual / 1000000).toFixed(0)}M</div>
                            <div className={bank.mcbShortfall > 0 ? "text-red-600" : "text-green-600"}>
                              {bank.mcbShortfall > 0 ? `-BHD ${(bank.mcbShortfall / 1000000).toFixed(0)}M` : `+BHD ${(bank.mcbSurplus / 1000000).toFixed(0)}M`}
                            </div>
                          </div>
                          <div className="col-span-2 text-sm">
                            <div>Req: BHD {(bank.mlaRequired / 1000000).toFixed(0)}M</div>
                            <div>Act: BHD {(bank.mlaActual / 1000000).toFixed(0)}M</div>
                            <div className={bank.mlaShortfall > 0 ? "text-red-600" : "text-green-600"}>
                              {bank.mlaShortfall > 0 ? `-BHD ${(bank.mlaShortfall / 1000000).toFixed(0)}M` : `+BHD ${(bank.mlaSurplus / 1000000).toFixed(0)}M`}
                            </div>
                          </div>
                          <div className="col-span-2">{getStatusBadge(bank.overallStatus)}</div>
                          <div className="col-span-2 text-sm text-muted-foreground">{bank.lastSubmission}</div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 border-t bg-muted/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          {/* Securities Breakdown */}
                          <div>
                            <h5 className="font-medium mb-2">MLA Securities Breakdown</h5>
                            <div className="space-y-2">
                              {bank.securities.map((security, idx) => (
                                <div key={idx} className="text-sm">
                                  <div className="flex justify-between">
                                    <span>{security.type}:</span>
                                    <span>BHD {(security.marketValue / 1000000).toFixed(0)}M</span>
                                  </div>
                                  <div className="flex justify-between text-muted-foreground">
                                    <span>After {security.haircut}% haircut:</span>
                                    <span>BHD {(security.adjustedValue / 1000000).toFixed(0)}M</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Daily Transactions */}
                          <div>
                            <h5 className="font-medium mb-2">Today's RTGS Transactions</h5>
                            <div className="space-y-2">
                              {bank.transactions.map((txn, idx) => (
                                <div key={idx} className="text-sm">
                                  <div className="flex justify-between">
                                    <span>{txn.time}</span>
                                    <span className={txn.type === 'Inflow' ? 'text-green-600' : 'text-red-600'}>
                                      {txn.type === 'Inflow' ? '+' : '-'}BHD {(txn.amount / 1000000).toFixed(0)}M
                                    </span>
                                  </div>
                                  <div className="text-muted-foreground text-xs">{txn.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div>
                            <h5 className="font-medium mb-2">Quick Actions</h5>
                            <div className="space-y-2">
                              <Button size="sm" variant="outline" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Send Alert
                              </Button>
                              <Button size="sm" variant="outline" className="w-full">
                                <Edit className="h-4 w-4 mr-2" />
                                Manual Adjust
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. Alerts & Notifications Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerts & Notifications Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === 'Critical' ? 'text-red-500' : 
                      alert.severity === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getAlertBadge(alert.severity)}
                        <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.status === 'Open' ? 'destructive' : alert.status === 'Acknowledged' ? 'secondary' : 'default'}>
                      {alert.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. Integrated Reporting & GL Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Integrated Reporting & GL Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-3">Quick Reports</h5>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Daily Compliance Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    QL Submission Status Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    End-of-Period Penalty Report
                  </Button>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-3">GL Posting Status</h5>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">GL Posting: Successful</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">Last operation cycle completed at 18:30</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Detailed Accounting Entries
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Sidebar */}
      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="reserves-summary" 
          systemType="csd" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}