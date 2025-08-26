import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Zap, RefreshCw, TrendingUp, Target, AlertTriangle, Settings } from 'lucide-react';

export default function CollateralOptimizationPage() {
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'initiate-pledge':
        console.log('Opening Initiate Pledge dialog...');
        break;
      case 'approve-substitution':
        console.log('Opening Approve Substitution dialog...');
        break;
      case 'collateral-revaluation':
        console.log('Running Collateral Revaluation...');
        break;
      case 'initiate-margin-call':
        console.log('Initiating Margin Call...');
        break;
      case 'run-optimizer':
        console.log('Running Optimization Engine...');
        break;
      case 'collateral-execution':
        console.log('Executing Collateral Operations...');
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const optimizationMetrics = [
    {
      title: 'Optimization Savings',
      value: 'BHD 45.2M',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Pending Substitutions',
      value: '23',
      change: '+5',
      changeType: 'neutral' as const,
      icon: RefreshCw
    },
    {
      title: 'Active Margin Calls',
      value: '7',
      change: '-2',
      changeType: 'positive' as const,
      icon: AlertTriangle
    },
    {
      title: 'Efficiency Score',
      value: '94.7%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Target
    }
  ];

  const dailyFlowsData = [
    { name: 'Mon', pledges: 450000000, substitutions: 125000000, releases: 89000000, color: 'hsl(var(--chart-1))' },
    { name: 'Tue', pledges: 520000000, substitutions: 156000000, releases: 98000000, color: 'hsl(var(--chart-2))' },
    { name: 'Wed', pledges: 380000000, substitutions: 134000000, releases: 112000000, color: 'hsl(var(--chart-3))' },
    { name: 'Thu', pledges: 670000000, substitutions: 178000000, releases: 145000000, color: 'hsl(var(--chart-4))' },
    { name: 'Fri', pledges: 590000000, substitutions: 167000000, releases: 134000000, color: 'hsl(var(--chart-5))' }
  ];

  const substitutionRequestsData = [
    {
      id: 1,
      counterparty: 'Bank of Bahrain',
      currentCollateral: 'BHR Gov Bond 2029',
      currentValue: 200000000,
      proposedCollateral: 'ALBA Corporate Bond 2028',
      proposedValue: 185000000,
      reason: 'Liquidity Management',
      submittedDate: '2025-01-15',
      status: 'Pending Approval',
      priority: 'High',
      haircutImpact: '+2.5%'
    },
    {
      id: 2,
      counterparty: 'Emirates NBD',
      currentCollateral: 'Cash Deposit',
      currentValue: 150000000,
      proposedCollateral: 'GFH Sukuk 2027',
      proposedValue: 160000000,
      reason: 'Yield Enhancement',
      submittedDate: '2025-01-14',
      status: 'Under Review',
      priority: 'Medium',
      haircutImpact: '+8.0%'
    },
    {
      id: 3,
      counterparty: 'Arab Banking Corp',
      currentCollateral: 'BBK Preferred Shares',
      currentValue: 100000000,
      proposedCollateral: 'BHR Treasury Bill 2025',
      proposedValue: 95000000,
      reason: 'Risk Reduction',
      submittedDate: '2025-01-13',
      status: 'Approved',
      priority: 'High',
      haircutImpact: '-13.0%'
    },
    {
      id: 4,
      counterparty: 'ADCB Bank',
      currentCollateral: 'Corporate Bond Mix',
      currentValue: 300000000,
      proposedCollateral: 'Government Securities',
      proposedValue: 320000000,
      reason: 'Regulatory Compliance',
      submittedDate: '2025-01-12',
      status: 'Pending Documentation',
      priority: 'Medium',
      haircutImpact: '-5.5%'
    }
  ];

  const optimizationProposalsData = [
    {
      id: 1,
      scenario: 'High-Grade Substitution',
      description: 'Replace low-rated corporates with government securities',
      estimatedSaving: 25000000,
      riskReduction: '15%',
      implementationCost: 150000,
      netBenefit: 24850000,
      timeToImplement: '3 days',
      status: 'Recommended'
    },
    {
      id: 2,
      scenario: 'Maturity Optimization',
      description: 'Adjust collateral portfolio maturity profile',
      estimatedSaving: 18000000,
      riskReduction: '8%',
      implementationCost: 95000,
      netBenefit: 17905000,
      timeToImplement: '5 days',
      status: 'Under Analysis'
    },
    {
      id: 3,
      scenario: 'Cross-Currency Hedge',
      description: 'Optimize foreign currency collateral exposure',
      estimatedSaving: 12000000,
      riskReduction: '22%',
      implementationCost: 280000,
      netBenefit: 11720000,
      timeToImplement: '7 days',
      status: 'Pending Approval'
    }
  ];

  const substitutionColumns = [
    { key: 'counterparty', label: 'Counterparty', type: 'text' as const, sortable: true },
    { key: 'currentCollateral', label: 'Current Collateral', type: 'text' as const },
    { key: 'currentValue', label: 'Current Value', type: 'currency' as const, sortable: true },
    { key: 'proposedCollateral', label: 'Proposed Collateral', type: 'text' as const },
    { key: 'proposedValue', label: 'Proposed Value', type: 'currency' as const, sortable: true },
    { key: 'reason', label: 'Reason', type: 'text' as const },
    { key: 'haircutImpact', label: 'Haircut Impact', type: 'text' as const, sortable: true },
    { key: 'submittedDate', label: 'Submitted', type: 'date' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Pending Approval', label: 'Pending Approval' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' }
      ]
    },
    { 
      key: 'priority', 
      label: 'Priority', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    }
  ];

  const proposalsColumns = [
    { key: 'scenario', label: 'Optimization Scenario', type: 'text' as const, sortable: true },
    { key: 'description', label: 'Description', type: 'text' as const },
    { key: 'estimatedSaving', label: 'Est. Saving', type: 'currency' as const, sortable: true },
    { key: 'riskReduction', label: 'Risk Reduction', type: 'text' as const, sortable: true },
    { key: 'implementationCost', label: 'Implementation Cost', type: 'currency' as const, sortable: true },
    { key: 'netBenefit', label: 'Net Benefit', type: 'currency' as const, sortable: true },
    { key: 'timeToImplement', label: 'Time to Implement', type: 'text' as const },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Recommended', label: 'Recommended' },
        { value: 'Under Analysis', label: 'Under Analysis' },
        { value: 'Pending Approval', label: 'Pending Approval' },
        { value: 'Implemented', label: 'Implemented' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader 
          title="Collateral Optimization"
          description="Manage daily collateral flows, substitution requests, and optimization proposals"
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {optimizationMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className={metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'neutral' ? 'text-blue-600' : 'text-red-600'}>
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

        {/* Daily Collateral Flows Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily Collateral Flows (BHD Millions)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveChart
              config={{
                type: "bar",
                title: "",
                data: dailyFlowsData.map(item => ({ 
                  name: item.name, 
                  value: item.pledges, 
                  color: item.color 
                })),
                height: 300
              }}
            />
          </CardContent>
        </Card>

        {/* Substitution Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Collateral Substitution Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Active Substitution Requests"
              columns={substitutionColumns}
              data={substitutionRequestsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>

        {/* Optimization Proposals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Optimization Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="System-Generated Optimization Scenarios"
              columns={proposalsColumns}
              data={optimizationProposalsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="collateral-optimization" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}