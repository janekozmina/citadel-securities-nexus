import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const AuctionsTradingMonitorPage = () => {
  const auctionData = [
    { instrument: 'AAPL', participants: 12, leadingBid: 175.30, leadingOffer: 175.35, volume: 25000 },
    { instrument: 'TSLA', participants: 8, leadingBid: 219.75, leadingOffer: 219.85, volume: 18500 },
    { instrument: 'GOOGL', participants: 15, leadingBid: 2749.50, leadingOffer: 2750.25, volume: 8200 },
    { instrument: 'MSFT', participants: 10, leadingBid: 414.80, leadingOffer: 414.95, volume: 22000 },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Auctions Trading Monitor</h1>
            <p className="text-slate-600">Monitor live auction activities and participate</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Instrument</th>
                        <th className="text-left p-3 font-semibold">Participants</th>
                        <th className="text-left p-3 font-semibold">Leading Bid</th>
                        <th className="text-left p-3 font-semibold">Leading Offer</th>
                        <th className="text-left p-3 font-semibold">Volume</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.map((auction) => (
                        <tr key={auction.instrument} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold">{auction.instrument}</td>
                          <td className="p-3">{auction.participants}</td>
                          <td className="p-3 text-green-600 font-medium">${auction.leadingBid}</td>
                          <td className="p-3 text-red-600 font-medium">${auction.leadingOffer}</td>
                          <td className="p-3">{auction.volume.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm">Bid</Button>
                              <Button size="sm" variant="outline">Offer</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">Place Bid</Button>
                <Button variant="outline" className="w-full justify-start">Place Offer</Button>
                <Button variant="outline" className="w-full justify-start">Monitor Positions</Button>
                <Button variant="outline" className="w-full justify-start">Auction History</Button>
                <Button variant="outline" className="w-full justify-start">Set Price Alerts</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AuctionsTradingMonitorPage;