import { Button } from '@/components/ui/button';
import { TableIcon, BarChart3 } from 'lucide-react';

interface DashboardViewSwitcherProps {
  viewMode: 'visual' | 'table';
  onViewModeChange: (mode: 'visual' | 'table') => void;
  className?: string;
}

export function DashboardViewSwitcher({ 
  viewMode, 
  onViewModeChange, 
  className = "" 
}: DashboardViewSwitcherProps) {
  return (
    <div className={`flex items-center gap-2 min-h-[40px] ${className}`}>
      <span className="text-sm font-medium text-slate-700">View Mode:</span>
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('table')}
        >
          <TableIcon className="h-4 w-4 mr-2" />
          Table
        </Button>
        <Button
          variant={viewMode === 'visual' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('visual')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}