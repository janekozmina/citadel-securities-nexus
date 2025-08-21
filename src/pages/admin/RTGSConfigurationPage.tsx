import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Server, 
  Globe, 
  Shield, 
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  FileText,
  Calendar,
  Zap
} from 'lucide-react';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

const configurationChanges = [
  {
    id: '1',
    timestamp: '2025-01-21 14:30:00',
    user: 'Ahmed Hassan',
    action: 'Updated Payment Limits',
    description: 'Increased daily limit for Tier 1 banks to BHD 50M',
    approvalRef: 'APR-2025-001',
    status: 'approved'
  },
  {
    id: '2',
    timestamp: '2025-01-21 11:15:00', 
    user: 'Sarah Mohamed',
    action: 'SSL Certificate Renewal',
    description: 'Renewed SSL certificates for production nodes',
    approvalRef: 'APR-2025-002',
    status: 'approved'
  },
  {
    id: '3',
    timestamp: '2025-01-20 16:45:00',
    user: 'Khalid Omar',
    action: 'Interface Configuration',
    description: 'Added new SWIFT message format support',
    approvalRef: 'APR-2025-003', 
    status: 'pending'
  },
  {
    id: '4',
    timestamp: '2025-01-19 09:20:00',
    user: 'Fatima Ali',
    action: 'Security Update',
    description: 'Enabled TLS 1.3 for all external connections',
    approvalRef: 'APR-2025-004',
    status: 'approved'
  },
  {
    id: '5',
    timestamp: '2025-01-18 13:10:00',
    user: 'Omar Khalil',
    action: 'Node Configuration',
    description: 'Activated standby node for redundancy',
    approvalRef: 'APR-2025-005',
    status: 'approved'
  }
];

const complianceAlerts = [
  {
    id: '1',
    type: 'warning',
    title: 'SSL Certificate Expiring',
    description: 'Primary SSL certificate expires in 15 days',
    severity: 'medium',
    dueDate: '2025-02-05'
  },
  {
    id: '2', 
    type: 'error',
    title: 'Version Mismatch',
    description: 'pacs.008 message format is outdated',
    severity: 'high',
    dueDate: '2025-01-25'
  },
  {
    id: '3',
    type: 'info',
    title: 'Pending Config Approval',
    description: '2 configuration changes awaiting approval',
    severity: 'low',
    dueDate: '2025-01-23'
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'info':
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

export default function RTGSConfigurationPage() {
  useEffect(() => {
    document.title = 'RTGS Configuration | Unified Portal';
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">RTGS Configuration</h1>
          <p className="text-muted-foreground">System configuration and management overview</p>
        </div>
      </div>

      <QuickActionsManager
        pageKey="rtgs-configuration"
        systemType="rtgs"
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Configuration Cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="h-5 w-5 text-blue-600" />
                  Nodes & Components
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Nodes</span>
                  <Badge className="bg-green-100 text-green-800">5 Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Standby Nodes</span>
                  <Badge variant="secondary">1 Standby</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Load Balancer</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-green-600" />
                  Interfaces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SWIFT ISO 20022</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ACH Interface</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">IPS Integration</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">TLS Version</span>
                  <Badge className="bg-green-100 text-green-800">1.3 Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">2FA Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Encryption</span>
                  <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-orange-600" />
                  Current Config Version
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <Badge variant="outline">v.2025.2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm">21 Aug 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-800">Stable</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Change Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configuration Change Log
              </CardTitle>
              <CardDescription>Recent configuration changes and approval history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {configurationChanges.map((change) => (
                  <div key={change.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{change.action}</h4>
                        <Badge 
                          variant={change.status === 'approved' ? 'default' : 'secondary'}
                          className={change.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {change.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{change.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {change.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {change.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {change.approvalRef}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Compliance Panel */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-red-600" />
                Alerts & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge 
                      variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.dueDate}</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-2 border-t">
                <a href="/admin/config/rtgs/audit-log" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Configuration Change Log →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}