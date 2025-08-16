// Navigation Configuration - Material Design 3 Navigation Drawer
// This file defines the complete navigation structure for the portal

import { 
  Home, 
  Banknote, 
  Building2, 
  Shield, 
  TrendingUp,
  Users,
  FileText,
  Settings,
  BarChart3,
  Clock,
  CreditCard,
  Database,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Wallet,
  DollarSign,
  PieChart,
  Activity,
  Layers,
  Search,
  Archive,
  UserCheck,
  BookOpen,
  Bell,
  Key,
  Monitor,
  Target,
  Briefcase,
  Calculator,
  Calendar,
  FileCheck,
  Gavel,
  TrendingDown,
  Eye,
  Scale,
  ShieldCheck,
  MessageSquare,
  Send,
  Inbox,
  Award,
  Zap,
  RefreshCw,
  AlertCircle,
  Flag,
  Coins,
  Receipt,
  ArrowUpDown,
  ArrowDownUp,
  PlayCircle,
  PauseCircle,
  XCircle,
  Grid3X3,
  FileBarChart,
  Download,
  Upload,
  UserPlus
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: any;
  description?: string;
  roles?: string[]; // Empty array means accessible to all roles
  system?: 'RTGS' | 'CSD' | 'CMS' | 'COMMON';
  children?: NavigationItem[];
  badge?: string;
  keywords?: string[]; // For search functionality
  tags?: string[]; // For categorized search
}

// Primary Navigation - Always visible (Material Design 3)
export const primaryNavigation: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    icon: Home,
    description: 'Main dashboard and overview',
    system: 'COMMON',
    keywords: ['home', 'dashboard', 'overview', 'main', 'portal'],
    tags: ['navigation', 'dashboard']
  },
  {
    id: 'rtgs',
    title: 'RTGS',
    path: '/rtgs',
    icon: Banknote,
    description: 'Real-Time Gross Settlement',
    system: 'RTGS',
    roles: ['Admin', 'CBBOperator', 'BankOperator'],
    keywords: ['rtgs', 'real-time', 'gross', 'settlement', 'payments', 'banking'],
    tags: ['payments', 'settlement', 'banking']
  },
  {
    id: 'csd',
    title: 'CSD',
    path: '/csd',
    icon: Building2,
    description: 'Central Securities Depository',
    system: 'CSD',
    roles: ['Admin', 'CBBOperator', 'BankOperator', 'Broker', 'Custodian'],
    keywords: ['csd', 'securities', 'depository', 'trading', 'custody', 'clearing'],
    tags: ['securities', 'trading', 'custody']
  },
  {
    id: 'cms',
    title: 'CMS',
    path: '/cms',
    icon: Shield,
    description: 'Collateral Management System',
    system: 'CMS',
    roles: ['Admin', 'CBBOperator', 'BankOperator', 'Custodian'],
    keywords: ['cms', 'collateral', 'management', 'risk', 'margin'],
    tags: ['collateral', 'risk', 'management']
  },
  {
    id: 'reports',
    title: 'Reports',
    path: '/reports',
    icon: FileText,
    description: 'Reports and analytics',
    system: 'COMMON',
    keywords: ['reports', 'analytics', 'reporting', 'data', 'insights'],
    tags: ['reporting', 'analytics']
  },
  {
    id: 'admin',
    title: 'Admin',
    path: '/admin',
    icon: Settings,
    description: 'System administration',
    system: 'COMMON',
    roles: ['Admin', 'CBBOperator'],
    keywords: ['admin', 'administration', 'settings', 'config', 'management'],
    tags: ['administration', 'settings']
  }
];

// Secondary Navigation - Contextual based on primary selection
export const secondaryNavigation: Record<string, NavigationItem[]> = {
  // RTGS System Navigation
  rtgs: [
    {
      id: 'rtgs-dashboard',
      title: 'RTGS Dashboard',
      path: '/rtgs',
      icon: BarChart3,
      description: 'RTGS system overview and statistics',
      keywords: ['dashboard', 'overview', 'statistics', 'monitoring']
    },
    {
      id: 'financial-monitoring',
      title: 'Financial Monitoring',
      path: '/rtgs/financial-monitoring',
      icon: Activity,
      description: 'Financial monitoring and oversight',
      keywords: ['financial', 'monitoring', 'oversight', 'supervision'],
      tags: ['monitoring', 'oversight'],
      children: [
        {
          id: 'account-management',
          title: 'Account Management',
          path: '/rtgs/financial-monitoring/account-management',
          icon: Wallet,
          description: 'Manage participant accounts',
          keywords: ['account', 'management', 'participants', 'balance'],
          tags: ['accounts', 'management']
        },
        {
          id: 'balances-liquidity',
          title: 'Balances & Liquidity',
          path: '/rtgs/financial-monitoring/balances-liquidity',
          icon: PieChart,
          description: 'Real-time balances and liquidity',
          keywords: ['balances', 'liquidity', 'real-time', 'funds', 'cash'],
          tags: ['balances', 'liquidity']
        },
        {
          id: 'transaction-status',
          title: 'Transactions Status Amount / Volume',
          path: '/rtgs/financial-monitoring/transaction-status',
          icon: BarChart3,
          description: 'Transaction status and volumes',
          keywords: ['transaction', 'status', 'amount', 'volume', 'payments'],
          tags: ['transactions', 'monitoring']
        },
        {
          id: 'business-day-management',
          title: 'Business Day Management',
          path: '/rtgs/financial-monitoring/business-day-management',
          icon: Clock,
          description: 'Business day operations',
          keywords: ['business', 'day', 'management', 'operations', 'schedule'],
          tags: ['operations', 'schedule']
        },
        {
          id: 'billing',
          title: 'Billing',
          path: '/rtgs/financial-monitoring/billing',
          icon: FileText,
          description: 'Billing and fee management',
          keywords: ['billing', 'fees', 'charges', 'invoicing', 'payment'],
          tags: ['billing', 'fees']
        },
        {
          id: 'bi-reports',
          title: 'BI Reports',
          path: '/rtgs/financial-monitoring/bi-reports',
          icon: BarChart3,
          description: 'Business intelligence reports',
          keywords: ['bi', 'business', 'intelligence', 'reports', 'analytics'],
          tags: ['reporting', 'analytics']
        }
      ]
    },
    {
      id: 'cb-operations',
      title: 'CB Operations',
      path: '/rtgs/cb-operations',
      icon: Building2,
      description: 'Central Bank operations',
      roles: ['Admin', 'CBBOperator'],
      keywords: ['central', 'bank', 'operations', 'cbb', 'monetary'],
      tags: ['central-bank', 'operations'],
      children: [
        {
          id: 'cash-operations',
          title: 'Cash Operations',
          path: '/rtgs/cb-operations/cash-operations',
          icon: DollarSign,
          description: 'Central bank cash operations',
          keywords: ['cash', 'operations', 'liquidity', 'central', 'bank'],
          tags: ['cash', 'operations']
        }
      ]
    }
  ],

  // CSD System Navigation
  csd: [
    {
      id: 'csd-dashboard',
      title: 'CSD Dashboard',
      path: '/csd',
      icon: BarChart3,
      description: 'Central Securities Depository overview'
    },
    {
      id: 'summary-hub',
      title: 'Summary Hub',
      path: '/csd/summary-hub',
      icon: Grid3X3,
      description: 'Central securities summary dashboard'
    },
    {
      id: 'daily-monitor',
      title: 'Daily Monitor',
      path: '/csd/daily-monitor',
      icon: Monitor,
      description: 'Daily operations monitoring'
    },
    {
      id: 'cbb-operations-hub',
      title: 'CBB Operations Hub',
      path: '/csd/cbb-operations-hub',
      icon: Target,
      description: 'Central Bank operations center',
      children: [
        {
          id: 'operations-summary',
          title: 'Operations Summary',
          path: '/csd/cbb-operations-hub/operations-summary',
          icon: BarChart3,
          description: 'Overview of all operations'
        }
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      path: '/csd/operations',
      icon: Briefcase,
      description: 'General operations management'
    },
    {
      id: 'accounts-balances',
      title: 'Accounts and Balances',
      path: '/csd/accounts-balances',
      icon: Calculator,
      description: 'Account and balance management',
      children: [
        {
          id: 'account-balances-summary',
          title: 'Account & Balances Summary',
          path: '/csd/accounts-balances/summary',
          icon: BarChart3,
          description: 'Account balances overview'
        },
        {
          id: 'account-statements',
          title: 'Account Statements',
          path: '/csd/accounts-balances/statements',
          icon: FileText,
          description: 'Account statement generation'
        }
      ]
    },
    {
      id: 'positions',
      title: 'Positions',
      path: '/csd/positions',
      icon: PieChart,
      description: 'Securities positions management',
      children: [
        {
          id: 'exposure-summary',
          title: 'Exposure Summary',
          path: '/csd/positions/exposure-summary',
          icon: AlertTriangle,
          description: 'Exposure analysis and summary'
        }
      ]
    },
    {
      id: 'instrument-management',
      title: 'Instrument Management',
      path: '/csd/instruments',
      icon: Database,
      description: 'Securities instrument management',
      children: [
        {
          id: 'instruments-summary',
          title: 'Instruments Summary',
          path: '/csd/instruments/summary',
          icon: BarChart3,
          description: 'Overview of all instruments'
        },
        {
          id: 'register-cbb-instrument',
          title: 'Register CBB Instrument',
          path: '/csd/instruments/register-cbb',
          icon: FileCheck,
          description: 'Register new CBB instruments'
        },
        {
          id: 'register-treasury-bill',
          title: 'Register Treasury Bill',
          path: '/csd/instruments/register-treasury-bill',
          icon: Receipt,
          description: 'Register treasury bills'
        },
        {
          id: 'register-treasury-bond',
          title: 'Register Treasury Bond',
          path: '/csd/instruments/register-treasury-bond',
          icon: Award,
          description: 'Register treasury bonds'
        },
        {
          id: 'register-islamic-sukuk',
          title: 'Register Islamic Sukuk',
          path: '/csd/instruments/register-islamic-sukuk',
          icon: BookOpen,
          description: 'Register Islamic Sukuk instruments'
        },
        {
          id: 'securities-issuance-other',
          title: 'Securities Issuance Other',
          path: '/csd/instruments/securities-issuance-other',
          icon: Layers,
          description: 'Other securities issuance'
        },
        {
          id: 'private-placement',
          title: 'Private Placement',
          path: '/csd/instruments/private-placement',
          icon: UserPlus,
          description: 'Private placement securities'
        },
        {
          id: 'status-management',
          title: 'Status Management',
          path: '/csd/instruments/status-management',
          icon: Flag,
          description: 'Instrument status management'
        },
        {
          id: 'instrument-types',
          title: 'Instrument Types',
          path: '/csd/instruments/types',
          icon: Settings,
          description: 'Configure instrument type parameters'
        }
      ]
    },
    {
      id: 'corporate-actions',
      title: 'Corporate Actions',
      path: '/csd/corporate-actions',
      icon: Gavel,
      description: 'Corporate actions management',
      children: [
        {
          id: 'corporate-actions-summary',
          title: 'Corporate Actions Summary',
          path: '/csd/corporate-actions/summary',
          icon: BarChart3,
          description: 'Corporate actions overview'
        },
        {
          id: 'coupon-reward',
          title: 'Coupon/reward',
          path: '/csd/corporate-actions/coupon-reward',
          icon: Coins,
          description: 'Coupon and reward processing'
        },
        {
          id: 'redemptions',
          title: 'Redemptions',
          path: '/csd/corporate-actions/redemptions',
          icon: RefreshCw,
          description: 'Security redemptions'
        },
        {
          id: 'early-redemptions',
          title: 'Early Redemptions',
          path: '/csd/corporate-actions/early-redemptions',
          icon: Zap,
          description: 'Early redemption processing'
        }
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions',
      path: '/csd/transactions',
      icon: ArrowUpDown,
      description: 'Transaction management',
      children: [
        {
          id: 'transactions-summary',
          title: 'Transactions Summary',
          path: '/csd/transactions/summary',
          icon: BarChart3,
          description: 'Transaction overview'
        },
        {
          id: 'documents-approval',
          title: 'Documents Approval',
          path: '/csd/transactions/documents-approval',
          icon: FileCheck,
          description: 'Document approval workflow'
        },
        {
          id: 'settled-transactions',
          title: 'Settled Transactions',
          path: '/csd/transactions/settled',
          icon: CheckCircle,
          description: 'Completed transactions'
        },
        {
          id: 'pending-transactions',
          title: 'Pending Transactions',
          path: '/csd/transactions/pending',
          icon: Clock,
          description: 'Pending transactions'
        },
        {
          id: 'failed-transactions',
          title: 'Failed Transactions',
          path: '/csd/transactions/failed',
          icon: XCircle,
          description: 'Failed transactions'
        },
        {
          id: 'transfers-dvf-dvp',
          title: 'Transfers (DvF / DvP)',
          path: '/csd/transactions/transfers',
          icon: ArrowUpDown,
          description: 'Delivery vs payment transfers'
        },
        {
          id: 'cross-border-settlement',
          title: 'Cross-Border Settlement',
          path: '/csd/transactions/cross-border',
          icon: Globe,
          description: 'International settlements'
        },
        {
          id: 'exchange-trades-settlement',
          title: 'Exchange Trades Settlement',
          path: '/csd/transactions/exchange-trades',
          icon: TrendingUp,
          description: 'Exchange trade settlements'
        },
        {
          id: 'clearing-manager',
          title: 'Clearing Manager',
          path: '/csd/transactions/clearing-manager',
          icon: ShieldCheck,
          description: 'Clearing management'
        },
        {
          id: 'payments-status',
          title: 'Payments Status',
          path: '/csd/transactions/payments-status',
          icon: CreditCard,
          description: 'Payment status tracking'
        }
      ]
    },
    {
      id: 'open-market-operations',
      title: 'Open Market Operations',
      path: '/csd/open-market-operations',
      icon: TrendingUp,
      description: 'Open market operations',
      children: [
        {
          id: 'auctions-summary',
          title: 'Auctions Summary',
          path: '/csd/open-market-operations/auctions-summary',
          icon: BarChart3,
          description: 'Auctions overview'
        },
        {
          id: 'active-auctions',
          title: 'Active Auctions',
          path: '/csd/open-market-operations/active-auctions',
          icon: PlayCircle,
          description: 'Currently active auctions'
        },
        {
          id: 'cb-auction',
          title: 'CB Auction',
          path: '/csd/open-market-operations/cb-auction',
          icon: Gavel,
          description: 'Central Bank auctions'
        },
        {
          id: 'repo-reverse-repo-auction',
          title: 'Repo/Reverse Repo Auction',
          path: '/csd/open-market-operations/repo-reverse-repo',
          icon: RefreshCw,
          description: 'Repo and reverse repo auctions'
        },
        {
          id: 'deposit-auction',
          title: 'Deposit Auction',
          path: '/csd/open-market-operations/deposit-auction',
          icon: Wallet,
          description: 'Deposit auctions'
        },
        {
          id: 'outright-auction',
          title: 'Outright Auction',
          path: '/csd/open-market-operations/outright-auction',
          icon: Target,
          description: 'Outright purchase auctions'
        },
        {
          id: 'fx-auction',
          title: 'FX Auction',
          path: '/csd/open-market-operations/fx-auction',
          icon: DollarSign,
          description: 'Foreign exchange auctions'
        },
        {
          id: 'fx-forward-auction',
          title: 'FX Forward Auction',
          path: '/csd/open-market-operations/fx-forward',
          icon: TrendingUp,
          description: 'FX forward auctions'
        },
        {
          id: 'fx-swap-auction',
          title: 'FX SWAP Auction',
          path: '/csd/open-market-operations/fx-swap',
          icon: ArrowUpDown,
          description: 'FX swap auctions'
        },
        {
          id: 'debt-switch-auction',
          title: 'Debt Switch Auction',
          path: '/csd/open-market-operations/debt-switch',
          icon: RefreshCw,
          description: 'Debt switch auctions'
        },
        {
          id: 'buyback-auction',
          title: 'Buyback Auction',
          path: '/csd/open-market-operations/buyback',
          icon: ArrowDownUp,
          description: 'Buyback auctions'
        }
      ]
    },
    {
      id: 'standing-facilities',
      title: 'Standing Facilities',
      path: '/csd/standing-facilities',
      icon: Building2,
      description: 'Standing facilities management',
      children: [
        {
          id: 'standing-operations-summary',
          title: 'Operations Summary',
          path: '/csd/standing-facilities/operations-summary',
          icon: BarChart3,
          description: 'Standing facilities overview'
        },
        {
          id: 'islamic-liquidity-summary',
          title: 'Islamic Liquidity Summary',
          path: '/csd/standing-facilities/islamic-liquidity-summary',
          icon: BookOpen,
          description: 'Islamic liquidity overview'
        },
        {
          id: 'ilf',
          title: 'ILF',
          path: '/csd/standing-facilities/ilf',
          icon: Wallet,
          description: 'Intraday Liquidity Facility'
        },
        {
          id: 'floor-facilities',
          title: 'Floor Facilities',
          path: '/csd/standing-facilities/floor-facilities',
          icon: TrendingDown,
          description: 'Floor lending facilities'
        },
        {
          id: 'lending-facilities',
          title: 'Lending Facilities',
          path: '/csd/standing-facilities/lending-facilities',
          icon: CreditCard,
          description: 'Lending facilities'
        },
        {
          id: 'deposit-facilities',
          title: 'Deposit Facilities',
          path: '/csd/standing-facilities/deposit-facilities',
          icon: Wallet,
          description: 'Deposit facilities'
        },
        {
          id: 'repo',
          title: 'Repo',
          path: '/csd/standing-facilities/repo',
          icon: RefreshCw,
          description: 'Repurchase agreements'
        },
        {
          id: 'reverse-repo',
          title: 'Reverse Repo',
          path: '/csd/standing-facilities/reverse-repo',
          icon: ArrowDownUp,
          description: 'Reverse repurchase agreements'
        },
        {
          id: 'islamic-deposits',
          title: 'Islamic Deposits (Wakala/ Murabaha)',
          path: '/csd/standing-facilities/islamic-deposits',
          icon: BookOpen,
          description: 'Islamic deposit products'
        },
        {
          id: 'islamic-lending',
          title: 'Islamic Lending against securities (ISLI)',
          path: '/csd/standing-facilities/islamic-lending',
          icon: Shield,
          description: 'Islamic securities lending'
        }
      ]
    },
    {
      id: 'liquidity-monitor',
      title: 'Liquidity Monitor',
      path: '/csd/liquidity-monitor',
      icon: Activity,
      description: 'Liquidity monitoring',
      children: [
        {
          id: 'liquidity-position-summary',
          title: 'Liquidity Position Summary',
          path: '/csd/liquidity-monitor/position-summary',
          icon: BarChart3,
          description: 'Liquidity position overview'
        },
        {
          id: 'liquidity-forecasting',
          title: 'Liquidity Forecasting',
          path: '/csd/liquidity-monitor/forecasting',
          icon: TrendingUp,
          description: 'Liquidity forecasting tools'
        }
      ]
    },
    {
      id: 'reserves-management',
      title: 'Reserves management',
      path: '/csd/reserves-management',
      icon: Archive,
      description: 'Reserve management',
      children: [
        {
          id: 'reserves-summary',
          title: 'Reserves Summary',
          path: '/csd/reserves-management/summary',
          icon: BarChart3,
          description: 'Reserves overview'
        }
      ]
    },
    {
      id: 'limits',
      title: 'Limits',
      path: '/csd/limits',
      icon: Scale,
      description: 'Limits management',
      children: [
        {
          id: 'limits-summary',
          title: 'Limits Summary',
          path: '/csd/limits/summary',
          icon: BarChart3,
          description: 'Limits overview'
        },
        {
          id: 'limits-alerts',
          title: 'Limits Alerts',
          path: '/csd/limits/alerts',
          icon: AlertCircle,
          description: 'Limit breach alerts'
        }
      ]
    },
    {
      id: 'reconciliation',
      title: 'Reconciliation',
      path: '/csd/reconciliation',
      icon: CheckCircle,
      description: 'Reconciliation processes',
      children: [
        {
          id: 'transaction-reconciliation',
          title: 'Transaction Reconciliation',
          path: '/csd/reconciliation/transactions',
          icon: CheckCircle,
          description: 'Transaction reconciliation'
        }
      ]
    },
    {
      id: 'investors-management',
      title: 'Investors Management',
      path: '/csd/investors-management',
      icon: Users,
      description: 'Investor management',
      children: [
        {
          id: 'investors-summary',
          title: 'Investors Summary',
          path: '/csd/investors-management/summary',
          icon: BarChart3,
          description: 'Investors overview'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting',
      path: '/csd/reporting',
      icon: FileBarChart,
      description: 'Reporting and analytics',
      children: [
        {
          id: 'reporting-summary',
          title: 'Summary',
          path: '/csd/reporting/summary',
          icon: BarChart3,
          description: 'Reporting summary'
        },
        {
          id: 'standard-reports',
          title: 'Standard Reports',
          path: '/csd/reporting/standard-reports',
          icon: FileText,
          description: 'Standard report templates'
        },
        {
          id: 'ad-hoc-reports',
          title: 'Ad-hoc Reports',
          path: '/csd/reporting/ad-hoc-reports',
          icon: Search,
          description: 'Custom ad-hoc reports'
        },
        {
          id: 'custom-reports',
          title: 'Custom Reports',
          path: '/csd/reporting/custom-reports',
          icon: Settings,
          description: 'Custom report builder'
        },
        {
          id: 'gl-posting',
          title: 'GL Posting',
          path: '/csd/reporting/gl-posting',
          icon: Calculator,
          description: 'General ledger posting'
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring',
      path: '/csd/monitoring',
      icon: Eye,
      description: 'System monitoring',
      children: [
        {
          id: 'system-monitoring',
          title: 'System monitoring',
          path: '/csd/monitoring/system',
          icon: Monitor,
          description: 'System health monitoring'
        },
        {
          id: 'audit-log-activity',
          title: 'Audit Log and Activity',
          path: '/csd/monitoring/audit-log',
          icon: FileText,
          description: 'Audit logs and activity tracking'
        },
        {
          id: 'suspicious-access-alerts',
          title: 'Suspicious Access Attempt Alerts',
          path: '/csd/monitoring/suspicious-access',
          icon: AlertTriangle,
          description: 'Security access alerts'
        },
        {
          id: 'suspensions',
          title: 'Suspensions',
          path: '/csd/monitoring/suspensions',
          icon: PauseCircle,
          description: 'Account suspensions'
        },
        {
          id: 'incoming-messages',
          title: 'Incoming Messages',
          path: '/csd/monitoring/incoming-messages',
          icon: Inbox,
          description: 'Incoming system messages'
        },
        {
          id: 'outgoing-messages',
          title: 'Outgoing Messages',
          path: '/csd/monitoring/outgoing-messages',
          icon: Send,
          description: 'Outgoing system messages'
        }
      ]
    }
  ],

  // CMS System Navigation
  cms: [
    {
      id: 'cms-dashboard',
      title: 'CMS Dashboard',
      path: '/cms',
      icon: BarChart3,
      description: 'Collateral management overview'
    },
    {
      id: 'cms-collateral',
      title: 'Collateral Management',
      path: '/cms/collateral',
      icon: Shield,
      description: 'Manage collateral assets',
      children: [
        {
          id: 'collateral-valuation',
          title: 'Collateral Valuation',
          path: '/cms/collateral/valuation',
          icon: DollarSign,
          description: 'Asset valuation and pricing'
        },
        {
          id: 'collateral-allocation',
          title: 'Collateral Allocation',
          path: '/cms/collateral/allocation',
          icon: PieChart,
          description: 'Allocate collateral to exposures'
        },
        {
          id: 'collateral-parameters',
          title: 'Collateral Parameters',
          path: '/collateral/haircut-matrix',
          icon: Settings,
          description: 'Configure haircut parameters and collateral settings'
        },
        {
          id: 'margin-calculation',
          title: 'Margin Calculation',
          path: '/cms/collateral/margin',
          icon: BarChart3,
          description: 'Calculate margin requirements'
        }
      ]
    },
    {
      id: 'cms-risk',
      title: 'Risk Management',
      path: '/cms/risk',
      icon: AlertTriangle,
      description: 'Risk monitoring and control',
      roles: ['Admin', 'CBBOperator'],
      children: [
        {
          id: 'exposure-monitoring',
          title: 'Exposure Monitoring',
          path: '/cms/risk/exposure',
          icon: Activity,
          description: 'Monitor counterparty exposures'
        },
        {
          id: 'stress-testing',
          title: 'Stress Testing',
          path: '/cms/risk/stress-testing',
          icon: AlertTriangle,
          description: 'Perform stress tests'
        },
        {
          id: 'limit-monitoring',
          title: 'Limit Monitoring',
          path: '/cms/risk/limits',
          icon: Lock,
          description: 'Monitor risk limits'
        }
      ]
    }
  ],

  // Reports Navigation
  reports: [
    {
      id: 'reports-dashboard',
      title: 'Reports Dashboard',
      path: '/reports',
      icon: BarChart3,
      description: 'Reporting overview and quick access'
    },
    {
      id: 'operational-reports',
      title: 'Operational Reports',
      path: '/reports/operational',
      icon: FileText,
      description: 'Daily operational reporting',
      children: [
        {
          id: 'daily-summary',
          title: 'Daily Summary',
          path: '/reports/operational/daily',
          icon: Clock,
          description: 'Daily operations summary'
        },
        {
          id: 'transaction-reports',
          title: 'Transaction Reports',
          path: '/reports/operational/transactions',
          icon: Archive,
          description: 'Detailed transaction reports'
        },
        {
          id: 'settlement-reports',
          title: 'Settlement Reports',
          path: '/reports/operational/settlement',
          icon: CheckCircle,
          description: 'Settlement activity reports'
        }
      ]
    },
    {
      id: 'regulatory-reports',
      title: 'Regulatory Reports',
      path: '/reports/regulatory',
      icon: FileText,
      description: 'Regulatory compliance reporting',
      roles: ['Admin', 'CBBOperator', 'Auditor'],
      children: [
        {
          id: 'regulatory-submission',
          title: 'Regulatory Submissions',
          path: '/reports/regulatory/submissions',
          icon: FileText,
          description: 'Submit regulatory reports'
        },
        {
          id: 'compliance-monitoring',
          title: 'Compliance Monitoring',
          path: '/reports/regulatory/compliance',
          icon: CheckCircle,
          description: 'Monitor compliance status'
        }
      ]
    }
  ],

  // Admin Navigation
  admin: [
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      path: '/admin',
      icon: BarChart3,
      description: 'System administration overview'
    },
    {
      id: 'user-management',
      title: 'User Management',
      path: '/admin/users',
      icon: Users,
      description: 'Manage system users',
      children: [
        {
          id: 'user-accounts',
          title: 'User Accounts',
          path: '/admin/users/accounts',
          icon: UserCheck,
          description: 'Manage user accounts'
        },
        {
          id: 'role-permissions',
          title: 'Roles & Permissions',
          path: '/admin/users/roles',
          icon: Key,
          description: 'Configure user roles and permissions'
        }
      ]
    },
    {
      id: 'system-config',
      title: 'System Configuration',
      path: '/admin/config',
      icon: Settings,
      description: 'System configuration and settings',
      children: [
        {
          id: 'business-calendar',
          title: 'Business Calendar',
          path: '/admin/config/calendar',
          icon: Database,
          description: 'Manage business calendar'
        },
        {
          id: 'system-parameters',
          title: 'System Parameters',
          path: '/admin/config/parameters',
          icon: Settings,
          description: 'Configure system parameters'
        }
      ]
    },
    {
      id: 'audit-logs',
      title: 'Audit & Logs',
      path: '/admin/audit',
      icon: Search,
      description: 'System audit and logging',
      children: [
        {
          id: 'audit-trail',
          title: 'Audit Trail',
          path: '/admin/audit/trail',
          icon: Archive,
          description: 'View system audit trail'
        },
        {
          id: 'system-logs',
          title: 'System Logs',
          path: '/admin/audit/logs',
          icon: FileText,
          description: 'Access system logs'
        }
      ]
    }
  ]
};

const navigationConfig = {
  primaryNavigation,
  secondaryNavigation
};

export default navigationConfig;