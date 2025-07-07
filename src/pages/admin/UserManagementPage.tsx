
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UserManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">User & Access Management</h1>
        <Badge variant="outline">Admin, Regulator Access</Badge>
      </div>

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
            <CardTitle>MFA/SSO Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Configure Authentication</Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <CardTitle>Login Audit Viewer</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Login Audits</Button>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Import/Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button>Import Roles (XML)</Button>
            <Button variant="outline">Export Roles (XML)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
