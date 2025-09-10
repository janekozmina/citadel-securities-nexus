import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Edit, Trash, Search } from 'lucide-react';

const ParticipantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockParticipants = [
    {
      id: 'PART001',
      code: 'NBB',
      name: 'National Bank of Bahrain',
      type: 'Commercial Bank',
      status: 'Active',
      country: 'Bahrain',
      swiftCode: 'NBBBBHBM'
    },
    {
      id: 'PART002',
      code: 'BBK',
      name: 'Bank of Bahrain and Kuwait',
      type: 'Commercial Bank', 
      status: 'Active',
      country: 'Bahrain',
      swiftCode: 'BBKUBHBM'
    },
    {
      id: 'PART003',
      code: 'GIB',
      name: 'Gulf International Bank',
      type: 'Investment Bank',
      status: 'Active', 
      country: 'Bahrain',
      swiftCode: 'GULBBHBM'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Participants Management</h1>
        <p className="text-muted-foreground">Manage participant institutions and their information</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Participant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participant Directory
          </CardTitle>
          <CardDescription>System participants and institutional information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Institution Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>SWIFT Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-mono">{participant.code}</TableCell>
                  <TableCell className="font-medium">{participant.name}</TableCell>
                  <TableCell>{participant.type}</TableCell>
                  <TableCell>{participant.country}</TableCell>
                  <TableCell className="font-mono">{participant.swiftCode}</TableCell>
                  <TableCell>
                    <Badge variant="default">{participant.status}</Badge>
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

export default ParticipantsPage;