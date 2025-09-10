import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Target, Plus, Edit, Trash, Search } from 'lucide-react';

const PrioritiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPriorities = [
    {
      id: 'PRI001',
      code: 'P0',
      name: 'Emergency Priority',
      description: 'Highest priority for emergency transactions',
      level: 0,
      queuePosition: 1,
      timeLimit: '5 minutes',
      status: 'Active'
    },
    {
      id: 'PRI002',
      code: 'P1',
      name: 'High Priority',
      description: 'High priority for urgent transactions',
      level: 1,
      queuePosition: 2,
      timeLimit: '15 minutes',
      status: 'Active'
    },
    {
      id: 'PRI003',
      code: 'P2',
      name: 'Normal Priority',
      description: 'Normal priority for standard transactions',
      level: 2,
      queuePosition: 3,
      timeLimit: '1 hour',
      status: 'Active'
    },
    {
      id: 'PRI004',
      code: 'P3',
      name: 'Low Priority',
      description: 'Low priority for non-urgent transactions',
      level: 3,
      queuePosition: 4,
      timeLimit: '4 hours',
      status: 'Active'
    },
    {
      id: 'PRI005',
      code: 'P4',
      name: 'Batch Priority',
      description: 'Batch processing for end-of-day transactions',
      level: 4,
      queuePosition: 5,
      timeLimit: 'End of day',
      status: 'Active'
    }
  ];

  const getPriorityColor = (level: number) => {
    switch (level) {
      case 0: return 'destructive';
      case 1: return 'default';
      case 2: return 'secondary';
      case 3: return 'outline';
      case 4: return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction Priorities</h1>
        <p className="text-muted-foreground">Manage transaction priority levels and processing queues</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search priorities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Priority Level
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Priority Level Definitions
          </CardTitle>
          <CardDescription>Configure transaction priority levels and processing rules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority Code</TableHead>
                <TableHead>Priority Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Queue Position</TableHead>
                <TableHead>Time Limit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPriorities.map((priority) => (
                <TableRow key={priority.id}>
                  <TableCell className="font-mono font-bold">{priority.code}</TableCell>
                  <TableCell className="font-medium">{priority.name}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(priority.level)}>
                      Level {priority.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{priority.queuePosition}</TableCell>
                  <TableCell>{priority.timeLimit}</TableCell>
                  <TableCell>{priority.description}</TableCell>
                  <TableCell>
                    <Badge variant="default">{priority.status}</Badge>
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

export default PrioritiesPage;