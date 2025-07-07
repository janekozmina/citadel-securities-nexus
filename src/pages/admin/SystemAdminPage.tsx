
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SystemAdminPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">System Administration</h1>
        <Badge variant="outline">Admin Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Day Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Business Days</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Configure System</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Synchronization Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Monitor Sync Status</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemAdminPage;
