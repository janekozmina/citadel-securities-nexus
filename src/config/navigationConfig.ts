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
  Key
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
}

// Primary Navigation - Always visible (Material Design 3)
export const primaryNavigation: NavigationItem[] = [
  {
    id: 'home',
    title: 'Dashboard',
    path: '/',
    icon: Home,
    description: 'Main dashboard and overview',
    system: 'COMMON'
  },
  {
    id: 'rtgs',
    title: 'RTGS',
    path: '/rtgs',
    icon: Banknote,
    description: 'Real-Time Gross Settlement',
    system: 'RTGS',
    roles: ['Admin', 'CBBOperator', 'BankOperator']
  },
  {
    id: 'csd',
    title: 'CSD',
    path: '/csd',
    icon: Building2,
    description: 'Central Securities Depository',
    system: 'CSD',
    roles: ['Admin', 'CBBOperator', 'BankOperator', 'Broker', 'Custodian']
  },
  {
    id: 'cms',
    title: 'CMS',
    path: '/cms',
    icon: Shield,
    description: 'Collateral Management System',
    system: 'CMS',
    roles: ['Admin', 'CBBOperator', 'BankOperator', 'Custodian']
  },
  {
    id: 'reports',
    title: 'Reports',
    path: '/reports',
    icon: FileText,
    description: 'Reports and analytics',
    system: 'COMMON'
  },
  {
    id: 'admin',
    title: 'Admin',
    path: '/admin',
    icon: Settings,
    description: 'System administration',
    system: 'COMMON',
    roles: ['Admin', 'CBBOperator']
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
      description: 'RTGS system overview and statistics'
    },
    {
      id: 'financial-monitoring',
      title: 'Financial Monitoring',
      path: '/rtgs/financial-monitoring',
      icon: Activity,
      description: 'Financial monitoring and oversight',
      children: [
        {
          id: 'account-management',
          title: 'Account Management',
          path: '/rtgs/financial-monitoring/account-management',
          icon: Wallet,
          description: 'Manage participant accounts'
        },
        {
          id: 'balances-liquidity',
          title: 'Balances & Liquidity',
          path: '/rtgs/financial-monitoring/balances-liquidity',
          icon: PieChart,
          description: 'Real-time balances and liquidity'
        },
        {
          id: 'transaction-status',
          title: 'Transactions Status Amount / Volume',
          path: '/rtgs/financial-monitoring/transaction-status',
          icon: BarChart3,
          description: 'Transaction status and volumes'
        },
        {
          id: 'business-day-management',
          title: 'Business Day Management',
          path: '/rtgs/financial-monitoring/business-day-management',
          icon: Clock,
          description: 'Business day operations'
        },
        {
          id: 'billing',
          title: 'Billing',
          path: '/rtgs/financial-monitoring/billing',
          icon: FileText,
          description: 'Billing and fee management'
        },
        {
          id: 'bi-reports',
          title: 'BI Reports',
          path: '/rtgs/financial-monitoring/bi-reports',
          icon: BarChart3,
          description: 'Business intelligence reports'
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
      children: [
        {
          id: 'cash-operations',
          title: 'Cash Operations',
          path: '/rtgs/cb-operations/cash-operations',
          icon: DollarSign,
          description: 'Central bank cash operations'
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
      description: 'Securities market overview'
    },
    {
      id: 'csd-trading',
      title: 'Trading',
      path: '/csd/trading',
      icon: TrendingUp,
      description: 'Securities trading operations',
      roles: ['Admin', 'CBBOperator', 'BankOperator', 'Broker'],
      children: [
        {
          id: 'order-management',
          title: 'Order Management',
          path: '/csd/trading/orders',
          icon: Layers,
          description: 'Manage trading orders'
        },
        {
          id: 'trade-matching',
          title: 'Trade Matching',
          path: '/csd/trading/matching',
          icon: CheckCircle,
          description: 'Trade matching engine'
        },
        {
          id: 'market-data',
          title: 'Market Data',
          path: '/csd/trading/market-data',
          icon: Globe,
          description: 'Real-time market information'
        }
      ]
    },
    {
      id: 'csd-settlement',
      title: 'Settlement',
      path: '/csd/settlement',
      icon: CheckCircle,
      description: 'Trade settlement processing',
      children: [
        {
          id: 'settlement-status',
          title: 'Settlement Status',
          path: '/csd/settlement/status',
          icon: Clock,
          description: 'Track settlement progress'
        },
        {
          id: 'failed-settlements',
          title: 'Failed Settlements',
          path: '/csd/settlement/failed',
          icon: AlertTriangle,
          description: 'Manage failed settlements'
        },
        {
          id: 'settlement-calendar',
          title: 'Settlement Calendar',
          path: '/csd/settlement/calendar',
          icon: Database,
          description: 'Settlement schedule and calendar'
        }
      ]
    },
    {
      id: 'csd-custody',
      title: 'Custody Services',
      path: '/csd/custody',
      icon: Lock,
      description: 'Securities custody and safekeeping',
      roles: ['Admin', 'CBBOperator', 'Custodian'],
      children: [
        {
          id: 'holdings-management',
          title: 'Holdings Management',
          path: '/csd/custody/holdings',
          icon: Archive,
          description: 'Manage securities holdings'
        },
        {
          id: 'corporate-actions',
          title: 'Corporate Actions',
          path: '/csd/custody/corporate-actions',
          icon: FileText,
          description: 'Process corporate actions'
        },
        {
          id: 'client-reporting',
          title: 'Client Reporting',
          path: '/csd/custody/reporting',
          icon: FileText,
          description: 'Generate client reports'
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