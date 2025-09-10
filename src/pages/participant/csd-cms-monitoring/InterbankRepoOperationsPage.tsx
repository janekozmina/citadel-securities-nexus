import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const InterbankRepoOperationsPage = () => {
  const interbankRepoData = [
    {
      modificationDate: '11.01.2022 12:00:11',
      operationType: 'RvPRepoSSBMX',
      repoCode: 'ABNG-S00101105006',
      comm: 'ABNG-S00101105006',
      trn: 'CITTS0201105001',
      ttcDescription: 'SYSTEM OPERATION',
      loanValue: 200000,
      currency: portalConfig.currencies.primary,
      tradeDate: '24.12.2021',
      earlySettlement: '24.12.2021 00:00:00'
    },
    {
      modificationDate: '10.01.2022 21:05:57',
      operationType: 'DvPRepoSSBMX',
      repoCode: 'CITTS0201105012',
      comm: 'CITTS0201105012',
      trn: 'CITTS0201105012',
      ttcDescription: 'SYSTEM OPERATION',
      loanValue: 100000,
      currency: portalConfig.currencies.primary,
      tradeDate: '24.12.2021',
      earlySettlement: '24.12.2021 00:00:00'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interbank REPO</h1>
        <p className="text-muted-foreground">Monitor and manage interbank REPO operations</p>
      </div>

      {/* Interbank REPO */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Interbank REPO</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">37 row(s)</span>
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
                {interbankRepoData.map((item, index) => (
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

      {/* Rollovers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rollovers</CardTitle>
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

export default InterbankRepoOperationsPage;