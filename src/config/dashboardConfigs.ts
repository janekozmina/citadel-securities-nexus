import { DashboardConfig } from '@/hooks/useDashboardFilters';

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