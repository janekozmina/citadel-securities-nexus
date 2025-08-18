import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currency } from '@/config/currencyConfig';

interface HeatmapParticipant {
  id: string;
  name: string;
  settlementValue: number;
  liquidityStatus: 'high' | 'medium' | 'low' | 'critical';
  shortName: string;
}

interface LiquidityHeatmapProps {
  title: string;
  participants: HeatmapParticipant[];
  height?: number;
  className?: string;
}

const getLiquidityColor = (status: HeatmapParticipant['liquidityStatus']) => {
  switch (status) {
    case 'high':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-orange-500';
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-gray-300';
  }
};

const getLiquidityTextColor = (status: HeatmapParticipant['liquidityStatus']) => {
  switch (status) {
    case 'high':
      return 'text-white';
    case 'medium':
      return 'text-black';
    case 'low':
      return 'text-white';
    case 'critical':
      return 'text-white';
    default:
      return 'text-gray-700';
  }
};

const getSquareSize = (value: number, maxValue: number) => {
  const minSize = 60;
  const maxSize = 120;
  const ratio = value / maxValue;
  return minSize + (maxSize - minSize) * ratio;
};

export const LiquidityHeatmap: React.FC<LiquidityHeatmapProps> = ({
  title,
  participants,
  height = 400,
  className = ''
}) => {
  const maxValue = Math.max(...participants.map(p => p.settlementValue));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="flex flex-wrap items-center justify-center gap-4 p-4"
          style={{ height: height - 80 }}
        >
          {participants.map((participant) => {
            const size = getSquareSize(participant.settlementValue, maxValue);
            const colorClass = getLiquidityColor(participant.liquidityStatus);
            const textColorClass = getLiquidityTextColor(participant.liquidityStatus);
            
            return (
              <div
                key={participant.id}
                className={`${colorClass} ${textColorClass} rounded-lg flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                title={`${participant.name}\nSettlement Value: ${currency(participant.settlementValue, true)}\nLiquidity Status: ${participant.liquidityStatus.toUpperCase()}`}
              >
                <div className="text-xs font-bold text-center px-1">
                  {participant.shortName}
                </div>
                <div className="text-xs text-center px-1 mt-1">
                  {currency(participant.settlementValue, true)}
                </div>
                <div className="text-xs text-center px-1 mt-1 capitalize">
                  {participant.liquidityStatus}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 border-t pt-4">
          <div className="text-sm font-medium mb-2">Liquidity Status Legend:</div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Critical</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Square size represents settlement value
          </div>
        </div>
      </CardContent>
    </Card>
  );
};