import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Building2, 
  Shield, 
  Settings, 
  Users,
  Monitor,
  ChevronRight,
  Search,
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
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  title: string;
  url: string;
  roles: string[];
  icon: any;
  subItems?: MenuItem[];
}

const navigationItems: MenuItem[] = [
  {
    title: 'Home',
    url: '/',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Participant', 'Regulator'],
    icon: Home
  },
  {
    title: 'RTGS',
    url: '/rtgs',
    roles: ['Admin'],
    icon: Banknote,
    subItems: [
      { 
        title: 'Financial Monitoring', 
        url: '/rtgs/financial-monitoring', 
        roles: ['Admin'], 
        icon: Monitor,
        subItems: [
          { title: 'Account Management', url: '/rtgs/financial-monitoring/account-management', roles: ['Admin'], icon: Users },
          { title: 'Balances & Liquidity', url: '/rtgs/financial-monitoring/balances-liquidity', roles: ['Admin'], icon: DollarSign },
          { title: 'Transaction Status', url: '/rtgs/financial-monitoring/transaction-status', roles: ['Admin'], icon: TrendingUp }
        ]
      },
      { title: 'Central Bank Operations', url: '/rtgs/central-bank-operations', roles: ['Admin'], icon: Building2 },
      { title: 'Anomaly Detection', url: '/rtgs/anomaly-detection', roles: ['Admin'], icon: AlertTriangle },
      { title: 'Dispute Management', url: '/rtgs/dispute-management', roles: ['Admin'], icon: Gavel }
    ]
  },
  {
    title: 'CSD',
    url: '/csd',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker'],
    icon: Building2,
    subItems: [
      { title: 'Operations', url: '/operations', roles: ['Admin'], icon: RefreshCw },
      { 
        title: 'Securities Lifecycle', 
        url: '/securities',
        roles: ['Admin'],
        icon: CreditCard,
        subItems: [
          { title: 'Instrument Reference', url: '/securities/instrument-reference', roles: ['Admin'], icon: FileText },
          { title: 'Issuance', url: '/securities/issuance', roles: ['Admin'], icon: FileText },
          { title: 'Corporate Actions', url: '/securities/corporate-actions', roles: ['Admin'], icon: FileText }
        ]
      },
      { 
        title: 'Trading', 
        url: '/trading',
        roles: ['Admin'],
        icon: TrendingUp,
        subItems: [
          { title: 'Trade Matching', url: '/trading', roles: ['Admin'], icon: DollarSign },
          { title: 'Transfer Instruction', url: '/trading/transfer-instruction', roles: ['Admin'], icon: DollarSign },
          { title: 'Order Management', url: '/trading/order-management', roles: ['Admin'], icon: DollarSign },
          { title: 'Auctions Trading Monitor', url: '/trading/auctions', roles: ['Admin'], icon: DollarSign },
          { title: 'Bilateral Trading Monitor', url: '/trading/bilateral', roles: ['Admin'], icon: DollarSign }
        ]
      },
      { 
        title: 'Clearing Hub', 
        url: '/clearing',
        roles: ['Admin'],
        icon: Vault,
        subItems: [
          { title: 'Clearing Manager', url: '/clearing/manager', roles: ['Admin'], icon: Settings },
          { title: 'Margin Calculation', url: '/clearing/margin', roles: ['Admin'], icon: Settings },
          { title: 'Default Management', url: '/clearing/default', roles: ['Admin'], icon: Settings },
          { title: 'CCP Dashboard', url: '/clearing/ccp', roles: ['Admin'], icon: Settings }
        ]
      },
      { title: 'Settlement Hub', url: '/settlement', roles: ['Admin'], icon: RefreshCw },
      { title: 'Custody Hub', url: '/custody', roles: ['Admin'], icon: Vault },
      { 
        title: 'Liquidity Hub', 
        url: '/liquidity',
        roles: ['Admin'],
        icon: Droplets,
        subItems: [
          { title: 'Tri-Party REPO Services', url: '/liquidity/tri-party-repo', roles: ['Admin'], icon: Droplets },
          { title: 'Central Bank Liquidity Management', url: '/liquidity/central-bank-liquidity', roles: ['Admin'], icon: Droplets },
          { title: 'Islamic REPO', url: '/liquidity/islamic-repo', roles: ['Admin'], icon: Droplets }
        ]
      },
      { title: 'Risk Management', url: '/risk', roles: ['Admin'], icon: Shield },
      { title: 'Auction Management', url: '/auction', roles: ['Admin'], icon: Gavel },
      { title: 'Investor Services Hub', url: '/investor-services', roles: ['Admin'], icon: Users },
      { title: 'Reporting & Compliance', url: '/reporting', roles: ['Admin'], icon: FileText }
    ]
  },
  {
    title: 'CMS',
    url: '/cms',
    roles: ['Admin'],
    icon: Shield,
    subItems: [
      { title: 'Collateral Manager', url: '/collateral/manager', roles: ['Admin'], icon: Vault },
      { title: 'Collateral Optimization AI', url: '/collateral/optimization', roles: ['Admin'], icon: Vault }
    ]
  }
];

