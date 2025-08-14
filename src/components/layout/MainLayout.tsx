import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModularSidebar } from './ModularSidebar';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';
import { Breadcrumbs } from './Breadcrumbs';
import Chatbot from './Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import themeConfig from '@/config/themeConfig';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
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

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex w-full"
        style={{ 
          background: `hsl(var(--background))`,
          fontFamily: themeConfig.typography.fontFamily.sans.join(', ')
        }}
      >
        <ModularSidebar />
        
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader />
          
          <main className="flex-1 overflow-auto">
            <div style={{ padding: themeConfig.spacing.container.padding }}>
              <Breadcrumbs />
              {children || <Outlet />}
            </div>
          </main>
        </div>
        
        <AlertsPanel alerts={getPageAlerts()} />
        <Chatbot />
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;