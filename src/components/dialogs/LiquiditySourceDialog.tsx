import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface LiquiditySource {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface LiquiditySourceDialogProps {
  onClose: () => void;
}

export function LiquiditySourceDialog({ onClose }: LiquiditySourceDialogProps) {
  const [liquiditySources] = useState<LiquiditySource[]>([
    { id: 'central-bank', name: 'Central Bank Funding', value: 450000000, color: '#22c55e' },
    { id: 'commercial-deposits', name: 'Commercial Deposits', value: 280000000, color: '#3b82f6' },
    { id: 'interbank-loans', name: 'Interbank Loans', value: 180000000, color: '#f59e0b' },
    { id: 'repo-agreements', name: 'Repo Agreements', value: 120000000, color: '#8b5cf6' },
    { id: 'overnight-facilities', name: 'Overnight Facilities', value: 90000000, color: '#ef4444' },
    { id: 'standing-facilities', name: 'Standing Facilities', value: 60000000, color: '#06b6d4' }
  ]);

  const [visibleSources, setVisibleSources] = useState<Set<string>>(
    new Set(liquiditySources.map(source => source.id))
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

  const getStackedBarSegments = () => {
    const visibleSourcesData = liquiditySources.filter(source => visibleSources.has(source.id));
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacked Bar Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Sources Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total Liquidity: {formatCurrency(totalLiquidity)}
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
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {getStackedBarSegments().map(source => (
                    <div key={source.id} className="text-center">
                      <div className="font-medium">{formatCurrency(source.value)}</div>
                      <div className="text-muted-foreground text-xs">{source.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Legend */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Source Types</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click to toggle sources on/off
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liquiditySources.map(source => (
                  <div key={source.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={source.id}
                      checked={visibleSources.has(source.id)}
                      onCheckedChange={() => toggleSource(source.id)}
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}