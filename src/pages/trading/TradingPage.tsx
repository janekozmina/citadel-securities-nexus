
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TradingPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Trading Hub</h1>
        <Badge variant="outline">Admin, Custodian, Broker Access</Badge>
      </div>

      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instructions">Transfer Instructions</TabsTrigger>
          <TabsTrigger value="matching">Trade Matching</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="monitoring">Trading Monitors</TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>DvP/RvP Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Create DvP Instruction</Button>
                <Button variant="outline" className="w-full">Create RvP Instruction</Button>
                <Button variant="outline" className="w-full">View Instructions</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Free Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Create DvF Instruction</Button>
                <Button variant="outline" className="w-full">Create RvF Instruction</Button>
                <Button variant="outline" className="w-full">Transfer History</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Matching from Exchange</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Real-time matching of buy/sell orders with FIX protocol integration</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button>T+0 Settlement</Button>
                <Button variant="outline">T+1 Settlement</Button>
                <Button variant="outline">T+2 Settlement</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Quote Orders</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offer Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Offer Orders</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auctions Trading Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Auction Trading</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bilateral Trading Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Bilateral Trading</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingPage;
