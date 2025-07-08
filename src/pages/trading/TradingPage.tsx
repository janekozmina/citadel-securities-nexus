
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TradingPage = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Trading Hub</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Transfer Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">DvF/RvF</Button>
            <Button variant="outline" className="w-full">DvP/RvP</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Trade Matching from Exchange</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Real-time matching of buy/sell orders (FIX protocol integration)</Button>
            <Button variant="outline" className="w-full">Support for T+0, T+1, T+2 settlement cycles</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Quote Orders</Button>
            <Button variant="outline" className="w-full">Offer Orders</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Trading Monitor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Auctions Trading Monitor</Button>
            <Button variant="outline" className="w-full">Bilateral Trading Monitor</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingPage;
