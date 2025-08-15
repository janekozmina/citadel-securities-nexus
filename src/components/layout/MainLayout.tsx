import { Outlet, useLocation } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';
import { Breadcrumbs } from './Breadcrumbs';
import Chatbot from './Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import themeConfig from '@/config/themeConfig';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Banknote, Building2, Shield, FileText, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Define alerts for different pages
  const getPageAlerts = () => {
    const baseAlerts = [
      {
        id: 2,
        type: 'info' as const,
        message: 'Settlement batch processing complete',
        time: '14:30',
        urgent: false
      },
      {
        id: 3,
        type: 'alert' as const,
        message: 'System maintenance scheduled for tonight',
        time: '14:15',
        urgent: false
      }
    ];

    // Add ILF alert for home page
    if (location.pathname === '/') {
      return [
        {
          id: 1,
          type: 'warning' as const,
          message: 'ILF window closes in 15 minutes',
          time: '14:45',
          urgent: true
        },
        ...baseAlerts
      ];
    }

    return baseAlerts;
  };

  // Simplified navigation items
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/rtgs', icon: Banknote, label: 'RTGS' },
    { path: '/csd', icon: Building2, label: 'CSD' },
    { path: '/cms', icon: Shield, label: 'CMS' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <div className="flex w-full">
      {/* Temporary Simple Sidebar */}
      <div className="w-64 h-screen bg-muted/30 border-r sticky top-0 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CBB</span>
            </div>
            <span className="font-semibold">Central Bank Portal</span>
          </div>
        </div>
        
        <div className="flex-1 p-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || 
                           (location.pathname.startsWith(item.path + '/') && item.path !== '/');
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => navigate(item.path)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
        
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground">
            Welcome, {user?.name}
          </div>
        </div>
      </div>
        
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0">
        {/* STICKY HEADER */}
        <div 
          className="sticky top-0 z-10"
          style={{ height: themeConfig.layout.header.height }}
        >
          <DashboardHeader />
        </div>
        
        {/* CONTENT */}
        <div 
          className="px-6"
          style={{ 
            minHeight: `calc(100vh - ${themeConfig.layout.header.height})`,
            paddingTop: '1rem'
          }}
        >
          <Breadcrumbs />
          <div className="mt-4">
            {children || <Outlet />}
          </div>
        </div>
      </div>
      
      <AlertsPanel alerts={getPageAlerts()} />
      <Chatbot />
    </div>
  );
};

export default MainLayout;