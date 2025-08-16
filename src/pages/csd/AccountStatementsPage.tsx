import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { 
  accountStatementsConfig,
  accountStatementsMetricsConfig,
  statementActivityChartConfig,
  accountTypeDistributionChartConfig,
  accountMovementsTrendChartConfig
} from '@/config/dashboardConfigs';
import { updateChartDataWithStats } from '@/utils/chartUtils';
import portalConfig from '@/config/portalConfig';

// Mock data for account statements using portal configuration
const generateMockAccountStatements = () => {
  const accountTypes = ['Custody Accounts', 'Settlement Accounts', 'Margin Accounts'];
  const instruments = ['CBB-2024-001', 'CBB-2024-002', 'GOVT-TB-2024', 'SUKUK-2024-001'];
  const banks = portalConfig.banks.commercial;
  const currencies = portalConfig.currencies.supported;
  const primaryCurrency = portalConfig.currencies.primary;
  
  return Array.from({ length: 100 }, (_, i) => {
    const bank = banks[i % banks.length];
    const currency = i < 20 ? primaryCurrency : currencies[i % currencies.length];
    const accountType = accountTypes[Math.floor(Math.random() * accountTypes.length)];
    
    return {
      id: `ACC-${String(i + 1).padStart(4, '0')}`,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      accountCode: `${currency}-${portalConfig.banks.codes[bank] || 'UNK'}-${String(i + 1).padStart(6, '0')}`,
      accountType: accountType,
      instrument: instruments[Math.floor(Math.random() * instruments.length)],
      debit: Math.random() > 0.3 ? Math.floor(Math.random() * 2000000) : 0,
      credit: Math.random() > 0.3 ? Math.floor(Math.random() * 2500000) : 0,
      closingBalance: Math.floor(Math.random() * 5000000) + 500000,
      participantName: bank,
      currency: currency,
      bankCode: portalConfig.banks.codes[bank] || 'UNK'
    };
  });
};

const getStatementsStats = (data: any[]) => {
  const totalSecuritiesCustody = data.reduce((sum, item) => sum + item.closingBalance, 0);
  const activeAccounts = new Set(data.map(item => item.accountCode)).size;
  const debitTurnover = data.reduce((sum, item) => sum + item.debit, 0);
  const creditTurnover = data.reduce((sum, item) => sum + item.credit, 0);
  const closingBalance = data.reduce((sum, item) => sum + item.closingBalance, 0);
  
  // Account type distribution
  const accountTypeStats = data.reduce((acc, item) => {
    acc[item.accountType] = (acc[item.accountType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalSecuritiesCustody,
    activeAccounts,
    debitTurnover,
    creditTurnover,
    closingBalance,
    'Custody Accounts': accountTypeStats['Custody Accounts'] || 0,
    'Settlement Accounts': accountTypeStats['Settlement Accounts'] || 0,
    'Margin Accounts': accountTypeStats['Margin Accounts'] || 0
  };
};

export default function AccountStatementsPage() {
  const [statements] = useState(generateMockAccountStatements());
  const {
    viewMode,
    filteredData,
    activeFilters,
    searchTerm,
    hasActiveFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
    setSearchTerm,
    setViewMode,
    applyFilterAndSwitchView
  } = useDashboardFilters(statements, accountStatementsConfig);

  const stats = getStatementsStats(filteredData);

  // Update chart data with actual stats
  const updatedStatementActivityConfig = {
    ...statementActivityChartConfig,
    data: [
      { 
        name: 'Debit Turnover', 
        value: stats.debitTurnover, 
        color: '#ef4444', 
        filterKey: 'transactionType', 
        filterValue: 'debit' 
      },
      { 
        name: 'Credit Turnover', 
        value: stats.creditTurnover, 
        color: '#22c55e', 
        filterKey: 'transactionType', 
        filterValue: 'credit' 
      }
    ]
  };
  
  const updatedAccountTypeConfig = {
    ...accountTypeDistributionChartConfig,
    data: [
      { 
        name: 'Custody Accounts', 
        value: stats['Custody Accounts'], 
        color: '#3b82f6', 
        filterKey: 'accountType', 
        filterValue: 'Custody Accounts' 
      },
      { 
        name: 'Settlement Accounts', 
        value: stats['Settlement Accounts'], 
        color: '#f59e0b', 
        filterKey: 'accountType', 
        filterValue: 'Settlement Accounts' 
      },
      { 
        name: 'Margin Accounts', 
        value: stats['Margin Accounts'], 
        color: '#8b5cf6', 
        filterKey: 'accountType', 
        filterValue: 'Margin Accounts' 
      }
    ]
  };
  
  const updatedAccountMovementsConfig = {
    ...accountMovementsTrendChartConfig,
    data: [
      { name: 'Jan', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' },
      { name: 'Feb', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' },
      { name: 'Mar', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' },
      { name: 'Apr', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' },
      { name: 'May', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' },
      { name: 'Jun', value: Math.floor(Math.random() * 1000000), color: '#3b82f6' }
    ]
  };

  // Set chart click handlers
  updatedStatementActivityConfig.onSegmentClick = applyFilterAndSwitchView;
  updatedAccountTypeConfig.onSegmentClick = applyFilterAndSwitchView;
  updatedAccountMovementsConfig.onSegmentClick = applyFilterAndSwitchView;

  useEffect(() => {
    document.title = 'Account Statements | CBB Portal';
  }, []);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'accountCode', label: 'Account Code', sortable: true },
    { key: 'participantName', label: 'Participant', sortable: true },
    { key: 'currency', label: 'Currency', sortable: true },
    { key: 'instrument', label: 'Security/Instrument', sortable: true },
    { 
      key: 'debit', 
      label: 'Debit', 
      sortable: true,
      render: (value: number, row: any) => value > 0 ? `${row.currency} ${value.toLocaleString()}` : '-'
    },
    { 
      key: 'credit', 
      label: 'Credit', 
      sortable: true,
      render: (value: number, row: any) => value > 0 ? `${row.currency} ${value.toLocaleString()}` : '-'
    },
    { 
      key: 'closingBalance', 
      label: 'Closing Balance', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${value.toLocaleString()}`
    },
    { key: 'accountType', label: 'Account Type', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={accountStatementsMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Statement Activity Overview"
              description="Debit vs credit turnover analysis"
              data={filteredData}
              chartConfig={updatedStatementActivityConfig}
              defaultView="visual"
              showViewSwitcher={false}
            />

            <ConfigurableDashboardSection
              title="Account Type Distribution"
              description="Distribution by account categories"
              data={[
                { type: 'Custody Accounts', count: stats['Custody Accounts'], percentage: (stats['Custody Accounts'] / filteredData.length) * 100 },
                { type: 'Settlement Accounts', count: stats['Settlement Accounts'], percentage: (stats['Settlement Accounts'] / filteredData.length) * 100 },
                { type: 'Margin Accounts', count: stats['Margin Accounts'], percentage: (stats['Margin Accounts'] / filteredData.length) * 100 }
              ]}
              chartConfig={updatedAccountTypeConfig}
              defaultView="visual"
              showViewSwitcher={false}
            />
          </div>

          {/* Account Movements Dashboard */}
          <ConfigurableDashboardSection
            title="Account Movements Dashboard"
            description="Track balance trends and account movements over time"
            data={filteredData}
            tableColumns={columns}
            chartConfig={updatedAccountMovementsConfig}
            defaultView={viewMode}
            onChartClick={applyFilterAndSwitchView}
            showViewSwitcher={true}
          />
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="account-statements"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}