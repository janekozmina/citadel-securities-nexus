import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Plus, Edit, Trash, Search } from 'lucide-react';

const RejectCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockRejectCodes = [
    {
      id: 'REJ001',
      code: 'R001',
      name: 'Insufficient Funds',
      category: 'Balance',
      description: 'Account has insufficient funds to complete the transaction',
      severity: 'High',
      status: 'Active'
    },
    {
      id: 'REJ002',
      code: 'R002',
      name: 'Invalid Account Number',
      category: 'Account',
      description: 'The specified account number is invalid or does not exist',
      severity: 'High',
      status: 'Active'
    },
    {
      id: 'REJ003',
      code: 'R003',
      name: 'Transaction Limit Exceeded',
      category: 'Limits',
      description: 'Transaction amount exceeds the defined limits',
      severity: 'Medium',
      status: 'Active'
    },
    {
      id: 'REJ004',
      code: 'R004',
      name: 'Duplicate Transaction',
      category: 'Validation',
      description: 'Transaction appears to be a duplicate of an existing transaction',
      severity: 'Low',
      status: 'Active'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reject Codes Management</h1>
        <p className="text-muted-foreground">Manage transaction rejection codes and error definitions</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reject codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Reject Code
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Rejection Code Definitions
          </CardTitle>
          <CardDescription>Configure transaction rejection codes and their descriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRejectCodes.map((rejectCode) => (
                <TableRow key={rejectCode.id}>
                  <TableCell className="font-mono">{rejectCode.code}</TableCell>
                  <TableCell className="font-medium">{rejectCode.name}</TableCell>
                  <TableCell>{rejectCode.category}</TableCell>
                  <TableCell>{rejectCode.description}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(rejectCode.severity)}>
                      {rejectCode.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{rejectCode.status}</Badge>
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

export default RejectCodesPage;