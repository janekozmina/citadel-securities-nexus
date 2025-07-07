
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
  Building, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle, 
  Shield,
  Droplets,
  AlertTriangle,
  Gavel,
  FileText,
  Database,
  Settings,
  Users
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
    roles: ['Admin', 'Issuer', 'Custodian', 'Broker', 'Regulator']
  },
  {
    title: 'Securities Lifecycle',
    url: '/securities',
    icon: Building,
    roles: ['Admin', 'Issuer']
  },
  {
    title: 'Trading',
    url: '/trading',
    icon: TrendingUp,
    roles: ['Admin', 'Custodian', 'Broker']
  },
  {
    title: 'Clearing Hub',
    url: '/clearing',
    icon: RefreshCw,
    roles: ['Admin', 'Custodian', 'Broker']
  },
  {
    title: 'Settlement Hub',
    url: '/settlement',
    icon: CheckCircle,
    roles: ['Admin', 'Custodian', 'Broker']
  },
  {
    title: 'Custody Hub',
    url: '/custody',
    icon: Shield,
    roles: ['Admin', 'Custodian', 'Broker']
  },
  {
    title: 'Liquidity Hub',
    url: '/liquidity',
    icon: Droplets,
    roles: ['Admin', 'Custodian']
  },
  {
    title: 'Risk Management',
    url: '/risk',
    icon: AlertTriangle,
    roles: ['Admin', 'Custodian', 'Broker']
  },
  {
    title: 'Auction Management',
    url: '/auction',
    icon: Gavel,
    roles: ['Admin', 'Custodian', 'Issuer']
  },
  {
    title: 'Reporting & Compliance',
    url: '/reporting',
    icon: FileText,
    roles: ['Admin', 'Custodian', 'Broker', 'Issuer', 'Regulator']
  },
  {
    title: 'Master Data',
    url: '/masterdata',
    icon: Database,
    roles: ['Admin']
  },
  {
    title: 'System Administration',
    url: '/admin',
    icon: Settings,
    roles: ['Admin']
  },
  {
    title: 'User Management',
    url: '/users',
    icon: Users,
    roles: ['Admin', 'Regulator']
  }
];

export function AppSidebar() {
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <Sidebar className="bg-slate-800 border-r border-slate-700">
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-white font-semibold text-lg">CSD Portal</h2>
          <p className="text-slate-400 text-sm">Central Securities Depository</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300">Navigation</SidebarGroupLabel>
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
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
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
