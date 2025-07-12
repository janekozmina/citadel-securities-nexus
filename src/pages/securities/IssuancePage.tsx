import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const IssuancePage = () => {
  const issuanceData = {
    volumeValue: [
      { period: "Q1 2024", volume: 245, value: 12.5 },
      { period: "Q2 2024", volume: 312, value: 18.2 },
      { period: "Q3 2024", volume: 289, value: 15.8 },
      { period: "Q4 2024", volume: 356, value: 22.1 },
    ],
    issuersByType: [
      { type: "Corporate", count: 156, percentage: 65 },
      { type: "Government", count: 45, percentage: 19 },
      { type: "Municipal", count: 28, percentage: 12 },
      { type: "Supranational", count: 11, percentage: 4 },
    ],
    assetClasses: [
      { class: "Bonds", volume: 1850, percentage: 68 },
      { class: "Equities", volume: 580, percentage: 21 },
      { class: "ETFs", volume: 210, percentage: 8 },
      { class: "Others", volume: 82, percentage: 3 },
    ]
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Issuance</h1>
            <p className="text-slate-600">Track securities issuance trends and statistics</p>
          </div>
        </div>

        <div className="flex h-full">
          {/* Center Content */}
          <div className="flex-1 space-y-6 pr-6">
            {/* Dashboards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volume & Value Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {issuanceData.volumeValue.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-semibold">{item.period}</span>
                        <div className="text-right">
                          <div className="text-sm text-slate-600">{item.volume} issues</div>
                          <div className="text-lg font-bold">${item.value}B</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Issuers by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {issuanceData.issuersByType.map((issuer, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{issuer.type}</span>
                          <span className="font-semibold">{issuer.count}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${issuer.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {issuanceData.assetClasses.map((asset, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{asset.class}</span>
                          <span className="font-semibold">{asset.volume}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${asset.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">Initiate New Issuance Request</Button>
                <Button variant="outline" className="w-full justify-start">Upload Term Sheet / Prospectus</Button>
                <Button variant="outline" className="w-full justify-start">Select Issuance Type (Equity, Debt, Sukuk, etc.)</Button>
                <Button variant="outline" className="w-full justify-start">Define Corporate Action Schedule</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IssuancePage;