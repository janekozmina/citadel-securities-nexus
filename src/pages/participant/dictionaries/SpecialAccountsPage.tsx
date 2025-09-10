import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, Plus, Edit, Trash, Search } from 'lucide-react';

const SpecialAccountsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockSpecialAccounts = [
    {
      id: 'SPC001',
      accountNumber: 'SPC900001',
      accountName: 'Central Bank Operations Account',
      accountType: 'Central Bank',
      purpose: 'Monetary policy operations',
      restrictions: 'CBB Use Only',
      currency: 'BHD',
      status: 'Active'
    },
    {
      id: 'SPC002',
      accountNumber: 'SPC900002',
      accountName: 'Emergency Liquidity Facility',
      accountType: 'Emergency Fund',
      purpose: 'Emergency liquidity provision',
      restrictions: 'Crisis Use Only',
      currency: 'BHD',
      status: 'Active'
    },
    {
      id: 'SPC003',
      accountNumber: 'SPC900003',
      accountName: 'Interbank Settlement Pool',
      accountType: 'Settlement Pool',
      purpose: 'Interbank settlement operations',
      restrictions: 'Settlement System Use',
      currency: 'BHD',
      status: 'Active'
    },
    {
      id: 'SPC004',
      accountNumber: 'SPC900004',
      accountName: 'Government Securities Account',
      accountType: 'Government',
      purpose: 'Government securities transactions',
      restrictions: 'Government Operations Only',
      currency: 'BHD',
      status: 'Active'
    },
    {
      id: 'SPC005',
      accountNumber: 'SPC900005',
      accountName: 'Suspense Account',
      accountType: 'Suspense',
      purpose: 'Temporary transaction holding',
      restrictions: 'Temporary Use Only',
      currency: 'BHD',
      status: 'Active'
    }
  ];

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Central Bank': return 'default';
      case 'Emergency Fund': return 'destructive';
      case 'Settlement Pool': return 'secondary';
      case 'Government': return 'outline';
      case 'Suspense': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Special Accounts Management</h1>
        <p className="text-muted-foreground">Manage special purpose and restricted accounts</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search special accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Special Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Special Account Definitions
          </CardTitle>
          <CardDescription>System special accounts with restricted access and purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Restrictions</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSpecialAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono">{account.accountNumber}</TableCell>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>
                    <Badge variant={getAccountTypeColor(account.accountType)}>
                      {account.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.purpose}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {account.restrictions}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.currency}</Badge>
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

export default SpecialAccountsPage;