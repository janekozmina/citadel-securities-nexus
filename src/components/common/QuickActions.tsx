import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  action: string;
  icon: string;
  variant?: 'default' | 'outline' | 'secondary';
  disabled?: boolean;
}

interface QuickActionsProps {
  title?: string;
  actions: QuickAction[];
  onActionClick?: (action: string) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

// Icon mapping - add more as needed
const iconMap: Record<string, LucideIcon> = {
  // Import dynamically or use a proper icon mapping system
  // This is a simplified version for demonstration
};

export const QuickActions = ({
  title = "Quick Actions",
  actions,
  onActionClick,
  className,
  layout = 'vertical'
}: QuickActionsProps) => {
  const handleActionClick = (action: string) => {
    if (onActionClick) {
      onActionClick(action);
    } else {
      console.log(`Action triggered: ${action}`);
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-2';
      case 'grid':
        return 'grid grid-cols-2 gap-2';
      default:
        return 'space-y-2';
    }
  };

  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={getLayoutClasses()}>
          {actions.map((action, index) => {
            // For now, we'll use a placeholder icon since we can't dynamically import
            // In a real implementation, you'd want a proper icon mapping system
            return (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                className={cn(
                  layout === 'vertical' ? 'w-full justify-start' : '',
                  "transition-all duration-200 hover:scale-105"
                )}
                onClick={() => handleActionClick(action.action)}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;