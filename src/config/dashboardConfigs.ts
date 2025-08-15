import { DashboardConfig } from '@/hooks/useDashboardFilters';
import { ChartConfig } from '@/components/common/InteractiveChart';

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

// Chart Configurations
export const transactionStatusChartConfig: ChartConfig = {
  type: 'pie',
  title: 'Transaction Status Distribution',
  height: 320,
  data: [
    { name: 'Settled', value: 0, color: '#22c55e', filterKey: 'status', filterValue: 'Settled' },
    { name: 'Rejected', value: 0, color: '#ef4444', filterKey: 'status', filterValue: 'Rejected' },
    { name: 'In Queue', value: 0, color: '#f59e0b', filterKey: 'status', filterValue: 'In Queue' },
    { name: 'ILF/BUYBACK', value: 0, color: '#8b5cf6', filterKey: 'status', filterValue: 'ILF/BUYBACK' }
  ]
};

export const accountRiskChartConfig: ChartConfig = {
  type: 'pie',
  title: 'Account Risk Distribution',
  height: 280,
  data: [
    { name: 'Low Risk', value: 0, color: '#22c55e', filterKey: 'riskLevel', filterValue: 'low' },
    { name: 'Medium Risk', value: 0, color: '#f59e0b', filterKey: 'riskLevel', filterValue: 'medium' },
    { name: 'High Risk', value: 0, color: '#ef4444', filterKey: 'riskLevel', filterValue: 'high' }
  ]
};

export const liquidityTrendChartConfig: ChartConfig = {
  type: 'bar',
  title: 'Liquidity Trend Analysis',
  height: 300,
  data: [
    { name: 'Morning', value: 0, color: '#3b82f6' },
    { name: 'Midday', value: 0, color: '#10b981' },
    { name: 'Afternoon', value: 0, color: '#f59e0b' },
    { name: 'Evening', value: 0, color: '#8b5cf6' }
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