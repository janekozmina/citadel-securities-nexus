import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Users,
  Shield,
  Activity,
  MessageSquare,
  Key,
  Server,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const ParticipantAdministrationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'John Smith', email: 'john.smith@bank.com', role: 'Administrator', status: 'Active', lastLogin: '2024-01-10 09:15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@bank.com', role: 'Operator', status: 'Active', lastLogin: '2024-01-10 14:22' },
    { id: 3, name: 'Mike Wilson', email: 'mike.wilson@bank.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-08 16:45' },
    { id: 4, name: 'Lisa Chen', email: 'lisa.chen@bank.com', role: 'Operator', status: 'Active', lastLogin: '2024-01-10 11:30' }
  ];

  const roles = [
    { id: 1, name: 'Administrator', description: 'Full system access and user management', users: 1, permissions: 25 },
    { id: 2, name: 'Senior Operator', description: 'Advanced operations and reporting access', users: 3, permissions: 18 },
    { id: 3, name: 'Operator', description: 'Standard operational access', users: 8, permissions: 12 },
    { id: 4, name: 'Viewer', description: 'Read-only access to reports and dashboards', users: 5, permissions: 6 }
  ];

  const systemEvents = [
    { id: 1, timestamp: '2024-01-10 15:30:22', type: 'Security', event: 'Failed login attempt', user: 'unknown@domain.com', severity: 'High' },
    { id: 2, timestamp: '2024-01-10 14:15:10', type: 'System', event: 'System maintenance completed', user: 'system', severity: 'Info' },
    { id: 3, timestamp: '2024-01-10 13:45:05', type: 'User', event: 'User role updated', user: 'admin@bank.com', severity: 'Medium' },
    { id: 4, timestamp: '2024-01-10 12:22:30', type: 'Transaction', event: 'Large transaction processed', user: 'operator@bank.com', severity: 'Info' }
  ];

  const communications = [
    { id: 1, type: 'System Alert', subject: 'Scheduled Maintenance Notice', recipients: 'All Users', sent: '2024-01-10 10:00', status: 'Sent' },
    { id: 2, type: 'Newsletter', subject: 'Monthly System Updates', recipients: 'Operators, Admins', sent: '2024-01-08 09:00', status: 'Sent' },
    { id: 3, type: 'Security Alert', subject: 'Password Policy Update', recipients: 'All Users', sent: '2024-01-05 14:30', status: 'Sent' },
    { id: 4, type: 'Training Notice', subject: 'New Training Module Available', recipients: 'New Users', sent: 'Draft', status: 'Draft' }
  ];

  const authProfiles = [
    { id: 1, name: 'Standard Authentication', description: 'Username/Password + MFA', users: 15, status: 'Active' },
    { id: 2, name: 'Certificate Based', description: 'Digital Certificate Authentication', users: 3, status: 'Active' },
    { id: 3, name: 'SSO Integration', description: 'Single Sign-On via LDAP', users: 8, status: 'Active' },
    { id: 4, name: 'API Key Authentication', description: 'System-to-system authentication', users: 2, status: 'Active' }
  ];

  const systemParameters = [
    { id: 1, category: 'Security', parameter: 'Session Timeout', value: '30 minutes', description: 'User session timeout period' },
    { id: 2, category: 'Security', parameter: 'Password Complexity', value: 'High', description: 'Required password complexity level' },
    { id: 3, category: 'Operations', parameter: 'Transaction Limit', value: '10,000,000 BHD', description: 'Daily transaction limit per user' },
    { id: 4, category: 'System', parameter: 'Backup Frequency', value: 'Every 4 hours', description: 'System backup schedule' }
  ];

  const cryptoParameters = [
    { id: 1, algorithm: 'AES-256', usage: 'Data Encryption', status: 'Active', keyRotation: 'Monthly' },
    { id: 2, algorithm: 'RSA-4096', usage: 'Digital Signatures', status: 'Active', keyRotation: 'Quarterly' },
    { id: 3, algorithm: 'SHA-512', usage: 'Hash Functions', status: 'Active', keyRotation: 'N/A' },
    { id: 4, algorithm: 'ECDSA', usage: 'Authentication', status: 'Active', keyRotation: 'Bi-annual' }
  ];

  const logs = [
    { timestamp: '2024-01-10 15:45:22', level: 'ERROR', component: 'Authentication', message: 'Failed login attempt for user: john@bank.com' },
    { timestamp: '2024-01-10 15:42:10', level: 'INFO', component: 'Transaction', message: 'Transaction RT001 processed successfully' },
    { timestamp: '2024-01-10 15:40:05', level: 'WARN', component: 'System', message: 'High memory usage detected on server node-02' },
    { timestamp: '2024-01-10 15:38:30', level: 'INFO', component: 'User', message: 'User sarah.j@bank.com logged in successfully' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600';
      case 'WARN': return 'text-yellow-600';
      case 'INFO': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="text-muted-foreground">System administration and configuration management</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="events">
            <Activity className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Comms</span>
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Key className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Auth</span>
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="crypto">
            <Shield className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Crypto</span>
          </TabsTrigger>
          <TabsTrigger value="logs">
            <FileText className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage user accounts and access permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
                
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{user.lastLogin}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Role Management
                  </CardTitle>
                  <CardDescription>Configure roles and permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{role.name}</h4>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{role.users} users</span>
                      <span>{role.permissions} permissions</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Events
              </CardTitle>
              <CardDescription>Monitor system events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{event.type}</Badge>
                        <Badge variant="outline" className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                      </div>
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">User: {event.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Communications
                  </CardTitle>
                  <CardDescription>Manage system communications and notifications</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communications.map((comm) => (
                  <div key={comm.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{comm.type}</Badge>
                        <Badge variant="outline" className={getStatusColor(comm.status)}>
                          {comm.status}
                        </Badge>
                      </div>
                      <p className="font-medium">{comm.subject}</p>
                      <p className="text-sm text-muted-foreground">Recipients: {comm.recipients}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{comm.sent}</p>
                      <div className="flex gap-1 mt-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Authorization Profiles
              </CardTitle>
              <CardDescription>Manage authentication methods and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {authProfiles.map((profile) => (
                  <div key={profile.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{profile.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(profile.status)}>
                          {profile.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{profile.description}</p>
                    <p className="text-sm">Users: {profile.users}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Parameters
              </CardTitle>
              <CardDescription>Configure system-wide parameters and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemParameters.map((param) => (
                  <div key={param.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{param.category}</Badge>
                        <span className="font-medium">{param.parameter}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{param.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{param.value}</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cryptographic Parameters
              </CardTitle>
              <CardDescription>Manage encryption algorithms and security parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cryptoParameters.map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{crypto.algorithm}</span>
                        <Badge variant="outline" className={getStatusColor(crypto.status)}>
                          {crypto.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Usage: {crypto.usage}</p>
                      <p className="text-sm text-muted-foreground">Key Rotation: {crypto.keyRotation}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                System Logs
              </CardTitle>
              <CardDescription>View and analyze system logs and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-10" />
                </div>
                
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="p-3 rounded-lg border font-mono text-sm">
                      <div className="flex items-start gap-4">
                        <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                        <span className={`font-medium whitespace-nowrap ${getLogLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                        <span className="text-muted-foreground whitespace-nowrap">[{log.component}]</span>
                        <span className="flex-1">{log.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantAdministrationPage;