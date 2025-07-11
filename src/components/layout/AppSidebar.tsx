
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
    icon: Vault,
    subItems: [
      { title: 'Asset Holdings', url: '/custody/holdings' },
      { title: 'Safekeeping', url: '/custody/safekeeping' },
      { title: 'Corporate Actions', url: '/custody/corporate-actions' }
    ]
  },
  {
    title: 'Liquidity Hub',
    url: '/liquidity',
    roles: ['Admin', 'Custodian'],
    icon: Droplets,
    subItems: [
      { title: 'Cash Management', url: '/liquidity/cash' },
      { title: 'Repo Operations', url: '/liquidity/repo' },
      { title: 'Collateral Management', url: '/liquidity/collateral' }
    ]
  },
  {
    title: 'Risk Management',
    url: '/risk',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer'],
    icon: Shield,
    subItems: [
      { title: 'Risk Monitoring', url: '/risk/monitoring' },
      { title: 'Stress Testing', url: '/risk/stress-testing' },
      { title: 'Compliance Check', url: '/risk/compliance' }
    ]
  },
  {
    title: 'Auction Management',
    url: '/auction',
    roles: ['Admin', 'Custodian', 'Issuer'],
    icon: Gavel,
    subItems: [
      { title: 'Primary Auctions', url: '/auction/primary' },
      { title: 'Secondary Market', url: '/auction/secondary' },
      { title: 'Bidding System', url: '/auction/bidding' }
    ]
  },
  {
    title: 'Reporting & Compliance',
    url: '/reporting',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer'],
    icon: FileText,
    subItems: [
      { title: 'Regulatory Reports', url: '/reporting/regulatory' },
      { title: 'Financial Statements', url: '/reporting/financial' },
      { title: 'Audit Trail', url: '/reporting/audit' }
    ]
  },
  {
    title: 'Master Data',
    url: '/masterdata',
    roles: ['Admin', 'Regulator'],
    icon: Database,
    subItems: [
      { title: 'Securities Master', url: '/masterdata/securities' },
      { title: 'Participant Registry', url: '/masterdata/participants' },
      { title: 'Reference Data', url: '/masterdata/reference' }
    ]
  }
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
    'Custody Hub': false,
    'Liquidity Hub': false,
    'Risk Management': false,
    'Auction Management': false,
    'Reporting & Compliance': false,
    'Master Data': false
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
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span>{item.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        ) : (
                          <ChevronRight className="h-4 w-4 ml-auto" />
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
                                `flex items-center gap-3 px-6 py-2 rounded-lg transition-colors ${
                                  isActive 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`
                              }
                            >
                              {subItem.title}
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
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`
                  }
                  title={item.title}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
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
      className="border-r border-slate-700 sidebar-gradient w-[330px]" 
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-4 border-b border-slate-700/50">
          {!isCollapsed && (
            <>
              <h2 className="text-white font-semibold text-lg">CSD Unified Portal</h2>
              <p className="text-slate-300 text-sm">Central Securities Depository</p>
            </>
          )}
        </div>
        
        {/* Main Navigation Group */}
        <SidebarGroup>
          {!isCollapsed && (
            <Collapsible 
              open={openGroups['main']} 
              onOpenChange={() => toggleGroup('main')}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-slate-300 hover:text-white cursor-pointer flex items-center justify-between">
                  <span>Navigation</span>
                  {openGroups['main'] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
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
          <SidebarGroup>
            {!isCollapsed && (
              <Collapsible 
                open={openGroups['admin']} 
                onOpenChange={() => toggleGroup('admin')}
              >
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="text-slate-300 hover:text-white cursor-pointer flex items-center justify-between">
                    <span>Administration</span>
                    {openGroups['admin'] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
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
