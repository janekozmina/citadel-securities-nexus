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
    // Business Day Management Actions
    {
      id: 'add-period',
      label: 'Add Period',
      icon: Plus,
      category: 'business-day',
      description: 'Add new business day period'
    },
    {
      id: 'update-period',
      label: 'Update Period',
      icon: Edit,
      category: 'business-day',
      description: 'Update existing period settings'
    },
    {
      id: 'activate-period',
      label: 'Activate Period',
      icon: Check,
      category: 'business-day',
      description: 'Activate selected period'
    },
    {
      id: 'close-period',
      label: 'Close Period',
      icon: X,
      category: 'business-day',
      description: 'Close current active period'
    },
    {
      id: 'delete-period',
      label: 'Delete Period',
      icon: Trash,
      category: 'business-day',
      description: 'Delete selected period'
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
      id: 'configure-alert',
      label: 'Configure New Alert',
      icon: Plus,
      variant: 'default',
      category: 'Alerts',
      description: 'Configure new limit alert settings',
      permissions: ['csd.limits.alerts']
    },
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
    },
    {
      id: 'export-exposure-report',
      label: 'Export Exposure Report',
      icon: Download,
      variant: 'outline',
      category: 'Reports',
      description: 'Export detailed exposure analysis report',
      permissions: ['csd.exposure.export']
    },
    {
      id: 'set-alert-threshold',
      label: 'Set Alert/Threshold',
      icon: AlertTriangle,
      variant: 'outline',
      category: 'Risk',
      description: 'Configure exposure alerts and thresholds',
      permissions: ['csd.exposure.alerts']
    },
    {
      id: 'register-new',
      label: 'Register New',
      icon: Plus,
      variant: 'default',
      category: 'Registration',
      description: 'Register new instrument',
      permissions: ['csd.instruments.create']
    },
    {
      id: 'download-registry',
      label: 'Download Registry',
      icon: Download,
      variant: 'outline',
      category: 'Data',
      description: 'Download instruments registry',
      permissions: ['csd.instruments.export']
    },
    {
      id: 'view-calendar',
      label: 'View Calendar',
      icon: Calendar,
      variant: 'outline',
      category: 'Schedule',
      description: 'View issuance calendar',
      permissions: ['csd.instruments.schedule']
    },
    {
      id: 'set-alerts',
      label: 'Set Alerts',
      icon: AlertCircle,
      variant: 'outline',
      category: 'Monitoring',
      description: 'Configure instrument alerts',
      permissions: ['csd.instruments.alerts']
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
      id: 'access-bi-configuration',
      label: 'Access BI Configuration',
      icon: Settings,
      variant: 'default',
      category: 'BI',
      description: 'Access BI configuration dashboard',
    },
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
  ],

  // Participants System Quick Actions
  participants: [
    {
      id: 'access-unified-portal',
      label: 'Access Unified Portal',
      icon: ExternalLink,
      variant: 'default',
      category: 'Portal',
      description: 'Access the unified participant portal'
    },
    {
      id: 'access-onboarding-portal',
      label: 'Access Onboarding Portal',
      icon: ExternalLink,
      variant: 'default',
      category: 'Portal',
      description: 'Access the participant onboarding portal'
    },
    {
      id: 'monitor-sessions',
      label: 'Monitor Sessions',
      icon: Users,
      variant: 'outline',
      category: 'Monitoring',
      description: 'View active participant sessions'
    },
    {
      id: 'system-status',
      label: 'System Status',
      icon: Activity,
      variant: 'outline',
      category: 'Monitoring',
      description: 'Check portal system health'
    },
    {
      id: 'generate-reports',
      label: 'Generate Reports',
      icon: BarChart3,
      variant: 'outline',
      category: 'Reports',
      description: 'Create portal usage reports'
    },
    {
      id: 'new-application',
      label: 'New Application',
      icon: Plus,
      variant: 'default',
      category: 'Onboarding',
      description: 'Start new participant application'
    },
    {
      id: 'review-documents',
      label: 'Review Documents',
      icon: FileText,
      variant: 'outline',
      category: 'Onboarding',
      description: 'Review submitted documents'
    },
    {
      id: 'approve-application',
      label: 'Approve Application',
      icon: Check,
      variant: 'outline',
      category: 'Onboarding',
      description: 'Approve pending applications'
    },
    {
      id: 'send-notifications',
      label: 'Send Notifications',
      icon: Send,
      variant: 'outline',
      category: 'Onboarding',
      description: 'Send status notifications'
    }
  ]
};

// Quick Action URLs mapping
export const quickActionUrls: Record<string, string> = {
  'access-unified-portal': 'http://ifp.k8s1.cma.se/login',
  'access-onboarding-portal': 'http://ddw.k8s1.cma.se/',
  'access-configuration-panel': 'http://cn-dmrtgs-app01:5443/'
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

export const defaultQuickActions: Record<string, string[]> = {
  'business-day-management': ['add-period', 'update-period', 'activate-period', 'close-period', 'delete-period'],
  'balances-liquidity': ['liquidity-analysis', 'reserve-management', 'balance-alerts'],
  'account-management': ['show-total-balance', 'set-overdraft', 'suspend-account'],
  'financial-monitoring': ['system-status', 'audit-trail', 'refresh-data'],
  'settlement-hub': ['settlement-monitoring', 'trade-matching', 'risk-monitoring'],
  'collateral-manager': ['collateral-management', 'margin-calculation', 'risk-assessment'],
  'transaction-status': ['general-transfer', 'check-funds', 'liquidity-source', 'manual-gridlock'],
  'account-statements': ['download-statement', 'request-statement', 'reconciliation-report', 'export-data'],
  'islamic-sukuk': ['register-new', 'download-registry', 'view-calendar', 'set-alerts'],
  'instruments-summary': ['register-new', 'download-registry', 'view-calendar', 'set-alerts'],
  'register-cbb-instrument': ['register-new', 'download-registry', 'view-calendar', 'set-alerts'],
  'register-treasury-bill': ['register-new', 'download-registry', 'view-calendar', 'set-alerts'],
  'register-treasury-bond': ['register-new', 'download-registry', 'view-calendar', 'set-alerts'],
  'transfers': ['submit-transfer-instruction', 'amend-pending-instruction', 'cancel-instruction', 'download-instruction-report', 'notify-counterparty'],
  'limits-alerts': ['configure-alert'],
  'cash-operations': ['cash-withdrawal', 'cash-deposit', 'vault-reconciliation', 'cash-transfer', 'compliance-report'],
  'bi-reports': ['access-bi-configuration'],
  'rtgs-configuration': ['access-configuration-panel'],
  'csd-configuration': ['export-data', 'refresh-data'],
  'exposure-summary': ['export-exposure-report', 'set-alert-threshold', 'simulate-exposure-change'],
  'participant-unified-portal': ['access-unified-portal'],
  'participant-onboarding': ['access-onboarding-portal'],
  'default': ['export-data', 'refresh-data', 'advanced-search']
};