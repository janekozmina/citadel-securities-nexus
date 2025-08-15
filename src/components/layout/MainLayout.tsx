import { Outlet, useLocation } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';
import { Breadcrumbs } from './Breadcrumbs';
import Chatbot from './Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import themeConfig from '@/config/themeConfig';
import { NestedSidebar } from './NestedSidebar';
import { SidebarProvider, useSidebarContext } from './SidebarProvider';

interface MainLayoutProps {
  children?: React.ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();
  const { isOpen, toggle } = useSidebarContext();

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
    <div className="flex w-full">
      {/* Responsive 3-Level Nested Sidebar */}
      <NestedSidebar isOpen={isOpen} onToggle={toggle} />
        
      {/* MAIN CONTENT AREA */}
      <div 
        className={`
          flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${isOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}
        `}
      >
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
      
      <Chatbot />
    </div>
  );
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
};

export default MainLayout;