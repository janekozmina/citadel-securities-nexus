import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const TradeMatchingPage = () => {
  const volumeValueData = [
    { assetClass: 'Equities', volume: 4250000, value: 2.8, matchRate: 98.7, status: 'Active' },
    { assetClass: 'Bonds', volume: 1850000, value: 5.2, matchRate: 99.2, status: 'Active' },
    { assetClass: 'Commodities', volume: 950000, value: 1.1, matchRate: 97.4, status: 'Warning' },
    { assetClass: 'FX', volume: 3200000, value: 4.7, matchRate: 99.8, status: 'Active' },
    { assetClass: 'Derivatives', volume: 1400000, value: 3.9, matchRate: 98.1, status: 'Active' },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Trade Matching</h1>
            <p className="text-slate-600">Monitor and manage trade matching operations</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
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
                        <th className="text-left p-3 font-semibold">Value (USD)</th>
                        <th className="text-left p-3 font-semibold">Match Rate</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volumeValueData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{item.assetClass}</td>
                          <td className="p-3">{item.volume.toLocaleString()}</td>
                          <td className="p-3 text-green-600 font-medium">${item.value}B</td>
                          <td className="p-3 font-medium">{item.matchRate}%</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status}
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
    </TooltipProvider>
  );
};

export default TradeMatchingPage;