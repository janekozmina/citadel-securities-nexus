import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const TransactionsAllPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transactionsData = [
    {
      reference: 'CT1XXXXX03045004',
      operation: 'DvP',
      instrument: 'TESTGOVBOND01',
      quantity: '2,000',
      feeAmount: '2,000',
      valueDate: '14.07.2025',
      settlementDate: '14.07.2025',
      dealAmount: '1,771.62',
      actualAmount: '1,771.62',
      currency: 'AED',
      seller: 'CITIPHMK',
      deliveryCSD: 'CITIDEPO',
      buyer: 'DEUTPHMK',
      receiveCSD: 'DEUTDEPO',
      localStatus: 'Sent',
      statusInCSD: 'Not matched',
      remoteStatus: 'Central settlement',
      instructions: '1000',
      priority: ''
    },
    {
      reference: 'CT1XXXXX03045003',
      operation: 'DvP',
      instrument: 'TESTGOVBOND01',
      quantity: '1,000',
      feeAmount: '1,000',
      valueDate: '14.07.2025',
      settlementDate: '14.07.2025',
      dealAmount: '99,000.00',
      actualAmount: '99,000.00',
      currency: 'AED',
      seller: 'CITIPHMK',
      deliveryCSD: 'CITIDEPO',
      buyer: 'DEUTPHMK',
      receiveCSD: 'DEUTDEPO',
      localStatus: 'Sent',
      statusInCSD: 'Denied',
      remoteStatus: 'Settled',
      instructions: '1000',
      priority: ''
    }
  ];

  const filteredData = transactionsData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'not matched':
        return 'bg-orange-100 text-orange-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'settled':
        return 'bg-green-100 text-green-800';
      case 'central settlement':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">6) Transactions All</h1>
        <p className="text-muted-foreground">All transaction records with creation date from 04.09.2025 00:00:00 to 04.09.2025 23:59:00</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transactions all</CardTitle>
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
              <Badge variant="secondary">{filteredData.length} row(s)</Badge>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            with creation date from 04.09.2025 00:00:00 to 04.09.2025 23:59:00
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold text-xs">Reference</TableHead>
                  <TableHead className="font-semibold text-xs">Operation</TableHead>
                  <TableHead className="font-semibold text-xs">Instrument</TableHead>
                  <TableHead className="font-semibold text-xs">Quantity</TableHead>
                  <TableHead className="font-semibold text-xs">Fee amount</TableHead>
                  <TableHead className="font-semibold text-xs">Value Date</TableHead>
                  <TableHead className="font-semibold text-xs">Settlement date</TableHead>
                  <TableHead className="font-semibold text-xs">Deal amount</TableHead>
                  <TableHead className="font-semibold text-xs">Actual amount</TableHead>
                  <TableHead className="font-semibold text-xs">Currency</TableHead>
                  <TableHead className="font-semibold text-xs">Seller</TableHead>
                  <TableHead className="font-semibold text-xs">Delivery CSD acc</TableHead>
                  <TableHead className="font-semibold text-xs">Buyer</TableHead>
                  <TableHead className="font-semibold text-xs">Receive CSD acc</TableHead>
                  <TableHead className="font-semibold text-xs">Local</TableHead>
                  <TableHead className="font-semibold text-xs">Status in CSD</TableHead>
                  <TableHead className="font-semibold text-xs">Remote</TableHead>
                  <TableHead className="font-semibold text-xs">Instructions</TableHead>
                  <TableHead className="font-semibold text-xs">Prior</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((transaction, index) => (
                  <TableRow key={index} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-mono font-medium">
                      {transaction.reference}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.operation}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{transaction.instrument}</TableCell>
                    <TableCell className="font-mono text-right">{transaction.quantity}</TableCell>
                    <TableCell className="font-mono text-right">{transaction.feeAmount}</TableCell>
                    <TableCell className="font-mono">{transaction.valueDate}</TableCell>
                    <TableCell className="font-mono">{transaction.settlementDate}</TableCell>
                    <TableCell className="font-mono text-right">{transaction.dealAmount}</TableCell>
                    <TableCell className="font-mono text-right">{transaction.actualAmount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.currency}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{transaction.seller}</TableCell>
                    <TableCell className="font-mono">{transaction.deliveryCSD}</TableCell>
                    <TableCell className="font-mono">{transaction.buyer}</TableCell>
                    <TableCell className="font-mono">{transaction.receiveCSD}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.localStatus)} variant="secondary">
                        {transaction.localStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.statusInCSD)} variant="secondary">
                        {transaction.statusInCSD}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.remoteStatus)} variant="secondary">
                        {transaction.remoteStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{transaction.instructions}</TableCell>
                    <TableCell>{transaction.priority}</TableCell>
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

export default TransactionsAllPage;