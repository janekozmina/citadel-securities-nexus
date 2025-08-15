import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Settings, Plus, Trash2, RotateCcw } from 'lucide-react';
import { useQuickActions } from '@/hooks/useQuickActions';
import type { QuickAction } from '@/config/quickActionsConfig';

interface QuickActionsManagerProps {
  pageKey: string;
  systemType: 'rtgs' | 'csd' | 'cms' | 'common';
}

export const QuickActionsManager = ({ pageKey, systemType }: QuickActionsManagerProps) => {
  const {
    activeActions,
    availableActions,
    addAction,
    removeAction,
    resetToDefaults,
    isActionActive,
    canAddMoreActions
  } = useQuickActions(pageKey, systemType);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories from available actions
  const categories = ['all', ...new Set(availableActions.map(action => action.category))];

  // Filter available actions based on selected category
  const filteredAvailableActions = availableActions.filter(action => 
    selectedCategory === 'all' || action.category === selectedCategory
  );

  const handleActionClick = (action: QuickAction) => {
    // This would be implemented by the parent component or through a context
    console.log(`Quick action clicked: ${action.label}`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Quick Actions</h3>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs"
            onClick={() => console.log('All Actions clicked')}
          >
            All Actions
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Manage Quick Actions</DialogTitle>
              <DialogDescription>
                Add or remove quick actions from your sidebar. You can have up to 6 actions active at once.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Actions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Active Actions ({activeActions.length}/6)</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetToDefaults}
                    className="h-7 text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                <ScrollArea className="h-[300px] border rounded-md p-2">
                  <div className="space-y-2">
                    {activeActions.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <action.icon className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium">{action.label}</div>
                            <div className="text-xs text-muted-foreground">{action.category}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAction(action.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {activeActions.length === 0 && (
                      <div className="text-center text-muted-foreground text-sm py-8">
                        No active actions
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Available Actions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Available Actions</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32 h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ScrollArea className="h-[300px] border rounded-md p-2">
                  <div className="space-y-2">
                    {filteredAvailableActions.map((action) => {
                      const isActive = isActionActive(action.id);
                      return (
                        <div
                          key={action.id}
                          className={`flex items-center justify-between p-2 rounded-md ${
                            isActive ? 'bg-slate-100 opacity-50' : 'bg-white border'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <action.icon className="h-4 w-4" />
                            <div>
                              <div className="text-sm font-medium">{action.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {action.description}
                              </div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {action.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addAction(action.id)}
                            disabled={isActive || !canAddMoreActions}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsOpen(false)}>Done</Button>
            </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active Quick Actions */}
      <div className="space-y-2">
        {activeActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || 'outline'}
            className="w-full justify-start"
            onClick={() => handleActionClick(action)}
          >
            <action.icon className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        ))}
        {activeActions.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-4">
            No quick actions configured
          </div>
        )}
      </div>
    </div>
  );
};