
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecuritiesLifecyclePage = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Securities Lifecycle</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Issuance & Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">New Security Issuance</Button>
            <Button variant="outline" className="w-full">Manage Distributions</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Corporate Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Process Corporate Actions</Button>
            <Button variant="outline" className="w-full">Action History</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Redemption & Maturity</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Redemptions</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Securities Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Securities Registry</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritiesLifecyclePage;
