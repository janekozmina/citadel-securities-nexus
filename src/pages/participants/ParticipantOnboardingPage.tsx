import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { UserPlus, FileCheck, Clock, AlertCircle } from 'lucide-react';

export default function ParticipantOnboardingPage() {
  const onboardingMetrics = [
    {
      title: 'Applications Pending',
      value: '8',
      change: '+2',
      changeType: 'positive' as const,
      icon: UserPlus
    },
    {
      title: 'Documents Under Review',
      value: '15',
      change: '+3',
      changeType: 'positive' as const,
      icon: FileCheck
    },
    {
      title: 'Avg Processing Time',
      value: '5.2 days',
      change: '-1.3 days',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Pending Actions',
      value: '4',
      change: '-2',
      changeType: 'positive' as const,
      icon: AlertCircle
    }
  ];

  const onboardingStatusData = [
    { name: 'Document Review', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Technical Setup', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Compliance Check', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Final Approval', value: 15, color: 'hsl(var(--chart-4))' },
    { name: 'Completed', value: 5, color: 'hsl(var(--chart-5))' }
  ];

  const monthlyOnboardingData = [
    { name: 'Jan', applications: 8, completed: 6, color: 'hsl(var(--chart-1))' },
    { name: 'Feb', applications: 12, completed: 9, color: 'hsl(var(--chart-2))' },
    { name: 'Mar', applications: 6, completed: 8, color: 'hsl(var(--chart-3))' },
    { name: 'Apr', applications: 10, completed: 7, color: 'hsl(var(--chart-4))' },
    { name: 'May', applications: 15, completed: 11, color: 'hsl(var(--chart-5))' },
    { name: 'Jun', applications: 9, completed: 12, color: 'hsl(var(--chart-1))' }
  ];

  const onboardingData = [
    { 
      applicationId: 'APP-2025-001', 
      institution: 'Bahrain Commercial Bank', 
      applicationType: 'New Participant', 
      submissionDate: '2025-01-15',
      currentStage: 'Document Review', 
      assignedTo: 'Sarah Ahmed',
      priority: 'High',
      daysInProcess: '3'
    },
    { 
      applicationId: 'APP-2025-002', 
      institution: 'Al Baraka Banking Group', 
      applicationType: 'Service Extension', 
      submissionDate: '2025-01-12',
      currentStage: 'Technical Setup', 
      assignedTo: 'Mohammed Hassan',
      priority: 'Medium',
      daysInProcess: '6'
    },
    { 
      applicationId: 'APP-2025-003', 
      institution: 'First Energy Bank', 
      applicationType: 'New Participant', 
      submissionDate: '2025-01-10',
      currentStage: 'Compliance Check', 
      assignedTo: 'Fatima Al-Zahra',
      priority: 'High',
      daysInProcess: '8'
    },
    { 
      applicationId: 'APP-2024-045', 
      institution: 'United Gulf Bank', 
      applicationType: 'System Upgrade', 
      submissionDate: '2024-12-28',
      currentStage: 'Final Approval', 
      assignedTo: 'Ali Mahmood',
      priority: 'Low',
      daysInProcess: '21'
    },
    { 
      applicationId: 'APP-2025-004', 
      institution: 'Khaleeji Commercial Bank', 
      applicationType: 'New Participant', 
      submissionDate: '2025-01-08',
      currentStage: 'Document Review', 
      assignedTo: 'Noor Abdullah',
      priority: 'Medium',
      daysInProcess: '10'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Participant Onboarding"
        description="Manage and track participant onboarding applications and processes"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {onboardingMetrics.map((metric, index) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              config={{
                type: "pie",
                title: "Applications by Stage",
                data: onboardingStatusData,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Monthly Onboarding Progress",
                data: [
                  { name: 'Jan', value: 8, color: 'hsl(var(--chart-1))' },
                  { name: 'Feb', value: 12, color: 'hsl(var(--chart-2))' },
                  { name: 'Mar', value: 6, color: 'hsl(var(--chart-3))' },
                  { name: 'Apr', value: 10, color: 'hsl(var(--chart-4))' },
                  { name: 'May', value: 15, color: 'hsl(var(--chart-5))' },
                  { name: 'Jun', value: 9, color: 'hsl(var(--chart-1))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title="Active Onboarding Applications"
            data={onboardingData}
            columns={[
              { key: 'applicationId', label: 'Application ID' },
              { key: 'institution', label: 'Institution' },
              { key: 'applicationType', label: 'Type' },
              { key: 'submissionDate', label: 'Submitted', type: 'date' },
              { key: 'currentStage', label: 'Current Stage' },
              { key: 'assignedTo', label: 'Assigned To' },
              { key: 'priority', label: 'Priority', type: 'status' },
              { key: 'daysInProcess', label: 'Days in Process' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="participant-onboarding" systemType="common" />
        </div>
      </div>
    </div>
  );
}