import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Plus, Edit, Trash, Search } from 'lucide-react';

const CorrespondentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCorrespondents = [
    {
      id: 'CORR001',
      code: 'JPMC_NY',
      name: 'JPMorgan Chase Bank N.A.',
      location: 'New York, USA',
      currency: 'USD',
      accountNumber: '001234567890',
      swiftCode: 'CHASUS33',
      status: 'Active'
    },
    {
      id: 'CORR002', 
      code: 'HSBC_LN',
      name: 'HSBC Bank plc',
      location: 'London, UK',
      currency: 'GBP',
      accountNumber: '987654321098',
      swiftCode: 'HBUKGB4B',
      status: 'Active'
    },
    {
      id: 'CORR003',
      code: 'CITI_SG',
      name: 'Citibank N.A.',
      location: 'Singapore',
      currency: 'SGD',
      accountNumber: '543210987654',
      swiftCode: 'CITISGSG',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Correspondents Management</h1>
        <p className="text-muted-foreground">Manage correspondent banking relationships and accounts</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search correspondents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Correspondent
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Correspondent Banks
          </CardTitle>
          <CardDescription>Manage correspondent banking relationships and account details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>SWIFT Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCorrespondents.map((correspondent) => (
                <TableRow key={correspondent.id}>
                  <TableCell className="font-mono">{correspondent.code}</TableCell>
                  <TableCell className="font-medium">{correspondent.name}</TableCell>
                  <TableCell>{correspondent.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{correspondent.currency}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{correspondent.accountNumber}</TableCell>
                  <TableCell className="font-mono">{correspondent.swiftCode}</TableCell>
                  <TableCell>
                    <Badge variant="default">{correspondent.status}</Badge>
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

export default CorrespondentsPage;