import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Wallet, Building2, BarChart3, DollarSign } from 'lucide-react';

export default function BalancesOverviewPage() {
  // All Balances data
  const allBalancesData = [
    {
      id: 1,
      account: 'BOMMCDST',
      accountName: 'BOMM-CDST',
      type: 'CDST',
      servicer: 'DEPO',
      participant: 'DEPOUAXX',
      participantName: 'Central Securities Depository Registrar System',
      instrument: 'CUAEMBOM23669',
      instrumentName: 'CUAEMBOM23669',
      balanceType: 'AVAI',
      balanceName: 'Available Balance',
      income: 0.00,
      outcome: -20000000.00,
      available: -20000000.00,
      turnoverDef: '20,000,000'
    },
    {
      id: 2,
      account: 'SSCBISSU',
      accountName: 'CB ISSU',
      type: 'ISSU',
      servicer: 'DEPO',
      participant: 'CBAUAEAB',
      participantName: 'Central Bank',
      instrument: 'CUAEMBOM23669',
      instrumentName: 'CUAEMBOM23669',
      balanceType: 'ISSU',
      balanceName: 'Issued',
      income: 0.00,
      outcome: 19989990.00,
      available: 19989990.00,
      turnoverDef: '10,010'
    },
    {
      id: 3,
      account: 'EBILCASH',
      accountName: 'EBIL-CASH',
      type: 'CASH',
      servicer: 'RTGS',
      participant: 'EBILLEAD',
      participantName: 'Emirates NBD Bank',
      instrument: 'AED',
      instrumentName: 'AED',
      balanceType: 'AVAI',
      balanceName: 'Available Balance',
      income: -221319100.00,
      outcome: -245865651.69,
      available: -245865651.69,
      turnoverDef: '26,496,551'
    },
    {
      id: 4,
      account: 'ADCBDEPO',
      accountName: 'ADCB-DEPO',
      type: 'DEPO',
      servicer: 'DEPO',
      participant: 'ADCBAEAA',
      participantName: 'Abu Dhabi Commercial Bank',
      instrument: 'CUAEMBOM23669',
      instrumentName: 'CUAEMBOM23669',
      balanceType: 'BLOK',
      balanceName: 'Blocked',
      income: 102.00,
      outcome: 102.00,
      available: 102.00,
      turnoverDef: '41'
    },
    {
      id: 5,
      account: 'CB-AED',
      accountName: 'CB-AED',
      type: 'CASH',
      servicer: 'RTGS',
      participant: 'CBAUAEAB',
      participantName: 'Central Bank',
      instrument: 'AED',
      instrumentName: 'AED',
      balanceType: 'BLOK',
      balanceName: 'Blocked',
      income: 0.00,
      outcome: 0.00,
      available: 0.00,
      turnoverDef: '2,027,000'
    }
  ];

  // DEPO Accounts data
  const depoAccountsData = [
    {
      id: 1,
      account: 'BOMMCDST',
      accountName: 'BOMM-CDST',
      servicer: 'DEPOUAXX',
      participantName: 'Central Securities Depository Registrar System',
      instrument: 'CUAEMBOM23669',
      balanceType: 'AVAI',
      amount: -20000000.00,
      status: 'Active'
    },
    {
      id: 2,
      account: 'SSCBISSU',
      accountName: 'CB ISSU',
      servicer: 'CBAUAEAB',
      participantName: 'Central Bank',
      instrument: 'CUAEMBOM23669',
      balanceType: 'ISSU',
      amount: 19989990.00,
      status: 'Active'
    },
    {
      id: 3,
      account: 'ADCBDEPO',
      accountName: 'ADCB-DEPO',
      servicer: 'ADCBAEAA',
      participantName: 'Abu Dhabi Commercial Bank',
      instrument: 'CUAEMBOM23669',
      balanceType: 'BLOK',
      amount: 102.00,
      status: 'Active'
    },
    {
      id: 4,
      account: 'EBILDEPO',
      accountName: 'EBIL-DEPO',
      servicer: 'EBILLEAD',
      participantName: 'Emirates NBD Bank',
      instrument: 'CUAEMBOM23669',
      balanceType: 'AVAI',
      amount: 37.00,
      status: 'Active'
    }
  ];

  // Grouped Balances data
  const groupedBalancesData = [
    {
      id: 1,
      participant: 'Central Bank',
      currency: 'AED',
      totalAvailable: 778132050.86,
      totalBlocked: 0.00,
      totalIssued: 8000000000.00,
      netPosition: 8778132050.86
    },
    {
      id: 2,
      participant: 'Emirates NBD Bank',
      currency: 'AED',
      totalAvailable: -245865614.69,
      totalBlocked: 1000000.00,
      totalIssued: 0.00,
      netPosition: -244865614.69
    },
    {
      id: 3,
      participant: 'Abu Dhabi Commercial Bank',
      currency: 'AED',
      totalAvailable: 999995000.00,
      totalBlocked: 0.00,
      totalIssued: 0.00,
      netPosition: 999995000.00
    },
    {
      id: 4,
      participant: 'Central Securities Depository',
      currency: 'CUAEMBOM23669',
      totalAvailable: -10000000.00,
      totalBlocked: 0.00,
      totalIssued: 0.00,
      netPosition: -10000000.00
    }
  ];

  const allBalancesColumns = [
    { key: 'account', label: 'Account', type: 'text' as const, sortable: true },
    { key: 'accountName', label: 'Account Name', type: 'text' as const, sortable: true },
    { key: 'type', label: 'Type', type: 'text' as const, filterable: true },
    { key: 'participantName', label: 'Participant', type: 'text' as const, sortable: true },
    { key: 'instrumentName', label: 'Instrument', type: 'text' as const, sortable: true },
    { 
      key: 'balanceType', 
      label: 'Balance Type', 
      type: 'status' as const, 
      filterable: true,
      filterOptions: [
        { value: 'AVAI', label: 'Available' },
        { value: 'BLOK', label: 'Blocked' },
        { value: 'ISSU', label: 'Issued' },
        { value: 'TRAD', label: 'Trading' }
      ]
    },
    { key: 'income', label: 'Income', type: 'currency' as const, sortable: true },
    { key: 'outcome', label: 'Outcome', type: 'currency' as const, sortable: true },
    { key: 'available', label: 'Available', type: 'currency' as const, sortable: true },
    { key: 'turnoverDef', label: 'Turnover', type: 'text' as const, sortable: true }
  ];

  const depoAccountsColumns = [
    { key: 'account', label: 'Account', type: 'text' as const, sortable: true },
    { key: 'accountName', label: 'Account Name', type: 'text' as const, sortable: true },
    { key: 'participantName', label: 'Participant', type: 'text' as const, sortable: true },
    { key: 'instrument', label: 'Instrument', type: 'text' as const, sortable: true },
    { 
      key: 'balanceType', 
      label: 'Balance Type', 
      type: 'status' as const, 
      filterable: true,
      filterOptions: [
        { value: 'AVAI', label: 'Available' },
        { value: 'BLOK', label: 'Blocked' },
        { value: 'ISSU', label: 'Issued' }
      ]
    },
    { key: 'amount', label: 'Amount', type: 'currency' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const, 
      filterable: true,
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    }
  ];

  const groupedBalancesColumns = [
    { key: 'participant', label: 'Participant', type: 'text' as const, sortable: true },
    { key: 'currency', label: 'Currency', type: 'text' as const, filterable: true },
    { key: 'totalAvailable', label: 'Total Available', type: 'currency' as const, sortable: true },
    { key: 'totalBlocked', label: 'Total Blocked', type: 'currency' as const, sortable: true },
    { key: 'totalIssued', label: 'Total Issued', type: 'currency' as const, sortable: true },
    { key: 'netPosition', label: 'Net Position', type: 'currency' as const, sortable: true }
  ];

  const summaryMetrics = [
    {
      title: 'Total Accounts',
      value: '183',
      description: 'Active balance accounts',
      icon: Wallet,
      trend: '+2.3%'
    },
    {
      title: 'Total Participants',
      value: '12',
      description: 'Active participants',
      icon: Building2,
      trend: '+1.2%'
    },
    {
      title: 'Net AED Position',
      value: '8.5B',
      description: 'Total net position',
      icon: DollarSign,
      trend: '+5.7%'
    },
    {
      title: 'Active Instruments',
      value: '45',
      description: 'Total instruments',
      icon: BarChart3,
      trend: '+3.1%'
    }
  ];

  return (
    <div className="space-y-6">
      <QuickActionsManager pageKey="balances-overview" systemType="csd" />
      
      <PageHeader 
        title="Balances Overview"
        description="Comprehensive view of all account balances across the system"
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <metric.icon className="h-8 w-8 text-primary mb-2" />
                  <Badge variant="secondary" className="text-xs">
                    {metric.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Balances Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            All Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            title="All Balances"
            columns={allBalancesColumns}
            data={allBalancesData}
            searchable={true}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>

      {/* DEPO Accounts Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Balances DEPO Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            title="DEPO Accounts Balances"
            columns={depoAccountsColumns}
            data={depoAccountsData}
            searchable={true}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>

      {/* Grouped Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Balances (Grouped)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            title="Grouped Balances"
            columns={groupedBalancesColumns}
            data={groupedBalancesData}
            searchable={true}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}