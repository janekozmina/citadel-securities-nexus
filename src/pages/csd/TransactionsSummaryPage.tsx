import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { ArrowUpDown, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { getPageConfig } from '@/config/pageConfig';

export default function TransactionsSummaryPage() {
  const config = getPageConfig('csd', 'transactionsSummary');
  const transactionMetrics = [
    {
      title: 'Total Transactions',
      value: '1,234',
      change: '+45',
      changeType: 'positive' as const,
      icon: ArrowUpDown
    },
    {
      title: 'Transaction Value',
      value: 'BHD 125.8M',
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Settlement Rate',
      value: '100%',
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Avg Settlement Time',
      value: '50 ms',
      change: '-2.35 hrs',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const transactionData = [
    { txnId: 'TXN001', type: 'DvP Transfer', buyer: 'National Bank of Bahrain', seller: 'Ahli United Bank', amount: 'BHD 2,500,000', security: 'GOV-TB-001', status: 'Settled', settlementDate: '2024-01-18' },
    { txnId: 'TXN002', type: 'Cross-Border', buyer: 'Bahrain Islamic Bank', seller: 'External CSD', amount: 'BHD 1,800,000', security: 'CORP-BD-002', status: 'Pending', settlementDate: '2024-01-19' },
    { txnId: 'TXN003', type: 'Exchange Trade', buyer: 'BBK', seller: 'Bahrain Development Bank', amount: 'BHD 3,200,000', security: 'SUKUK-001', status: 'Processing', settlementDate: '2024-01-19' },
    { txnId: 'TXN004', type: 'DvF Transfer', buyer: 'Gulf International Bank', seller: 'Ithmaar Bank', amount: 'BHD 1,500,000', security: 'GOV-TB-003', status: 'Settled', settlementDate: '2024-01-18' },
    { txnId: 'TXN005', type: 'Repo Settlement', buyer: 'Future Bank', seller: 'Al Salam Bank', amount: 'BHD 2,100,000', security: 'BOND-004', status: 'Failed', settlementDate: '2024-01-18' }
  ];

  const detailedTransactionData = [
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'CONFIRMED', actionCode: 'CONF', user: 'SYSTUSER', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '100', status: 'WA', startingTime: 'Authorization', realTime: 'ProcessTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'OPTIONNO', actionCode: 'CONF', user: 'SYSTUSER', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '100', status: 'A', startingTime: 'Settled', realTime: 'ExecutedTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'DEPOSIT-XX', actionCode: 'CONF', user: 'SYSTUSER', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '100', status: 'A', startingTime: 'Settled', realTime: 'CompletedTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'CONFIRMED', actionCode: 'CONF', user: 'SYSTUSER', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '100', status: 'A', startingTime: 'Settled', realTime: 'FinishedTime' },
    { docSecurities: 'CTTIXXXXX18502', counterparty: 'LBANK', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '000', status: 'A', startingTime: 'Settled', realTime: 'ProcessedTime' },
    { docSecurities: 'CTTIXXXXX18502', counterparty: 'LBANK', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '000', status: 'A', startingTime: 'Settled', realTime: 'ExecutedTime' },
    { docSecurities: 'CTTIXXXXX18502', counterparty: 'LBANK', docType: 'DEPOSIT', docTypeBalance: 'D', ttc: '000', status: 'A', startingTime: 'Settled', realTime: 'CompletedTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'OPTIONNO-CD-Trade', actionCode: 'F778', user: 'SYSTUSER', docType: 'DEPOSIT', docTypeBalance: 'C', ttc: '000', status: 'Smoke trade/free breakback', startingTime: '1,000', realTime: 'ProcessTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'QUALIFIED', actionCode: 'QUALIFIED', user: 'QUALIFIED', docType: 'QUALIFIED', docTypeBalance: 'D', ttc: '000', status: 'A', startingTime: 'Settled', realTime: 'QualifiedTime' },
    { docSecurities: 'R153598POF', counterparty: 'PENSION-POF', forAuthorization: 'QUALIFIED', actionCode: 'QUALIFIED', user: 'QUALIFIED', docType: 'QUALIFIED', docTypeBalance: 'D', ttc: '000', status: 'Settled', startingTime: '1,000', realTime: 'ExecutedTime' }
  ];

  const statusDistribution = [
    { name: 'Settled', value: 65, color: 'hsl(var(--chart-1))' },
    { name: 'Pending', value: 20, color: 'hsl(var(--chart-2))' },
    { name: 'Processing', value: 12, color: 'hsl(var(--chart-3))' },
    { name: 'Failed', value: 3, color: 'hsl(var(--chart-4))' }
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
            {transactionMetrics.map((metric, index) => (
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
                title: "Transaction Status Distribution",
                data: statusDistribution,
                height: 300
              }}
            />

            <InteractiveChart
              config={{
                type: "bar",
                title: "Transaction Volume by Type",
                data: [
                  { name: 'DvP', value: 45, color: 'hsl(var(--chart-1))' },
                  { name: 'DvF', value: 25, color: 'hsl(var(--chart-2))' },
                  { name: 'Cross-Border', value: 15, color: 'hsl(var(--chart-3))' },
                  { name: 'Exchange', value: 15, color: 'hsl(var(--chart-4))' }
                ],
                height: 300
              }}
            />
          </div>

          <DataTable
            title={config.tableTitle}
            data={transactionData}
            columns={[
              { key: 'txnId', label: 'Transaction ID' },
              { key: 'type', label: 'Type' },
              { key: 'buyer', label: 'Buyer' },
              { key: 'seller', label: 'Seller' },
              { key: 'amount', label: 'Amount' },
              { key: 'security', label: 'Security' },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'settlementDate', label: 'Settlement Date', type: 'date' }
            ]}
            searchable
          />

          <DataTable
            title="Detailed Transaction Log"
            data={detailedTransactionData}
            columns={[
              { key: 'docSecurities', label: 'Doc securities' },
              { key: 'counterparty', label: 'Counterparty' },
              { key: 'forAuthorization', label: 'For Authorization' },
              { key: 'actionCode', label: 'ActionCode' },
              { key: 'user', label: 'User' },
              { key: 'docType', label: 'DocType' },
              { key: 'docTypeBalance', label: 'DocTypeBalance' },
              { key: 'ttc', label: 'TTC' },
              { key: 'status', label: 'Status' },
              { key: 'startingTime', label: 'StartingTime' },
              { key: 'realTime', label: 'RealTime' }
            ]}
            searchable
          />
        </div>

        <div className="xl:col-span-1">
          <QuickActionsManager pageKey="transactions-summary" systemType="csd" />
        </div>
      </div>
    </div>
  );
}