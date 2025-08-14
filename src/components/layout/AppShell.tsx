import { ReactNode } from 'react';
import { PrimaryNavigation } from './PrimaryNavigation';
import { SecondaryNavigation } from './SecondaryNavigation';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Primary Navigation Drawer */}
      <div className="sticky top-0 h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700
                      w-[var(--nav1-w)] xl:w-[var(--nav1-w)] lg:w-[var(--nav1-w-compressed)] md:w-[var(--nav1-w-compressed)]">
        <PrimaryNavigation />
      </div>

      {/* Secondary Navigation Drawer */}
      <div className="sticky top-0 h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-700 to-slate-800 border-r border-slate-600
                      w-[var(--nav2-w)] xl:w-[var(--nav2-w)] lg:w-[var(--nav2-w-compressed)] 
                      md:w-[var(--nav-collapsed)] max-md:w-[var(--nav-collapsed)]">
        <SecondaryNavigation />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}