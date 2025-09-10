import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, Edit, Trash, Search } from 'lucide-react';

const TransactionCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockTransactionCodes = [
    {
      id: 'TXN001',
      code: 'TXN_100',
      name: 'Institution Credit Transfer',
      category: 'RTGS',
      description: 'Credit transfer between financial institutions',
      messageType: 'MT103',
      status: 'Active'
    },
    {
      id: 'TXN002',
      code: 'TXN_200',
      name: 'Customer Credit Transfer',
      category: 'RTGS',
      description: 'Credit transfer for customer payments',
      messageType: 'MT103',
      status: 'Active'
    },
    {
      id: 'TXN003',
      code: 'TXN_300',
      name: 'DvP Settlement',
      category: 'CSD',
      description: 'Delivery versus payment settlement',
      messageType: 'MT540',
      status: 'Active'
    },
    {
      id: 'TXN004',
      code: 'TXN_400',
      name: 'Free of Payment Settlement',
      category: 'CSD',
      description: 'Free of payment securities transfer',
      messageType: 'MT541',
      status: 'Active'
    },
    {
      id: 'TXN005',
      code: 'TXN_500',
      name: 'Repo Transaction',
      category: 'CSD',
      description: 'Repurchase agreement transaction',
      messageType: 'MT515',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction Type Codes</h1>
        <p className="text-muted-foreground">Manage transaction type codes and classifications</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transaction codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Transaction Code
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transaction Type Definitions
          </CardTitle>
          <CardDescription>Configure transaction types and their message formats</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Transaction Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Message Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactionCodes.map((txnCode) => (
                <TableRow key={txnCode.id}>
                  <TableCell className="font-mono">{txnCode.code}</TableCell>
                  <TableCell className="font-medium">{txnCode.name}</TableCell>
                  <TableCell>
                    <Badge variant={txnCode.category === 'RTGS' ? 'default' : 'secondary'}>
                      {txnCode.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{txnCode.description}</TableCell>
                  <TableCell className="font-mono">{txnCode.messageType}</TableCell>
                  <TableCell>
                    <Badge variant="default">{txnCode.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionCodesPage;