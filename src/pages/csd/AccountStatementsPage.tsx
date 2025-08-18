import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { FileText, Download, Mail, CheckCircle } from 'lucide-react';
import { getPageConfig } from '@/config/pageConfig';

export default function AccountStatementsPage() {
  const config = getPageConfig('csd', 'accountStatements');
  const statementMetrics = [
    {
      title: 'Statements Generated',
      value: '156',
      change: '+12',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Pending Statements',
      value: '8',
      change: '-3',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Downloaded Today',
      value: '23',
      change: '+5',
      changeType: 'positive' as const,
      icon: Download
    },
    {
      title: 'Email Notifications',
      value: '89',
      change: '+15',
      changeType: 'positive' as const,
      icon: Mail
    }
  ];

  const statementsData = [
    { account: 'ACC001', accountHolder: 'National Bank of Bahrain', statementDate: '2024-01-31', period: 'January 2024', status: 'Generated', format: 'PDF', size: '2.3 MB' },
    { account: 'ACC002', accountHolder: 'Ahli United Bank', statementDate: '2024-01-31', period: 'January 2024', status: 'Pending', format: 'PDF', size: '-' },
    { account: 'ACC003', accountHolder: 'BBK Bank', statementDate: '2024-01-31', period: 'January 2024', status: 'Generated', format: 'PDF', size: '1.8 MB' },
    { account: 'ACC004', accountHolder: 'Al Salam Bank', statementDate: '2024-01-31', period: 'January 2024', status: 'Generated', format: 'PDF', size: '3.1 MB' },
    { account: 'ACC005', accountHolder: 'BMMI Bank', statementDate: '2024-01-31', period: 'January 2024', status: 'Processing', format: 'PDF', size: '-' }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={config.title}
        description={config.description}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statementMetrics.map((metric, index) => (
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
            title={config.tableTitle}
            data={statementsData}
            columns={[
              { key: 'account', label: 'Account ID' },
              { key: 'accountHolder', label: 'Account Holder' },
              { key: 'statementDate', label: 'Statement Date', type: 'date' },
              { key: 'period', label: 'Period' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'format', label: 'Format' },
              { key: 'size', label: 'File Size' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="account-statements" systemType="csd" />
        </div>
      </div>
    </div>
  );
}