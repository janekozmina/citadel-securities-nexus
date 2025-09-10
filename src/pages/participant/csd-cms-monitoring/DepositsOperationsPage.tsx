import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const DepositsOperationsPage = () => {
  const depositTransactionsData = [
    {
      modificationDate: '13.01.2022 11:43:16',
      operationType: 'DvFSDFTradeMX',
      trn: 'CITTS0011125037',
      ttcDescription: 'Standing deposit facility',
      depositAmount: 130000,
      currency: portalConfig.currencies.primary,
      depositDate: '24.12.2021 00:00:00',
      interestRate: 10,
      maturityDate: '27.12.2021',
      provisionalInterestAmount: 'NGN1452'
    },
    {
      modificationDate: '06.12.2021 10:25:07',
      operationType: 'DvFSDFTradeMX',
      trn: 'ABNG-S00120636000',
      ttcDescription: 'Standing deposit facility',
      depositAmount: 190000,
      currency: portalConfig.currencies.primary,
      depositDate: '13.11.2021 00:00:00',
      interestRate: 10,
      maturityDate: '24.11.2021',
      provisionalInterestAmount: 'NGN1452'
    }
  ];

  const depositsReturnsData = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposit transactions</h1>
        <p className="text-muted-foreground">Monitor and manage deposit transactions and returns</p>
      </div>

      {/* Deposit transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Deposit transactions</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">7 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Modification date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Operation type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TRN</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TTC description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Deposit amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Deposit date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Interest rate</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Maturity date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Provisional interest amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Deposit po.</th>
                </tr>
              </thead>
              <tbody>
                {depositTransactionsData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm">{item.modificationDate}</td>
                    <td className="py-2 px-4 text-sm">{item.operationType}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {item.trn}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.ttcDescription}</td>
                    <td className="py-2 px-4 text-sm">{formatCurrency(item.depositAmount)}</td>
                    <td className="py-2 px-4 text-sm">{item.currency}</td>
                    <td className="py-2 px-4 text-sm">{item.depositDate}</td>
                    <td className="py-2 px-4 text-sm">{item.interestRate}</td>
                    <td className="py-2 px-4 text-sm">{item.maturityDate}</td>
                    <td className="py-2 px-4 text-sm">{item.provisionalInterestAmount}</td>
                    <td className="py-2 px-4 text-sm"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Deposits returns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Deposits returns</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">0 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Modification date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Operation type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">TRN</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Return amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Maturity date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Deposit provider cash account</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Depositor's cash account/source</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Additional status information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={11} className="py-8 text-center text-muted-foreground">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositsOperationsPage;