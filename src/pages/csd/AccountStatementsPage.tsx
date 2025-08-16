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
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

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
  
  // Enhanced activity breakdown
  const totalTransactions = data.filter(item => item.debit > 0 || item.credit > 0).length;
  const debitTransactions = data.filter(item => item.debit > 0).length;
  const creditTransactions = data.filter(item => item.credit > 0).length;
  const avgDebitAmount = debitTransactions > 0 ? debitTurnover / debitTransactions : 0;
  const avgCreditAmount = creditTransactions > 0 ? creditTurnover / creditTransactions : 0;
  const netTurnover = creditTurnover - debitTurnover;
  
  // Account type distribution
  const accountTypeStats = data.reduce((acc, item) => {
    acc[item.accountType] = (acc[item.accountType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Activity by currency
  const currencyStats = data.reduce((acc, item) => {
    if (!acc[item.currency]) {
      acc[item.currency] = { debit: 0, credit: 0, count: 0 };
    }
    acc[item.currency].debit += item.debit;
    acc[item.currency].credit += item.credit;
    acc[item.currency].count += 1;
    return acc;
  }, {} as Record<string, { debit: number; credit: number; count: number }>);
  
  return {
    totalSecuritiesCustody,
    activeAccounts,
    debitTurnover,
    creditTurnover,
    closingBalance,
    totalTransactions,
    debitTransactions,
    creditTransactions,
    avgDebitAmount,
    avgCreditAmount,
    netTurnover,
    currencyStats,
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

  const [activityPeriod, setActivityPeriod] = useState('current-month');

  
  // Filter data based on activity period
  const getFilteredDataByPeriod = (period: string) => {
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'previous-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'last-3-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'last-6-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case 'current-quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'current-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'ytd':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default: // current-month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    return filteredData.filter(item => new Date(item.date) >= startDate);
  };

  const periodFilteredData = getFilteredDataByPeriod(activityPeriod);
  const stats = getStatementsStats(filteredData);

  // Calculate activity stats based on period
  const activityStats = getStatementsStats(periodFilteredData);

  // Remove titles from chart configs to avoid duplication and apply proper colors
  const colors = getChartColors();
  
  const updatedStatementActivityConfig = {
    ...statementActivityChartConfig,
    title: '', // Remove title since ConfigurableDashboardSection provides it
    data: [
      { 
        name: 'Total Debit', 
        value: activityStats.debitTurnover, 
        color: chartColorSchemes.financial.debit, 
        filterKey: 'transactionType', 
        filterValue: 'debit' 
      },
      { 
        name: 'Total Credit', 
        value: activityStats.creditTurnover, 
        color: chartColorSchemes.financial.credit, 
        filterKey: 'transactionType', 
        filterValue: 'credit' 
      },
      { 
        name: 'Net Flow', 
        value: Math.abs(activityStats.netTurnover), 
        color: activityStats.netTurnover >= 0 ? chartColorSchemes.financial.credit : chartColorSchemes.financial.debit, 
        filterKey: 'transactionType', 
        filterValue: 'net' 
      },
      { 
        name: 'Avg Debit', 
        value: Math.round(activityStats.avgDebitAmount), 
        color: colors.getPieColors(8)[3], 
        filterKey: 'transactionType', 
        filterValue: 'avg-debit' 
      },
      { 
        name: 'Avg Credit', 
        value: Math.round(activityStats.avgCreditAmount), 
        color: colors.getPieColors(8)[4], 
        filterKey: 'transactionType', 
        filterValue: 'avg-credit' 
      },
      { 
        name: 'Total Trans.', 
        value: activityStats.totalTransactions, 
        color: colors.getPieColors(8)[5], 
        filterKey: 'transactionType', 
        filterValue: 'total-transactions' 
      },
      { 
        name: 'Debit Count', 
        value: activityStats.debitTransactions, 
        color: colors.getPieColors(8)[6], 
        filterKey: 'transactionType', 
        filterValue: 'debit-count' 
      },
      { 
        name: 'Credit Count', 
        value: activityStats.creditTransactions, 
        color: colors.getPieColors(8)[7], 
        filterKey: 'transactionType', 
        filterValue: 'credit-count' 
      }
    ]
  };
  
  const updatedAccountTypeConfig = {
    ...accountTypeDistributionChartConfig,
    title: '', // Remove title since ConfigurableDashboardSection provides it
    data: [
      { 
        name: 'Custody Accounts', 
        value: stats['Custody Accounts'], 
        color: chartColorSchemes.accountTypes.custody, 
        filterKey: 'accountType', 
        filterValue: 'Custody Accounts' 
      },
      { 
        name: 'Settlement Accounts', 
        value: stats['Settlement Accounts'], 
        color: chartColorSchemes.accountTypes.settlement, 
        filterKey: 'accountType', 
        filterValue: 'Settlement Accounts' 
      },
      { 
        name: 'Margin Accounts', 
        value: stats['Margin Accounts'], 
        color: chartColorSchemes.accountTypes.margin, 
        filterKey: 'accountType', 
        filterValue: 'Margin Accounts' 
      }
    ]
  };
  
  const updatedAccountMovementsConfig = {
    ...accountMovementsTrendChartConfig,
    title: '', // Remove title since ConfigurableDashboardSection provides it
    data: assignColorsToData([
      { name: 'Jan', value: Math.floor(Math.random() * 1000000) },
      { name: 'Feb', value: Math.floor(Math.random() * 1000000) },
      { name: 'Mar', value: Math.floor(Math.random() * 1000000) },
      { name: 'Apr', value: Math.floor(Math.random() * 1000000) },
      { name: 'May', value: Math.floor(Math.random() * 1000000) },
      { name: 'Jun', value: Math.floor(Math.random() * 1000000) }
    ])
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
            titleFontSize="text-lg font-semibold"
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