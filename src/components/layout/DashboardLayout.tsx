
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
