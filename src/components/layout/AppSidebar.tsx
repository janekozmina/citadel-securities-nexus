

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
} from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Participant', 'Regulator']
  },
  {
    title: 'Securities Lifecycle',
    url: '/securities',
    roles: ['Admin', 'Issuer']
  },
  {
    title: 'Trading',
    url: '/trading',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant']
  },
  {
    title: 'Clearing Hub',
    url: '/clearing',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant']
  },
  {
    title: 'Settlement Hub',
    url: '/settlement',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant']
  },
  {
    title: 'Custody Hub',
    url: '/custody',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant']
  },
  {
    title: 'Liquidity Hub',
    url: '/liquidity',
    roles: ['Admin', 'Custodian']
  },
  {
    title: 'Risk Management',
    url: '/risk',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer']
  },
  {
    title: 'Auction Management',
    url: '/auction',
    roles: ['Admin', 'Custodian', 'Issuer']
  },
  {
    title: 'Reporting & Compliance',
    url: '/reporting',
    roles: ['Admin', 'Custodian', 'Broker', 'Participant', 'Issuer']
  },
  {
    title: 'Master Data',
    url: '/masterdata',
    roles: ['Admin', 'Regulator']
  },
  {
    title: 'System Administration',
    url: '/admin',
    roles: ['Admin']
  },
  {
    title: 'User Management',
    url: '/users',
    roles: ['Admin', 'Regulator']
  }
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state, toggleSidebar } = useSidebar();

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <Sidebar className="border-r border-slate-700" style={{ backgroundColor: '#0F172A' }}>
      <SidebarContent>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className={state === 'collapsed' ? 'hidden' : ''}>
            <h2 className="text-white font-semibold text-lg">CSD Portal</h2>
            <p className="text-slate-300 text-sm">Central Securities Depository</p>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
            aria-label={state === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className={`text-slate-300 ${state === 'collapsed' ? 'hidden' : ''}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
                      <span className={state === 'collapsed' ? 'hidden' : ''}>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

