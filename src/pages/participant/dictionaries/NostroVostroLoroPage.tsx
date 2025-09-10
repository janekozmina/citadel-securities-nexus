import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wallet, Plus, Edit, Trash, Search } from 'lucide-react';

const NostroVostroLoroPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCorrespondentAccounts = [
    {
      id: 'NVL001',
      accountType: 'Nostro',
      accountNumber: 'NOS001234567',
      correspondentBank: 'JPMorgan Chase Bank N.A.',
      currency: 'USD',
      location: 'New York, USA',
      swiftCode: 'CHASUS33',
      balance: 15750000,
      status: 'Active'
    },
    {
      id: 'NVL002',
      accountType: 'Vostro',
      accountNumber: 'VOS987654321',
      correspondentBank: 'HSBC Bank plc',
      currency: 'GBP',
      location: 'London, UK',
      swiftCode: 'HBUKGB4B',
      balance: 8420000,
      status: 'Active'
    },
    {
      id: 'NVL003',
      accountType: 'Loro',
      accountNumber: 'LOR456789012',
      correspondentBank: 'Standard Chartered Bank',
      currency: 'EUR',
      location: 'Frankfurt, Germany',
      swiftCode: 'SCBLDEFX',
      balance: 12300000,
      status: 'Active'
    },
    {
      id: 'NVL004',
      accountType: 'Nostro',
      accountNumber: 'NOS654321098',
      correspondentBank: 'Citibank N.A.',
      currency: 'SGD',
      location: 'Singapore',
      swiftCode: 'CITISGSG',
      balance: 5890000,
      status: 'Suspended'
    }
  ];

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Nostro': return 'default';
      case 'Vostro': return 'secondary';
      case 'Loro': return 'outline';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Suspended': return 'destructive';
      case 'Inactive': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nostro, Vostro & Loro Accounts</h1>
        <p className="text-muted-foreground">Manage correspondent banking account relationships</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search correspondent accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Correspondent Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nostro Accounts</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCorrespondentAccounts.filter(acc => acc.accountType === 'Nostro').length}
            </div>
            <p className="text-xs text-muted-foreground">Our accounts with others</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vostro Accounts</CardTitle>
            <Wallet className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCorrespondentAccounts.filter(acc => acc.accountType === 'Vostro').length}
            </div>
            <p className="text-xs text-muted-foreground">Others' accounts with us</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loro Accounts</CardTitle>
            <Wallet className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCorrespondentAccounts.filter(acc => acc.accountType === 'Loro').length}
            </div>
            <p className="text-xs text-muted-foreground">Third-party accounts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Correspondent Account Directory
          </CardTitle>
          <CardDescription>Manage Nostro, Vostro, and Loro account relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Type</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Correspondent Bank</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>SWIFT Code</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCorrespondentAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <Badge variant={getAccountTypeColor(account.accountType)}>
                      {account.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{account.accountNumber}</TableCell>
                  <TableCell className="font-medium">{account.correspondentBank}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.currency}</Badge>
                  </TableCell>
                  <TableCell>{account.location}</TableCell>
                  <TableCell className="font-mono">{account.swiftCode}</TableCell>
                  <TableCell className="font-mono">
                    {account.balance.toLocaleString()} {account.currency}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(account.status)}>
                      {account.status}
                    </Badge>
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

export default NostroVostroLoroPage;