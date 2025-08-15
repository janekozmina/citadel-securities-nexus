import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  variant?: 'default' | 'secondary' | 'outline';
}

interface QuickActionsProps {
  title: string;
  actions: QuickAction[];
}

export const QuickActions = ({ title, actions }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.path}
              variant={action.variant || 'outline'}
              className="h-auto p-4 flex flex-col items-start space-y-2 text-left"
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-center gap-2 w-full">
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {action.description}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};