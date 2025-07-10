import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronDown
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
    title: 'Securities Lifecycle',
    url: '/securities',
    roles: ['Admin', 'Issuer'],
    icon: Building2
  },
  {
    title: 'Trading',
    url: '/trading',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: TrendingUp
  },
  {
    title: 'Clearing Hub',
    url: '/clearing',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant'],
    icon: RefreshCw
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
    icon: Droplets
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
  {
    title: 'Master Data',
    url: '/masterdata',
    roles: ['Admin', 'Regulator'],
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
    roles: ['Admin', 'Regulator'],
    icon: Users
  }
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    'main': true,
    'admin': true
  });

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  // Group items
  const mainItems = filteredItems.filter(item => 
    !['System Monitoring', 'System Administration', 'User Management'].includes(item.title)
  );
  
  const adminItems = filteredItems.filter(item => 
    ['System Monitoring', 'System Administration', 'User Management'].includes(item.title)
  );

  const toggleGroup = (groupKey: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const renderMenuItems = (items: typeof navigationItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
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
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar 
      className="border-r border-slate-700 sidebar-gradient" 
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
                  {renderMenuItems(mainItems)}
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          )}
          {isCollapsed && (
            <SidebarGroupContent>
              {renderMenuItems(mainItems)}
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Admin Group (if user has admin items) */}
        {adminItems.length > 0 && (
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
                    {renderMenuItems(adminItems)}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            )}
            {isCollapsed && (
              <SidebarGroupContent>
                {renderMenuItems(adminItems)}
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
