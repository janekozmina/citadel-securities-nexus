import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LiquiditySourceDashboardProps {
  onClose: () => void;
}

export function LiquiditySourceDashboard({ onClose }: LiquiditySourceDashboardProps) {
  const [selectedPriorityGroup, setSelectedPriorityGroup] = useState('all');
  const [selectedTimeScope, setSelectedTimeScope] = useState('net');

  // Mock data for different scenarios
  const liquidityData = {
    full: {
      totalBalance: 5000000,
      availableBalance: 3000000,
      reserveForNet: 1000000,
      highPriority: 500000,
      overdraft: 500000
    },
    partial: {
      totalBalance: 4500000,
      availableBalance: 3000000,
      reserveForNet: 1000000,
      overdraft: 500000
    },
    highPriorityOnly: {
      totalBalance: 4000000,
      highPriority: 500000,
      availableBalance: 3000000,
      overdraft: 500000
    },
    availableOnly: {
      totalBalance: 3000000,
      availableBalance: 3000000
    }
  };

  interface LiquidityData {
    totalBalance: number;
    availableBalance: number;
    reserveForNet?: number;
    highPriority?: number;
    overdraft?: number;
  }

  const liquiditySources = [
    { source: 'Available balance', order: 1, color: 'bg-green-500' },
    { source: 'Reserve for Net systems', order: 2, color: 'bg-orange-400' },
    { source: 'Overdraft', order: 3, color: 'bg-pink-400' },
    { source: 'High Priority reserve', order: 1, color: 'bg-purple-500' }
  ];

  const getCurrentData = (): LiquidityData => {
    if (selectedTimeScope === 'governmental') return liquidityData.highPriorityOnly;
    if (selectedTimeScope === 'participant') return liquidityData.partial;
    return liquidityData.full;
  };

  const data = getCurrentData();

  const renderLiquidityStack = () => {
    const segments = [];
    let currentHeight = 0;
    const totalHeight = 400;
    const maxValue = Math.max(...Object.values(liquidityData.full));

    if (data.overdraft) {
      const height = (data.overdraft / maxValue) * totalHeight;
      segments.push(
        <div
          key="overdraft"
          className="bg-pink-400 border-r-4 border-pink-300"
          style={{ height: `${height}px` }}
        >
          <div className="p-2 text-white text-sm font-medium">
            {(data.overdraft / 1000000).toFixed(1)}M
          </div>
        </div>
      );
      currentHeight += height;
    }

    if (data.highPriority) {
      const height = (data.highPriority / maxValue) * totalHeight;
      segments.push(
        <div
          key="highPriority"
          className="bg-purple-500 border-r-4 border-purple-300"
          style={{ height: `${height}px` }}
        >
          <div className="p-2 text-white text-sm font-medium">
            {(data.highPriority / 1000000).toFixed(1)}M
          </div>
        </div>
      );
    }

    if (data.reserveForNet) {
      const height = (data.reserveForNet / maxValue) * totalHeight;
      segments.push(
        <div
          key="reserve"
          className="bg-orange-400 border-r-4 border-orange-300"
          style={{ height: `${height}px` }}
        >
          <div className="p-2 text-white text-sm font-medium">
            {(data.reserveForNet / 1000000).toFixed(1)}M
          </div>
        </div>
      );
    }

    if (data.availableBalance) {
      const height = (data.availableBalance / maxValue) * totalHeight;
      segments.push(
        <div
          key="available"
          className="bg-green-500 border-r-4 border-green-300"
          style={{ height: `${height}px` }}
        >
          <div className="p-2 text-white text-sm font-medium">
            {(data.availableBalance / 1000000).toFixed(1)}M
          </div>
        </div>
      );
    }

    return segments.reverse();
  };

  const getLabels = () => {
    const labels = [];
    
    if (data.availableBalance) {
      labels.push({ text: 'Available balance', value: data.availableBalance });
    }
    if (data.reserveForNet) {
      labels.push({ text: 'Reserve for Net systems', value: data.reserveForNet });
    }
    if (data.highPriority) {
      labels.push({ text: 'High Priority reserve', value: data.highPriority });
    }
    if (data.overdraft) {
      labels.push({ text: 'Overdraft', value: data.overdraft });
    }

    return labels;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Liquidity sources for payments (an example)</h2>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-end gap-8">
                {/* Total Balance Label */}
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Available<br />(current)<br />balance
                  </div>
                  <div className="text-lg font-bold">
                    {(data.totalBalance / 1000000).toFixed(0)} 000 000<br />BHD
                  </div>
                </div>

                {/* Liquidity Stack */}
                <div className="flex flex-col-reverse">
                  {renderLiquidityStack()}
                </div>

                {/* Labels */}
                <div className="flex flex-col justify-center space-y-4">
                  {getLabels().map((label, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-sm">{label.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls and Table Column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Liquidity source profiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Priority group</label>
                <p className="text-sm">Drop down list of all priority group</p>
                <Select value={selectedPriorityGroup} onValueChange={setSelectedPriorityGroup}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All priorities</SelectItem>
                    <SelectItem value="high">High priority only</SelectItem>
                    <SelectItem value="standard">Standard priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600">Time scope</label>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value="net" 
                      checked={selectedTimeScope === 'net'} 
                      onChange={(e) => setSelectedTimeScope(e.target.value)}
                    />
                    <span className="text-sm">Net transactions</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value="governmental" 
                      checked={selectedTimeScope === 'governmental'} 
                      onChange={(e) => setSelectedTimeScope(e.target.value)}
                    />
                    <span className="text-sm">Governmental payments</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value="participant" 
                      checked={selectedTimeScope === 'participant'} 
                      onChange={(e) => setSelectedTimeScope(e.target.value)}
                    />
                    <span className="text-sm">Participant payments</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-600">
                    <TableHead className="text-white">Liquidity source</TableHead>
                    <TableHead className="text-white">Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liquiditySources
                    .filter(source => {
                      if (selectedTimeScope === 'governmental') {
                        return source.source === 'High Priority reserve' || source.source === 'Available balance' || source.source === 'Overdraft';
                      }
                      if (selectedTimeScope === 'participant') {
                        return source.source !== 'High Priority reserve';
                      }
                      return true;
                    })
                    .map((source, index) => (
                    <TableRow key={index} className="bg-green-100">
                      <TableCell className="text-sm">{source.source}</TableCell>
                      <TableCell className="text-sm">{source.order}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}