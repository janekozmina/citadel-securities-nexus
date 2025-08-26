import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Users, DollarSign, TrendingUp, Building, UserCheck, Activity, PieChart } from 'lucide-react';

export default function InvestorsSummaryPage() {
  
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'new-investor':
        console.log('Opening New Investor dialog...');
        // TODO: Implement new investor dialog
        break;
      case 'modify-investor':
        console.log('Opening Modify Investor dialog...');
        // TODO: Implement modify investor dialog
        break;
      case 'view-investor-portfolio':
        console.log('Opening Investor Portfolio view...');
        // TODO: Implement portfolio view
        break;
      case 'export-investor-report':
        console.log('Exporting Investor Report...');
        // TODO: Implement export functionality
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const investorMetrics = [
    {
      title: 'Total Investors',
      value: '1,847',
      change: '+23',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Active Portfolios',
      value: '1,623',
      change: '+18',
      changeType: 'positive' as const,
      icon: Activity
    },
    {
      title: 'Total AUM',
      value: 'BHD 12.8B',
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'New Registrations',
      value: '15',
      change: '+3',
      changeType: 'positive' as const,
      icon: UserCheck
    }
  ];

  const investorTypeData = [
    { name: 'Retail', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'Institutional', value: 20, color: 'hsl(var(--chart-2))' },
    { name: 'Corporate', value: 10, color: 'hsl(var(--chart-3))' },
    { name: 'Foreign', value: 5, color: 'hsl(var(--chart-4))' }
  ];

  const portfolioGrowthData = [
    { name: 'Jan', value: 11.8, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', value: 12.1, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', value: 12.3, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', value: 12.5, color: 'hsl(var(--chart-4))' },
    { name: 'May', value: 12.6, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', value: 12.8, color: 'hsl(var(--chart-1))' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Suspended': return <Badge variant="destructive">Suspended</Badge>;
      case 'Dormant': return <Badge className="bg-gray-100 text-gray-800">Dormant</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInvestorTypeColor = (type: string) => {
    switch (type) {
      case 'Retail': return 'bg-blue-100 text-blue-800';
      case 'Institutional': return 'bg-green-100 text-green-800';
      case 'Corporate': return 'bg-purple-100 text-purple-800';
      case 'Foreign': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const investorData = [
    {
      investorId: 'INV-001847',
      name: 'Al Salam Investment Company',
      type: 'Institutional',
      registrationDate: '2024-12-15',
      portfolioValue: 890000000,
      holdingCount: 15,
      lastTransaction: '2025-01-18',
      status: 'Active',
      custodian: 'National Bank of Bahrain'
    },
    {
      investorId: 'INV-001846',
      name: 'Mohammed Ahmed Al-Khalifa',
      type: 'Retail',
      registrationDate: '2025-01-10',
      portfolioValue: 2500000,
      holdingCount: 8,
      lastTransaction: '2025-01-17',
      status: 'Active',
      custodian: 'Ahli United Bank'
    },
    {
      investorId: 'INV-001845',
      name: 'Bahrain Petroleum Company',
      type: 'Corporate',
      registrationDate: '2023-08-22',
      portfolioValue: 450000000,
      holdingCount: 12,
      lastTransaction: '2025-01-16',
      status: 'Active',
      custodian: 'Arab Banking Corporation'
    },
    {
      investorId: 'INV-001844',
      name: 'Emirates NBD Asset Management',
      type: 'Foreign',
      registrationDate: '2024-03-18',
      portfolioValue: 125000000,
      holdingCount: 6,
      lastTransaction: '2025-01-15',
      status: 'Active',
      custodian: 'BBK Bank'
    },
    {
      investorId: 'INV-001843',
      name: 'Fatima Saleh Al-Zahra',
      type: 'Retail',
      registrationDate: '2024-11-05',
      portfolioValue: 850000,
      holdingCount: 4,
      lastTransaction: '2024-12-20',
      status: 'Dormant',
      custodian: 'Gulf International Bank'
    },
    {
      investorId: 'INV-001842',
      name: 'GCC Investment Fund',
      type: 'Institutional',
      registrationDate: '2024-09-12',
      portfolioValue: 680000000,
      holdingCount: 18,
      lastTransaction: '2025-01-18',
      status: 'Active',
      custodian: 'Bahrain Islamic Bank'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Investors Summary"
        description="Monitor and manage investor registrations, portfolios, and activities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investorMetrics.map((metric, index) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Investor Type Distribution (%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveChart
                  config={{
                    type: "pie",
                    title: "",
                    data: investorTypeData,
                    height: 280
                  }}
                />
              </CardContent>
            </Card>

            <InteractiveChart
              config={{
                type: "line",
                title: "Total AUM Growth (BHD Billions)",
                data: portfolioGrowthData,
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Recent Investor Registrations and Activities"
            data={investorData}
            columns={[
              { key: 'investorId', label: 'Investor ID' },
              { key: 'name', label: 'Name/Company' },
              { key: 'type', label: 'Type' },
              { key: 'registrationDate', label: 'Registration', type: 'date' },
              { key: 'portfolioValue', label: 'Portfolio Value', type: 'currency' },
              { key: 'holdingCount', label: 'Holdings' },
              { key: 'lastTransaction', label: 'Last Activity', type: 'date' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'custodian', label: 'Custodian' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager 
            pageKey="investors-summary" 
            systemType="csd" 
            onActionClick={handleQuickAction}
          />
        </div>
      </div>
    </div>
  );
}