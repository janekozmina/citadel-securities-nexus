import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Users,
  Copy,
  Download,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive' | 'deprecated';
  createdDate: string;
  lastModified: string;
}

const RTGSRolesPermissionsPage = () => {
  useEffect(() => {
    document.title = 'RTGS Roles & Permissions | Unified Portal';
  }, []);

  const permissions: Permission[] = [
    // RTGS Permissions
    { id: 'rtgs_view_dashboard', name: 'View RTGS Dashboard', category: 'RTGS Core', description: 'Access to RTGS system dashboard and overview', riskLevel: 'low' },
    { id: 'rtgs_create_payment', name: 'Create Payment', category: 'RTGS Payments', description: 'Initiate payment transactions in RTGS', riskLevel: 'high' },
    { id: 'rtgs_approve_payment', name: 'Approve Payment', category: 'RTGS Payments', description: 'Approve high-value payment transactions', riskLevel: 'critical' },
    { id: 'rtgs_cancel_payment', name: 'Cancel Payment', category: 'RTGS Payments', description: 'Cancel pending payment transactions', riskLevel: 'high' },
    { id: 'rtgs_view_liquidity', name: 'View Liquidity', category: 'RTGS Monitoring', description: 'Access real-time liquidity information', riskLevel: 'medium' },
    { id: 'rtgs_manage_accounts', name: 'Manage Participant Accounts', category: 'RTGS Administration', description: 'Manage participant accounts and settings', riskLevel: 'critical' },
    { id: 'rtgs_configure_limits', name: 'Configure Transaction Limits', category: 'RTGS Administration', description: 'Set and modify transaction limits', riskLevel: 'critical' },
    { id: 'rtgs_view_reports', name: 'View RTGS Reports', category: 'RTGS Reporting', description: 'Access RTGS operational reports', riskLevel: 'low' },
    { id: 'rtgs_system_config', name: 'System Configuration', category: 'RTGS Administration', description: 'Configure system-wide RTGS settings', riskLevel: 'critical' },
    { id: 'rtgs_audit_logs', name: 'View Audit Logs', category: 'RTGS Monitoring', description: 'Access RTGS audit trail information', riskLevel: 'medium' }
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'RTGS Administrator',
      description: 'Full administrative access to RTGS system with all payment and configuration permissions',
      permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_approve_payment', 'rtgs_cancel_payment', 'rtgs_view_liquidity', 'rtgs_manage_accounts', 'rtgs_configure_limits', 'rtgs_view_reports', 'rtgs_system_config', 'rtgs_audit_logs'],
      userCount: 3,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'RTGS Operator',
      description: 'Operational access for RTGS payment processing and monitoring',
      permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_view_liquidity', 'rtgs_view_reports'],
      userCount: 12,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-10'
    },
    {
      id: '3',
      name: 'RTGS Supervisor',
      description: 'Supervisory access with approval permissions for high-value transactions',
      permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_approve_payment', 'rtgs_view_liquidity', 'rtgs_view_reports', 'rtgs_audit_logs'],
      userCount: 5,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleForm, setRoleForm] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: [],
    status: 'active'
  });

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getPermissionsByCategory = () => {
    const grouped = permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
    return grouped;
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setRoleForm({
      name: '',
      description: '',
      permissions: [],
      status: 'active'
    });
    setIsRoleDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleForm(role);
    setIsRoleDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (!roleForm.name || !roleForm.description || !roleForm.permissions?.length) {
      toast.error('Please fill in all required fields and select at least one permission');
      return;
    }

    if (editingRole) {
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...roleForm, lastModified: new Date().toISOString().split('T')[0] } as Role
          : role
      ));
      toast.success('Role updated successfully');
    } else {
      const newRole: Role = {
        id: Date.now().toString(),
        name: roleForm.name!,
        description: roleForm.description!,
        permissions: roleForm.permissions!,
        userCount: 0,
        status: roleForm.status!,
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setRoles(prev => [...prev, newRole]);
      toast.success('Role created successfully');
    }

    setIsRoleDialogOpen(false);
    setEditingRole(null);
    setRoleForm({});
  };

  const handlePermissionToggle = (permissionId: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions?.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...(prev.permissions || []), permissionId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">RTGS Roles & Permissions</h1>
          <p className="text-muted-foreground">Configure role-based access control for RTGS system</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button onClick={handleCreateRole} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              RTGS System Roles
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={role.description}>
                        {role.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{role.permissions.length}</span>
                        <span className="text-xs text-muted-foreground">permissions</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{role.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.status === 'active' ? 'default' : 'secondary'}>
                        {role.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {role.lastModified}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>RTGS System Access Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-blue-800">Active Roles</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">20</div>
              <div className="text-sm text-green-800">Total Users</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">10</div>
              <div className="text-sm text-purple-800">RTGS Permissions</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-orange-800">Critical Permissions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Creation/Edit Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Name *</label>
                <Input
                  value={roleForm.name || ''}
                  onChange={(e) => setRoleForm(prev => ({...prev, name: e.target.value}))}
                  placeholder="Enter role name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={roleForm.status || 'active'} 
                  onValueChange={(value) => setRoleForm(prev => ({...prev, status: value as any}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={roleForm.description || ''}
                onChange={(e) => setRoleForm(prev => ({...prev, description: e.target.value}))}
                placeholder="Enter role description"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Permissions *</label>
              <div className="space-y-4">
                {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={permission.id}
                            checked={roleForm.permissions?.includes(permission.id) || false}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <div className="flex-1 space-y-1">
                            <label 
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.name}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                          <Badge 
                            className={`text-xs ${getRiskLevelColor(permission.riskLevel)}`}
                          >
                            {permission.riskLevel}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RTGSRolesPermissionsPage;