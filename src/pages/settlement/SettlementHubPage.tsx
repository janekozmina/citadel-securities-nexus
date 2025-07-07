
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SettlementHubPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Settlement Hub</h1>
        <Badge variant="outline">Admin, Custodian, Broker Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>DvP Models Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">DvP Model 1</Button>
            <Button variant="outline" className="w-full">DvP Model 2</Button>
            <Button variant="outline" className="w-full">DvP Model 3</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-Time Gross Settlement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">RTGS Processing</Button>
            <Button variant="outline" className="w-full">Settlement Queue</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Auto-fail Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Configure Detection Rules</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Settlement Queue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettlementHubPage;
