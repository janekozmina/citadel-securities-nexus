
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AuctionManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Auction Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Auction Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Create Auction</Button>
            <Button variant="outline" className="w-full">Manage Auctions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bidding System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">View Bids</Button>
            <Button variant="outline" className="w-full">Bidding History</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Auction Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Real-time Monitor</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bloomberg Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Bloomberg Auction Manager</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuctionManagementPage;
