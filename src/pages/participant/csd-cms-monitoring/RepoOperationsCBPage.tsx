import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const RepoOperationsCBPage = () => {
  const repoOperationsData = [
    {
      modificationDate: '03.11.2023 13:47:46',
      operationType: 'RvPRepoTradeAAX',
      repoCode: 'ECOCS00111035013',
      comm: 'ECOCS00111035013',
      trn: 'ECOCS00111035010',
      ttcDescription: 'Standing lending facility',
      loanValue: 1,
      currency: portalConfig.currencies.primary,
      tradeDate: '19.10.2023',
      earlySettlement: '19.10.2023 00:00:00',
      priority: 1500,
      repoUser: 'CB',
      openAuct: 'Manual date: 20.10.2023',
      maturityDate: 'Billennium dr. 20.10.2023'
    },
    {
      modificationDate: '03.11.2023 14:02:26',
      operationType: 'DxPRepoGLTradeMX',
      repoCode: 'ECOCS00111055005',
      comm: 'ECOCS00111025005',
      trn: 'ECOCS00111025005',
      ttcDescription: 'Vertical REPO',
      loanValue: 500,
      currency: portalConfig.currencies.primary,
      tradeDate: '17.10.2023',
      earlySettlement: '17.10.2023 00:00:00',
      priority: 1500,
      repoUser: 'CB',
      openAuct: '16.5 17.10.2023',
      maturityDate: 'Billennium dr. 25.10.2023'
    }
  ];

  const buybacksData = [
    {
      modificationDate: '10.01.2022 21:07:45',
      operationType: 'RvPRepoSSBMX_BB',
      repoCode: 'CITTS0201105012',
      comm: 'CITTS0202110513',
      trn: 'CITTS0201105013',
      ttcDescription: 'SYSTEM OPERATION',
      loanValue: 1000,
      currency: portalConfig.currencies.primary,
      tradeDate: '24.12.2021',
      earlySettlement: '24.12.2021 00:00:00',
      latestSettlement: '24.12.2021 00:00:00'
    }
  ];

  const collateralsData = [
    {
      trn: 'R214959CPA',
      amount: 80,
      senior: 'ECONGLA',
      collateralGiver: 'ECONGLA',
      collateralTaker: 'CBNIN-GLA',
      slbCode: 'ECOCS00111035008',
      currency: portalConfig.currencies.primary,
      status: 'A',
      initialAmount: 80,
      stepValue: 'Dene'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">REPO Operations with CB</h1>
        <p className="text-muted-foreground">Monitor and manage REPO operations with Central Bank</p>
      </div>

      {/* REPO Operations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Repo operations with CB</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">3 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Modification date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Operation type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Repo code</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Comm</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TRN</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TTC description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Loan value</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Trade date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Early settlement datetime</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Latest settlement datetime</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Priority</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Repo User Oper. Auth</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Maturity date</th>
                </tr>
              </thead>
              <tbody>
                {repoOperationsData.map((item, index) => (
                  <tr key={index} className={`border-b hover:bg-muted/50 ${index === 0 ? 'bg-blue-100' : ''}`}>
                    <td className="py-2 px-4 text-sm">{item.modificationDate}</td>
                    <td className="py-2 px-4 text-sm">{item.operationType}</td>
                    <td className="py-2 px-4 text-sm">{item.repoCode}</td>
                    <td className="py-2 px-4 text-sm">{item.comm}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {item.trn}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.ttcDescription}</td>
                    <td className="py-2 px-4 text-sm">{formatCurrency(item.loanValue)}</td>
                    <td className="py-2 px-4 text-sm">{item.currency}</td>
                    <td className="py-2 px-4 text-sm">{item.tradeDate}</td>
                    <td className="py-2 px-4 text-sm">{item.earlySettlement}</td>
                    <td className="py-2 px-4 text-sm">{item.earlySettlement}</td>
                    <td className="py-2 px-4 text-sm">{item.priority}</td>
                    <td className="py-2 px-4 text-sm">{item.repoUser}</td>
                    <td className="py-2 px-4 text-sm">{item.maturityDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Buybacks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Buybacks</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">1 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Modification date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Operation type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Repo code</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Comm</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TRN</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TTC description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Loan value</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Trade date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Early settlement datetime</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Latest settlement datetime</th>
                </tr>
              </thead>
              <tbody>
                {buybacksData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm">{item.modificationDate}</td>
                    <td className="py-2 px-4 text-sm">{item.operationType}</td>
                    <td className="py-2 px-4 text-sm">{item.repoCode}</td>
                    <td className="py-2 px-4 text-sm">{item.comm}</td>
                    <td className="py-2 px-4 text-sm">{item.trn}</td>
                    <td className="py-2 px-4 text-sm">{item.ttcDescription}</td>
                    <td className="py-2 px-4 text-sm">{formatCurrency(item.loanValue)}</td>
                    <td className="py-2 px-4 text-sm">{item.currency}</td>
                    <td className="py-2 px-4 text-sm">{item.tradeDate}</td>
                    <td className="py-2 px-4 text-sm">{item.earlySettlement}</td>
                    <td className="py-2 px-4 text-sm">{item.latestSettlement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Collaterals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Collaterals</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">1 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">TRN</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Senior</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Collateral giver</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Collateral taker</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">SLB code</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Initial amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Step value</th>
                </tr>
              </thead>
              <tbody>
                {collateralsData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 bg-blue-100">
                    <td className="py-2 px-4 text-sm">{item.trn}</td>
                    <td className="py-2 px-4 text-sm">{formatCurrency(item.amount)}</td>
                    <td className="py-2 px-4 text-sm">{item.senior}</td>
                    <td className="py-2 px-4 text-sm">{item.collateralGiver}</td>
                    <td className="py-2 px-4 text-sm">{item.collateralTaker}</td>
                    <td className="py-2 px-4 text-sm">{item.slbCode}</td>
                    <td className="py-2 px-4 text-sm">{item.currency}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.initialAmount}</td>
                    <td className="py-2 px-4 text-sm">{item.stepValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Instruments in collateral */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Instruments in collateral</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">0 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No data available in table
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepoOperationsCBPage;