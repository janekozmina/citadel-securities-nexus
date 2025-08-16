import { DashboardConfig } from '@/hooks/useDashboardFilters';
import { ChartConfig } from '@/components/common/InteractiveChart';
import { getChartColors, chartColorSchemes } from '@/config/chartColors';

// Account Management Dashboard Configuration
export const accountManagementConfig: DashboardConfig = {
  defaultView: 'visual',
  searchFields: ['participantName', 'id', 'bankCode'],
  filters: [
    {
      key: 'currency',
      label: 'Currency',
      options: ['BHD', 'USD', 'EUR', 'TND']
    },
    {
      key: 'accountType',
      label: 'Account Type',
      options: ['SA', 'CA']
    }
  ]
};

// Transaction Status Dashboard Configuration
export const transactionStatusConfig: DashboardConfig = {
  defaultView: 'visual',
  searchFields: ['transactionId', 'fromParticipant', 'toParticipant'],
  filters: [
    {
      key: 'status',
      label: 'Status',
      options: ['Settled', 'Rejected', 'In Queue', 'ILF/BUYBACK']
    },
    {
      key: 'type',
      label: 'Type',
      options: ['Customer Transfer', 'Bank Transfer', 'Government Payment', 'Interbank Transfer']
    }
  ]
};

// Risk Dashboard Configuration
export const riskDashboardConfig: DashboardConfig = {
  defaultView: 'visual',
  searchFields: ['participantName', 'accountId'],
  filters: [
    {
      key: 'riskLevel',
      label: 'Risk Level',
      options: ['high', 'medium', 'low']
    },
    {
      key: 'accountType',
      label: 'Account Type',
      options: ['SA', 'CA']
    }
  ]
};

// Generic Dashboard Metrics Configuration
export interface MetricConfig {
  key: string;
  title: string;
  valueFormatter?: (value: any) => string;
  subtitleFormatter?: (data: any[]) => string;
  iconName: string;
  iconColor?: string;
  textColor?: string;
  filterKey?: string;
  filterValue?: string;
}

export const accountMetricsConfig: MetricConfig[] = [
  {
    key: 'totalAccounts',
    title: 'Total Accounts',
    iconName: 'Users',
    filterKey: 'accountType',
    filterValue: 'all'
  },
  {
    key: 'totalBalance',
    title: 'Total Balance',
    valueFormatter: (value) => `BHD ${value.toLocaleString()}`,
    iconName: 'DollarSign'
  },
  {
    key: 'activeAccounts',
    title: 'Active Accounts',
    iconName: 'CheckCircle',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'highRiskAccounts',
    title: 'High Risk Accounts',
    iconName: 'AlertTriangle',
    iconColor: 'text-red-600',
    textColor: 'text-red-600',
    filterKey: 'riskLevel',
    filterValue: 'high'
  }
];

// Chart Configurations with unified colors
const colors = getChartColors();

export const transactionStatusChartConfig: ChartConfig = {
  type: 'pie',
  title: 'Transaction Status Distribution',
  height: 380,
  data: [
    { name: 'Settled', value: 0, color: chartColorSchemes.transactionStatus.settled, filterKey: 'status', filterValue: 'Settled' },
    { name: 'Rejected', value: 0, color: chartColorSchemes.transactionStatus.rejected, filterKey: 'status', filterValue: 'Rejected' },
    { name: 'In Queue', value: 0, color: chartColorSchemes.transactionStatus.pending, filterKey: 'status', filterValue: 'In Queue' },
    { name: 'ILF/BUYBACK', value: 0, color: colors.getPieColors(4)[3], filterKey: 'status', filterValue: 'ILF/BUYBACK' }
  ]
};

export const accountRiskChartConfig: ChartConfig = {
  type: 'pie',
  title: 'Account Risk Distribution',
  height: 380,
  data: [
    { name: 'Low Risk', value: 0, color: chartColorSchemes.riskLevels.low, filterKey: 'riskLevel', filterValue: 'low' },
    { name: 'Medium Risk', value: 0, color: chartColorSchemes.riskLevels.medium, filterKey: 'riskLevel', filterValue: 'medium' },
    { name: 'High Risk', value: 0, color: chartColorSchemes.riskLevels.high, filterKey: 'riskLevel', filterValue: 'high' }
  ]
};

export const liquidityTrendChartConfig: ChartConfig = {
  type: 'bar',
  title: 'Liquidity Trend Analysis',
  height: 380,
  data: [
    { name: 'Morning', value: 0, color: colors.getBarColors(4)[0] },
    { name: 'Midday', value: 0, color: colors.getBarColors(4)[1] },
    { name: 'Afternoon', value: 0, color: colors.getBarColors(4)[2] },
    { name: 'Evening', value: 0, color: colors.getBarColors(4)[3] }
  ]
};

