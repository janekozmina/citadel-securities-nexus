import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DashboardMetricsGrid } from '@/components/common/DashboardMetricsGrid';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { FileCheck, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DocumentsApprovalPage() {
  const approvalMetrics = [
    {
      title: 'Pending Approvals',
      value: '15',
      change: '+3',
      changeType: 'neutral' as const,
      icon: Clock
    },
    {
      title: 'Approved Today',
      value: '28',
      change: '+5',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Rejected Documents',
      value: '2',
      change: '0',
      changeType: 'neutral' as const,
      icon: AlertTriangle
    },
    {
      title: 'Average Processing Time',
      value: '4.2 hrs',
      change: '-0.8 hrs',
      changeType: 'positive' as const,
      icon: FileCheck
    }
  ];

  const documentsData = [
    { docId: 'DOC001', type: 'Transfer Instruction', submitter: 'National Bank', submitDate: '2024-01-18', reviewer: 'Admin User', status: 'Pending Review', priority: 'High' },
    { docId: 'DOC002', type: 'Corporate Action Notice', submitter: 'Government Registry', submitDate: '2024-01-18', reviewer: 'Supervisor', status: 'Approved', priority: 'Medium' },
    { docId: 'DOC003', type: 'Issuance Documents', submitter: 'BBK Bank', submitDate: '2024-01-17', reviewer: 'Senior Admin', status: 'Under Review', priority: 'High' },
    { docId: 'DOC004', type: 'Settlement Instruction', submitter: 'AUB Bank', submitDate: '2024-01-17', reviewer: 'Admin User', status: 'Rejected', priority: 'Low' },
    { docId: 'DOC005', type: 'Custody Agreement', submitter: 'Al Salam Bank', submitDate: '2024-01-16', reviewer: 'Supervisor', status: 'Approved', priority: 'Medium' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Documents Approval"
        description="Manage document review and approval workflow"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {approvalMetrics.map((metric, index) => (
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

          <DataTable
            title="Document Approval Queue"
            data={documentsData}
            columns={[
              { key: 'docId', label: 'Document ID' },
              { key: 'type', label: 'Document Type' },
              { key: 'submitter', label: 'Submitter' },
              { key: 'submitDate', label: 'Submit Date', type: 'date' },
              { key: 'reviewer', label: 'Reviewer' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'priority', label: 'Priority' }
            ]}
            searchable
            filters={[
              { key: 'status', label: 'Status', options: ['Pending Review', 'Under Review', 'Approved', 'Rejected'] },
              { key: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'] }
            ]}
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="documents-approval" systemType="csd" />
        </div>
      </div>
    </div>
  );
}