const adminItems: MenuItem[] = [
  {
    title: 'Integrations Management',
    url: '/admin/integrations',
    roles: ['Admin'],
    icon: Settings
  },
  {
    title: 'Market Data',
    url: '/admin/market-data',
    roles: ['Admin'],
    icon: TrendingUp
  },
  {
    title: 'Static Data Management',
    url: '/admin/static-data',
    roles: ['Admin'],
    icon: Database
  },
  {
    title: 'System Monitoring',
    url: '/admin',
    roles: ['Admin'],
    icon: Settings
  },
  {
    title: 'System Administration',
    url: '/monitoring',
    roles: ['Admin'],
    icon: Monitor
  },
  {
    title: 'User Management',
    url: '/users',
    roles: ['Admin'],
    icon: Users
  }
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainItem, setSelectedMainItem] = useState<MenuItem | null>(null);
  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(new Set());

  const homeItem = navigationItems.find(i => i.title === 'Home')!;
  const rtgsItem = navigationItems.find(i => i.title === 'RTGS')!;
  const csdItem = navigationItems.find(i => i.title === 'CSD')!;
  const cmsItem = navigationItems.find(i => i.title === 'CMS')!;

  const administrationGroup: MenuItem = {
    title: 'Administration',
    url: '/administration',
    roles: ['Admin'],
    icon: Settings,
    subItems: [
      ...adminItems,
      { title: 'RTGS Configuration', url: '/admin/rtgs-config', roles: ['Admin'], icon: Settings }
    ]
  };

  const knowledgeHubGroup: MenuItem = {
    title: 'Knowledge Hub',
    url: '/knowledge',
    roles: ['Admin'],
    icon: BookOpen,
    subItems: [
      { title: 'Documentation Search', url: '/knowledge/search', roles: ['Admin'], icon: Search },
      { title: 'Findings', url: '/knowledge/findings', roles: ['Admin'], icon: FileText }
    ]
  };

  const allItems = [homeItem, rtgsItem, csdItem, cmsItem, knowledgeHubGroup, administrationGroup];
  
  const filteredMainItems = allItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  // Find active main item based on current route
  const findActiveMainItem = () => {
    return filteredMainItems.find(item => {
      if (location.pathname === item.url) return true;
      if (item.subItems) {
        return item.subItems.some(subItem => {
          if (location.pathname === subItem.url) return true;
          if (subItem.subItems) {
            return subItem.subItems.some(nestedItem => location.pathname === nestedItem.url);
          }
          return false;
        });
      }
      return false;
    });
  };

  // Find active sub item based on current route
  const findActiveSubItem = (mainItem: MenuItem) => {
    return mainItem.subItems?.find(subItem => {
      if (location.pathname === subItem.url) return true;
      if (subItem.subItems) {
        return subItem.subItems.some(nestedItem => location.pathname === nestedItem.url);
      }
      return false;
    });
  };

  const toggleSubItemExpansion = (itemTitle: string) => {
    setExpandedSubItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const activeItem = findActiveMainItem();
    if (activeItem && activeItem.subItems) {
      setSelectedMainItem(activeItem);
      const activeSubItem = findActiveSubItem(activeItem);
      if (activeSubItem && activeSubItem.subItems) {
        // Auto-expand the sub-item that contains the active route
        setExpandedSubItems(prev => new Set([...prev, activeSubItem.title]));
      }
    }
  }, [location.pathname]);

  // Auto-expand first matched branch on search
  useEffect(() => {
    if (searchQuery) {
      const first = filterItemsBySearch(filteredMainItems)[0];
      if (first) setSelectedMainItem(first);
    }
  }, [searchQuery, filteredMainItems]);

  // Highlight helper
  const getHighlightedText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="bg-white/20 rounded px-1">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  // Filter items based on search query (recursive, trims branches)
  const filterItemsBySearch = (items: MenuItem[]): MenuItem[] => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();

    const filterRecursive = (item: MenuItem): MenuItem | null => {
      const titleMatches = item.title.toLowerCase().includes(q);
      const filteredSubs = item.subItems
        ?.map((si) => filterRecursive(si))
        .filter((v): v is MenuItem => Boolean(v)) ?? [];

      if (titleMatches || filteredSubs.length > 0) {
        return { ...item, subItems: filteredSubs };
      }
      return null;
    };

    return items.map(filterRecursive).filter((v): v is MenuItem => Boolean(v));
  };

  const filteredSearchItems = filterItemsBySearch(filteredMainItems);

  const renderMainPanel = () => (
    <div className="h-full flex flex-col">
      {/* Main Navigation - Icons Only */}
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarMenu>
          {(searchQuery ? filteredSearchItems : filteredMainItems).map((item) => {
            const isActive = findActiveMainItem()?.title === item.title;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => {
                    if (hasSubItems) {
                      setSelectedMainItem(item);
                    }
                  }}
                  asChild={!hasSubItems}
                  className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  title={item.title}
                >
                  {hasSubItems ? (
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <NavLink to={item.url} className="flex items-center justify-center w-full">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </NavLink>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>
    </div>
  );

  const renderSubPanel = () => {
    if (!selectedMainItem?.subItems) return null;

    return (
      <div className="h-full flex flex-col bg-black/20">
        {/* Sub Panel Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedMainItem(null);
                setExpandedSubItems(new Set());
              }}
              className="p-1 h-auto text-white/80 hover:text-white hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <selectedMainItem.icon className="h-5 w-5 text-white" />
            <span className="font-medium text-white">{selectedMainItem.title}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <SidebarMenu>
            {selectedMainItem.subItems?.map((subItem) => {
              const isActive = location.pathname === subItem.url || 
                (subItem.subItems && subItem.subItems.some(nested => location.pathname === nested.url));
              const hasSubItems = subItem.subItems && subItem.subItems.length > 0;
              const isExpanded = expandedSubItems.has(subItem.title);
              
              return (
                <div key={subItem.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        if (hasSubItems) {
                          toggleSubItemExpansion(subItem.title);
                        }
                      }}
                      asChild={!hasSubItems}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {hasSubItems ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">{getHighlightedText(subItem.title, searchQuery)}</span>
                          </div>
                          <ChevronRight className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      ) : (
                        <NavLink
                          to={subItem.url}
                          className="flex items-center gap-3 w-full"
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{getHighlightedText(subItem.title, searchQuery)}</span>
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Third Level Items - Collapsible */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {subItem.subItems?.map((thirdItem) => {
                        const isThirdActive = location.pathname === thirdItem.url;
                        
                        return (
                          <SidebarMenuItem key={thirdItem.title}>
                            <SidebarMenuButton asChild>
                              <NavLink
                                to={thirdItem.url}
                                className={({ isActive: linkActive }) => 
                                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                    linkActive || isThirdActive
                                      ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                                  }`
                                }
                              >
                                <thirdItem.icon className="h-3 w-3 flex-shrink-0" />
                                <span className="text-xs font-medium">{thirdItem.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </SidebarMenu>
        </div>
      </div>
    );
  };


  return (
    <div className="flex h-full">
      {/* Main Panel */}
      <Sidebar 
        className="border-r border-white/20 w-[80px]" 
        collapsible="none"
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
      >
        <SidebarContent className="bg-transparent">
          <SidebarGroup className="px-0 flex-1">
            <SidebarGroupContent className="h-full">
              {renderMainPanel()}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Sub Panel */}
      {selectedMainItem?.subItems && (
        <Sidebar 
          className="border-r border-white/20 w-[280px]" 
          collapsible="none"
          style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
        >
          <SidebarContent className="bg-transparent">
            <SidebarGroup className="px-0 flex-1">
              <SidebarGroupContent className="h-full">
                {renderSubPanel()}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}

    </div>
  );
}