import { useState, useEffect } from 'react';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { 
  accountStatementsConfig,
  accountStatementsMetricsConfig,
  statementActivityChartConfig,
  accountTypeDistributionChartConfig,
  accountMovementsTrendChartConfig
} from '@/config/dashboardConfigs';
import { updateChartDataWithStats } from '@/utils/chartUtils';

// Mock data for account statements
const generateMockAccountStatements = () => {
  const accountTypes = ['Custody Accounts', 'Settlement Accounts', 'Margin Accounts'];
  const instruments = ['CBB-2024-001', 'CBB-2024-002', 'GOVT-TB-2024', 'SUKUK-2024-001'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `ACC-${String(i + 1).padStart(4, '0')}`,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    accountCode: `ACC-${String(i + 1).padStart(6, '0')}`,
    accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
    instrument: instruments[Math.floor(Math.random() * instruments.length)],
    debit: Math.random() > 0.5 ? Math.floor(Math.random() * 500000) : 0,
    credit: Math.random() > 0.5 ? Math.floor(Math.random() * 500000) : 0,
    closingBalance: Math.floor(Math.random() * 1000000) + 100000,
    participantName: `Participant ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
  }));
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
  const updatedActivityChart = updateChartDataWithStats(statementActivityChartConfig, {
    debit: stats.debitTurnover,
    credit: stats.creditTurnover
  });
  
  const updatedAccountTypeChart = updateChartDataWithStats(accountTypeDistributionChartConfig, stats);
  
  const updatedMovementsTrendChart = updateChartDataWithStats(accountMovementsTrendChartConfig, {
    Jan: Math.floor(Math.random() * 1000000),
    Feb: Math.floor(Math.random() * 1000000),
    Mar: Math.floor(Math.random() * 1000000),
    Apr: Math.floor(Math.random() * 1000000),
    May: Math.floor(Math.random() * 1000000),
    Jun: Math.floor(Math.random() * 1000000)
  });

  // Set chart click handlers
  updatedActivityChart.onSegmentClick = applyFilterAndSwitchView;
  updatedAccountTypeChart.onSegmentClick = applyFilterAndSwitchView;
  updatedMovementsTrendChart.onSegmentClick = applyFilterAndSwitchView;

  useEffect(() => {
    document.title = 'Account Statements | CBB Portal';
  }, []);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'accountCode', label: 'Account Code', sortable: true },
    { key: 'instrument', label: 'Security/Instrument', sortable: true },
    { 
      key: 'debit', 
      label: 'Debit', 
      sortable: true,
      render: (value: number) => value > 0 ? `BHD ${value.toLocaleString()}` : '-'
    },
    { 
      key: 'credit', 
      label: 'Credit', 
      sortable: true,
      render: (value: number) => value > 0 ? `BHD ${value.toLocaleString()}` : '-'
    },
    { 
      key: 'closingBalance', 
      label: 'Closing Balance', 
      sortable: true,
      render: (value: number) => `BHD ${value.toLocaleString()}`
    },
    { key: 'accountType', label: 'Account Type', sortable: true }
  ];

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-6">
        {/* KPI Metrics Cards */}
        <DashboardMetricsGrid
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
            tableColumns={[
              { key: 'accountCode', header: 'Account Code' },
              { key: 'debit', header: 'Debit Turnover', formatter: (value: number) => value > 0 ? `BHD ${value.toLocaleString()}` : '-' },
              { key: 'credit', header: 'Credit Turnover', formatter: (value: number) => value > 0 ? `BHD ${value.toLocaleString()}` : '-' },
              { key: 'accountType', header: 'Account Type' }
            ]}
            chartConfig={updatedActivityChart}
            defaultView="visual"
            onChartClick={applyFilterAndSwitchView}
          />

          <ConfigurableDashboardSection
            title="Account Type Distribution"
            description="Distribution by account categories"
            data={[
              { type: 'Custody Accounts', count: stats['Custody Accounts'], percentage: (stats['Custody Accounts'] / filteredData.length) * 100 },
              { type: 'Settlement Accounts', count: stats['Settlement Accounts'], percentage: (stats['Settlement Accounts'] / filteredData.length) * 100 },
              { type: 'Margin Accounts', count: stats['Margin Accounts'], percentage: (stats['Margin Accounts'] / filteredData.length) * 100 }
            ]}
            tableColumns={[
              { key: 'type', header: 'Account Type' },
              { key: 'count', header: 'Count' },
              { key: 'percentage', header: 'Percentage', formatter: (value: number) => `${value.toFixed(1)}%` }
            ]}
            chartConfig={updatedAccountTypeChart}
            defaultView="visual"
            onChartClick={applyFilterAndSwitchView}
          />
        </div>

        {/* Account Movements Dashboard */}
        <ConfigurableDashboardSection
          title="Account Movements Dashboard"
          description="Track balance trends and account movements over time"
          data={filteredData}
          tableColumns={columns}
          chartConfig={updatedMovementsTrendChart}
          defaultView={viewMode}
          onChartClick={applyFilterAndSwitchView}
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
  );
}