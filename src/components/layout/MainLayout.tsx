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
      <div className="flex w-full">
        {/* STICKY SIDEBAR */}
        <div className="sticky top-0 h-screen flex-shrink-0">
          <ModularSidebar />
        </div>
        
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0">
          {/* STICKY HEADER */}
          <div 
            className="sticky top-0 z-10"
            style={{ height: themeConfig.spacing.header.height }}
          >
            <DashboardHeader />
          </div>
          
          {/* CONTENT - NO RESERVED SPACE, DIRECT UNDER BREADCRUMBS */}
          <div 
            className="px-6"
            style={{ 
              minHeight: `calc(100vh - ${themeConfig.spacing.header.height})`,
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
    </SidebarProvider>
  );
};

export default MainLayout;