
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MasterDataPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Master Data Management</h1>
        <Badge variant="outline">Admin Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Master Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Securities Data</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participant Master Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Participants</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reference Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Reference Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterDataPage;
