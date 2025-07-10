
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLocation } from 'react-router-dom';

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Mock alerts - in real app this would come from a context or API
  const alerts = [
    ...(location.pathname === '/' ? [
      {
        id: 1,
        type: 'warning',
        message: 'ILF window closes in 15 minutes',
        time: '14:45',
        urgent: true
      }
    ] : []),
    {
      id: 2,
      type: 'info',
      message: 'Settlement batch processing complete',
      time: '14:30',
      urgent: false
    },
    {
      id: 3,
      type: 'alert',
      message: 'System maintenance scheduled for tonight',
      time: '14:15',
      urgent: false
    }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-slate-800">CSD Unified Portal</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {alerts.some(alert => alert.urgent) && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Alerts</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-2 rounded border-l-4 text-sm ${
                      alert.urgent 
                        ? 'border-red-500 bg-red-50' 
                        : alert.type === 'warning' 
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="flex-1">{alert.message}</span>
                      <span className="text-xs text-slate-500 ml-2">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <span className="text-sm text-slate-600">Welcome, {user?.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
