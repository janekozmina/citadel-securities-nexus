import { 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  AlertTriangle,
  FileText, 
  Settings, 
  Users, 
  BarChart3, 
  Clock, 
  Shield, 
  Zap, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  Filter, 
  Calendar, 
  Database, 
  Monitor,
  Activity,
  Target,
  Layers,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Edit,
  Trash,
  Save,
  Send,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowRightLeft,
  Calculator,
  Scissors,
  Flag,
  Building,
  ExternalLink,
  LucideIcon
} from 'lucide-react';

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  category: string;
  description?: string;
  permissions?: string[];
}

export const quickActionsConfig: Record<string, QuickAction[]> = {
  // RTGS Quick Actions
  rtgs: [
    {
      id: 'general-transfer',
      label: 'General Transfer',
      icon: ArrowRightLeft,
      category: 'transfers',
      description: 'Perform general fund transfers between accounts',
      permissions: ['rtgs.transfers.create']
    },
    {
      id: 'check-funds',
      label: 'Check Funds',
      icon: Search,
      category: 'monitoring',
      description: 'Check available funds and balances',
      permissions: ['rtgs.balances.view']
    },
    {
      id: 'liquidity-source',
      label: 'Liquidity Source',
      icon: TrendingUp,
      category: 'liquidity',
      description: 'View liquidity sources and distribution',
      permissions: ['rtgs.liquidity.view']
    },
    {
      id: 'manual-gridlock',
      label: 'Manual Gridlock',
      icon: AlertTriangle,
      category: 'operations',
      description: 'Manage and resolve payment gridlocks',
      permissions: ['rtgs.gridlock.manage']
    },
    {
      id: 'access-bi-full-view',
      label: 'Access BI Full View',
      icon: ExternalLink,
      variant: 'outline',
      category: 'Analytics',
      description: 'Open comprehensive business intelligence monitoring in a new tab',
      permissions: ['rtgs.bi.view']
    },
    {
      id: 'access-configuration-panel',
      label: 'Access Configuration Panel',
      icon: ExternalLink,
      variant: 'outline',
      category: 'configuration',
      description: 'Access external RTGS configuration panel',
      permissions: ['rtgs.config.access']
    },
    {
      id: 'cash-withdrawal',
      label: 'Cash Withdrawal',
      icon: DollarSign,
      variant: 'default',
      category: 'Operations',
      description: 'Process cash withdrawal request',
      permissions: ['rtgs.cash.withdraw']
    },
    {
      id: 'cash-deposit',
      label: 'Cash Deposit',
      icon: Plus,
      variant: 'default',
      category: 'Operations', 
      description: 'Process cash deposit transaction',
      permissions: ['rtgs.cash.deposit']
    },
    {
      id: 'vault-reconciliation',
      label: 'Vault Reconciliation',
      icon: Calculator,
      variant: 'outline',
      category: 'Operations',
      description: 'Reconcile vault balances',
      permissions: ['rtgs.cash.reconcile']
    },
    {
      id: 'cash-transfer',
      label: 'Cash Transfer',
      icon: ArrowRightLeft,
      variant: 'outline',
      category: 'Operations',
      description: 'Transfer cash between vaults',
      permissions: ['rtgs.cash.transfer']
    },
    {
      id: 'compliance-report',
      label: 'Compliance Report',
      icon: Shield,
      variant: 'outline',
      category: 'Compliance',
      description: 'Generate compliance report',
      permissions: ['rtgs.compliance.report']
    },
    {
      id: 'liquidity-analysis',
      label: 'Liquidity Analysis',
      icon: TrendingUp,
      variant: 'default',
      category: 'Analysis',
      description: 'Analyze real-time liquidity positions',
      permissions: ['rtgs.analysis']
    },
    {
      id: 'reserve-management',
      label: 'Reserve Management',
      icon: DollarSign,
      variant: 'outline',
      category: 'Management',
      description: 'Manage reserve requirements and balances',
      permissions: ['rtgs.reserves']
    },
    {
      id: 'balance-alerts',
      label: 'Balance Alerts',
      icon: AlertCircle,
      variant: 'outline',
      category: 'Monitoring',
      description: 'Configure and monitor balance alerts',
      permissions: ['rtgs.alerts']
    },
    {
      id: 'transaction-monitoring',
      label: 'Transaction Monitoring',
      icon: Monitor,
      variant: 'outline',
      category: 'Monitoring',
      description: 'Monitor real-time transactions',
      permissions: ['rtgs.monitoring']
    },
    {
      id: 'payment-processing',
      label: 'Payment Processing',
      icon: Send,
      variant: 'default',
      category: 'Operations',
      description: 'Process pending payments',
      permissions: ['rtgs.payments']
    },
    {
      id: 'financial-reports',
      label: 'Financial Reports',
      icon: FileText,
      variant: 'outline',
      category: 'Reports',
      description: 'Generate financial reports',
      permissions: ['rtgs.reports']
    },
    {
      id: 'system-status',
      label: 'System Status',
      icon: Activity,
      variant: 'outline',
      category: 'System',
      description: 'Check system health and status',
      permissions: ['rtgs.system']
    },
    {
      id: 'audit-trail',
      label: 'Audit Trail',
      icon: Search,
      variant: 'outline',
      category: 'Audit',
      description: 'View audit logs and trails',
      permissions: ['rtgs.audit']
    },
    {
      id: 'show-total-balance',
      label: 'Show Total',
      icon: Eye,
      variant: 'default',
      category: 'Accounts',
      description: 'Display total balance across all accounts',
      permissions: ['rtgs.accounts.view']
    },
    {
      id: 'set-overdraft',
      label: 'Set Overdraft',
      icon: Settings,
      variant: 'outline',
      category: 'Accounts',
      description: 'Configure overdraft limits for accounts',
      permissions: ['rtgs.accounts.manage']
    },
    {
      id: 'suspend-account',
      label: 'Suspend Account',
      icon: Lock,
      variant: 'destructive',
      category: 'Accounts',
      description: 'Suspend account operations',
      permissions: ['rtgs.accounts.suspend']
    }
  ],

  // CSD Quick Actions
  csd: [
    {
      id: 'settlement-monitoring',
      label: 'Settlement Monitoring',
      icon: Clock,
      variant: 'default',
      category: 'Settlement',
      description: 'Monitor settlement cycles',
      permissions: ['csd.settlement']
    },
    {
      id: 'trade-matching',
      label: 'Trade Matching',
      icon: Target,
      variant: 'outline',
      category: 'Trading',
      description: 'Match pending trades',
      permissions: ['csd.trading']
    },
    {
      id: 'custody-services',
      label: 'Custody Services',
      icon: Shield,
      variant: 'outline',
      category: 'Custody',
      description: 'Manage custody operations',
      permissions: ['csd.custody']
    },
    {
      id: 'corporate-actions',
      label: 'Corporate Actions',
      icon: Users,
      variant: 'outline',
      category: 'Operations',
      description: 'Process corporate actions',
      permissions: ['csd.corporate']
    },
    {
      id: 'securities-lending',
      label: 'Securities Lending',
      icon: ArrowRight,
      variant: 'outline',
      category: 'Lending',
      description: 'Manage securities lending',
      permissions: ['csd.lending']
    },
    {
      id: 'market-data',
      label: 'Market Data',
      icon: BarChart3,
      variant: 'outline',
      category: 'Data',
      description: 'Access market data feeds',
      permissions: ['csd.data']
    },
    {
      id: 'participant-management',
      label: 'Participant Management',
      icon: Users,
      variant: 'outline',
      category: 'Management',
      description: 'Manage CSD participants',
      permissions: ['csd.participants']
    },
    {
      id: 'risk-monitoring',
      label: 'Risk Monitoring',
      icon: AlertCircle,
      variant: 'outline',
      category: 'Risk',
      description: 'Monitor settlement risks',
      permissions: ['csd.risk']
    }
  ],

  // CMS Quick Actions
  cms: [
    {
      id: 'collateral-management',
      label: 'Collateral Management',
      icon: Shield,
      variant: 'default',
      category: 'Collateral',
      description: 'Manage collateral positions',
      permissions: ['cms.collateral']
    },
    {
      id: 'margin-calculation',
      label: 'Margin Calculation',
      icon: Calculator,
      variant: 'outline',
      category: 'Risk',
      description: 'Calculate margin requirements',
      permissions: ['cms.margin']
    },
    {
      id: 'risk-assessment',
      label: 'Risk Assessment',
      icon: AlertCircle,
      variant: 'outline',
      category: 'Risk',
      description: 'Assess counterparty risks',
      permissions: ['cms.risk']
    },
    {
      id: 'portfolio-optimization',
      label: 'Portfolio Optimization',
      icon: TrendingUp,
      variant: 'outline',
      category: 'Optimization',
      description: 'Optimize collateral portfolios',
      permissions: ['cms.optimization']
    },
    {
      id: 'haircut-management',
      label: 'Haircut Management',
      icon: Scissors,
      variant: 'outline',
      category: 'Valuation',
      description: 'Manage haircut policies',
      permissions: ['cms.haircuts']
    },
    {
      id: 'exposure-monitoring',
      label: 'Exposure Monitoring',
      icon: Eye,
      variant: 'outline',
      category: 'Monitoring',
      description: 'Monitor credit exposures',
      permissions: ['cms.exposure']
    },
    {
      id: 'stress-testing',
      label: 'Stress Testing',
      icon: Zap,
      variant: 'outline',
      category: 'Testing',
      description: 'Run stress test scenarios',
      permissions: ['cms.stress']
    },
    {
      id: 'regulatory-reporting',
      label: 'Regulatory Reporting',
      icon: FileText,
      variant: 'outline',
      category: 'Reports',
      description: 'Generate regulatory reports',
      permissions: ['cms.reports']
    }
  ],

  // Common Quick Actions (available across all systems)
  common: [
    {
      id: 'export-data',
      label: 'Export Data',
      icon: Download,
      variant: 'outline',
      category: 'Data',
      description: 'Export current data to Excel/CSV',
      permissions: ['*.export']
    },
    {
      id: 'import-data',
      label: 'Import Data',
      icon: Upload,
      variant: 'outline',
      category: 'Data',
      description: 'Import data from files',
      permissions: ['*.import']
    },
    {
      id: 'refresh-data',
      label: 'Refresh Data',
      icon: RefreshCw,
      variant: 'outline',
      category: 'Data',
      description: 'Refresh current view',
      permissions: ['*.view']
    },
    {
      id: 'advanced-search',
      label: 'Advanced Search',
      icon: Search,
      variant: 'outline',
      category: 'Search',
      description: 'Open advanced search filters',
      permissions: ['*.search']
    },
    {
      id: 'save-view',
      label: 'Save View',
      icon: Save,
      variant: 'outline',
      category: 'Preferences',
      description: 'Save current view settings',
      permissions: ['*.preferences']
    },
    {
      id: 'schedule-report',
      label: 'Schedule Report',
      icon: Calendar,
      variant: 'outline',
      category: 'Reports',
      description: 'Schedule automated reports',
      permissions: ['*.reports']
    }
  ]
};

// Account Statements specific actions
export const accountStatementsActions: QuickAction[] = [
  {
    id: 'download-statement',
    label: 'Download Latest Statement',
    icon: Download,
    category: 'statements',
    description: 'Download the most recent account statement',
    permissions: ['csd.statements.download']
  },
  {
    id: 'request-statement',
    label: 'Request On-Demand Statement',
    icon: FileText,
    category: 'statements',
    description: 'Generate a custom statement for specific period',
    permissions: ['csd.statements.generate']
  },
  {
    id: 'reconciliation-report',
    label: 'Generate Reconciliation Report',
    icon: Calculator,
    category: 'reports',
    description: 'Generate reconciliation report for account balances',
    permissions: ['csd.reconciliation.generate']
  },
  {
    id: 'flag-transaction',
    label: 'Flag Transaction for Review',
    icon: Flag,
    category: 'monitoring',
    description: 'Flag suspicious transactions for manual review',
    permissions: ['csd.transactions.flag']
  }
];

// Islamic Sukuk specific actions
export const islamicSukukActions: QuickAction[] = [
  {
    id: 'register-new-sukuk',
    label: 'Register New Sukuk',
    icon: Plus,
    category: 'registration',
    description: 'Register a new Islamic Sukuk instrument',
    permissions: ['csd.sukuk.register']
  },
  {
    id: 'view-issuer-details',
    label: 'View Issuer Details',
    icon: Eye,
    category: 'information',
    description: 'View detailed information about Sukuk issuers',
    permissions: ['csd.issuers.view']
  },
  {
    id: 'generate-sukuk-term-sheet',
    label: 'Generate Sukuk Term Sheet',
    icon: FileText,
    category: 'documents',
    description: 'Generate comprehensive term sheet for Sukuk',
    permissions: ['csd.sukuk.documents']
  },
  {
    id: 'export-maturity-schedule',
    label: 'Export Maturity Schedule',
    icon: Download,
    category: 'reports',
    description: 'Export detailed maturity schedule report',
    permissions: ['csd.sukuk.export']
  },
  {
    id: 'notify-investors-maturity',
    label: 'Notify Investors on Upcoming Maturity',
    icon: Send,
    category: 'notifications',
    description: 'Send maturity notifications to investors',
    permissions: ['csd.sukuk.notifications']
  }
];

