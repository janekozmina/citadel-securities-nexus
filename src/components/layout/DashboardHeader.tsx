
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Menu, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useSidebarContext } from './SidebarProvider';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { getPageTitle, getPageDescription } from '@/utils/pageConfig';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Helper hook that safely uses sidebar context
const useSidebarContextSafe = () => {
  try {
    return useSidebarContext();
  } catch {
    return { toggle: () => {} }; // Return dummy function if no provider
  }
};

interface DashboardHeaderProps {
  showQuickActions?: boolean;
  pageKey?: string;
  systemType?: 'rtgs' | 'csd' | 'cms' | 'common';
}

export const DashboardHeader = ({ 
  showQuickActions = false, 
  pageKey, 
  systemType = 'common' 
}: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const { toggle } = useSidebarContextSafe();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    emulatedDay, 
    currentPhaseData, 
    toggleSimulation, 
    resetSimulation, 
    formatEmulatedTime,
    getPhaseProgress 
  } = useBusinessDayEmulation(); // Real time progression

  const pageTitle = getPageTitle(location.pathname);
  const pageDescription = getPageDescription(location.pathname);

  return (
    <header className="h-16 dashboard-header-bg border-b border-slate-600 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="text-white hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        
        {/* Emulated Business Day Time */}
        <div className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-1.5">
          <Clock className="h-4 w-4 text-white" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">
                {formatEmulatedTime(emulatedDay.emulatedTime)}
              </span>
              <Badge 
                variant={emulatedDay.isRunning ? "default" : "secondary"}
                className="text-xs"
              >
                {emulatedDay.isRunning ? "Live" : "Paused"}
              </Badge>
            </div>
            <span className="text-xs text-slate-300">
              {currentPhaseData.name} ({getPhaseProgress()}%)
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSimulation}
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              {emulatedDay.isRunning ? 
                <Pause className="h-3 w-3" /> : 
                <Play className="h-3 w-3" />
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSimulation}
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        {showQuickActions && pageKey && (
          <QuickActionsManager
            pageKey={pageKey}
            systemType={systemType}
            className="mr-4"
          />
        )}
        
        <span className="text-sm text-slate-300">Welcome, {user?.name}</span>
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
