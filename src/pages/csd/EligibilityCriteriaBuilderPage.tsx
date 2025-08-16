import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { EligibilityCriteriaBuilderDialog } from '@/components/dialogs/EligibilityCriteriaBuilderDialog';

interface EligibilityCriteria {
  id: string;
  name: string;
  description: string;
  conditions: number;
  status: 'Active' | 'Inactive' | 'Draft';
  lastModified: string;
  createdBy: string;
}

const EligibilityCriteriaBuilderPage = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<EligibilityCriteria | null>(null);

  // Mock data for existing criteria
  const existingCriteria: EligibilityCriteria[] = [
    {
      id: '1',
      name: 'Government Securities Filter',
      description: 'Treasury bonds and bills issued by government entities',
      conditions: 5,
      status: 'Active',
      lastModified: '2024-01-15',
      createdBy: 'John Smith'
    },
    {
      id: '2',
      name: 'Investment Grade Corporate Bonds',
      description: 'Corporate bonds with minimum BBB rating',
      conditions: 8,
      status: 'Active',
      lastModified: '2024-01-10',
      createdBy: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'Islamic Sukuk Criteria',
      description: 'Sharia-compliant securities filter',
      conditions: 12,
      status: 'Draft',
      lastModified: '2024-01-08',
      createdBy: 'Ahmed Hassan'
    },
    {
      id: '4',
      name: 'Short-term Securities',
      description: 'Securities maturing within 12 months',
      conditions: 3,
      status: 'Inactive',
      lastModified: '2024-01-05',
      createdBy: 'Lisa Chen'
    }
  ];

  const handleEditCriteria = (criteria: EligibilityCriteria) => {
    setEditingCriteria(criteria);
    setIsBuilderOpen(true);
  };

  const handleCreateNew = () => {
    setEditingCriteria(null);
    setIsBuilderOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      case 'Draft':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Eligibility Criteria Builder"
        description="Create and manage eligibility criteria for securities selection"
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Criteria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Eligibility Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingCriteria.map((criteria) => (
                <TableRow key={criteria.id}>
                  <TableCell className="font-medium">{criteria.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{criteria.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{criteria.conditions}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(criteria.status)}>
                      {criteria.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{criteria.lastModified}</TableCell>
                  <TableCell>{criteria.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCriteria(criteria)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EligibilityCriteriaBuilderDialog
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        editingCriteria={editingCriteria}
      />
    </div>
  );
};

export default EligibilityCriteriaBuilderPage;