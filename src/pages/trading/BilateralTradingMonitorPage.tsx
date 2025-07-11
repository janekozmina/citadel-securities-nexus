import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const BilateralTradingMonitorPage = () => {
  const bilateralData = [
    { id: 'BT001', parties: 'Goldman Sachs ↔ Morgan Stanley', instrument: 'AAPL', quantity: 50000, price: 175.40, status: 'Negotiating' },
    { id: 'BT002', parties: 'JPMorgan ↔ Citigroup', instrument: 'TSLA', quantity: 25000, price: 219.90, status: 'Agreed' },
    { id: 'BT003', parties: 'Bank of America ↔ Wells Fargo', instrument: 'GOOGL', quantity: 10000, price: 2750.00, status: 'Pending' },
    { id: 'BT004', parties: 'Deutsche Bank ↔ Credit Suisse', instrument: 'MSFT', quantity: 35000, price: 415.00, status: 'Executing' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Negotiating': return 'text-yellow-600';
      case 'Agreed': return 'text-green-600';
      case 'Pending': return 'text-blue-600';
      case 'Executing': return 'text-purple-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Bilateral Trading Monitor</h1>
            <p className="text-slate-600">Monitor and manage bilateral trading agreements</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Bilateral Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Trade ID</th>
                        <th className="text-left p-3 font-semibold">Parties</th>
                        <th className="text-left p-3 font-semibold">Instrument</th>
                        <th className="text-left p-3 font-semibold">Quantity</th>
                        <th className="text-left p-3 font-semibold">Price</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bilateralData.map((trade) => (
                        <tr key={trade.id} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-mono text-sm">{trade.id}</td>
                          <td className="p-3 text-sm">{trade.parties}</td>
                          <td className="p-3 font-mono font-semibold">{trade.instrument}</td>
                          <td className="p-3">{trade.quantity.toLocaleString()}</td>
                          <td className="p-3 font-medium">${trade.price}</td>
                          <td className="p-3">
                            <span className={`font-medium ${getStatusColor(trade.status)}`}>
                              {trade.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm">Execute</Button>
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

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start">Initiate Trade</Button>
                  <Button variant="outline" className="w-full justify-start">Negotiate Terms</Button>
                  <Button variant="outline" className="w-full justify-start">Execute Agreement</Button>
                  <Button variant="outline" className="w-full justify-start">Trade History</Button>
                  <Button variant="outline" className="w-full justify-start">Counterparty Search</Button>
                  <Button variant="outline" className="w-full justify-start">Export Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BilateralTradingMonitorPage;