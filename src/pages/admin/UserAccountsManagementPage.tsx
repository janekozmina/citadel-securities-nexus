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
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  UserPlus,
  Lock,
  Unlock,
  Mail,
  Phone,
  Shield,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  system: 'RTGS' | 'CSD' | 'CMS' | 'ALL';
  status: 'active' | 'inactive' | 'locked' | 'pending';
  lastLogin: string;
  createdDate: string;
  department: string;
  phone?: string;
  mfaEnabled: boolean;
}

const UserAccountsManagementPage = () => {
  useEffect(() => {
    document.title = 'User Accounts Management | Unified Portal';
  }, []);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'john.doe',
      email: 'john.doe@centralbank.bh',
      firstName: 'John',
      lastName: 'Doe',
      role: 'RTGS Administrator',
      system: 'RTGS',
      status: 'active',
      lastLogin: '2024-01-15 09:30',
      createdDate: '2024-01-01',
      department: 'Payment Systems',
      phone: '+973 1234 5678',
      mfaEnabled: true
    },
    {
      id: '2',
      username: 'jane.smith',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'CSD Operator',
      system: 'CSD',
      status: 'active',
      lastLogin: '2024-01-15 08:45',
      createdDate: '2024-01-05',
      department: 'Securities Operations',
      phone: '+973 9876 5432',
      mfaEnabled: true
    },
    {
      id: '3',
      username: 'mike.wilson',
      email: 'mike.wilson@bank.com',
      firstName: 'Mike',
      lastName: 'Wilson',
      role: 'Bank Operator',
      system: 'ALL',
      status: 'locked',
      lastLogin: '2024-01-14 16:20',
      createdDate: '2024-01-10',
      department: 'Operations',
      mfaEnabled: false
    }
  ]);

  const [selectedSystem, setSelectedSystem] = useState<'ALL' | 'RTGS' | 'CSD' | 'CMS'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSystem = selectedSystem === 'ALL' || user.system === selectedSystem || user.system === 'ALL';
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSystem && matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'locked':
        return <Badge variant="destructive">Locked</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    toast.success(`User ${action} successfully`);
    // Implementation would go here
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Accounts Management</h1>
          <p className="text-slate-600">Manage user accounts and access across RTGS, CSD, and CMS systems</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      <Tabs value={selectedSystem} onValueChange={(value) => setSelectedSystem(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ALL">All Systems</TabsTrigger>
          <TabsTrigger value="RTGS">RTGS</TabsTrigger>
          <TabsTrigger value="CSD">CSD + CMS</TabsTrigger>
          <TabsTrigger value="CMS">System Admin</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {selectedSystem === 'ALL' ? 'All User Accounts' : `${selectedSystem} User Accounts`}
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>System Access</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>MFA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">@{user.username}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.system === 'ALL' ? 'default' : 'secondary'}
                          className={user.system === 'RTGS' ? 'bg-blue-100 text-blue-800' : 
                                   user.system === 'CSD' ? 'bg-green-100 text-green-800' :
                                   user.system === 'CMS' ? 'bg-purple-100 text-purple-800' : ''}
                        >
                          {user.system}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          {getStatusBadge(user.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.lastLogin}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.mfaEnabled ? (
                            <Shield className="h-4 w-4 text-green-500" />
                          ) : (
                            <Shield className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {user.status === 'locked' ? (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUserAction('unlocked', user.id)}
                            >
                              <Unlock className="h-3 w-3 text-green-500" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUserAction('locked', user.id)}
                            >
                              <Lock className="h-3 w-3 text-red-500" />
                            </Button>
                          )}
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

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No users found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System-specific content */}
        <TabsContent value="RTGS" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RTGS System Access Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-blue-800">Active RTGS Users</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-green-800">Payment Operators</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-purple-800">System Administrators</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="CSD" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSD + CMS System Access Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-green-800">CSD Users</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-800">CMS Users</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-yellow-800">Custodians</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-purple-800">Market Participants</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccountsManagementPage;