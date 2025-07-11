import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, DollarSign, Percent, Clock, Shield } from 'lucide-react';

const LiquidityHubPage = () => {
  const liquidityData = {
    triPartyRepo: [
      { counterparty: 'Central Bank A', amount: 25000000000, rate: 2.45, maturity: '2024-01-30', collateral: 'Government Bonds' },
      { counterparty: 'Bank B', amount: 15000000000, rate: 2.65, maturity: '2024-02-15', collateral: 'Corporate Bonds' },
      { counterparty: 'Investment Corp C', amount: 8500000000, rate: 2.55, maturity: '2024-01-25', collateral: 'Treasury Bills' },
      { counterparty: 'Financial Inst D', amount: 12000000000, rate: 2.70, maturity: '2024-02-08', collateral: 'Government Securities' }
    ],
    centralBankOps: [
      { operation: 'Standing Facility', amount: 5000000000, rate: 3.25, status: 'Active', type: 'Overnight' },
      { operation: 'Term Auction', amount: 12000000000, rate: 2.95, status: 'Pending', type: '7-Day' },
      { operation: 'Emergency Liquidity', amount: 2500000000, rate: 4.50, status: 'Standby', type: 'Overnight' },
      { operation: 'Refinancing Operation', amount: 8500000000, rate: 3.15, status: 'Active', type: '14-Day' }
    ],
    islamicRepo: [
      { instrument: 'Sukuk Government', amount: 18000000000, profit: 2.85, maturity: '2024-02-20', structure: 'Murabaha' },
      { instrument: 'Islamic Corporate', amount: 9500000000, profit: 3.15, maturity: '2024-01-28', structure: 'Ijara' },
      { instrument: 'Shariah Treasury', amount: 6800000000, profit: 2.95, maturity: '2024-02-12', structure: 'Wakala' },
      { instrument: 'Islamic Development', amount: 4200000000, profit: 3.25, maturity: '2024-01-22', structure: 'Mudaraba' }
    ],
    collateralAI: [
      { recommendation: 'Optimize Bond Portfolio', potential_saving: 2400000, confidence: 94, action: 'Reallocate 15% to higher-rated securities' },
      { recommendation: 'Diversify Collateral Mix', potential_saving: 1800000, confidence: 87, action: 'Add equity positions to reduce concentration risk' },
      { recommendation: 'Reduce Haircut Exposure', potential_saving: 3200000, confidence: 91, action: 'Substitute lower-rated assets with AAA securities' },
      { recommendation: 'Optimize Maturity Profile', potential_saving: 1600000, confidence: 89, action: 'Balance short and long-term instruments' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Standby': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Liquidity Hub</h1>
            <p className="text-slate-600">Advanced liquidity management and optimization services</p>
          </div>
        </div>

        <div className="flex h-full">
          {/* Center Content */}
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Liquidity</p>
                      <p className="text-2xl font-bold">$68.5B</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Average Rate</p>
                      <p className="text-2xl font-bold">2.85%</p>
                    </div>
                    <Percent className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">AI Savings</p>
                      <p className="text-2xl font-bold text-green-600">$9.0M</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Risk Score</p>
                      <p className="text-2xl font-bold text-blue-600">A+</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tri-Party REPO Services */}
            <Card>
              <CardHeader>
                <CardTitle>Tri-Party REPO Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Counterparty</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Collateral Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liquidityData.triPartyRepo.map((repo, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{repo.counterparty}</td>
                          <td className="p-3">${(repo.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{repo.rate}%</td>
                          <td className="p-3">{repo.maturity}</td>
                          <td className="p-3">{repo.collateral}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Central Bank Liquidity */}
            <Card>
              <CardHeader>
                <CardTitle>Central Bank Liquidity Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Operation</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liquidityData.centralBankOps.map((op, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{op.operation}</td>
                          <td className="p-3">${(op.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{op.rate}%</td>
                          <td className="p-3">{op.type}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(op.status)}>
                              {op.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Islamic REPO */}
            <Card>
              <CardHeader>
                <CardTitle>Islamic REPO Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Instrument</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Profit Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Structure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liquidityData.islamicRepo.map((repo, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{repo.instrument}</td>
                          <td className="p-3">${(repo.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{repo.profit}%</td>
                          <td className="p-3">{repo.maturity}</td>
                          <td className="p-3">{repo.structure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Collateral Optimization AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liquidityData.collateralAI.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{rec.recommendation}</h4>
                          <p className="text-sm text-slate-600 mt-1">{rec.action}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${rec.potential_saving.toLocaleString()}</div>
                          <div className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                            {rec.confidence}% confidence
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">Execute REPO Trade</Button>
                <Button variant="outline" className="w-full justify-start">Central Bank Request</Button>
                <Button variant="outline" className="w-full justify-start">Islamic Structure Setup</Button>
                <Button variant="outline" className="w-full justify-start">AI Optimization Run</Button>
                <Button variant="outline" className="w-full justify-start">Generate Report</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default LiquidityHubPage;