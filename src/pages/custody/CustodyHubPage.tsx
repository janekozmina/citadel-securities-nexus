
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CustodyHubPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Custody Hub</h1>
        <Badge variant="outline">Admin, Custodian, Broker Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Holdings Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">Real-time ledger for all holdings</p>
            <Button className="w-full">View Holdings</Button>
            <Button variant="outline" className="w-full">Holdings History</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pledges & Collateral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Manage Pledges</Button>
            <Button variant="outline" className="w-full">Collateral Locks</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Securities Lending/Borrowing</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Lending Operations</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sub-Balance Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Sub-Balances</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Beneficial Ownership Views</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">View Beneficial Ownership</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustodyHubPage;
