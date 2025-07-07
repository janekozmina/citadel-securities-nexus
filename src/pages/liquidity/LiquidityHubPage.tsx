
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LiquidityHubPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Liquidity Hub</h1>
        <Badge variant="outline">Admin, Custodian Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tri-Party REPO Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage REPO Operations</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Central Bank Liquidity Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Liquidity Operations</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Islamic REPO</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Islamic REPO Services</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collateral Optimization AI</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">AI Optimization</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiquidityHubPage;
