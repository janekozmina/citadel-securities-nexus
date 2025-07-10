
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { AlertsPanel } from './AlertsPanel';

const DashboardLayout = () => {
  const location = useLocation();

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
      <div className="min-h-screen flex flex-col w-full bg-slate-50">
        <DashboardHeader />
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto p-6 pr-16">
            <Outlet />
          </main>
          <AlertsPanel alerts={getPageAlerts()} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
