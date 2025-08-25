import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { secondaryNavigation } from '@/config/navigationConfig';

interface RouteInfo {
  path: string;
  label: string;
  parent?: string;
}

const routeMap: Record<string, RouteInfo> = {
  '/': { path: '/', label: 'Home' },
  
  // RTGS Routes
  '/rtgs': { path: '/rtgs', label: 'RTGS' },
  '/rtgs/financial-monitoring': { path: '/rtgs/financial-monitoring', label: 'Financial Monitoring', parent: '/rtgs' },
  '/rtgs/financial-monitoring/account-management': { path: '/rtgs/financial-monitoring/account-management', label: 'Account Management', parent: '/rtgs/financial-monitoring' },
  '/rtgs/financial-monitoring/balances-liquidity': { path: '/rtgs/financial-monitoring/balances-liquidity', label: 'Balances & Liquidity', parent: '/rtgs/financial-monitoring' },
  '/rtgs/financial-monitoring/transaction-status': { path: '/rtgs/financial-monitoring/transaction-status', label: 'Transaction Status', parent: '/rtgs/financial-monitoring' },
  '/rtgs/central-bank-operations': { path: '/rtgs/central-bank-operations', label: 'Central Bank Operations', parent: '/rtgs' },
  '/rtgs/business-day-management': { path: '/rtgs/business-day-management', label: 'Business Day Management', parent: '/rtgs' },
  '/rtgs/anomaly-detection': { path: '/rtgs/anomaly-detection', label: 'Anomaly Detection', parent: '/rtgs' },
  '/rtgs/dispute-management': { path: '/rtgs/dispute-management', label: 'Dispute Management', parent: '/rtgs' },
  '/rtgs/billing': { path: '/rtgs/billing', label: 'Billing', parent: '/rtgs' },
  '/rtgs/financial-monitoring/bi-reports': { path: '/rtgs/financial-monitoring/bi-reports', label: 'BI Reports', parent: '/rtgs/financial-monitoring' },
  '/rtgs/cb-operations/cash-operations': { path: '/rtgs/cb-operations/cash-operations', label: 'Cash Operations', parent: '/rtgs/central-bank-operations' },
  '/rtgs/real-time-cash-flow-overview': { path: '/rtgs/real-time-cash-flow-overview', label: 'Real-time Cash Flow Overview', parent: '/rtgs' },
  '/rtgs/payments': { path: '/rtgs/payments', label: 'RTGS Payments', parent: '/rtgs' },
  '/rtgs/accounts': { path: '/rtgs/accounts', label: 'RTGS Accounts', parent: '/rtgs' },
  '/rtgs/monitoring': { path: '/rtgs/monitoring', label: 'RTGS Monitoring', parent: '/rtgs' },
  
  // CSD Routes
  '/csd': { path: '/csd', label: 'CSD' },
  '/csd/accounts-balances': { path: '/csd/accounts-balances', label: 'Accounts & Balances', parent: '/csd' },
  '/csd/accounts-balances/statements': { path: '/csd/accounts-balances/statements', label: 'Account Statements', parent: '/csd/accounts-balances' },
  '/csd/instruments': { path: '/csd/instruments', label: 'Instruments', parent: '/csd' },
  '/csd/instruments/summary': { path: '/csd/instruments/summary', label: 'Instruments Summary', parent: '/csd/instruments' },
  '/csd/instruments/register-islamic-sukuk': { path: '/csd/instruments/register-islamic-sukuk', label: 'Register Islamic Sukuk', parent: '/csd/instruments' },
  '/csd/instruments/types': { path: '/csd/instruments/types', label: 'Instrument Types', parent: '/csd/instruments' },
  '/csd/instruments/register-cbb': { path: '/csd/instruments/register-cbb', label: 'Register CBB Instrument', parent: '/csd/instruments' },
  '/csd/instruments/register-treasury-bill': { path: '/csd/instruments/register-treasury-bill', label: 'Register Treasury Bill', parent: '/csd/instruments' },
  '/csd/instruments/register-treasury-bond': { path: '/csd/instruments/register-treasury-bond', label: 'Register Treasury Bond', parent: '/csd/instruments' },
  '/csd/instruments/securities-issuance-other': { path: '/csd/instruments/securities-issuance-other', label: 'Securities Issuance Other', parent: '/csd/instruments' },
  '/csd/instruments/private-placement': { path: '/csd/instruments/private-placement', label: 'Private Placement', parent: '/csd/instruments' },
  '/csd/instruments/status-management': { path: '/csd/instruments/status-management', label: 'Status Management', parent: '/csd/instruments' },
  '/securities/register-cbb-instrument': { path: '/securities/register-cbb-instrument', label: 'Register CBB Instrument', parent: '/securities' },
  '/securities/register-treasury-bill': { path: '/securities/register-treasury-bill', label: 'Register Treasury Bill', parent: '/securities' },
  '/securities/register-treasury-bond': { path: '/securities/register-treasury-bond', label: 'Register Treasury Bond', parent: '/securities' },
  '/securities/issuance-other': { path: '/securities/issuance-other', label: 'Securities Issuance Other', parent: '/securities' },
  '/securities/private-placement': { path: '/securities/private-placement', label: 'Private Placement', parent: '/securities' },
  '/securities/status-management': { path: '/securities/status-management', label: 'Status Management', parent: '/securities' },
  '/csd/instruments/eligibility-criteria-builder': { path: '/csd/instruments/eligibility-criteria-builder', label: 'Eligibility Criteria Builder', parent: '/csd/instruments' },
  '/csd/transactions': { path: '/csd/transactions', label: 'Transactions', parent: '/csd' },
  '/csd/transactions/reconciliation': { path: '/csd/transactions/reconciliation', label: 'Transaction Reconciliation', parent: '/csd/transactions' },
  '/csd/transactions/settled': { path: '/csd/transactions/settled', label: 'Settled Transactions', parent: '/csd/transactions' },
  '/csd/transactions/pending': { path: '/csd/transactions/pending', label: 'Pending Transactions', parent: '/csd/transactions' },
  '/csd/transactions/failed': { path: '/csd/transactions/failed', label: 'Failed Transactions', parent: '/csd/transactions' },
  '/csd/transactions/transfers': { path: '/csd/transactions/transfers', label: 'Transfers (DvF / DvP)', parent: '/csd/transactions' },
  '/csd/transactions/cross-border-settlement': { path: '/csd/transactions/cross-border-settlement', label: 'Cross-Border Settlement', parent: '/csd/transactions' },
  '/csd/transactions/exchange-trades-settlement': { path: '/csd/transactions/exchange-trades-settlement', label: 'Exchange Trades Settlement', parent: '/csd/transactions' },
  '/csd/transactions/clearing-manager': { path: '/csd/transactions/clearing-manager', label: 'Clearing Manager', parent: '/csd/transactions' },
  '/csd/transactions/payments-status': { path: '/csd/transactions/payments-status', label: 'Payments Status', parent: '/csd/transactions' },
  '/csd/custody': { path: '/csd/custody', label: 'Custody', parent: '/csd' },
  '/csd/trading': { path: '/csd/trading', label: 'Trading', parent: '/csd' },
  '/csd/settlement': { path: '/csd/settlement', label: 'Settlement', parent: '/csd' },
  '/csd/operations-hub': { path: '/csd/operations-hub', label: 'Operations Hub', parent: '/csd' },
  '/csd/operations-hub/operations': { path: '/csd/operations-hub/operations', label: 'Operations', parent: '/csd/operations-hub' },
  '/csd/positions': { path: '/csd/positions', label: 'Positions', parent: '/csd' },
  '/csd/positions/exposure-summary': { path: '/csd/positions/exposure-summary', label: 'Exposure Summary', parent: '/csd/positions' },
  '/csd/corporate-actions': { path: '/csd/corporate-actions', label: 'Corporate Actions', parent: '/csd' },
  '/csd/corporate-actions/summary': { path: '/csd/corporate-actions/summary', label: 'Corporate Actions Summary', parent: '/csd/corporate-actions' },
  '/csd/corporate-actions/coupon-reward': { path: '/csd/corporate-actions/coupon-reward', label: 'Coupon / Reward', parent: '/csd/corporate-actions' },
  '/csd/corporate-actions/redemptions': { path: '/csd/corporate-actions/redemptions', label: 'Redemptions', parent: '/csd/corporate-actions' },
  '/csd/corporate-actions/early-redemptions': { path: '/csd/corporate-actions/early-redemptions', label: 'Early Redemptions', parent: '/csd/corporate-actions' },
  '/csd/accounts-balances/summary': { path: '/csd/accounts-balances/summary', label: 'Account Management', parent: '/csd/accounts-balances' },
  '/operations': { path: '/operations', label: 'Operations', parent: '/csd' },
  '/securities': { path: '/securities', label: 'Securities Lifecycle', parent: '/csd' },
  '/securities/instrument-reference': { path: '/securities/instrument-reference', label: 'Instrument Reference', parent: '/securities' },
  '/securities/issuance': { path: '/securities/issuance', label: 'Issuance', parent: '/securities' },
  '/securities/corporate-actions': { path: '/securities/corporate-actions', label: 'Corporate Actions', parent: '/securities' },
  '/securities/lifecycle': { path: '/securities/lifecycle', label: 'Securities Lifecycle', parent: '/csd' },
  '/trading': { path: '/trading', label: 'Trading', parent: '/csd' },
  '/trading/transfer-instruction': { path: '/trading/transfer-instruction', label: 'Transfer Instruction', parent: '/trading' },
  '/trading/order-management': { path: '/trading/order-management', label: 'Order Management', parent: '/trading' },
  '/trading/auctions': { path: '/trading/auctions', label: 'Auctions Trading Monitor', parent: '/trading' },
  '/trading/bilateral': { path: '/trading/bilateral', label: 'Bilateral Trading Monitor', parent: '/trading' },
  '/trading/match': { path: '/trading/match', label: 'Trade Matching', parent: '/trading' },
  '/clearing': { path: '/clearing', label: 'Clearing Hub', parent: '/csd' },
  '/clearing/manager': { path: '/clearing/manager', label: 'Clearing Manager', parent: '/clearing' },
  '/clearing/margin': { path: '/clearing/margin', label: 'Margin Calculation', parent: '/clearing' },
  '/clearing/default': { path: '/clearing/default', label: 'Default Management', parent: '/clearing' },
  '/clearing/ccp': { path: '/clearing/ccp', label: 'CCP Dashboard', parent: '/clearing' },
  '/settlement': { path: '/settlement', label: 'Settlement Hub', parent: '/csd' },
  '/custody': { path: '/custody', label: 'Custody Hub', parent: '/csd' },
  '/liquidity': { path: '/liquidity', label: 'Liquidity Hub', parent: '/csd' },
  '/liquidity/tri-party-repo': { path: '/liquidity/tri-party-repo', label: 'Tri-Party REPO Services', parent: '/liquidity' },
  '/liquidity/central-bank-liquidity': { path: '/liquidity/central-bank-liquidity', label: 'Central Bank Liquidity Management', parent: '/liquidity' },
  '/liquidity/islamic-repo': { path: '/liquidity/islamic-repo', label: 'Islamic REPO', parent: '/liquidity' },
  '/risk': { path: '/risk', label: 'Risk Management', parent: '/csd' },
  '/auction': { path: '/auction', label: 'Auction Management', parent: '/csd' },
  '/investor-services': { path: '/investor-services', label: 'Investor Services Hub', parent: '/csd' },
  '/reporting': { path: '/reporting', label: 'Reporting & Compliance', parent: '/csd' },
  '/collateral/manager': { path: '/collateral/manager', label: 'Collateral Manager', parent: '/csd' },
  '/collateral/optimization': { path: '/collateral/optimization', label: 'Collateral Optimization', parent: '/csd' },
  '/collateral/haircut-matrix': { path: '/collateral/haircut-matrix', label: 'Collateral Parameters', parent: '/cms/collateral' },
  
  // CMS Routes
  '/cms': { path: '/cms', label: 'CMS' },
  '/cms/collateral': { path: '/cms/collateral', label: 'Collateral Management', parent: '/cms' },
  '/cms/risk': { path: '/cms/risk', label: 'Risk Management', parent: '/cms' },
  
  // Knowledge Hub
  '/knowledge': { path: '/knowledge', label: 'Knowledge Hub' },
  '/knowledge/search': { path: '/knowledge/search', label: 'Documentation Search', parent: '/knowledge' },
  '/knowledge/findings': { path: '/knowledge/findings', label: 'Findings', parent: '/knowledge' },
  
  // Admin Routes
  '/admin': { path: '/admin', label: 'Administration' },
  '/admin/dashboard': { path: '/admin/dashboard', label: 'Admin Dashboard', parent: '/admin' },
  '/admin/integrations': { path: '/admin/integrations', label: 'Integrations Management', parent: '/admin' },
  '/admin/market-data': { path: '/admin/market-data', label: 'Market Data', parent: '/admin' },
  '/admin/static-data': { path: '/admin/static-data', label: 'Static Data Management', parent: '/admin' },
  '/admin/config': { path: '/admin/config', label: 'Configuration', parent: '/admin' },
  '/admin/config/rtgs': { path: '/admin/config/rtgs', label: 'RTGS Configuration', parent: '/admin/config' },
  '/admin/users': { path: '/admin/users', label: 'User Management', parent: '/admin' },
  '/admin/system': { path: '/admin/system', label: 'System Administration', parent: '/admin' },
  '/admin/form-config': { path: '/admin/form-config', label: 'Form Configuration', parent: '/admin' },
  '/monitoring': { path: '/monitoring', label: 'System Monitoring', parent: '/admin' },
  '/users': { path: '/users', label: 'User Management', parent: '/admin' },
  
  // Auth Routes
  '/login': { path: '/login', label: 'Login' },
  '/mfa': { path: '/mfa', label: 'Multi-Factor Authentication', parent: '/login' },
  
  // Participants Routes
  '/participants': { path: '/participants', label: 'Participants' },
  '/participants/unified-portal': { path: '/participants/unified-portal', label: 'Unified Portal', parent: '/participants' },
  '/participants/onboarding': { path: '/participants/onboarding', label: 'Onboarding', parent: '/participants' },
  
  // Master Data
  '/masterdata': { path: '/masterdata', label: 'Master Data' },
  
  // Reports
  '/reports': { path: '/reports', label: 'Reports' },
  
  // OMO Routes
  '/csd/open-market-operations': { path: '/csd/open-market-operations', label: 'Open Market Operations', parent: '/csd' },
  '/csd/open-market-operations/active-auctions': { path: '/csd/open-market-operations/active-auctions', label: 'Active Auctions', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/cb-auction': { path: '/csd/open-market-operations/cb-auction', label: 'CB Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/repo-reverse-repo-auction': { path: '/csd/open-market-operations/repo-reverse-repo-auction', label: 'Repo/Reverse Repo Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/deposit-auction': { path: '/csd/open-market-operations/deposit-auction', label: 'Deposit Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/outright-auction': { path: '/csd/open-market-operations/outright-auction', label: 'Outright Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/fx-auction': { path: '/csd/open-market-operations/fx-auction', label: 'FX Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/fx-forward-auction': { path: '/csd/open-market-operations/fx-forward-auction', label: 'FX Forward Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/fx-swap-auction': { path: '/csd/open-market-operations/fx-swap-auction', label: 'FX SWAP Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/debt-switch-auction': { path: '/csd/open-market-operations/debt-switch-auction', label: 'Debt Switch Auction', parent: '/csd/open-market-operations' },
  '/csd/open-market-operations/buyback-auction': { path: '/csd/open-market-operations/buyback-auction', label: 'Buyback Auction', parent: '/csd/open-market-operations' },
  
  // Standing Facilities Routes
  '/csd/standing-facilities': { path: '/csd/standing-facilities', label: 'Standing Facilities', parent: '/csd' },
  '/csd/standing-facilities/islamic-liquidity-summary': { path: '/csd/standing-facilities/islamic-liquidity-summary', label: 'Islamic Liquidity Summary', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/ilf': { path: '/csd/standing-facilities/ilf', label: 'ILF', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/floor-facilities': { path: '/csd/standing-facilities/floor-facilities', label: 'Floor Facilities', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/lending-facilities': { path: '/csd/standing-facilities/lending-facilities', label: 'Lending Facilities', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/deposit-facilities': { path: '/csd/standing-facilities/deposit-facilities', label: 'Deposit Facilities', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/repo': { path: '/csd/standing-facilities/repo', label: 'Repo', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/reverse-repo': { path: '/csd/standing-facilities/reverse-repo', label: 'Reverse Repo', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/islamic-deposits': { path: '/csd/standing-facilities/islamic-deposits', label: 'Islamic Deposits', parent: '/csd/standing-facilities' },
  '/csd/standing-facilities/islamic-lending-securities': { path: '/csd/standing-facilities/islamic-lending-securities', label: 'Islamic Lending against Securities (ISLI)', parent: '/csd/standing-facilities' },
  
  // Liquidity Monitor Routes
  '/csd/liquidity-monitor': { path: '/csd/liquidity-monitor', label: 'Liquidity Monitor', parent: '/csd' },
  '/csd/liquidity-monitor/liquidity-position-summary': { path: '/csd/liquidity-monitor/liquidity-position-summary', label: 'Liquidity Position Summary', parent: '/csd/liquidity-monitor' },
  '/csd/liquidity-monitor/liquidity-forecasting': { path: '/csd/liquidity-monitor/liquidity-forecasting', label: 'Liquidity Forecasting', parent: '/csd/liquidity-monitor' },
};

export function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const buildBreadcrumbs = (currentPath: string): RouteInfo[] => {
    const breadcrumbs: RouteInfo[] = [];
    const currentRoute = routeMap[currentPath];
    
    if (!currentRoute) return breadcrumbs;
    
    // Build the breadcrumb chain by following parent references
    let route: RouteInfo | undefined = currentRoute;
    while (route) {
      breadcrumbs.unshift(route);
      route = route.parent ? routeMap[route.parent] : undefined;
    }
    
    return breadcrumbs;
  };
  
  // Function to get the navigation target based on breadcrumb level
  const getNavigationTarget = (crumb: RouteInfo, breadcrumbs: RouteInfo[], index: number): string => {
    // If it's a first-level item (like "RTGS", "CSD"), navigate to its dashboard
    if (index === 0 && breadcrumbs.length > 1) {
      return crumb.path; // This will be like "/rtgs" or "/csd"
    }
    
    // If it's a second-level item with children, navigate to the first child
    if (index === 1 && breadcrumbs.length > 2) {
      const systemKey = crumb.path.split('/')[1]; // Extract "rtgs", "csd", etc.
      const systemNavigation = secondaryNavigation[systemKey];
      
      if (systemNavigation) {
        // Find the current second-level section
        const currentSection = systemNavigation.find(item => 
          item.path === crumb.path || 
          item.children?.some(child => breadcrumbs.some(bc => bc.path === child.path))
        );
        
        // If section has children, navigate to the first child
        if (currentSection?.children && currentSection.children.length > 0) {
          return currentSection.children[0].path;
        }
      }
    }
    
    // Default: navigate to the crumb's own path
    return crumb.path;
  };

  const handleBreadcrumbClick = (crumb: RouteInfo, breadcrumbs: RouteInfo[], index: number) => {
    const targetPath = getNavigationTarget(crumb, breadcrumbs, index);
    navigate(targetPath);
  };
  
  const breadcrumbs = buildBreadcrumbs(location.pathname);
  
  // Always show breadcrumbs if we have a valid route, even for single-level pages
  if (breadcrumbs.length === 0) {
    return null; // Only hide if no route found
  }
  
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <div key={crumb.path} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-foreground font-medium">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      onClick={() => handleBreadcrumbClick(crumb, breadcrumbs, index)}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit"
                    >
                      {crumb.label}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}