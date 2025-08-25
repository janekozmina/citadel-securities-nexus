import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Settings,
  Plus,
  Edit2,
  Trash2,
  Target,
  DollarSign,
  Percent,
  Users,
  Activity
} from 'lucide-react';

const alertConfigSchema = z.object({
  alertName: z.string().min(1, 'Alert name is required'),
  limitType: z.string().min(1, 'Limit type is required'),
  threshold: z.number().min(0, 'Threshold must be positive'),
  thresholdType: z.enum(['amount', 'percentage']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  notificationMethods: z.array(z.string()).min(1, 'At least one notification method required'),
  recipients: z.string().min(1, 'Recipients are required'),
  isActive: z.boolean(),
  description: z.string().optional()
});

type AlertConfig = z.infer<typeof alertConfigSchema>;

export default function LimitsAlertsPage() {
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<any>(null);

  const alertMetrics = [
    {
      title: 'Active Alerts',
      value: '23',
      change: '+5 from yesterday',
      changeType: 'warning' as const,
      icon: Bell
    },
    {
      title: 'Critical Breaches',
      value: '3',
      change: '+1 from yesterday',
      changeType: 'negative' as const,
      icon: AlertTriangle
    },
    {
      title: 'Configured Limits',
      value: '87',
      change: '2 pending approval',
      changeType: 'neutral' as const,
      icon: Target
    },
    {
      title: 'Response Rate',
      value: '98.5%',
      change: '+0.2% improvement',
      changeType: 'positive' as const,
      icon: CheckCircle
    }
  ];

  const currentAlertsData = [
    {
      id: 1,
      alertName: 'Daily Position Limit',
      participant: 'National Bank of Bahrain',
      limitType: 'Position Limit',
      currentValue: 950000000,
      threshold: 1000000000,
      utilization: 95,
      severity: 'High',
      status: 'Active',
      lastTriggered: '2025-01-18 14:30:00',
      responseTime: '2 mins',
      actions: 'Email, SMS'
    },
    {
      id: 2,
      alertName: 'Settlement Risk Exposure',
      participant: 'Arab Banking Corporation',
      limitType: 'Risk Limit',
      currentValue: 425000000,
      threshold: 500000000,
      utilization: 85,
      severity: 'Medium',
      status: 'Monitoring',
      lastTriggered: '2025-01-18 13:15:00',
      responseTime: '5 mins',
      actions: 'Email'
    },
    {
      id: 3,
      alertName: 'Overdraft Facility',
      participant: 'Gulf International Bank',
      limitType: 'Credit Limit',
      currentValue: 95000000,
      threshold: 100000000,
      utilization: 95,
      severity: 'Critical',
      status: 'Breached',
      lastTriggered: '2025-01-18 15:45:00',
      responseTime: '1 min',
      actions: 'Email, SMS, Call'
    },
    {
      id: 4,
      alertName: 'Intraday Liquidity',
      participant: 'Ahli United Bank',
      limitType: 'Liquidity Limit',
      currentValue: 780000000,
      threshold: 900000000,
      utilization: 87,
      severity: 'Medium',
      status: 'Active',
      lastTriggered: '2025-01-18 12:20:00',
      responseTime: '3 mins',
      actions: 'Email, Dashboard'
    },
    {
      id: 5,
      alertName: 'Concentration Risk',
      participant: 'BBK Bank',
      limitType: 'Concentration Limit',
      currentValue: 340000000,
      threshold: 400000000,
      utilization: 85,
      severity: 'Low',
      status: 'Monitoring',
      lastTriggered: '2025-01-18 11:10:00',
      responseTime: '8 mins',
      actions: 'Email'
    }
  ];

  const alertConfigData = [
    {
      id: 1,
      alertName: 'Daily Position Limit Alert',
      limitType: 'Position Limit',
      threshold: 1000000000,
      thresholdType: 'amount',
      severity: 'High',
      recipients: 'risk@nbb.com.bh, ops@nbb.com.bh',
      notificationMethods: ['Email', 'SMS'],
      isActive: true,
      createdDate: '2025-01-10',
      lastModified: '2025-01-15'
    },
    {
      id: 2,
      alertName: 'Settlement Risk Threshold',
      limitType: 'Risk Limit',
      threshold: 85,
      thresholdType: 'percentage',
      severity: 'Medium',
      recipients: 'settlement@cbb.gov.bh',
      notificationMethods: ['Email', 'Dashboard'],
      isActive: true,
      createdDate: '2025-01-08',
      lastModified: '2025-01-12'
    },
    {
      id: 3,
      alertName: 'Critical Overdraft Warning',
      limitType: 'Credit Limit',
      threshold: 95,
      thresholdType: 'percentage',
      severity: 'Critical',
      recipients: 'emergency@cbb.gov.bh, director@cbb.gov.bh',
      notificationMethods: ['Email', 'SMS', 'Call'],
      isActive: true,
      createdDate: '2025-01-05',
      lastModified: '2025-01-18'
    }
  ];

  const form = useForm<AlertConfig>({
    resolver: zodResolver(alertConfigSchema),
    defaultValues: {
      alertName: '',
      limitType: '',
      threshold: 0,
      thresholdType: 'amount',
      severity: 'medium',
      notificationMethods: [],
      recipients: '',
      isActive: true,
      description: ''
    }
  });

  const handleConfigureAlert = (alert?: any) => {
    if (alert) {
      setEditingAlert(alert);
      form.reset({
        alertName: alert.alertName,
        limitType: alert.limitType,
        threshold: alert.threshold,
        thresholdType: alert.thresholdType,
        severity: alert.severity.toLowerCase(),
        notificationMethods: alert.notificationMethods,
        recipients: alert.recipients,
        isActive: alert.isActive,
        description: alert.description || ''
      });
    } else {
      setEditingAlert(null);
      form.reset();
    }
    setIsConfigDialogOpen(true);
  };

  const onSubmit = (data: AlertConfig) => {
    console.log('Alert configuration:', data);
    setIsConfigDialogOpen(false);
    form.reset();
    setEditingAlert(null);
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'Low': 'default',
      'Medium': 'secondary', 
      'High': 'destructive',
      'Critical': 'destructive'
    };
    return <Badge variant={variants[severity as keyof typeof variants] as any}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Monitoring': 'bg-yellow-100 text-yellow-800',
      'Breached': 'bg-red-100 text-red-800',
      'Resolved': 'bg-blue-100 text-blue-800'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Limits Alerts"
        description="Configure and monitor limit alerts across all participants and risk categories"
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => handleConfigureAlert()} className="gap-2">
          <Plus className="h-4 w-4" />
          Configure New Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {alertMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${
                        metric.changeType === 'positive' ? 'text-green-600' : 
                        metric.changeType === 'negative' ? 'text-red-600' : 
                        metric.changeType === 'warning' ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Active Alerts */}
          <DataTable
            title="Current Active Alerts"
            data={currentAlertsData}
            columns={[
              { key: 'alertName', label: 'Alert Name' },
              { key: 'participant', label: 'Participant' },
              { key: 'limitType', label: 'Limit Type' },
              { key: 'currentValue', label: 'Current Value', type: 'currency' },
              { key: 'threshold', label: 'Threshold', type: 'currency' },
              { key: 'utilization', label: 'Utilization' },
              { key: 'severity', label: 'Severity' },
              { key: 'status', label: 'Status' },
              { key: 'lastTriggered', label: 'Last Triggered', type: 'date' },
              { key: 'responseTime', label: 'Response Time' },
              { key: 'actions', label: 'Notification Methods' }
            ]}
            searchable
            icon={Bell}
          />

          {/* Alert Configuration Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <CardTitle>Alert Configurations</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConfigureAlert()}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Configuration
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                title="Alert Configurations"
                data={alertConfigData}
                columns={[
                  { key: 'alertName', label: 'Alert Name' },
                  { key: 'limitType', label: 'Limit Type' },
                  { key: 'threshold', label: 'Threshold' },
                  { key: 'severity', label: 'Severity' },
                  { key: 'recipients', label: 'Recipients' },
                  { key: 'notificationMethods', label: 'Methods' },
                  { key: 'isActive', label: 'Status' },
                  { key: 'lastModified', label: 'Last Modified', type: 'date' }
                ]}
                searchable={false}
              />
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="limits-alerts" systemType="csd" />
        </div>
      </div>

      {/* Alert Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {editingAlert ? 'Edit Alert Configuration' : 'Configure New Alert'}
            </DialogTitle>
            <DialogDescription>
              Set up automated alerts for limit monitoring and breach notifications.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="alertName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alert Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Daily Position Alert" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="limitType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select limit type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="position">Position Limit</SelectItem>
                          <SelectItem value="risk">Risk Limit</SelectItem>
                          <SelectItem value="credit">Credit Limit</SelectItem>
                          <SelectItem value="liquidity">Liquidity Limit</SelectItem>
                          <SelectItem value="concentration">Concentration Limit</SelectItem>
                          <SelectItem value="settlement">Settlement Limit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold Value</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thresholdType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="amount">Amount (BHD)</SelectItem>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="recipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Recipients</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter email addresses separated by commas"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Notification Methods</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {['Email', 'SMS', 'Push Notification', 'Dashboard Alert', 'Phone Call', 'Slack'].map((method) => (
                    <FormField
                      key={method}
                      control={form.control}
                      name="notificationMethods"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value?.includes(method) || false}
                              onChange={(e) => {
                                const updatedMethods = e.target.checked
                                  ? [...(field.value || []), method]
                                  : (field.value || []).filter((m) => m !== method);
                                field.onChange(updatedMethods);
                              }}
                              className="rounded border-gray-300"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {method}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add additional details about this alert configuration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activate Alert</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Enable this alert configuration to start monitoring
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsConfigDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAlert ? 'Update Alert' : 'Create Alert'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}