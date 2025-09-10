import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Plus, Edit, Trash, Search } from 'lucide-react';

const AccountsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockAccounts = [
    {
      id: 'ACC001',
      accountNumber: '100001',
      accountName: 'NBB Settlement Account',
      participantCode: 'NBB',
      accountType: 'Settlement',
      currency: 'BHD',
      status: 'Active',
      balance: 25750000
    },
    {
      id: 'ACC002',
      accountNumber: '100002',
      accountName: 'BBK Trading Account',
      participantCode: 'BBK',
      accountType: 'Trading',
      currency: 'BHD',
      status: 'Active',
      balance: 18500000
    },
    {
      id: 'ACC003',
      accountNumber: '100003',
      accountName: 'GIB Custody Account',
      participantCode: 'GIB',
      accountType: 'Custody',
      currency: 'BHD',
      status: 'Active',
      balance: 42300000
    },
    {
      id: 'ACC004',
      accountNumber: '200001',
      accountName: 'NBB USD Nostro Account',
      participantCode: 'NBB',
      accountType: 'Nostro',
      currency: 'USD',
      status: 'Active',
      balance: 15750000
    }
  ];

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Settlement': return 'default';
      case 'Trading': return 'secondary';
      case 'Custody': return 'outline';
      case 'Nostro': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Participant Accounts</h1>
        <p className="text-muted-foreground">Manage participant account information and balances</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Account Directory
          </CardTitle>
          <CardDescription>Participant accounts and their current balances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono">{account.accountNumber}</TableCell>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell className="font-mono">{account.participantCode}</TableCell>
                  <TableCell>
                    <Badge variant={getAccountTypeColor(account.accountType)}>
                      {account.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{account.status}</Badge>
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

export default AccountsPage;