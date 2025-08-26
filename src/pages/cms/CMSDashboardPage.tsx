import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Shield, DollarSign, Activity, AlertTriangle, TrendingUp, Users, Building2, Target, BarChart3 } from 'lucide-react';

export default function CMSDashboardPage() {
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'monitor-health':
        console.log('Opening System Health Monitor...');
        break;
      case 'acknowledge-alerts':
        console.log('Acknowledging system alerts...');
        break;
      case 'drill-details':
        console.log('Drilling into operation details...');
        break;
      case 'export-dashboard':
        console.log('Exporting dashboard data...');
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

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
      value: '78.4%',
      change: '+3.2%',
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

  const utilizationData = [
    { name: 'Bank of Bahrain', value: 85, color: 'hsl(var(--chart-1))' },
    { name: 'Emirates NBD', value: 72, color: 'hsl(var(--chart-2))' },
    { name: 'Arab Banking Corp', value: 68, color: 'hsl(var(--chart-3))' },
    { name: 'ADCB Bank', value: 84, color: 'hsl(var(--chart-4))' },
    { name: 'Others', value: 76, color: 'hsl(var(--chart-5))' }
  ];

  const topCounterpartiesData = [
    { name: 'Bank of Bahrain', exposure: 1250000000, utilization: 85, color: 'hsl(var(--chart-1))' },
    { name: 'Emirates NBD', exposure: 980000000, utilization: 72, color: 'hsl(var(--chart-2))' },
    { name: 'Arab Banking Corp', exposure: 750000000, utilization: 68, color: 'hsl(var(--chart-3))' },
    { name: 'ADCB Bank', exposure: 680000000, utilization: 84, color: 'hsl(var(--chart-4))' },
    { name: 'National Bank of Kuwait', exposure: 580000000, utilization: 76, color: 'hsl(var(--chart-5))' }
  ];

  const outstandingOperationsData = [
    {
      id: 1,
      operationType: 'Collateral Pledge',
      counterparty: 'Bank of Bahrain',
      instrument: 'BHR Treasury Bond 2030',
      amount: 500000000,
      status: 'Pending Approval',
      initiatedDate: '2025-01-16',
      expiryDate: '2025-01-23',
      priority: 'High',
      riskLevel: 'Low'
    },
    {
      id: 2,
      operationType: 'Margin Call',
      counterparty: 'Emirates NBD Bank',
      instrument: 'Mixed Portfolio',
      amount: 75000000,
      status: 'Outstanding',
      initiatedDate: '2025-01-15',
      expiryDate: '2025-01-18',
      priority: 'Critical',
      riskLevel: 'Medium'
    },
    {
      id: 3,
      operationType: 'Collateral Substitution',
      counterparty: 'Arab Banking Corporation',
      instrument: 'Corporate Bonds → Gov Securities',
      amount: 200000000,
      status: 'Under Review',
      initiatedDate: '2025-01-14',
      expiryDate: '2025-01-21',
      priority: 'Medium',
      riskLevel: 'Low'
    },
    {
      id: 4,
      operationType: 'Haircut Adjustment',
      counterparty: 'ADCB Bank',
      instrument: 'Islamic Sukuk Portfolio',
      amount: 150000000,
      status: 'Processing',
      initiatedDate: '2025-01-13',
      expiryDate: '2025-01-20',
      priority: 'Medium',
      riskLevel: 'Medium'
    },
    {
      id: 5,
      operationType: 'Collateral Release',
      counterparty: 'National Bank of Kuwait',
      instrument: 'Government Securities',
      amount: 300000000,
      status: 'Approved',
      initiatedDate: '2025-01-12',
      expiryDate: '2025-01-19',
      priority: 'Low',
      riskLevel: 'Low'
    }
  ];

  const alertsData = [
    {
      id: 1,
      alertType: 'Margin Call',
      counterparty: 'Emirates NBD Bank',
      description: 'Collateral value below minimum threshold',
      severity: 'Critical',
      triggeredDate: '2025-01-15',
      status: 'Open'
    },
    {
      id: 2,
      alertType: 'Expiry Warning',
      counterparty: 'Multiple Counterparties',
      description: '15 collateral instruments expiring within 7 days',
      severity: 'Medium',
      triggeredDate: '2025-01-16',
      status: 'Acknowledged'
    },
    {
      id: 3,
      alertType: 'Credit Rating Downgrade',
      counterparty: 'Corporate Bond Issuer XYZ',
      description: 'Rating downgraded from A to BBB+',
      severity: 'High',
      triggeredDate: '2025-01-14',
      status: 'Under Review'
    }
  ];

  const operationsColumns = [
    { key: 'operationType', label: 'Operation Type', type: 'text' as const, sortable: true },
    { key: 'counterparty', label: 'Counterparty', type: 'text' as const, sortable: true },
    { key: 'instrument', label: 'Instrument', type: 'text' as const },
    { key: 'amount', label: 'Amount', type: 'currency' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Pending Approval', label: 'Pending Approval' },
        { value: 'Outstanding', label: 'Outstanding' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Processing', label: 'Processing' },
        { value: 'Approved', label: 'Approved' }
      ]
    },
    { key: 'initiatedDate', label: 'Initiated', type: 'date' as const, sortable: true },
    { key: 'expiryDate', label: 'Expiry', type: 'date' as const, sortable: true },
    { 
      key: 'priority', 
      label: 'Priority', 
      type: 'status' as const,
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    },
    { 
      key: 'riskLevel', 
      label: 'Risk Level', 
      type: 'status' as const,
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
      ]
    }
  ];

  const alertsColumns = [
    { key: 'alertType', label: 'Alert Type', type: 'text' as const, sortable: true },
    { key: 'counterparty', label: 'Counterparty', type: 'text' as const, sortable: true },
    { key: 'description', label: 'Description', type: 'text' as const },
    { 
      key: 'severity', 
      label: 'Severity', 
      type: 'status' as const,
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    },
    { key: 'triggeredDate', label: 'Triggered', type: 'date' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Open', label: 'Open' },
        { value: 'Acknowledged', label: 'Acknowledged' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Resolved', label: 'Resolved' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader
          title="CMS Dashboard"
          description="Central Bank Collateral Management System overview and monitoring"
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cmsMetrics.map((metric, index) => (
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
                      {' '}vs last month
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Utilization Rates by Counterparty (%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "bar",
                  title: "",
                  data: utilizationData,
                  height: 280
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Top Counterparties by Exposure (BHD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "pie",
                  title: "",
                  data: topCounterpartiesData.map(item => ({ 
                    name: item.name, 
                    value: item.exposure, 
                    color: item.color 
                  })),
                  height: 280
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Outstanding Collateral Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Outstanding Collateral Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Active Operations Requiring Attention"
              columns={operationsColumns}
              data={outstandingOperationsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts (Margin Calls & Expirations)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Active System Alerts and Notifications"
              columns={alertsColumns}
              data={alertsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="cms-dashboard" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}