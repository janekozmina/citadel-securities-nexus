import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface LiquiditySource {
  id: string;
  name: string;
  value: number;
  color: string;
}

// Sortable Legend Item Component
interface SortableLegendItemProps {
  source: LiquiditySource;
  isVisible: boolean;
  onToggle: (sourceId: string) => void;
  formatCurrency: (amount: number) => string;
}

function SortableLegendItem({ source, isVisible, onToggle, formatCurrency }: SortableLegendItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: source.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-3 p-2 rounded-lg border bg-background ${
        isDragging ? 'shadow-lg z-10' : 'hover:bg-muted/50'
      }`}
    >
      <div
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <Checkbox
        id={source.id}
        checked={isVisible}
        onCheckedChange={() => onToggle(source.id)}
      />
      <div className="flex-1 flex items-center space-x-2">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: source.color }}
        />
        <label 
          htmlFor={source.id}
          className="text-sm font-medium cursor-pointer flex-1"
        >
          {source.name}
        </label>
      </div>
      <Badge variant="outline" className="text-xs">
        {formatCurrency(source.value)}
      </Badge>
    </div>
  );
}

interface LiquiditySourceDialogProps {
  onClose: () => void;
}

export function LiquiditySourceDialog({ onClose }: LiquiditySourceDialogProps) {
  const [liquiditySources, setLiquiditySources] = useState<LiquiditySource[]>([
    { id: 'available-balance', name: 'Available Balance', value: 450000000, color: '#22c55e' },
    { id: 'ilf', name: 'ILF', value: 280000000, color: '#3b82f6' },
    { id: 'overdraft-net-system', name: 'Overdraft for Net System', value: 180000000, color: '#f59e0b' },
    { id: 'reserve-high-priority', name: 'Reserve for High Priority Operations', value: 120000000, color: '#8b5cf6' },
    { id: 'overdraft-governmental', name: 'Overdraft for Governmental Operations', value: 90000000, color: '#ef4444' }
  ]);

  const [visibleSources, setVisibleSources] = useState<Set<string>>(
    new Set(liquiditySources.map(source => source.id))
  );

  const [priorityGroup, setPriorityGroup] = useState<string>('net-transactions');
  const [hasManuallyReordered, setHasManuallyReordered] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const totalLiquidity = liquiditySources
    .filter(source => visibleSources.has(source.id))
    .reduce((sum, source) => sum + source.value, 0);

  const toggleSource = (sourceId: string) => {
    setVisibleSources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BHD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLiquiditySources((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      
      // Mark that user has manually reordered, but keep dropdown selection
      setHasManuallyReordered(true);
    }
  };

  const getStackedBarSegments = () => {
    let visibleSourcesData = liquiditySources.filter(source => visibleSources.has(source.id));
    
     // Apply priority group sorting if selected AND user hasn't manually reordered
     if (priorityGroup && !hasManuallyReordered) {
      visibleSourcesData = [...visibleSourcesData].sort((a, b) => {
        if (priorityGroup === 'net-transactions') {
          // Sort by highest value first for net transactions
          return b.value - a.value;
        } else if (priorityGroup === 'governmental-payments') {
          // Prioritize available balance and governmental overdraft for governmental
          const govPriority = { 'available-balance': 1, 'overdraft-governmental': 2 };
          const aPriority = govPriority[a.id as keyof typeof govPriority] || 999;
          const bPriority = govPriority[b.id as keyof typeof govPriority] || 999;
          return aPriority - bPriority;
        } else if (priorityGroup === 'participant-payments') {
          // Prioritize ILF and net system overdraft for participants
          const partPriority = { 'ilf': 1, 'overdraft-net-system': 2 };
          const aPriority = partPriority[a.id as keyof typeof partPriority] || 999;
          const bPriority = partPriority[b.id as keyof typeof partPriority] || 999;
          return aPriority - bPriority;
        }
        return 0;
      });
    }
    // If manual or user has reordered, use the current liquiditySources order
    
    const maxValue = totalLiquidity;
    
    return visibleSourcesData.map(source => ({
      ...source,
      percentage: (source.value / maxValue) * 100
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Liquidity Sources</h3>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Priority Group Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="priority-group">Priority Group</Label>
          <Select value={priorityGroup} onValueChange={(value) => {
            setPriorityGroup(value);
            setHasManuallyReordered(false); // Reset manual reordering when priority changes
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority group" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="net-transactions">Net transactions</SelectItem>
              <SelectItem value="governmental-payments">Governmental payments</SelectItem>
              <SelectItem value="participant-payments">Participant payments</SelectItem>
            </SelectContent>
          </Select>
          {hasManuallyReordered && (
            <p className="text-xs text-muted-foreground mt-1">
              Drag items in legend to reorder the chart
            </p>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stacked Bar Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Sources Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total Liquidity: {formatCurrency(totalLiquidity)}
                   {priorityGroup && (
                     <span className="ml-2 text-blue-600">
                       ({priorityGroup === 'net-transactions' ? 'Net transactions' :
                         priorityGroup === 'governmental-payments' ? 'Governmental payments' :
                         'Participant payments'} priority)
                     </span>
                   )}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stacked Bar */}
                  <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                    {getStackedBarSegments().map((source, index) => {
                      const leftOffset = getStackedBarSegments()
                        .slice(0, index)
                        .reduce((sum, s) => sum + s.percentage, 0);
                      
                      return (
                        <div
                          key={source.id}
                          className="absolute top-0 h-full transition-all duration-300 hover:opacity-80"
                          style={{
                            left: `${leftOffset}%`,
                            width: `${source.percentage}%`,
                            backgroundColor: source.color
                          }}
                          title={`${source.name}: ${formatCurrency(source.value)}`}
                        />
                      );
                    })}
                  </div>

                   {/* Value Labels */}
                  <div className="flex flex-wrap gap-2 text-sm justify-center">
                    {getStackedBarSegments().map(source => (
                      <div key={source.id} className="text-center min-w-[120px]">
                        <div className="font-medium">{formatCurrency(source.value)}</div>
                        <div className="text-muted-foreground text-xs truncate">{source.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Legend with Drag & Drop */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Source Types</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Drag to reorder • Click to toggle on/off
                </p>
              </CardHeader>
              <CardContent>
                <SortableContext
                  items={liquiditySources.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {liquiditySources.map(source => (
                      <SortableLegendItem
                        key={source.id}
                        source={source}
                        isVisible={visibleSources.has(source.id)}
                        onToggle={toggleSource}
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        </div>
      </DndContext>
    </div>
  );
}