export const transactionMetricsConfig: MetricConfig[] = [
  {
    key: 'totalTransactions',
    title: 'Total Transactions',
    iconName: 'ArrowUpDown',
    filterKey: 'status',
    filterValue: 'all'
  },
  {
    key: 'settledTransactions',
    title: 'Settled Transactions',
    iconName: 'CheckCircle',
    iconColor: 'text-green-600',
    textColor: 'text-green-600',
    filterKey: 'status',
    filterValue: 'Settled'
  },
  {
    key: 'rejectedTransactions',
    title: 'Rejected Transactions',
    iconName: 'XCircle',
    iconColor: 'text-red-600',
    textColor: 'text-red-600',
    filterKey: 'status',
    filterValue: 'Rejected'
  },
  {
    key: 'queuedTransactions',
    title: 'Queued Transactions',
    iconName: 'Clock',
    iconColor: 'text-yellow-600',
    textColor: 'text-yellow-600',
    filterKey: 'status',
    filterValue: 'In Queue'
  },
  {
    key: 'ilfTransactions',
    title: 'ILF/BUYBACK Transactions',
    iconName: 'TrendingUp',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600',
    filterKey: 'status',
    filterValue: 'ILF/BUYBACK'
  }
];

// Account Statements Dashboard Configuration
export const accountStatementsConfig: DashboardConfig = {
  defaultView: 'visual',
  searchFields: ['accountCode', 'accountType', 'instrument'],
  filters: [
    {
      key: 'accountType',
      label: 'Account Type',
      options: ['Custody Accounts', 'Settlement Accounts', 'Margin Accounts']
    },
    {
      key: 'period',
      label: 'Period',
      options: ['Current Month', 'Previous Month', 'Quarter', 'Year']
    }
  ]
};

// Account Statements Metrics Configuration
export const accountStatementsMetricsConfig: MetricConfig[] = [
  {
    key: 'totalSecuritiesCustody',
    title: 'Total Securities Under Custody',
    valueFormatter: (value) => `BHD ${value.toLocaleString()}`,
    iconName: 'Shield',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'activeAccounts',
    title: 'Number of Active Accounts',
    iconName: 'Users',
    iconColor: 'text-green-600',
    textColor: 'text-green-600',
    filterKey: 'accountType',
    filterValue: 'active'
  },
  {
    key: 'debitTurnover',
    title: 'Total Debit Turnover (Period)',
    valueFormatter: (value) => `BHD ${value.toLocaleString()}`,
    iconName: 'TrendingDown',
    iconColor: 'text-red-600',
    textColor: 'text-red-600'
  },
  {
    key: 'creditTurnover',
    title: 'Total Credit Turnover (Period)',
    valueFormatter: (value) => `BHD ${value.toLocaleString()}`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'closingBalance',
    title: 'Closing Balance (End of Period)',
    valueFormatter: (value) => `BHD ${value.toLocaleString()}`,
    iconName: 'DollarSign',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  }
];

// Account Statements Chart Configurations
export const statementActivityChartConfig: ChartConfig = {
  type: 'bar',
  title: 'Statement Activity Overview',
  height: 380,
  data: [
    { name: 'Debit Turnover', value: 0, color: chartColorSchemes.financial.debit, filterKey: 'transactionType', filterValue: 'debit' },
    { name: 'Credit Turnover', value: 0, color: chartColorSchemes.financial.credit, filterKey: 'transactionType', filterValue: 'credit' }
  ]
};

export const accountTypeDistributionChartConfig: ChartConfig = {
  type: 'pie',
  title: 'Account Type Distribution',
  height: 380,
  data: [
    { name: 'Custody Accounts', value: 0, color: chartColorSchemes.accountTypes.custody, filterKey: 'accountType', filterValue: 'Custody Accounts' },
    { name: 'Settlement Accounts', value: 0, color: chartColorSchemes.accountTypes.settlement, filterKey: 'accountType', filterValue: 'Settlement Accounts' },
    { name: 'Margin Accounts', value: 0, color: chartColorSchemes.accountTypes.margin, filterKey: 'accountType', filterValue: 'Margin Accounts' }
  ]
};

export const accountMovementsTrendChartConfig: ChartConfig = {
  type: 'line',
  title: 'Account Movements Dashboard',
  height: 420,
  data: [
    { name: 'Jan', value: 0, color: colors.getPieColors(6)[0] },
    { name: 'Feb', value: 0, color: colors.getPieColors(6)[1] },
    { name: 'Mar', value: 0, color: colors.getPieColors(6)[2] },
    { name: 'Apr', value: 0, color: colors.getPieColors(6)[3] },
    { name: 'May', value: 0, color: colors.getPieColors(6)[4] },
    { name: 'Jun', value: 0, color: colors.getPieColors(6)[5] }
  ]
};