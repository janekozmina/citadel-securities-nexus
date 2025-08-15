
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { useSidebarContext } from './SidebarProvider';

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

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const { toggle } = useSidebarContextSafe();
  const [searchQuery, setSearchQuery] = useState('');

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
        <h1 className="text-xl font-semibold text-white">CBB Portal</h1>
        
        {/* Search through menu */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search through menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
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
