import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const OrderManagementPage = () => {
  const orderManagementData = {
    quoteOrders: [
      { id: 'Q001', instrument: 'AAPL', price: 175.25, quantity: 1500, validity: '2024-07-15', side: 'BUY' },
      { id: 'Q002', instrument: 'TSLA', price: 219.80, quantity: 800, validity: '2024-07-15', side: 'SELL' },
      { id: 'Q003', instrument: 'MSFT', price: 414.50, quantity: 1200, validity: '2024-07-16', side: 'BUY' },
    ],
    offerOrders: [
      { id: 'O001', instrument: 'GOOGL', price: 2748.00, quantity: 300, validity: '2024-07-15', side: 'SELL' },
      { id: 'O002', instrument: 'AMZN', price: 3425.75, quantity: 450, validity: '2024-07-15', side: 'BUY' },
      { id: 'O003', instrument: 'META', price: 495.25, quantity: 600, validity: '2024-07-16', side: 'SELL' },
    ]
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
            <p className="text-slate-600">Manage and monitor quote and offer orders</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Quote Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold text-sm">ID</th>
                        <th className="text-left p-2 font-semibold text-sm">Instrument</th>
                        <th className="text-left p-2 font-semibold text-sm">Side</th>
                        <th className="text-left p-2 font-semibold text-sm">Price</th>
                        <th className="text-left p-2 font-semibold text-sm">Quantity</th>
                        <th className="text-left p-2 font-semibold text-sm">Validity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderManagementData.quoteOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-slate-50">
                          <td className="p-2 text-sm font-mono">{order.id}</td>
                          <td className="p-2 text-sm">{order.instrument}</td>
                          <td className="p-2 text-sm">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.side === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {order.side}
                            </span>
                          </td>
                          <td className="p-2 text-sm">${order.price}</td>
                          <td className="p-2 text-sm">{order.quantity.toLocaleString()}</td>
                          <td className="p-2 text-sm">{order.validity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Offer Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold text-sm">ID</th>
                        <th className="text-left p-2 font-semibold text-sm">Instrument</th>
                        <th className="text-left p-2 font-semibold text-sm">Side</th>
                        <th className="text-left p-2 font-semibold text-sm">Price</th>
                        <th className="text-left p-2 font-semibold text-sm">Quantity</th>
                        <th className="text-left p-2 font-semibold text-sm">Validity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderManagementData.offerOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-slate-50">
                          <td className="p-2 text-sm font-mono">{order.id}</td>
                          <td className="p-2 text-sm">{order.instrument}</td>
                          <td className="p-2 text-sm">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.side === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {order.side}
                            </span>
                          </td>
                          <td className="p-2 text-sm">${order.price}</td>
                          <td className="p-2 text-sm">{order.quantity.toLocaleString()}</td>
                          <td className="p-2 text-sm">{order.validity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          </div>

          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">Create Quote Order</Button>
                <Button variant="outline" className="w-full justify-start">Create Offer Order</Button>
                <Button variant="outline" className="w-full justify-start">Modify Orders</Button>
                <Button variant="outline" className="w-full justify-start">Cancel Orders</Button>
                <Button variant="outline" className="w-full justify-start">Order History</Button>
                <Button variant="outline" className="w-full justify-start">Export Report</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OrderManagementPage;