
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RiskManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Risk Management</h1>
        <Badge variant="outline">Admin, Custodian, Broker Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exposure Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Monitor Exposures</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AML Sentinel</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">AML Monitoring</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ESG Scoring</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">ESG Analysis</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskManagementPage;
