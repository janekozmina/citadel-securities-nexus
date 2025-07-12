
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Building2, 
  TrendingUp, 
  RefreshCw, 
  CreditCard, 
  Vault, 
  Droplets, 
  Shield, 
  Gavel, 
  FileText, 
  Database, 
  Settings, 
  Users,
  Monitor,
  ChevronRight,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Participant', 'Regulator'],
    icon: Home
  },
  {
    title: 'Operations',
    url: '/operations',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Participant'],
    icon: Wrench
  },
  {
    title: 'Securities Lifecycle',
    url: '/securities',
    roles: ['Admin', 'Issuer'],
    icon: Building2,
    subItems: [
      { title: 'Instrument Reference', url: '/securities/instrument-reference' },
      { title: 'Issuance', url: '/securities/issuance' },
      { title: 'Corporate Actions', url: '/securities/corporate-actions' }
    ]
  },
  {
    title: 'Trading',
    url: '/trading',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: TrendingUp,
    subItems: [
      { title: 'Trade Matching', url: '/trading' },
      { title: 'Transfer Instruction', url: '/trading/transfer-instruction' },
      { title: 'Order Management', url: '/trading/order-management' },
      { title: 'Auctions Trading Monitor', url: '/trading/auctions' },
      { title: 'Bilateral Trading Monitor', url: '/trading/bilateral' }
    ]
  },
  {
    title: 'Clearing Hub',
    url: '/clearing',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: RefreshCw,
    subItems: [
      { title: 'Clearing Manager', url: '/clearing/manager' },
      { title: 'Margin Calculation', url: '/clearing/margin' },
      { title: 'Default Management', url: '/clearing/default' },
      { title: 'CCP Dashboard', url: '/clearing/ccp' }
    ]
  },
  {
    title: 'Settlement Hub',
    url: '/settlement',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: CreditCard
  },
  {
    title: 'Custody Hub',
    url: '/custody',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: Vault
  },
  {
    title: 'Liquidity Hub',
    url: '/liquidity',
    roles: ['Admin', 'Custodian'],
    icon: Droplets,
    subItems: [
      { title: 'Tri-Party REPO Services', url: '/liquidity/tri-party-repo' },
      { title: 'Central Bank Liquidity Management', url: '/liquidity/central-bank-liquidity' },
      { title: 'Islamic REPO', url: '/liquidity/islamic-repo' },
      { title: 'Collateral Optimization AI', url: '/liquidity/collateral-optimization' }
    ]
  },
  {
    title: 'Risk Management',
    url: '/risk',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer'],
    icon: Shield
  },
  {
    title: 'Auction Management',
    url: '/auction',
    roles: ['Admin', 'Custodian', 'Issuer'],
    icon: Gavel
  },
  {
    title: 'Reporting & Compliance',
    url: '/reporting',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer'],
    icon: FileText
  },
];

const adminItems = [
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
    roles: ['Admin', 'Regulator'],
    icon: Users
  }
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    'main': true,
    'admin': true
  });
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    'Securities Lifecycle': false,
    'Trading': false,
    'Clearing Hub': false,
    'Settlement Hub': false,
    
    'Liquidity Hub': false,
    'Risk Management': false,
    'Auction Management': false,
    'Reporting & Compliance': false,
    
  });

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );
  
  const filteredAdminItems = adminItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  const toggleGroup = (groupKey: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const toggleExpandedItem = (itemTitle: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  const isItemActive = (item: any) => {
    if (location.pathname === item.url) return true;
    if (item.subItems) {
      return item.subItems.some((subItem: any) => location.pathname === subItem.url);
    }
    return false;
  };

  // Auto-expand items that contain active routes
  useEffect(() => {
    const activeItem = navigationItems.find(item => isItemActive(item));
    if (activeItem && activeItem.subItems) {
      setExpandedItems(prev => ({
        ...prev,
        [activeItem.title]: true
      }));
    }
  }, [location.pathname]);

  const renderMenuItems = (items: typeof navigationItems) => (
    <SidebarMenu>
      {items.map((item) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isActive = isItemActive(item);
        const isExpanded = expandedItems[item.title] || isActive;

        return (
          <SidebarMenuItem key={item.title}>
            {hasSubItems ? (
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpandedItem(item.title)}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    } ${!isCollapsed ? 'mx-1' : 'mx-auto w-10 h-10 justify-center'}`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`flex-shrink-0 ${!isCollapsed ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3 ml-auto transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="h-3 w-3 ml-auto transition-transform duration-200" />
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {!isCollapsed && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink 
                              to={subItem.url}
                              className={({ isActive }) => 
                                `flex items-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 ml-2 ${
                                  isActive 
                                    ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`
                              }
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></div>
                              <span className="text-sm font-medium">{subItem.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                <NavLink 
                  to={item.url} 
                  end={item.url === '/'}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    } ${!isCollapsed ? 'mx-1' : 'mx-auto w-10 h-10 justify-center'}`
                  }
                  title={item.title}
                >
                  <item.icon className={`flex-shrink-0 ${!isCollapsed ? 'h-4 w-4' : 'h-5 w-5'}`} />
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <Sidebar 
      className="border-r border-slate-700 w-[280px]" 
      collapsible="icon"
      style={{ background: 'linear-gradient(135deg, #5335E1 0%, #8749F7 100%)' }}
    >
      <SidebarContent className="bg-transparent">
        <div className="p-4 border-b border-white/20">
          {!isCollapsed && (
            <div className="space-y-1">
              <h2 className="text-white font-bold text-lg">
                CSD Portal
              </h2>
              <p className="text-white/80 text-xs">Central Securities Depository</p>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Main Navigation Group */}
        <SidebarGroup className="px-3">
          {!isCollapsed && (
            <Collapsible 
              open={openGroups['main']} 
              onOpenChange={() => toggleGroup('main')}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-white/70 hover:text-white cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-white/10">
                  <span className="text-xs font-medium tracking-wide">NAVIGATION</span>
                  {openGroups['main'] ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {renderMenuItems(filteredItems)}
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          )}
          {isCollapsed && (
            <SidebarGroupContent>
              {renderMenuItems(filteredItems)}
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Admin Group */}
        {filteredAdminItems.length > 0 && (
          <SidebarGroup className="px-3 mt-4">
            {!isCollapsed && (
              <Collapsible 
                open={openGroups['admin']} 
                onOpenChange={() => toggleGroup('admin')}
              >
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="text-white/70 hover:text-white cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-white/10">
                    <span className="text-xs font-medium tracking-wide">ADMINISTRATION</span>
                    {openGroups['admin'] ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    {renderMenuItems(filteredAdminItems)}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            )}
            {isCollapsed && (
              <SidebarGroupContent>
                {renderMenuItems(filteredAdminItems)}
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
