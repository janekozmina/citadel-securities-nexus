import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const ILFOperationsCBPage = () => {
  const ilfOperationsData = [
    {
      modificationDate: '27.04.2022 19:26:10',
      operationType: 'DvPRepoFitEPTrade',
      ilfCode: 'Q20101108306',
      comm: 'Q20101106508',
      trn: 'R233160LIC',
      ttcDescription: 'ILF operations',
      loanValue: 498056644.63,
      currency: portalConfig.currencies.primary,
      tradeDate: '16.05.2022',
      earlySettlement: '16.05.2022 00:00:00'
    },
    {
      modificationDate: '27.04.2022 09:54:33',
      operationType: 'DvPRepoFitEPTrade',
      ilfCode: 'Q20111202596',
      comm: 'Q20111202596',
      trn: 'R232001JLC',
      ttcDescription: 'ILF operations',
      loanValue: 102356,
      currency: portalConfig.currencies.primary,
      tradeDate: '16.05.2022',
      earlySettlement: '16.05.2022 00:00:00'
    }
  ];

  const buybacksData = [
    {
      modificationDate: '28.04.2022 12:15:12',
      operationType: 'RvPRepoSSBMX_BB',
      ilfCode: 'CITTS0201105012',
      comm: 'CITTS0202110513',
      trn: 'CITTS0201105013',
      ttcDescription: 'ILF-DP request',
      loanValue: 40200,
      currency: portalConfig.currencies.primary,
      tradeDate: '16.02.2022',
      earlySettlement: '10.02.2022'
    }
  ];

  const collateralsData = [
    {
      trn: 'R322607CPA',
      amount: 48300,
      senior: 'CBNINGLAC-SD',
      collateralGiver: 'ABNG-NGLA',
      collateralTaker: 'CBNIN-GLA',
      slbCode: 'Q201111530508',
      currency: portalConfig.currencies.primary,
      status: 'A'
    }
  ];

  const instrumentsData = [
    {
      instrumentCode: 'NGFP1Y000346',
      quantity: 463,
      collateralValue: 48300,
      manualMarketPrice: 10,
      manualAccruedInterest: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ILF Operations with CB</h1>
        <p className="text-muted-foreground">Monitor and manage Intraday Liquidity Facility operations with Central Bank</p>
      </div>

      {/* ILF Operations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ILF operations with CB</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">6 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Modification date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Operation type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ILF code</th>
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
                {ilfOperationsData.map((item, index) => (
                  <tr key={index} className={`border-b hover:bg-muted/50 ${index === 1 ? 'bg-blue-100' : ''}`}>
                    <td className="py-2 px-4 text-sm">{item.modificationDate}</td>
                    <td className="py-2 px-4 text-sm">{item.operationType}</td>
                    <td className="py-2 px-4 text-sm">{item.ilfCode}</td>
                    <td className="py-2 px-4 text-sm">{item.comm}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
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
                    <td className="py-2 px-4 text-sm">{item.ilfCode}</td>
                    <td className="py-2 px-4 text-sm">{item.comm}</td>
                    <td className="py-2 px-4 text-sm">{item.trn}</td>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collaterals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Collaterals</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="w-40" />
              <span className="text-sm text-muted-foreground">1 row(s)</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 text-xs font-semibold">TRN</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Amount</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Senior</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Collateral giver</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Collateral taker</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">SLB code</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Currency</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {collateralsData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50 bg-blue-100">
                      <td className="py-2 px-2 text-xs">{item.trn}</td>
                      <td className="py-2 px-2 text-xs">{formatCurrency(item.amount)}</td>
                      <td className="py-2 px-2 text-xs">{item.senior}</td>
                      <td className="py-2 px-2 text-xs">{item.collateralGiver}</td>
                      <td className="py-2 px-2 text-xs">{item.collateralTaker}</td>
                      <td className="py-2 px-2 text-xs">{item.slbCode}</td>
                      <td className="py-2 px-2 text-xs">{item.currency}</td>
                      <td className="py-2 px-2 text-xs">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {item.status}
                        </Badge>
                      </td>
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
              <Input placeholder="Search" className="w-40" />
              <span className="text-sm text-muted-foreground">1 row(s)</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 text-xs font-semibold">Instrument code</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Quantity</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Collateral value</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Manual market price (%)</th>
                    <th className="text-left py-2 px-2 text-xs font-semibold">Manual accrued interest (per unit)</th>
                  </tr>
                </thead>
                <tbody>
                  {instrumentsData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2 text-xs">{item.instrumentCode}</td>
                      <td className="py-2 px-2 text-xs">{item.quantity}</td>
                      <td className="py-2 px-2 text-xs">{formatCurrency(item.collateralValue)}</td>
                      <td className="py-2 px-2 text-xs">{item.manualMarketPrice}</td>
                      <td className="py-2 px-2 text-xs">{item.manualAccruedInterest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ILFOperationsCBPage;