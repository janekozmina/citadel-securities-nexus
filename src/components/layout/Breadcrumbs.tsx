import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface RouteInfo {
  path: string;
  label: string;
  parent?: string;
}

const routeMap: Record<string, RouteInfo> = {
  '/': { path: '/', label: 'Home' },
  '/rtgs': { path: '/rtgs', label: 'RTGS' },
  '/csd': { path: '/csd', label: 'CSD' },
  '/operations': { path: '/operations', label: 'Operations', parent: '/csd' },
  '/securities': { path: '/securities', label: 'Securities Lifecycle', parent: '/csd' },
  '/securities/instrument-reference': { path: '/securities/instrument-reference', label: 'Instrument Reference', parent: '/securities' },
  '/securities/issuance': { path: '/securities/issuance', label: 'Issuance', parent: '/securities' },
  '/securities/corporate-actions': { path: '/securities/corporate-actions', label: 'Corporate Actions', parent: '/securities' },
  '/trading': { path: '/trading', label: 'Trading', parent: '/csd' },
  '/trading/transfer-instruction': { path: '/trading/transfer-instruction', label: 'Transfer Instruction', parent: '/trading' },
  '/trading/order-management': { path: '/trading/order-management', label: 'Order Management', parent: '/trading' },
  '/trading/auctions': { path: '/trading/auctions', label: 'Auctions Trading Monitor', parent: '/trading' },
  '/trading/bilateral': { path: '/trading/bilateral', label: 'Bilateral Trading Monitor', parent: '/trading' },
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
  '/cms': { path: '/cms', label: 'CMS' },
  '/collateral/manager': { path: '/collateral/manager', label: 'Collateral Manager', parent: '/cms' },
  '/collateral/optimization': { path: '/collateral/optimization', label: 'Collateral Optimization AI', parent: '/cms' },
  '/admin/integrations': { path: '/admin/integrations', label: 'Integrations Management' },
  '/admin/market-data': { path: '/admin/market-data', label: 'Market Data' },
  '/admin/static-data': { path: '/admin/static-data', label: 'Static Data Management' },
  '/admin': { path: '/admin', label: 'System Monitoring' },
  '/monitoring': { path: '/monitoring', label: 'System Administration' },
  '/users': { path: '/users', label: 'User Management' },
};

export function Breadcrumbs() {
  const location = useLocation();
  
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
  
  const breadcrumbs = buildBreadcrumbs(location.pathname);
  
  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for home or single-level pages
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
                    <Link 
                      to={crumb.path}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
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