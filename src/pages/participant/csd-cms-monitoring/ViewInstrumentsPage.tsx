import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const ViewInstrumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const instrumentsData = [
    {
      code: 'test9',
      name: 'Treasury Bonds2023.11.22 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: portalConfig.banks.central,
      issuedAmount: formatCurrency(2000000000),
      amountInCirculation: formatCurrency(2000000000),
      faceValue: '500',
      currency: portalConfig.currencies.primary,
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test8',
      name: 'Treasury Bonds2023.05.22 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: portalConfig.banks.central,
      issuedAmount: formatCurrency(1000000000),
      amountInCirculation: formatCurrency(500000000),
      faceValue: '100000',
      currency: portalConfig.currencies.primary,
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test6',
      name: 'Federal Treasury Bonds2023.05.22 Issue',
      isin: 'N',
      type: 'Federal Treasury Bonds',
      issuer: portalConfig.banks.central,
      issuedAmount: formatCurrency(2000000),
      amountInCirculation: formatCurrency(1000000),
      faceValue: '50000',
      currency: portalConfig.currencies.primary,
      issueDate: '2022-11-22T00:00:000'
    },
    {
      code: 'test5',
      name: 'Treasury Bonds2024.05.19 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: portalConfig.banks.central,
      issuedAmount: formatCurrency(100000000),
      amountInCirculation: formatCurrency(90050000),
      faceValue: '10000',
      currency: portalConfig.currencies.primary,
      issueDate: '2023-05-19T00:00:000'
    },
    {
      code: 'test3',
      name: 'Treasury Bonds2024.05.18 Issue',
      isin: 'N',
      type: 'Treasury Bonds',
      issuer: portalConfig.banks.central,
      issuedAmount: formatCurrency(100000000),
      amountInCirculation: '0',
      faceValue: '100000',
      currency: portalConfig.currencies.primary,
      issueDate: '2023-05-18T00:00:000'
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
                  <TableHead className="font-semibold">Actions</TableHead>
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
                    <TableCell className="truncate max-w-32" title={instrument.issuer}>
                      {instrument.issuer}
                    </TableCell>
                    <TableCell className="font-mono text-right">{instrument.issuedAmount}</TableCell>
                    <TableCell className="font-mono text-right">{instrument.amountInCirculation}</TableCell>
                    <TableCell className="font-mono text-right">{instrument.faceValue}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{instrument.currency}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{instrument.issueDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
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