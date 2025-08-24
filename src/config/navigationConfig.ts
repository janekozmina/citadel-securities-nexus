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
  UserPlus,
  Filter
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
    id: 'admin',
    title: 'Administration',
    path: '/admin',
    icon: Settings,
    description: 'System administration',
    system: 'COMMON',
    roles: ['Admin', 'CBBOperator'],
    keywords: ['admin', 'administration', 'settings', 'config', 'management'],
    tags: ['administration', 'settings']
  },
  {
    id: 'participants',
    title: 'Participants',
    path: '/participants',
    icon: Users,
    description: 'Participant management and portals',
    system: 'COMMON',
    roles: ['Admin', 'CBBOperator'],
    keywords: ['participants', 'portals', 'onboarding', 'unified'],
    tags: ['participants', 'management']
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
      id: 'operations-hub',
      title: 'Operations Hub',
      path: '/csd/operations-hub',
      icon: Target,
      description: 'Central Bank operations center',
      children: [
        {
          id: 'operations',
          title: 'Operations',
          path: '/csd/operations-hub/operations',
          icon: Briefcase,
          description: 'General operations management'
        }
      ]
    },
    {
      id: 'accounts-balances',
      title: 'Accounts and Balances',
      path: '/csd/accounts-balances',
      icon: Calculator,
      description: 'Account and balance management',
      children: [
        {
          id: 'account-management',
          title: 'Account Management',
          path: '/csd/accounts-balances/summary',
          icon: BarChart3,
          description: 'CSD account management and balances overview'
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
        },
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
          description: 'View completed and settled transactions'
        },
        {
          id: 'pending-transactions',
          title: 'Pending Transactions',
          path: '/csd/transactions/pending',
          icon: Clock,
          description: 'Monitor pending transactions'
        },
        {
          id: 'failed-transactions',
          title: 'Failed Transactions',
          path: '/csd/transactions/failed',
          icon: XCircle,
          description: 'Review and manage failed transactions'
        },
        {
          id: 'transfers-dvp',
          title: 'Transfers (DvF / DvP)',
          path: '/csd/transactions/transfers',
          icon: ArrowDownUp,
          description: 'Delivery versus payment transfers'
        },
        {
          id: 'cross-border-settlement',
          title: 'Cross-Border Settlement',
          path: '/csd/transactions/cross-border-settlement',
          icon: Globe,
          description: 'Cross-border securities settlement'
        },
        {
          id: 'exchange-trades-settlement',
          title: 'Exchange Trades Settlement',
          path: '/csd/transactions/exchange-trades-settlement',
          icon: TrendingUp,
          description: 'Settlement of exchange-traded securities'
        },
        {
          id: 'clearing-manager',
          title: 'Clearing Manager',
          path: '/csd/transactions/clearing-manager',
          icon: Shield,
          description: 'Clearing operations management'
        },
        {
          id: 'payments-status',
          title: 'Payments Status',
          path: '/csd/transactions/payments-status',
          icon: CreditCard,
          description: 'Payment processing status monitoring'
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
  ],

  // CMS System Navigation
  participants: [
    {
      id: 'participant-unified-portal',
      title: 'Participant Unified Portal',
      path: '/participants/unified-portal',
      icon: Globe,
      description: 'Unified portal access and monitoring',
      keywords: ['unified', 'portal', 'access', 'monitoring']
    },
    {
      id: 'participant-onboarding',
      title: 'Participant Onboarding',
      path: '/participants/onboarding',
      icon: UserPlus,
      description: 'Participant onboarding management',
      keywords: ['onboarding', 'applications', 'setup']
    }
  ],

  cms: [
    {
      id: 'cms-dashboard',
      title: 'CMS Dashboard',
      path: '/cms',
      icon: BarChart3,
      description: 'Collateral management overview'
    },
    {
      id: 'eligibility-criteria-builder',
      title: 'Eligibility Criteria Builder',
      path: '/cms/eligibility-criteria-builder',
      icon: Filter,
      description: 'Build custom criteria for securities eligibility',
      keywords: ['eligibility', 'criteria', 'builder', 'securities', 'filter'],
      tags: ['tools', 'configuration']
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
          id: 'rtgs-user-accounts',
          title: 'RTGS User Accounts',
          path: '/admin/users/rtgs-accounts',
          icon: UserCheck,
          description: 'Manage RTGS user accounts'
        },
        {
          id: 'csd-cms-user-accounts',
          title: 'CSD / CMS User Accounts',
          path: '/admin/users/csd-cms-accounts',
          icon: UserCheck,
          description: 'Manage CSD and CMS user accounts'
        },
        {
          id: 'rtgs-role-permissions',
          title: 'RTGS Roles & Permissions',
          path: '/admin/users/rtgs-roles',
          icon: Key,
          description: 'Configure RTGS roles and permissions'
        },
        {
          id: 'csd-cms-role-permissions',
          title: 'CSD / CMS Roles & Permissions',
          path: '/admin/users/csd-cms-roles',
          icon: Key,
          description: 'Configure CSD and CMS roles and permissions'
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
          id: 'rtgs-config',
          title: 'RTGS Configuration',
          path: '/admin/config/rtgs',
          icon: Settings,
          description: 'Configure RTGS system parameters'
        },
        {
          id: 'csd-config',
          title: 'CSD Configuration',
          path: '/admin/config/csd',
          icon: Settings,
          description: 'Configure CSD system parameters'
        }
      ]
    },
  ]
};

const navigationConfig = {
  primaryNavigation,
  secondaryNavigation
};

export default navigationConfig;