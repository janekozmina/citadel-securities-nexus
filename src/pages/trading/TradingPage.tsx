
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TrendingUp, RefreshCw, FileText, Gavel, Users } from 'lucide-react';

const TradingPage = () => {
  const [activeSection, setActiveSection] = useState<string>('trade-matching');

  const tradeMatchingData = {
    liveMessages: [
      { id: 1, time: '14:32:15', type: 'NEW ORDER', instrument: 'AAPL', side: 'BUY', qty: 1000, price: 175.50, status: '✅ Matched' },
      { id: 2, time: '14:32:12', type: 'CANCEL', instrument: 'TSLA', side: 'SELL', qty: 500, price: 220.00, status: '⚠️ Exception' },
      { id: 3, time: '14:32:08', type: 'NEW ORDER', instrument: 'GOOGL', side: 'BUY', qty: 250, price: 2750.00, status: '❌ Unmatched' },
      { id: 4, time: '14:32:03', type: 'MODIFY', instrument: 'MSFT', side: 'SELL', qty: 750, price: 415.25, status: '✅ Matched' },
    ],
    matchCycles: [
      { cycle: 'T+0', matched: 1250000, total: 1380000, percentage: 90.6 },
      { cycle: 'T+1', matched: 2100000, total: 2250000, percentage: 93.3 },
      { cycle: 'T+2', matched: 850000, total: 920000, percentage: 92.4 },
    ],
    volumeByAsset: [
      { asset: 'Equities', volume: 4200000, value: 1250000000, matched: 3950000 },
      { asset: 'Bonds', volume: 1500000, value: 850000000, matched: 1420000 },
      { asset: 'ETFs', volume: 850000, value: 320000000, matched: 810000 },
    ]
  };

  const transferInstructionData = {
    pipeline: [
      { type: 'DvP', pending: 45, settled: 1250, failed: 8, cancelled: 12 },
      { type: 'RvP', pending: 32, settled: 890, failed: 5, cancelled: 7 },
      { type: 'DvF', pending: 18, settled: 650, failed: 3, cancelled: 4 },
      { type: 'RvF', pending: 25, settled: 420, failed: 2, cancelled: 6 },
    ],
    recentInstructions: [
      { id: 'TI001', type: 'DvP', instrument: 'AAPL', qty: 1000, value: 175500, status: 'Settled', time: '14:30' },
      { id: 'TI002', type: 'RvP', instrument: 'TSLA', qty: 500, value: 110000, status: 'Pending', time: '14:28' },
      { id: 'TI003', type: 'DvF', instrument: 'GOOGL', qty: 100, value: 275000, status: 'Failed', time: '14:25' },
    ]
  };

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

  const auctionData = [
    { instrument: 'AAPL', participants: 12, leadingBid: 175.30, leadingOffer: 175.35, volume: 25000 },
    { instrument: 'TSLA', participants: 8, leadingBid: 219.75, leadingOffer: 219.85, volume: 18500 },
    { instrument: 'GOOGL', participants: 15, leadingBid: 2749.50, leadingOffer: 2750.25, volume: 8200 },
    { instrument: 'MSFT', participants: 10, leadingBid: 414.80, leadingOffer: 414.95, volume: 22000 },
  ];

  const bilateralData = [
    { id: 'BT001', parties: 'Goldman Sachs ↔ Morgan Stanley', instrument: 'AAPL', quantity: 50000, price: 175.40, status: 'Negotiating' },
    { id: 'BT002', parties: 'JPMorgan ↔ Citigroup', instrument: 'TSLA', quantity: 25000, price: 219.90, status: 'Agreed' },
    { id: 'BT003', parties: 'Bank of America ↔ Wells Fargo', instrument: 'GOOGL', quantity: 10000, price: 2750.00, status: 'Pending' },
    { id: 'BT004', parties: 'Deutsche Bank ↔ Credit Suisse', instrument: 'MSFT', quantity: 35000, price: 415.00, status: 'Executing' },
  ];

  const renderTradeMatching = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trade Matching</h1>
          <p className="text-slate-600">Real-time trade processing and matching engine</p>
        </div>
      </div>

      <div className="flex h-full">
        {/* Center Content */}
        <div className="flex-1 space-y-6 pr-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Trade Feed (FIX Protocol)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tradeMatchingData.liveMessages.map((msg) => (
                    <div key={msg.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{msg.time} - {msg.type}</div>
                        <div className="text-sm text-slate-600">{msg.instrument} {msg.side} {msg.qty} @ ${msg.price}</div>
                      </div>
                      <div className="text-sm font-medium">{msg.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Cycle Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradeMatchingData.matchCycles.map((cycle) => (
                    <div key={cycle.cycle} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">{cycle.cycle}</span>
                        <span>{cycle.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${cycle.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-600">
                        {cycle.matched.toLocaleString()} / {cycle.total.toLocaleString()} matched
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Volume & Value by Asset Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Asset Class</th>
                      <th className="text-left p-3 font-semibold">Volume</th>
                      <th className="text-left p-3 font-semibold">Value ($)</th>
                      <th className="text-left p-3 font-semibold">Matched</th>
                      <th className="text-left p-3 font-semibold">Match Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeMatchingData.volumeByAsset.map((asset, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{asset.asset}</td>
                        <td className="p-3">{asset.volume.toLocaleString()}</td>
                        <td className="p-3">${asset.value.toLocaleString()}</td>
                        <td className="p-3">{asset.matched.toLocaleString()}</td>
                        <td className="p-3">{((asset.matched / asset.volume) * 100).toFixed(1)}%</td>
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
              <Button className="w-full justify-start">Configure Matching Rules</Button>
              <Button variant="outline" className="w-full justify-start">Export Match Report</Button>
              <Button variant="outline" className="w-full justify-start">View Exception Details</Button>
              <Button variant="outline" className="w-full justify-start">FIX Session Status</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransferInstruction = () => (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Transfer Instruction</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Instruction Pipeline Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transferInstructionData.pipeline.map((item) => (
                  <div key={item.type} className="p-4 border rounded-lg">
                    <div className="font-semibold text-lg mb-2">{item.type}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-yellow-600">Pending: {item.pending}</span>
                      </div>
                      <div>
                        <span className="text-green-600">Settled: {item.settled}</span>
                      </div>
                      <div>
                        <span className="text-red-600">Failed: {item.failed}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Cancelled: {item.cancelled}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transferInstructionData.recentInstructions.map((instruction) => (
                  <div key={instruction.id} className="p-3 bg-slate-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{instruction.id} - {instruction.type}</div>
                        <div className="text-sm text-slate-600">
                          {instruction.instrument} • {instruction.qty} shares • ${instruction.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          instruction.status === 'Settled' ? 'text-green-600' :
                          instruction.status === 'Pending' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {instruction.status}
                        </div>
                        <div className="text-xs text-slate-500">{instruction.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Create New Instruction</Button>
            <Button variant="outline" className="w-full justify-start">Batch Upload</Button>
            <Button variant="outline" className="w-full justify-start">Settlement Report</Button>
            <Button variant="outline" className="w-full justify-start">Exception Management</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderManagement = () => (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Order Management</h2>
        
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuctionsMonitor = () => (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Auctions Trading Monitor</h2>
        
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
                    <th className="text-left p-3 font-semibold">Spread</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionData.map((auction, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{auction.instrument}</td>
                      <td className="p-3">{auction.participants}</td>
                      <td className="p-3 text-green-600">${auction.leadingBid}</td>
                      <td className="p-3 text-red-600">${auction.leadingOffer}</td>
                      <td className="p-3">{auction.volume.toLocaleString()}</td>
                      <td className="p-3">${(auction.leadingOffer - auction.leadingBid).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Join Auction</Button>
            <Button variant="outline" className="w-full justify-start">View Auction Details</Button>
            <Button variant="outline" className="w-full justify-start">Auction History</Button>
            <Button variant="outline" className="w-full justify-start">Export Results</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilateralMonitor = () => (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Bilateral Trading Monitor</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Bilateral Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Trade ID</th>
                    <th className="text-left p-3 font-semibold">Counterparties</th>
                    <th className="text-left p-3 font-semibold">Instrument</th>
                    <th className="text-left p-3 font-semibold">Quantity</th>
                    <th className="text-left p-3 font-semibold">Price</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bilateralData.map((trade) => (
                    <tr key={trade.id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-mono text-sm">{trade.id}</td>
                      <td className="p-3 text-sm">{trade.parties}</td>
                      <td className="p-3 font-medium">{trade.instrument}</td>
                      <td className="p-3">{trade.quantity.toLocaleString()}</td>
                      <td className="p-3">${trade.price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trade.status === 'Agreed' ? 'bg-green-100 text-green-800' :
                          trade.status === 'Negotiating' ? 'bg-yellow-100 text-yellow-800' :
                          trade.status === 'Executing' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {trade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Initiate Trade</Button>
            <Button variant="outline" className="w-full justify-start">View Trade Details</Button>
            <Button variant="outline" className="w-full justify-start">Trade History</Button>
            <Button variant="outline" className="w-full justify-start">Export Report</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Trade Matching</h1>
            <p className="text-slate-600">Monitor and manage trade matching operations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Trade Feed (FIX Protocol)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tradeMatchingData.liveMessages.map((msg) => (
                    <div key={msg.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{msg.time} - {msg.type}</div>
                        <div className="text-sm text-slate-600">{msg.instrument} {msg.side} {msg.qty} @ ${msg.price}</div>
                      </div>
                      <div className="text-sm font-medium">{msg.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Match Cycle Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradeMatchingData.matchCycles.map((cycle) => (
                    <div key={cycle.cycle} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">{cycle.cycle}</span>
                        <span>{cycle.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${cycle.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-600">
                        {cycle.matched.toLocaleString()} / {cycle.total.toLocaleString()} matched
                      </div>
                    </div>
                  ))}
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
                  <Button className="w-full justify-start">Configure Matching Rules</Button>
                  <Button variant="outline" className="w-full justify-start">Export Match Report</Button>
                  <Button variant="outline" className="w-full justify-start">View Exception Details</Button>
                  <Button variant="outline" className="w-full justify-start">FIX Session Status</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Volume & Value by Asset Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Asset Class</th>
                    <th className="text-left p-3 font-semibold">Volume</th>
                    <th className="text-left p-3 font-semibold">Value ($)</th>
                    <th className="text-left p-3 font-semibold">Matched</th>
                    <th className="text-left p-3 font-semibold">Match Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeMatchingData.volumeByAsset.map((asset, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{asset.asset}</td>
                      <td className="p-3">{asset.volume.toLocaleString()}</td>
                      <td className="p-3">${asset.value.toLocaleString()}</td>
                      <td className="p-3">{asset.matched.toLocaleString()}</td>
                      <td className="p-3">{((asset.matched / asset.volume) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default TradingPage;
