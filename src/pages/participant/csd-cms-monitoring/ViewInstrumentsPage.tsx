import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

const ViewInstrumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const instrumentsData = [
    {
      code: 'test9',
      name: 'Treasury Bonds2023.11.22 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '2,000,000,000',
      amountInCirculation: '2,000,000,000',
      faceValue: '500',
      currency: 'NGN',
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test8',
      name: 'Treasury Bonds2023.05.22 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '1,000,000,000',
      amountInCirculation: '500,000,000',
      faceValue: '100000',
      currency: 'NGN',
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test6',
      name: 'Federal Treasury Bonds2023.05.22 Issue',
      isin: 'N',
      type: 'Federal Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '2,000,000',
      amountInCirculation: '1,000,000',
      faceValue: '50000',
      currency: 'NGN',
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test5',
      name: 'Treasury Bonds2024.05.19 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '100,000,000',
      amountInCirculation: '90,050,000',
      faceValue: '10000',
      currency: 'NGN',
      issueDate: '2023-05-19T00:00:000'
    },
    {
      code: 'test3',
      name: 'Treasury Bonds2024.05.18 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '100,000,000',
      amountInCirculation: '0',
      faceValue: '100000',
      currency: 'NGN',
      issueDate: '2023-05-18T00:00:000'
    },
    {
      code: 'test2',
      name: 'Treasury Bonds2024.05.19 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '1,000,000,000',
      amountInCirculation: '0',
      faceValue: '1000000',
      currency: 'NGN',
      issueDate: '2023-05-19T00:00:000'
    },
    {
      code: 'test10',
      name: 'Treasury Bonds2023.11.21 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '100,000,000',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2022-11-21T00:00:000'
    },
    {
      code: 'test7',
      name: 'Treasury Bonds2023.05.22 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '10,000,000,000',
      amountInCirculation: '5,000,000,000',
      faceValue: '10000',
      currency: 'NGN',
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'TESTufo0003',
      name: 'Treasury Bonds2024.08.11 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: 'Debt Management Office',
      issuedAmount: '100,000',
      amountInCirculation: '0',
      faceValue: '100000',
      currency: 'NGN',
      issueDate: '2023-08-11T00:00:000'
    },
    {
      code: 'TESTBILLAUCT002',
      name: 'CBN Special Bill2023.09.11 Issue',
      isin: 'N',
      type: 'CBN Special Bill',
      issuer: 'Central Bank of Nigeria',
      issuedAmount: '900,000',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2023-08-11T00:00:000'
    },
    {
      code: 'TESTBILLAUCT001',
      name: 'Nigerian Treasury Bills2023.11.10 Issue',
      isin: 'N',
      type: 'Nigerian Treasury Bills',
      issuer: 'Debt Management Office',
      issuedAmount: '900,000,000',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2023-08-11T00:00:000'
    },
    {
      code: 'TEST100',
      name: 'Federal Treasury Bonds2024.06.05 Issue',
      isin: 'N',
      type: 'Federal Treasury Bonds',
      issuer: 'Debt Management Office',
      issuedAmount: '100,000',
      amountInCirculation: '0',
      faceValue: '100000',
      currency: 'NGN',
      issueDate: '2023-06-05T00:00:000'
    },
    {
      code: 'REDMTEST005',
      name: 'FG of Nigeria Green Bonds2023.06.02 Issue',
      isin: 'N',
      type: 'FG of Nigeria Green Bonds',
      issuer: 'Debt Management Office',
      issuedAmount: '1,000,000,000',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2023-05-19T00:00:000'
    },
    {
      code: 'NGTO30207207',
      name: 'Nigeria Treasury Bills 2020.07.02 Issue',  
      isin: 'Y',
      type: 'Nigerian Treasury Bills',
      issuer: 'Debt Management Office',
      issuedAmount: '0',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2019-07-04T00:00:000'
    },
    {
      code: 'NGTO31102209',
      name: 'Nigeria Treasury Bills 2021.01.28 Issue',
      isin: 'Y',
      type: 'Nigerian Treasury Bills',
      issuer: 'Debt Management Office',
      issuedAmount: '0',
      amountInCirculation: '0',
      faceValue: '1000',
      currency: 'NGN',
      issueDate: '2020-01-30T00:00:000'
    }
  ];

  const filteredData = instrumentsData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Treasury Bonds':
        return 'bg-blue-100 text-blue-800';
      case 'Federal Treasury Bonds':
        return 'bg-green-100 text-green-800';
      case 'Nigerian Treasury Bills':
        return 'bg-purple-100 text-purple-800';
      case 'CBN Special Bill':
        return 'bg-orange-100 text-orange-800';
      case 'FG of Nigeria Green Bonds':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">View Instruments</h1>
        <p className="text-muted-foreground">Available financial instruments overview</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Instruments</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Badge variant="secondary">{filteredData.length} row(s)</Badge>
              <button className="p-2 hover:bg-muted rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Code</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Isin</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Issuer</TableHead>
                  <TableHead className="font-semibold">Issued Amount</TableHead>
                  <TableHead className="font-semibold">Amount in circulation</TableHead>
                  <TableHead className="font-semibold">Face value</TableHead>
                  <TableHead className="font-semibold">Currency</TableHead>
                  <TableHead className="font-semibold">Issue Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((instrument, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-mono font-medium text-blue-600">
                      {instrument.code}
                    </TableCell>
                    <TableCell className="font-medium">{instrument.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={instrument.isin === 'Y' ? 'default' : 'secondary'}>
                        {instrument.isin}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(instrument.type)} variant="secondary">
                        {instrument.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{instrument.issuer}</TableCell>
                    <TableCell className="font-mono text-right">{instrument.issuedAmount}</TableCell>
                    <TableCell className="font-mono text-right">{instrument.amountInCirculation}</TableCell>
                    <TableCell className="font-mono text-right">{instrument.faceValue}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{instrument.currency}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{instrument.issueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewInstrumentsPage;