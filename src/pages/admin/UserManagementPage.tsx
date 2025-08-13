import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Shield, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Lock,
  Unlock,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

interface Role {
  id: string;
  name: string;
  description: string;
  system: 'rtgs' | 'csd' | 'both';
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive';
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
  system: 'rtgs' | 'csd' | 'both';
}

const permissions: Permission[] = [
  // RTGS Permissions
  { id: 'rtgs_view_dashboard', name: 'View RTGS Dashboard', category: 'RTGS Core', description: 'Access to RTGS system dashboard', system: 'rtgs' },
  { id: 'rtgs_create_payment', name: 'Create Payment', category: 'RTGS Payments', description: 'Initiate payment transactions', system: 'rtgs' },
  { id: 'rtgs_approve_payment', name: 'Approve Payment', category: 'RTGS Payments', description: 'Approve payment transactions', system: 'rtgs' },
  { id: 'rtgs_cancel_payment', name: 'Cancel Payment', category: 'RTGS Payments', description: 'Cancel pending payments', system: 'rtgs' },
  { id: 'rtgs_view_liquidity', name: 'View Liquidity', category: 'RTGS Monitoring', description: 'Access liquidity information', system: 'rtgs' },
  { id: 'rtgs_manage_accounts', name: 'Manage Accounts', category: 'RTGS Administration', description: 'Manage participant accounts', system: 'rtgs' },
  { id: 'rtgs_configure_limits', name: 'Configure Limits', category: 'RTGS Administration', description: 'Set transaction limits', system: 'rtgs' },
  { id: 'rtgs_view_reports', name: 'View Reports', category: 'RTGS Reporting', description: 'Access RTGS reports', system: 'rtgs' },
  
  // CSD Permissions
  { id: 'csd_view_dashboard', name: 'View CSD Dashboard', category: 'CSD Core', description: 'Access to CSD system dashboard', system: 'csd' },
  { id: 'csd_create_instruction', name: 'Create Settlement Instruction', category: 'CSD Settlement', description: 'Create settlement instructions', system: 'csd' },
  { id: 'csd_approve_instruction', name: 'Approve Settlement', category: 'CSD Settlement', description: 'Approve settlement instructions', system: 'csd' },
  { id: 'csd_cancel_instruction', name: 'Cancel Settlement', category: 'CSD Settlement', description: 'Cancel settlement instructions', system: 'csd' },
  { id: 'csd_manage_securities', name: 'Manage Securities', category: 'CSD Securities', description: 'Manage securities lifecycle', system: 'csd' },
  { id: 'csd_corporate_actions', name: 'Corporate Actions', category: 'CSD Securities', description: 'Process corporate actions', system: 'csd' },
  { id: 'csd_custody_management', name: 'Custody Management', category: 'CSD Custody', description: 'Manage custody accounts', system: 'csd' },
  { id: 'csd_view_reports', name: 'View Reports', category: 'CSD Reporting', description: 'Access CSD reports', system: 'csd' },
  
  // Shared Permissions
  { id: 'audit_view', name: 'View Audit Logs', category: 'System Audit', description: 'Access audit trail information', system: 'both' },
  { id: 'user_management', name: 'User Management', category: 'System Administration', description: 'Manage user accounts and roles', system: 'both' },
  { id: 'system_config', name: 'System Configuration', category: 'System Administration', description: 'Configure system settings', system: 'both' },
  { id: 'backup_restore', name: 'Backup & Restore', category: 'System Administration', description: 'Perform backup and restore operations', system: 'both' }
];

const predefinedRoles: Role[] = [
  {
    id: '1',
    name: 'RTGS Administrator',
    description: 'Full administrative access to RTGS system',
    system: 'rtgs',
    permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_approve_payment', 'rtgs_cancel_payment', 'rtgs_view_liquidity', 'rtgs_manage_accounts', 'rtgs_configure_limits', 'rtgs_view_reports', 'user_management', 'system_config'],
    userCount: 3,
    status: 'active'
  },
  {
    id: '2',
    name: 'RTGS Operator',
    description: 'Operational access for RTGS transactions',
    system: 'rtgs',
    permissions: ['rtgs_view_dashboard', 'rtgs_create_payment', 'rtgs_view_liquidity', 'rtgs_view_reports'],
    userCount: 12,
    status: 'active'
  },
  {
    id: '3',
    name: 'CSD Administrator',
    description: 'Full administrative access to CSD system',
    system: 'csd',
    permissions: ['csd_view_dashboard', 'csd_create_instruction', 'csd_approve_instruction', 'csd_cancel_instruction', 'csd_manage_securities', 'csd_corporate_actions', 'csd_custody_management', 'csd_view_reports', 'user_management', 'system_config'],
    userCount: 5,
    status: 'active'
  },
  {
    id: '4',
    name: 'CSD Operator',
    description: 'Operational access for CSD settlement',
    system: 'csd',
    permissions: ['csd_view_dashboard', 'csd_create_instruction', 'csd_view_reports'],
    userCount: 18,
    status: 'active'
  },
  {
    id: '5',
    name: 'Super Administrator',
    description: 'Full access to both RTGS and CSD systems',
    system: 'both',
    permissions: permissions.map(p => p.id),
    userCount: 2,
    status: 'active'
  },
  {
    id: '6',
    name: 'Audit Viewer',
    description: 'Read-only access for audit and compliance',
    system: 'both',
    permissions: ['rtgs_view_dashboard', 'rtgs_view_reports', 'csd_view_dashboard', 'csd_view_reports', 'audit_view'],
    userCount: 8,
    status: 'active'
  }
];

export default function UserManagementPage() {
  useEffect(() => {
    document.title = 'User & Access Management | Unified Portal';
  }, []);

  const [roles, setRoles] = useState<Role[]>(predefinedRoles);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<'rtgs' | 'csd' | 'both'>('both');
  
  const [roleForm, setRoleForm] = useState<Partial<Role>>({
    name: '',
    description: '',
    system: 'rtgs',
    permissions: [],
    status: 'active'
  });

  const handleCreateRole = () => {
    setEditingRole(null);
    setRoleForm({
      name: '',
      description: '',
      system: 'rtgs',
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
          ? { ...role, ...roleForm, userCount: role.userCount } as Role
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
        status: roleForm.status!
      };
      setRoles(prev => [...prev, newRole]);
      toast.success('Role created successfully');
    }

    setIsRoleDialogOpen(false);
    setEditingRole(null);
    setRoleForm({});
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    toast.success('Role deleted successfully');
  };

  const handlePermissionToggle = (permissionId: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions?.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...(prev.permissions || []), permissionId]
    }));
  };

  const getFilteredPermissions = () => {
    if (!roleForm.system) return [];
    return permissions.filter(p => p.system === roleForm.system || p.system === 'both');
  };

  const getPermissionsByCategory = () => {
    const filtered = getFilteredPermissions();
    const grouped = filtered.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
    return grouped;
  };

  const filteredRoles = roles.filter(role => 
    selectedSystem === 'both' || role.system === selectedSystem || role.system === 'both'
  );

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User & Access Management</h1>
          <p className="text-slate-600">Configure user access, roles, and authentication settings</p>
        </div>
        <Badge variant="outline">Admin, Regulator Access</Badge>
      </div>

      <Tabs defaultValue="rbac" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rbac">RBAC Configuration</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="audit">Audit & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="rbac" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Role-Based Access Control (RBAC)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage roles and permissions for RTGS and CSD systems
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedSystem} onValueChange={(value: 'rtgs' | 'csd' | 'both') => setSelectedSystem(value)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">All Systems</SelectItem>
                      <SelectItem value="rtgs">RTGS Only</SelectItem>
                      <SelectItem value="csd">CSD Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleCreateRole} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Role
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                      <TableCell>
                        <Badge variant={role.system === 'both' ? 'default' : 'secondary'}>
                          {role.system.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{role.permissions.length} permissions</TableCell>
                      <TableCell>{role.userCount} users</TableCell>
                      <TableCell>
                        <Badge variant={role.status === 'active' ? 'default' : 'secondary'}>
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteRole(role.id)}>
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">RBAC Configuration</Button>
                <Button variant="outline" className="w-full">ABAC Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4-Eyes Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Approval Workflows</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Session Timeout Policies</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MFA/SSO Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Configure Authentication</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Configure Policies</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Account Lockout Settings
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Shield className="h-4 w-4" />
                  IP Whitelist Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Login Audit Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Login Audits</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Import/Export</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Roles (XML)
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Roles (XML)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* RBAC Role Configuration Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </DialogTitle>
            <DialogDescription>
              Configure role permissions for RTGS and/or CSD systems
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name *</Label>
                  <Input 
                    id="roleName"
                    value={roleForm.name || ''}
                    onChange={(e) => setRoleForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., RTGS Payment Processor"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system">Target System *</Label>
                  <Select value={roleForm.system} onValueChange={(value: 'rtgs' | 'csd' | 'both') => setRoleForm(prev => ({...prev, system: value, permissions: []}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rtgs">RTGS System</SelectItem>
                      <SelectItem value="csd">CSD System</SelectItem>
                      <SelectItem value="both">Both Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  value={roleForm.description || ''}
                  onChange={(e) => setRoleForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="Describe the role's purpose and responsibilities..."
                  rows={3}
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Permissions ({roleForm.permissions?.length || 0} selected)
              </h3>
              
              {roleForm.system && (
                <div className="space-y-6 max-h-64 overflow-y-auto border rounded-lg p-4">
                  {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">{category}</h4>
                      <div className="grid grid-cols-1 gap-2 ml-4">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-3">
                            <Checkbox
                              id={permission.id}
                              checked={roleForm.permissions?.includes(permission.id) || false}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor={permission.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {permission.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
}