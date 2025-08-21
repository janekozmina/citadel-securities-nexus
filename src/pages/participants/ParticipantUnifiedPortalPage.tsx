import React, { useState } from 'react';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent } from '@/components/ui/card';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Building, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function ParticipantUnifiedPortalPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const participantMetrics = [
    {
      title: 'Active Participants',
      value: '45',
      change: '+3',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Institutions Connected',
      value: '12',
      change: '+1',
      changeType: 'positive' as const,
      icon: Building
    },
    {
      title: 'Sessions Active',
      value: '28',
      change: '+5',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  // Generate activity data based on selected period
  const getActivityData = (period: string) => {
    switch (period) {
      case 'today':
        return [
          { name: '08:00', value: 12, color: 'hsl(var(--chart-1))' },
          { name: '10:00', value: 18, color: 'hsl(var(--chart-2))' },
          { name: '12:00', value: 24, color: 'hsl(var(--chart-3))' },
          { name: '14:00', value: 32, color: 'hsl(var(--chart-4))' },
          { name: '16:00', value: 28, color: 'hsl(var(--chart-5))' },
          { name: '18:00', value: 15, color: 'hsl(var(--chart-1))' }
        ];
      case 'week':
        return [
          { name: 'Mon', value: 340, color: 'hsl(var(--chart-1))' },
          { name: 'Tue', value: 390, color: 'hsl(var(--chart-2))' },
          { name: 'Wed', value: 320, color: 'hsl(var(--chart-3))' },
          { name: 'Thu', value: 420, color: 'hsl(var(--chart-4))' },
          { name: 'Fri', value: 450, color: 'hsl(var(--chart-5))' },
          { name: 'Sat', value: 280, color: 'hsl(var(--chart-1))' },
          { name: 'Sun', value: 200, color: 'hsl(var(--chart-2))' }
        ];
      case 'month':
        return [
          { name: 'Jan', value: 1200, color: 'hsl(var(--chart-1))' },
          { name: 'Feb', value: 1350, color: 'hsl(var(--chart-2))' },
          { name: 'Mar', value: 1100, color: 'hsl(var(--chart-3))' },
          { name: 'Apr', value: 1450, color: 'hsl(var(--chart-4))' },
          { name: 'May', value: 1600, color: 'hsl(var(--chart-5))' },
          { name: 'Jun', value: 1750, color: 'hsl(var(--chart-1))' }
        ];
      default:
        return [];
    }
  };

  const activityData = getActivityData(selectedPeriod);

  return (
    <div className="space-y-6">
      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {participantMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'}`}>
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Chart with Period Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Participant Portal Activity</h3>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <InteractiveChart
                config={{
                  type: "line",
                  title: "",
                  data: activityData,
                  height: 300
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Conditional Quick Actions */}
        <ConditionalQuickActions 
          pageKey="participant-unified-portal"
          systemType="participants"
        />
      </div>
    </div>
  );
}