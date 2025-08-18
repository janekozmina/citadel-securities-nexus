
import { Outlet, useLocation } from 'react-router-dom';
import { ResponsiveSidebar } from './ResponsiveSidebar';
import { SidebarProvider, useSidebarContext } from './SidebarProvider';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';
import { Breadcrumbs } from './Breadcrumbs';
import Chatbot from './Chatbot';

function DashboardContent() {
  const location = useLocation();
  const { isOpen, toggle } = useSidebarContext();

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
    <div className="min-h-screen flex w-full bg-slate-50">
      <ResponsiveSidebar isOpen={isOpen} onToggle={toggle} />
      
      <div 
        className={`
          flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${isOpen ? 'lg:ml-[260px]' : 'lg:ml-0'}
        `}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
      <AlertsPanel alerts={getPageAlerts()} />
      <Chatbot />
    </div>
  );
}

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default DashboardLayout;
