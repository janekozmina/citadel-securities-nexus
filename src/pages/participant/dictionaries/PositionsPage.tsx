import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Plus, Edit, Trash, Search } from 'lucide-react';

const PositionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPositions = [
    {
      id: 'POS001',
      code: 'LONG_GOVT_BOND',
      name: 'Long Government Bond Position',
      type: 'Security Position',
      category: 'Fixed Income',
      status: 'Active',
      description: 'Long position in government bonds'
    },
    {
      id: 'POS002',
      code: 'SHORT_CORPORATE',
      name: 'Short Corporate Securities',
      type: 'Security Position',
      category: 'Equity',
      status: 'Active',
      description: 'Short position in corporate securities'
    },
    {
      id: 'POS003',
      code: 'CASH_BHD',
      name: 'Bahraini Dinar Cash Position',
      type: 'Cash Position',
      category: 'Currency',
      status: 'Active',
      description: 'Cash holdings in Bahraini Dinar'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Positions Management</h1>
        <p className="text-muted-foreground">Manage position definitions and categories</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Position
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Position Definitions
          </CardTitle>
          <CardDescription>Configure and manage position types and categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPositions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell className="font-mono">{position.code}</TableCell>
                  <TableCell className="font-medium">{position.name}</TableCell>
                  <TableCell>{position.type}</TableCell>
                  <TableCell>{position.category}</TableCell>
                  <TableCell>
                    <Badge variant="default">{position.status}</Badge>
                  </TableCell>
                  <TableCell>{position.description}</TableCell>
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

export default PositionsPage;