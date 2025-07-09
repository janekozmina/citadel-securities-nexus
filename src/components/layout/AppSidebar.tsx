
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
  Monitor
} from 'lucide-react';

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
    title: 'System Administration',
    url: '/admin',
    roles: ['Admin'],
    icon: Settings
  },
  {
    title: 'System Monitoring',
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

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <Sidebar className="border-r border-slate-700 w-60" style={{ backgroundColor: '#0F172A' }}>
      <SidebarContent>
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-white font-semibold text-lg">CSD Unified Portal</h2>
          <p className="text-slate-300 text-sm">Central Securities Depository</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300">
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
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