// Transfers specific actions
export const transfersActions: QuickAction[] = [
  {
    id: 'submit-transfer-instruction',
    label: 'Submit New Transfer Instruction',
    icon: Plus,
    category: 'instructions',
    description: 'Submit a new transfer instruction',
    permissions: ['csd.transfers.create']
  },
  {
    id: 'amend-pending-instruction',
    label: 'Amend Pending Instruction',
    icon: Edit,
    category: 'instructions',
    description: 'Modify pending transfer instructions',
    permissions: ['csd.transfers.amend']
  },
  {
    id: 'cancel-instruction',
    label: 'Cancel Instruction',
    icon: X,
    category: 'instructions',
    description: 'Cancel pending transfer instructions',
    permissions: ['csd.transfers.cancel']
  },
  {
    id: 'download-instruction-report',
    label: 'Download Instruction Report',
    icon: Download,
    category: 'reports',
    description: 'Download detailed instruction report',
    permissions: ['csd.transfers.reports']
  },
  {
    id: 'notify-counterparty',
    label: 'Notify Counterparty',
    icon: Send,
    category: 'notifications',
    description: 'Send notifications to counterparties',
    permissions: ['csd.transfers.notify']
  }
];

// Add all specific actions to CSD system
quickActionsConfig.csd = [...quickActionsConfig.csd, ...islamicSukukActions, ...accountStatementsActions, ...transfersActions];

