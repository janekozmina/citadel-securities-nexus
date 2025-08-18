import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Key,
  Lock,
  Settings,
  CheckCircle,
  AlertCircle,
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
  system: 'RTGS' | 'CSD' | 'CMS' | 'SHARED';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface Role {
  id: string;
  name: string;
  description: string;
  system: 'RTGS' | 'CSD' | 'CMS' | 'CROSS_SYSTEM';
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive' | 'deprecated';
  createdDate: string;
  lastModified: string;
}

const RolesPermissionsPage = () => {
  useEffect(() => {
    document.title = 'Roles & Permissions Management | Unified Portal';
  }, []);

  const permissions: Permission[] = [
    // RTGS Permissions
    { id: 'rtgs_view_dashboard', name: 'View RTGS Dashboard', category: 'RTGS Core', description: 'Access to RTGS system dashboard and overview', system: 'RTGS', riskLevel: 'low' },
    { id: 'rtgs_create_payment', name: 'Create Payment', category: 'RTGS Payments', description: 'Initiate payment transactions in RTGS', system: 'RTGS', riskLevel: 'high' },
    { id: 'rtgs_approve_payment', name: 'Approve Payment', category: 'RTGS Payments', description: 'Approve high-value payment transactions', system: 'RTGS', riskLevel: 'critical' },
    { id: 'rtgs_cancel_payment', name: 'Cancel Payment', category: 'RTGS Payments', description: 'Cancel pending payment transactions', system: 'RTGS', riskLevel: 'high' },
    { id: 'rtgs_view_liquidity', name: 'View Liquidity', category: 'RTGS Monitoring', description: 'Access real-time liquidity information', system: 'RTGS', riskLevel: 'medium' },
    { id: 'rtgs_manage_accounts', name: 'Manage Participant Accounts', category: 'RTGS Administration', description: 'Manage participant accounts and settings', system: 'RTGS', riskLevel: 'critical' },
    { id: 'rtgs_configure_limits', name: 'Configure Transaction Limits', category: 'RTGS Administration', description: 'Set and modify transaction limits', system: 'RTGS', riskLevel: 'critical' },
    { id: 'rtgs_view_reports', name: 'View RTGS Reports', category: 'RTGS Reporting', description: 'Access RTGS operational reports', system: 'RTGS', riskLevel: 'low' },
    
    // CSD Permissions
    { id: 'csd_view_dashboard', name: 'View CSD Dashboard', category: 'CSD Core', description: 'Access to CSD system dashboard', system: 'CSD', riskLevel: 'low' },
    { id: 'csd_create_instruction', name: 'Create Settlement Instruction', category: 'CSD Settlement', description: 'Create securities settlement instructions', system: 'CSD', riskLevel: 'high' },
    { id: 'csd_approve_settlement', name: 'Approve Settlement', category: 'CSD Settlement', description: 'Approve securities settlement instructions', system: 'CSD', riskLevel: 'critical' },
    { id: 'csd_cancel_settlement', name: 'Cancel Settlement', category: 'CSD Settlement', description: 'Cancel settlement instructions', system: 'CSD', riskLevel: 'high' },
    { id: 'csd_manage_securities', name: 'Manage Securities', category: 'CSD Securities', description: 'Manage securities lifecycle and events', system: 'CSD', riskLevel: 'critical' },
    { id: 'csd_corporate_actions', name: 'Process Corporate Actions', category: 'CSD Securities', description: 'Handle corporate actions and distributions', system: 'CSD', riskLevel: 'high' },
    { id: 'csd_custody_management', name: 'Custody Management', category: 'CSD Custody', description: 'Manage custody accounts and holdings', system: 'CSD', riskLevel: 'medium' },
    { id: 'csd_view_reports', name: 'View CSD Reports', category: 'CSD Reporting', description: 'Access CSD operational reports', system: 'CSD', riskLevel: 'low' },
    
    // CMS Permissions
    { id: 'cms_view_dashboard', name: 'View CMS Dashboard', category: 'CMS Core', description: 'Access to CMS system dashboard', system: 'CMS', riskLevel: 'low' },
    { id: 'cms_manage_collateral', name: 'Manage Collateral', category: 'CMS Collateral', description: 'Manage collateral assets and allocations', system: 'CMS', riskLevel: 'high' },
    { id: 'cms_configure_haircuts', name: 'Configure Haircuts', category: 'CMS Risk', description: 'Set collateral haircut parameters', system: 'CMS', riskLevel: 'critical' },
    { id: 'cms_margin_calculation', name: 'Margin Calculation', category: 'CMS Risk', description: 'Calculate and manage margin requirements', system: 'CMS', riskLevel: 'high' },
    
    // Shared Permissions
    { id: 'audit_view', name: 'View Audit Logs', category: 'System Audit', description: 'Access audit trail information', system: 'SHARED', riskLevel: 'medium' },
    { id: 'user_management', name: 'User Management', category: 'System Administration', description: 'Manage user accounts and access', system: 'SHARED', riskLevel: 'critical' },
    { id: 'system_config', name: 'System Configuration', category: 'System Administration', description: 'Configure system-wide settings', system: 'SHARED', riskLevel: 'critical' },
    { id: 'backup_restore', name: 'Backup & Restore', category: 'System Administration', description: 'Perform backup and restore operations', system: 'SHARED', riskLevel: 'critical' }
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'RTGS Administrator',
      description: 'Full administrative access to RTGS system with all payment and configuration permissions',
      system: 'RTGS',
      permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_approve_payment', 'rtgs_cancel_payment', 'rtgs_view_liquidity', 'rtgs_manage_accounts', 'rtgs_configure_limits', 'rtgs_view_reports'],
      userCount: 3,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'RTGS Operator',
      description: 'Operational access for RTGS payment processing and monitoring',
      system: 'RTGS',
      permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_view_liquidity', 'rtgs_view_reports'],
      userCount: 12,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-10'
    },
    {
      id: '3',
      name: 'CSD Administrator',
      description: 'Full administrative access to CSD system for securities operations',
      system: 'CSD',
      permissions: ['csd_view_dashboard', 'csd_create_instruction', 'csd_approve_settlement', 'csd_cancel_settlement', 'csd_manage_securities', 'csd_corporate_actions', 'csd_custody_management', 'csd_view_reports'],
      userCount: 5,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-12'
    },
    {
      id: '4',
      name: 'CSD + CMS Operator',
      description: 'Combined operational access for CSD settlements and CMS collateral management',
      system: 'CSD',
      permissions: ['csd_view_dashboard', 'csd_create_instruction', 'csd_view_reports', 'cms_view_dashboard', 'cms_manage_collateral'],
      userCount: 18,
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-01-14'
    }
  ]);

  const [selectedSystem, setSelectedSystem] = useState<'ALL' | 'RTGS' | 'CSD' | 'CROSS_SYSTEM'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleForm, setRoleForm] = useState<Partial<Role>>({
    name: '',
    description: '',
    system: 'RTGS',
    permissions: [],
    status: 'active'
  });

  const filteredRoles = roles.filter(role => {
    const matchesSystem = selectedSystem === 'ALL' || role.system === selectedSystem;
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSystem && matchesSearch;
  });

  const getSystemPermissions = (system: string) => {
    if (system === 'RTGS') {
      return permissions.filter(p => p.system === 'RTGS' || p.system === 'SHARED');
    } else if (system === 'CSD') {
      return permissions.filter(p => p.system === 'CSD' || p.system === 'CMS' || p.system === 'SHARED');
    } else if (system === 'CROSS_SYSTEM') {
      return permissions;
    }
    return permissions.filter(p => p.system === 'SHARED');
  };

  const getPermissionsByCategory = () => {
    const systemPermissions = getSystemPermissions(roleForm.system || 'RTGS');
    const grouped = systemPermissions.reduce((acc, permission) => {
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
      system: 'RTGS',
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
        system: roleForm.system!,
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
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Roles & Permissions Management</h1>
          <p className="text-slate-600">Configure role-based access control for RTGS, CSD, and CMS systems</p>
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

      <Tabs value={selectedSystem} onValueChange={(value) => setSelectedSystem(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ALL">All Systems</TabsTrigger>
          <TabsTrigger value="RTGS">RTGS</TabsTrigger>
          <TabsTrigger value="CSD">CSD + CMS</TabsTrigger>
          <TabsTrigger value="CROSS_SYSTEM">Cross-System</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {selectedSystem === 'ALL' ? 'All Roles' : `${selectedSystem} Roles`}
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
                    <TableHead>System</TableHead>
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
                        <Badge 
                          variant="outline"
                          className={
                            role.system === 'RTGS' ? 'bg-blue-100 text-blue-800' :
                            role.system === 'CSD' ? 'bg-green-100 text-green-800' :
                            role.system === 'CMS' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {role.system}
                        </Badge>
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

            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No roles found</h3>
                <p className="text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System-specific summaries */}
        <TabsContent value="RTGS" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RTGS Permissions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-blue-800">RTGS Permissions</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-green-800">Payment Operations</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <div className="text-sm text-yellow-800">Administration</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-red-800">Critical Permissions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="CSD" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSD + CMS Permissions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-green-800">CSD Permissions</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-purple-800">CMS Permissions</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-blue-800">Settlement Operations</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-sm text-red-800">Critical Permissions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Role Creation/Edit Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name *</Label>
                <Input
                  id="role-name"
                  value={roleForm.name || ''}
                  onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter role name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role-system">System *</Label>
                <Select 
                  value={roleForm.system} 
                  onValueChange={(value) => setRoleForm(prev => ({ ...prev, system: value as any, permissions: [] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RTGS">RTGS Only</SelectItem>
                    <SelectItem value="CSD">CSD + CMS</SelectItem>
                    <SelectItem value="CROSS_SYSTEM">Cross-System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description *</Label>
              <Textarea
                id="role-description"
                value={roleForm.description || ''}
                onChange={(e) => setRoleForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role and its responsibilities"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Permissions *</Label>
              <div className="space-y-6">
                {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-slate-700 border-b pb-1">{category}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                          <Checkbox
                            id={permission.id}
                            checked={roleForm.permissions?.includes(permission.id) || false}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                                {permission.name}
                              </Label>
                              <Badge variant="outline" className={`text-xs ${getRiskLevelColor(permission.riskLevel)}`}>
                                {permission.riskLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesPermissionsPage;