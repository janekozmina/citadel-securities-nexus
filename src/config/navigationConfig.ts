import { 
  Home, 
  Building2, 
  Shield, 
  Settings, 
  Users,
  Monitor,
  Banknote,
  RefreshCw,
  CreditCard,
  Vault,
  Droplets,
  Gavel,
  FileText,
  Database,
  TrendingUp,
  DollarSign,
  BookOpen,
  AlertTriangle,
  Search
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  roles: string[];
  icon: any;
  children?: NavigationItem[];
  description?: string;
  badge?: string;
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    url: '/',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Participant', 'Regulator'],
    icon: Home,
    description: 'Dashboard overview and system status'
  },
  {
    id: 'rtgs',
    title: 'RTGS',
    url: '/rtgs',
    roles: ['Admin'],
    icon: Banknote,
    description: 'Real-Time Gross Settlement System',
    children: [
      { 
        id: 'rtgs-financial-monitoring',
        title: 'Financial Monitoring', 
        url: '/rtgs/financial-monitoring', 
        roles: ['Admin'], 
        icon: Monitor,
        children: [
          { 
            id: 'rtgs-account-management',
            title: 'Account Management', 
            url: '/rtgs/financial-monitoring/account-management', 
            roles: ['Admin'], 
            icon: Users 
          },
          { 
            id: 'rtgs-balances-liquidity',
            title: 'Balances & Liquidity', 
            url: '/rtgs/financial-monitoring/balances-liquidity', 
            roles: ['Admin'], 
            icon: DollarSign 
          },
          { 
            id: 'rtgs-transaction-status',
            title: 'Transaction Status', 
            url: '/rtgs/financial-monitoring/transaction-status', 
            roles: ['Admin'], 
            icon: TrendingUp 
          },
          { 
            id: 'rtgs-business-day-management',
            title: 'Business Day Management', 
            url: '/rtgs/financial-monitoring/business-day-management', 
            roles: ['Admin'], 
            icon: RefreshCw 
          },
          { 
            id: 'rtgs-billing',
            title: 'Billing', 
            url: '/rtgs/financial-monitoring/billing', 
            roles: ['Admin'], 
            icon: DollarSign 
          }
        ]
      },
      { 
        id: 'rtgs-central-bank-operations',
        title: 'Central Bank Operations', 
        url: '/rtgs/central-bank-operations', 
        roles: ['Admin'], 
        icon: Building2,
        children: [
          { 
            id: 'rtgs-cash-flow-overview',
            title: 'Real-Time Cash Flow Overview', 
            url: '/rtgs/central-bank-operations/cash-flow-overview', 
            roles: ['Admin'], 
            icon: TrendingUp 
          }
        ]
      },
      { 
        id: 'rtgs-anomaly-detection',
        title: 'Anomaly Detection', 
        url: '/rtgs/anomaly-detection', 
        roles: ['Admin'], 
        icon: AlertTriangle 
      },
      { 
        id: 'rtgs-dispute-management',
        title: 'Dispute Management', 
        url: '/rtgs/dispute-management', 
        roles: ['Admin'], 
        icon: Gavel 
      }
    ]
  },
  {
    id: 'csd',
    title: 'CSD',
    url: '/csd',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker'],
    icon: Building2,
    description: 'Central Securities Depository',
    children: [
      { 
        id: 'csd-operations',
        title: 'Operations', 
        url: '/operations', 
        roles: ['Admin'], 
        icon: RefreshCw 
      },
      { 
        id: 'csd-securities-lifecycle',
        title: 'Securities Lifecycle', 
        url: '/securities',
        roles: ['Admin'],
        icon: CreditCard,
        children: [
          { 
            id: 'securities-instrument-reference',
            title: 'Instrument Reference', 
            url: '/securities/instrument-reference', 
            roles: ['Admin'], 
            icon: FileText 
          },
          { 
            id: 'securities-issuance',
            title: 'Issuance', 
            url: '/securities/issuance', 
            roles: ['Admin'], 
            icon: FileText 
          },
          { 
            id: 'securities-corporate-actions',
            title: 'Corporate Actions', 
            url: '/securities/corporate-actions', 
            roles: ['Admin'], 
            icon: FileText 
          }
        ]
      },
      { 
        id: 'csd-trading',
        title: 'Trading', 
        url: '/trading',
        roles: ['Admin'],
        icon: TrendingUp,
        children: [
          { 
            id: 'trading-trade-matching',
            title: 'Trade Matching', 
            url: '/trading', 
            roles: ['Admin'], 
            icon: DollarSign 
          },
          { 
            id: 'trading-transfer-instruction',
            title: 'Transfer Instruction', 
            url: '/trading/transfer-instruction', 
            roles: ['Admin'], 
            icon: DollarSign 
          },
          { 
            id: 'trading-order-management',
            title: 'Order Management', 
            url: '/trading/order-management', 
            roles: ['Admin'], 
            icon: DollarSign 
          },
          { 
            id: 'trading-auctions',
            title: 'Auctions Trading Monitor', 
            url: '/trading/auctions', 
            roles: ['Admin'], 
            icon: DollarSign 
          },
          { 
            id: 'trading-bilateral',
            title: 'Bilateral Trading Monitor', 
            url: '/trading/bilateral', 
            roles: ['Admin'], 
            icon: DollarSign 
          }
        ]
      },
      { 
        id: 'csd-clearing-hub',
        title: 'Clearing Hub', 
        url: '/clearing',
        roles: ['Admin'],
        icon: Vault,
        children: [
          { 
            id: 'clearing-manager',
            title: 'Clearing Manager', 
            url: '/clearing/manager', 
            roles: ['Admin'], 
            icon: Settings 
          },
          { 
            id: 'clearing-margin',
            title: 'Margin Calculation', 
            url: '/clearing/margin', 
            roles: ['Admin'], 
            icon: Settings 
          },
          { 
            id: 'clearing-default',
            title: 'Default Management', 
            url: '/clearing/default', 
            roles: ['Admin'], 
            icon: Settings 
          },
          { 
            id: 'clearing-ccp',
            title: 'CCP Dashboard', 
            url: '/clearing/ccp', 
            roles: ['Admin'], 
            icon: Settings 
          }
        ]
      },
      { 
        id: 'csd-settlement-hub',
        title: 'Settlement Hub', 
        url: '/settlement', 
        roles: ['Admin'], 
        icon: RefreshCw 
      },
      { 
        id: 'csd-custody-hub',
        title: 'Custody Hub', 
        url: '/custody', 
        roles: ['Admin'], 
        icon: Vault 
      },
      { 
        id: 'csd-liquidity-hub',
        title: 'Liquidity Hub', 
        url: '/liquidity',
        roles: ['Admin'],
        icon: Droplets,
        children: [
          { 
            id: 'liquidity-tri-party-repo',
            title: 'Tri-Party REPO Services', 
            url: '/liquidity/tri-party-repo', 
            roles: ['Admin'], 
            icon: Droplets 
          },
          { 
            id: 'liquidity-central-bank',
            title: 'Central Bank Liquidity Management', 
            url: '/liquidity/central-bank-liquidity', 
            roles: ['Admin'], 
            icon: Droplets 
          },
          { 
            id: 'liquidity-islamic-repo',
            title: 'Islamic REPO', 
            url: '/liquidity/islamic-repo', 
            roles: ['Admin'], 
            icon: Droplets 
          }
        ]
      },
      { 
        id: 'csd-risk-management',
        title: 'Risk Management', 
        url: '/risk', 
        roles: ['Admin'], 
        icon: Shield 
      },
      { 
        id: 'csd-auction-management',
        title: 'Auction Management', 
        url: '/auction', 
        roles: ['Admin'], 
        icon: Gavel 
      },
      { 
        id: 'csd-investor-services',
        title: 'Investor Services Hub', 
        url: '/investor-services', 
        roles: ['Admin'], 
        icon: Users 
      },
      { 
        id: 'csd-reporting',
        title: 'Reporting & Compliance', 
        url: '/reporting', 
        roles: ['Admin'], 
        icon: FileText 
      }
    ]
  },
  {
    id: 'cms',
    title: 'CMS',
    url: '/cms',
    roles: ['Admin'],
    icon: Shield,
    description: 'Collateral Management System',
    children: [
      { 
        id: 'cms-collateral-manager',
        title: 'Collateral Manager', 
        url: '/collateral/manager', 
        roles: ['Admin'], 
        icon: Vault 
      },
      { 
        id: 'cms-collateral-optimization',
        title: 'Collateral Optimization AI', 
        url: '/collateral/optimization', 
        roles: ['Admin'], 
        icon: Vault 
      }
    ]
  },
  {
    id: 'knowledge-hub',
    title: 'Knowledge Hub',
    url: '/knowledge',
    roles: ['Admin'],
    icon: BookOpen,
    description: 'Documentation and knowledge management',
    children: [
      { 
        id: 'knowledge-search',
        title: 'Documentation Search', 
        url: '/knowledge/search', 
        roles: ['Admin'], 
        icon: Search 
      },
      { 
        id: 'knowledge-findings',
        title: 'Findings', 
        url: '/knowledge/findings', 
        roles: ['Admin'], 
        icon: FileText 
      }
    ]
  },
  {
    id: 'administration',
    title: 'Administration',
    url: '/administration',
    roles: ['Admin'],
    icon: Settings,
    description: 'System administration and configuration',
    children: [
      {
        id: 'admin-integrations',
        title: 'Integrations Management',
        url: '/admin/integrations',
        roles: ['Admin'],
        icon: Settings
      },
      {
        id: 'admin-market-data',
        title: 'Market Data',
        url: '/admin/market-data',
        roles: ['Admin'],
        icon: TrendingUp
      },
      {
        id: 'admin-static-data',
        title: 'Static Data Management',
        url: '/admin/static-data',
        roles: ['Admin'],
        icon: Database
      },
      {
        id: 'admin-system-monitoring',
        title: 'System Monitoring',
        url: '/admin',
        roles: ['Admin'],
        icon: Settings
      },
      {
        id: 'admin-system-administration',
        title: 'System Administration',
        url: '/monitoring',
        roles: ['Admin'],
        icon: Monitor
      },
      {
        id: 'admin-user-management',
        title: 'User Management',
        url: '/users',
        roles: ['Admin'],
        icon: Users
      },
      { 
        id: 'admin-rtgs-config',
        title: 'RTGS Configuration', 
        url: '/admin/rtgs-config', 
        roles: ['Admin'], 
        icon: Settings,
        children: [
          { 
            id: 'admin-form-configuration',
            title: 'Form Configuration', 
            url: '/admin/rtgs-config/forms', 
            roles: ['Admin'], 
            icon: FileText 
          }
        ]
      },
      {
        id: 'admin-master-data',
        title: 'Master Data Management',
        url: '/masterdata',
        roles: ['Admin'],
        icon: Database
      }
    ]
  }
];

export default navigationConfig;