// Default Quick Actions for each page type
export const defaultQuickActions: Record<string, string[]> = {
  'balances-liquidity': ['liquidity-analysis', 'reserve-management', 'balance-alerts'],
  'account-management': ['show-total-balance', 'set-overdraft', 'suspend-account'],
  'financial-monitoring': ['system-status', 'audit-trail', 'refresh-data'],
  'settlement-hub': ['settlement-monitoring', 'trade-matching', 'risk-monitoring'],
  'collateral-manager': ['collateral-management', 'margin-calculation', 'risk-assessment'],
  'transaction-status': ['general-transfer', 'check-funds', 'liquidity-source', 'manual-gridlock'],
  'account-statements': ['download-statement', 'request-statement', 'reconciliation-report', 'export-data'],
  'islamic-sukuk': ['register-new-sukuk', 'view-issuer-details', 'generate-sukuk-term-sheet', 'export-maturity-schedule'],
  'transfers': ['submit-transfer-instruction', 'amend-pending-instruction', 'cancel-instruction', 'download-instruction-report', 'notify-counterparty'],
  'cash-operations': ['cash-withdrawal', 'cash-deposit', 'vault-reconciliation', 'cash-transfer', 'compliance-report'],
  'bi-reports': ['access-bi-full-view', 'refresh-data', 'export-data'],
  'rtgs-configuration': ['access-configuration-panel'],
  'csd-configuration': ['export-data', 'refresh-data'],
  'default': ['export-data', 'refresh-data', 'advanced-search']
};