import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const CollateralsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [marginCallsSearchTerm, setMarginCallsSearchTerm] = useState('');
  const [instrumentsSearchTerm, setInstrumentsSearchTerm] = useState('');

  const collateralsData = [
    {
      trn: 'NBB$001042SC001',
      amount: formatCurrency(100),
      currency: portalConfig.currencies.primary,
      sender: 'NBBINGLA',
      giver: 'NBBINGLA',
      taker: 'Collateral Claims Taker MX',
      type: '16.02.2022',
      settlementDate: 'A',
      step: 'Done',
      stepName: 'M',
      statusName: 'NBB$001042SC001',
      repoTrn: '',
      rf: ''
    },
    {
      trn: 'R326077CFA',
      amount: formatCurrency(100),
      currency: portalConfig.currencies.primary,
      sender: 'BBKENGLACSID',
      giver: 'BBKINGLA',
      taker: 'Collateral Proposal Giver auto allocation',
      type: '16.02.2022',
      settlementDate: 'A',
      step: 'Done',
      stepName: 'A',
      statusName: 'BBK$002425S001',
      repoTrn: 'rtecons',
      rf: 'Substitute'
    },
    {
      trn: 'GIB$001042SC001',
      amount: formatCurrency(150),
      currency: portalConfig.currencies.primary,
      sender: 'GIBINGLA',
      giver: 'GIBINGLA',
      taker: 'Collateral Proposal MX',
      type: '16.02.2022',
      settlementDate: 'A',
      step: 'Rejected',
      stepName: 'A',
      statusName: 'GIB$001042SC001',
      repoTrn: '',
      rf: ''
    }
  ];

  // Mock data for margin calls
  const marginCallsData = [
    { id: 1, description: 'No data available in table' }
  ];

  // Mock data for instruments in collateral
  const instrumentsData = [
    {
      code: 'NGT51Y002046',
      quantity: '3',
      collateralId: '18',
      initialMarketPrice: '',
      marketPrice: '',
      initialValue: '',
      value: '',
      exchange: ''
    }
  ];

  const filteredCollaterals = collateralsData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredInstruments = instrumentsData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(instrumentsSearchTerm.toLowerCase())
    )
  );

  const getStepColor = (step: string) => {
    switch (step.toLowerCase()) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collaterals</h1>
        <p className="text-muted-foreground">Collateral management and tracking</p>
      </div>

      <Tabs defaultValue="collaterals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collaterals">Collaterals</TabsTrigger>
          <TabsTrigger value="margin-calls">Margin calls</TabsTrigger>
          <TabsTrigger value="instruments">Instruments in collateral</TabsTrigger>
        </TabsList>

        <TabsContent value="collaterals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Collaterals</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-10"
                    />
                  </div>
                  <Badge variant="secondary">{filteredCollaterals.length} row(s)</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-semibold text-xs">TRN</TableHead>
                      <TableHead className="font-semibold text-xs">Amount</TableHead>
                      <TableHead className="font-semibold text-xs">Currency</TableHead>
                      <TableHead className="font-semibold text-xs">Sender</TableHead>
                      <TableHead className="font-semibold text-xs">Giver</TableHead>
                      <TableHead className="font-semibold text-xs">Taker</TableHead>
                      <TableHead className="font-semibold text-xs">Type</TableHead>
                      <TableHead className="font-semibold text-xs">Settlement date</TableHead>
                      <TableHead className="font-semibold text-xs">Step</TableHead>
                      <TableHead className="font-semibold text-xs">Step name</TableHead>
                      <TableHead className="font-semibold text-xs">Status name</TableHead>
                      <TableHead className="font-semibold text-xs">REPO TRN</TableHead>
                      <TableHead className="font-semibold">RF</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCollaterals.map((collateral, index) => (
                      <TableRow 
                        key={index} 
                        className={`hover:bg-muted/30 ${
                          index === 2 ? 'bg-blue-50' : ''
                        }`}
                      >
                        <TableCell className="font-mono font-medium">
                          {collateral.trn}
                        </TableCell>
                        <TableCell className="font-mono">{collateral.amount}</TableCell>
                        <TableCell className="font-mono">{collateral.currency}</TableCell>
                        <TableCell className="font-mono">{collateral.sender}</TableCell>
                        <TableCell className="font-mono">{collateral.giver}</TableCell>
                        <TableCell>{collateral.taker}</TableCell>
                        <TableCell>{collateral.type}</TableCell>
                        <TableCell className="font-mono">{collateral.settlementDate}</TableCell>
                        <TableCell>
                          <Badge className={getStepColor(collateral.step)} variant="secondary">
                            {collateral.step}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{collateral.stepName}</TableCell>
                        <TableCell className="font-mono">{collateral.statusName}</TableCell>
                        <TableCell className="font-mono">{collateral.repoTrn}</TableCell>
                        <TableCell>
                          {collateral.rf && (
                            <div className="flex gap-1">
                              <button className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                Allocate
                              </button>
                              <button className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                {collateral.rf}
                              </button>
                              <button className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                Execute
                              </button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
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
        </TabsContent>

        <TabsContent value="margin-calls" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Margin calls</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      value={marginCallsSearchTerm}
                      onChange={(e) => setMarginCallsSearchTerm(e.target.value)}
                      className="w-64 pl-10"
                    />
                  </div>
                  <Badge variant="secondary">0 row(s)</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>TRN</TableHead>
                    <TableHead>Giver</TableHead>
                    <TableHead>Taker</TableHead>
                    <TableHead>Collateral TRN</TableHead>
                    <TableHead>Collateral amount</TableHead>
                    <TableHead>Margin call amount</TableHead>
                    <TableHead>Loan value</TableHead>
                    <TableHead>Business day</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No data available in table
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instruments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Instruments in collateral</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      value={instrumentsSearchTerm}
                      onChange={(e) => setInstrumentsSearchTerm(e.target.value)}
                      className="w-64 pl-10"
                    />
                  </div>
                  <Badge variant="secondary">{filteredInstruments.length} row(s)</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Collateral ID</TableHead>
                    <TableHead>Initial Market Price</TableHead>
                    <TableHead>Market Price</TableHead>
                    <TableHead>Initial value</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Exchange</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstruments.map((instrument, index) => (
                    <TableRow key={index} className="hover:bg-muted/30">
                      <TableCell className="font-mono font-medium text-blue-600">
                        {instrument.code}
                      </TableCell>
                      <TableCell className="font-mono text-right">{instrument.quantity}</TableCell>
                      <TableCell className="font-mono">{instrument.collateralId}</TableCell>
                      <TableCell className="font-mono">{instrument.initialMarketPrice}</TableCell>
                      <TableCell className="font-mono">{instrument.marketPrice}</TableCell>
                      <TableCell className="font-mono">{instrument.initialValue}</TableCell>
                      <TableCell className="font-mono">{instrument.value}</TableCell>
                      <TableCell className="font-mono">{instrument.exchange}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollateralsPage;