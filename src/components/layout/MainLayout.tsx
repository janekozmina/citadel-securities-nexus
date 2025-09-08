import { Outlet, useLocation } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';
import { Breadcrumbs } from './Breadcrumbs';
import Chatbot from './Chatbot';
import { useAuth } from '@/contexts/AuthContext';
import themeConfig from '@/config/themeConfig';
import { NestedSidebar } from './NestedSidebar';
import { SidebarProvider, useSidebarContext } from './SidebarProvider';
import { getPageTitle } from '@/utils/pageConfig';

interface MainLayoutProps {
  children?: React.ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();
  const { isOpen, toggle } = useSidebarContext();
  
  // Determine if current page should show quick actions
  const shouldShowQuickActions = location.pathname.includes('/rtgs/') || 
                                 location.pathname.includes('/csd/') || 
                                 location.pathname.includes('/cms/');
  
  // Determine page key and system type for quick actions
  const getPageKey = () => {
    if (location.pathname.includes('/account-management')) return 'account-management';
    if (location.pathname.includes('/transaction-status')) return 'transaction-status';
    if (location.pathname.includes('/statements')) return 'account-statements';
    return 'default';
  };
  
  const getSystemType = (): 'rtgs' | 'csd' | 'cms' | 'common' => {
    if (location.pathname.includes('/rtgs/')) return 'rtgs';
    if (location.pathname.includes('/csd/')) return 'csd';
    if (location.pathname.includes('/cms/')) return 'cms';
    return 'common';
  };

  // Define alerts for different pages
  const getPageAlerts = () => {
    const systemAlerts = [
      {
        id: 1,
        type: 'alert' as const,
        message: 'System maintenance scheduled on 2025/08/19. Expected downtime: 2 hours.',
        time: '09:00',
        urgent: false,
        category: 'system' as const,
        source: 'CSD'
      },
      {
        id: 2,
        type: 'info' as const,
        message: 'New reporting rule effective from 2025/09/01.',
        time: '08:30',
        urgent: false,
        category: 'system' as const,
        source: 'System'
      }
    ];

    const contextAlerts = [];

    // Add context alerts based on current page
    if (location.pathname.includes('/csd/account') || location.pathname.includes('/csd/balances')) {
      contextAlerts.push({
        id: 3,
        type: 'warning' as const,
        message: 'Account QNB Finansbank A.Ş., Bahrain balance below threshold.',
        time: '14:45',
        urgent: true,
        category: 'context' as const,
        source: 'CSD'
      });
    }

    // Add ILF alert for home page
    if (location.pathname === '/') {
      contextAlerts.push({
        id: 4,
        type: 'warning' as const,
        message: 'ILF window closes in 15 minutes',
        time: '14:45',
        urgent: true,
        category: 'context' as const,
        source: 'RTGS'
      });
    }

    return [...systemAlerts, ...contextAlerts];
  };

  return (
    <div className="flex w-full">
      {/* Responsive 3-Level Nested Sidebar */}
      <NestedSidebar isOpen={isOpen} onToggle={toggle} />
        
      {/* MAIN CONTENT AREA */}
      <div 
        className={`
          flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${isOpen ? 'lg:ml-[320px]' : 'lg:ml-0'}
        `}
      >
        {/* STICKY HEADER */}
        <div 
          className="sticky top-0 z-10"
          style={{ height: themeConfig.layout.header.height }}
        >
          <DashboardHeader 
            showQuickActions={false}
            pageKey={getPageKey()}
            systemType={getSystemType()}
          />
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
      
      {/* Hide AlertsPanel for CSD Participants */}
      {user?.role !== 'CSDParticipant' && <AlertsPanel alerts={getPageAlerts()} />}
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