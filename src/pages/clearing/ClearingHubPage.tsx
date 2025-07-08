import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClearingHubPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Clearing Hub</h1>
      </div>

      <Tabs defaultValue="manager" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manager">Clearing Manager</TabsTrigger>
          <TabsTrigger value="margin">Margin Calculation</TabsTrigger>
          <TabsTrigger value="default">Default Management</TabsTrigger>
          <TabsTrigger value="dashboard">CCP Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="manager" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Multilateral Netting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Start Netting Process</Button>
                <Button variant="outline" className="w-full">View Netting Results</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Netting Cycles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Configure Cycles</Button>
                <Button variant="outline" className="w-full">Cycle History</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Waterfall Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Run Simulation</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DvP3 Pre-Clearing</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Pre-Clear Trades</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="margin" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Exposure Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Monitor Exposures</Button>
                <Button variant="outline" className="w-full">Exposure Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Margin Call Automation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Generate Margin Calls</Button>
                <Button variant="outline" className="w-full">Call History</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Haircut Matrix Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Configure Haircuts</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="default" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Auction protocols for defaulted positions and liquidity waterfall</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button>Auction Protocols</Button>
                <Button variant="outline">Liquidity Waterfall</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Central Counterparty Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Comprehensive view of CCP operations and metrics</p>
              <Button className="w-full mt-4">View CCP Dashboard</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClearingHubPage;
