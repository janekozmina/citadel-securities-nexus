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
import { Settings, Plus, Trash2, RotateCcw, Eye } from 'lucide-react';
import { useQuickActions } from '@/hooks/useQuickActions';
import type { QuickAction } from '@/config/quickActionsConfig';
import { quickActionUrls } from '@/config/quickActionsConfig';

interface QuickActionsManagerProps {
  pageKey: string;
  systemType: 'rtgs' | 'csd' | 'cms' | 'common' | 'participants';
  className?: string;
  onActionClick?: (actionId: string) => void;
}

export const QuickActionsManager = ({ pageKey, systemType, className, onActionClick }: QuickActionsManagerProps) => {
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
    // Handle specific action logic here
    if (onActionClick) {
      onActionClick(action.id);
    }
    
    // Handle configure-alert action
    if (action.id === 'configure-alert') {
      return; // onActionClick handler will handle this
    }
    
    // Check if action has external URL
    if (quickActionUrls[action.id]) {
      window.open(quickActionUrls[action.id], '_blank');
      return;
    }
    
    // Default behaviors for specific actions
    switch (action.id) {
      case 'access-configuration-panel':
        window.open('http://cn-dmrtgs-app01:8000/', '_blank');
        break;
      case 'refresh-data':
        window.location.reload();
        break;
      default:
        console.log(`Quick action clicked: ${action.label}`);
        break;
    }
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Quick Actions</h3>
        <div className="flex gap-1">
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

      {/* VISIBLE Quick Action Buttons */}
      <div className="space-y-2">
        {activeActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || 'outline'}
            className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
            onClick={() => handleActionClick(action)}
          >
            <action.icon className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <span className="break-words text-sm">{action.label}</span>
          </Button>
        ))}
        {activeActions.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-4 border-2 border-dashed rounded-lg">
            No quick actions configured
          </div>
        )}
      </div>

      {/* More Actions - Separate from Quick Actions */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-700">More Actions</h4>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              View All Actions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>All Available Actions</DialogTitle>
              <DialogDescription>
                Browse all available actions organized by category. Actions are context-aware based on your current view.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Context-Aware Actions */}
              <div>
                <h4 className="font-medium mb-3">Context Actions</h4>
                <ScrollArea className="h-[300px] border rounded-md p-2">
                  <div className="space-y-2">
                    {availableActions.filter(action => action.category === 'account' || action.category === 'transaction').map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-2 bg-white border rounded-md hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <action.icon className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium">{action.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {action.description}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActionClick(action)}
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* All Other Actions */}
              <div>
                <h4 className="font-medium mb-3">Other Actions</h4>
                <ScrollArea className="h-[300px] border rounded-md p-2">
                  <div className="space-y-2">
                    {availableActions.filter(action => action.category !== 'account' && action.category !== 'transaction').map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-2 bg-white border rounded-md hover:bg-slate-50"
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
                          onClick={() => handleActionClick(action)}
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};