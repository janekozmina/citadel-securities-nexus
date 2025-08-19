import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { QuickActions } from '@/components/common/QuickActions';
import { Users, Building, CheckCircle, Clock, AlertTriangle, ExternalLink, Activity, BarChart3 } from 'lucide-react';

export default function ParticipantUnifiedPortalPage() {
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

  const participantStatusData = [
    { name: 'Active', value: 75, color: 'hsl(var(--chart-1))' },
    { name: 'Pending', value: 15, color: 'hsl(var(--chart-2))' },
    { name: 'Suspended', value: 8, color: 'hsl(var(--chart-3))' },
    { name: 'Inactive', value: 2, color: 'hsl(var(--chart-4))' }
  ];

  const participantActivityData = [
    { name: 'Jan', transactions: 1200, sessions: 340, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', transactions: 1350, sessions: 390, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', transactions: 1100, sessions: 320, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', transactions: 1450, sessions: 420, color: 'hsl(var(--chart-4))' },
    { name: 'May', transactions: 1600, sessions: 450, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', transactions: 1750, sessions: 480, color: 'hsl(var(--chart-1))' }
  ];

  const participantData = [
    { 
      participantId: 'NBB001', 
      name: 'National Bank of Bahrain', 
      type: 'Commercial Bank', 
      status: 'Active', 
      lastLogin: '2025-01-18 14:30', 
      sessionsToday: '8',
      transactionsToday: '45'
    },
    { 
      participantId: 'AUB002', 
      name: 'Ahli United Bank', 
      type: 'Commercial Bank', 
      status: 'Active', 
      lastLogin: '2025-01-18 13:45', 
      sessionsToday: '6',
      transactionsToday: '32'
    },
    { 
      participantId: 'BIB003', 
      name: 'Bahrain Islamic Bank', 
      type: 'Islamic Bank', 
      status: 'Active', 
      lastLogin: '2025-01-18 15:15', 
      sessionsToday: '7',
      transactionsToday: '28'
    },
    { 
      participantId: 'BBK004', 
      name: 'Bank of Bahrain and Kuwait', 
      type: 'Commercial Bank', 
      status: 'Pending', 
      lastLogin: '2025-01-17 16:20', 
      sessionsToday: '0',
      transactionsToday: '0'
    },
    { 
      participantId: 'GIB005', 
      name: 'Gulf International Bank', 
      type: 'Investment Bank', 
      status: 'Active', 
      lastLogin: '2025-01-18 12:10', 
      sessionsToday: '4',
      transactionsToday: '18'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Participant Unified Portal"
        description="Monitor and manage participant access to the unified portal system"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3">
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
        </div>

        <div className="xl:col-span-1 space-y-6">
          <QuickActions 
            title="Participant Portal Actions" 
            actions={[
              { title: 'Access Portal', description: 'Open unified portal interface', icon: ExternalLink, path: 'https://participant-portal.cbb.gov.bh' },
              { title: 'Monitor Sessions', description: 'View active user sessions', icon: Users, path: '#' },
              { title: 'System Status', description: 'Check portal system health', icon: Activity, path: '#' },
              { title: 'Generate Reports', description: 'Create portal usage reports', icon: BarChart3, path: '#' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}