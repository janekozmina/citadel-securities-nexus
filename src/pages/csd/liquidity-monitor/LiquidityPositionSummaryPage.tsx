import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/common/PageHeader';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  Activity,
  Droplets,
  Shield,
  Target,
  Clock,
  BarChart3,
  RefreshCw,
  Download,
  Bell,
  Settings
} from 'lucide-react';

const LiquidityPositionSummaryPage = () => {
  const liquidityData = {
    totalLiquidity: 45750000000,
    availableLiquidity: 38200000000,
    reservedLiquidity: 7550000000,
    liquidityRatio: 83.5,
    stressTestCoverage: 127.8,
    positions: [
      {
        account: 'Primary Settlement Account',
        balance: 25400000000,
        available: 22100000000,
        reserved: 3300000000,
        utilizationRate: 87.0,
        status: 'Optimal',
        lastUpdate: '09:15:32'
      },
      {
        account: 'Repo Collateral Pool',
        balance: 12800000000,
        available: 9800000000,
        reserved: 3000000000,
        utilizationRate: 76.6,
        status: 'Good',
        lastUpdate: '09:15:28'
      },
      {
        account: 'Islamic Liquidity Fund',
        balance: 4950000000,
        available: 3700000000,
        reserved: 1250000000,
        utilizationRate: 74.7,
        status: 'Good',
        lastUpdate: '09:15:25'
      },
      {
        account: 'Emergency Reserve',
        balance: 2600000000,
        available: 2600000000,
        reserved: 0,
        utilizationRate: 0,
        status: 'Standby',
        lastUpdate: '09:15:32'
      }
    ],
    riskMetrics: [
      { metric: 'Liquidity Coverage Ratio', value: 134.2, target: 100, status: 'Good' },
      { metric: 'Net Stable Funding Ratio', value: 118.7, target: 100, status: 'Good' },
      { metric: 'Intraday Liquidity Risk', value: 23.4, target: 50, status: 'Low' },
      { metric: 'Counterparty Concentration', value: 67.8, target: 75, status: 'Watch' }
    ],
    flows: [
      { time: '09:00', inflow: 1200000000, outflow: 800000000, net: 400000000 },
      { time: '09:15', inflow: 2100000000, outflow: 1600000000, net: 500000000 },
      { time: '09:30', inflow: 1800000000, outflow: 1200000000, net: 600000000 },
      { time: '09:45', inflow: 2400000000, outflow: 1900000000, net: 500000000 },
      { time: '10:00', inflow: 1900000000, outflow: 1400000000, net: 500000000 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Watch': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Standby': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (value: number, target: number, isReverse = false) => {
    const ratio = value / target;
    if (isReverse) {
      if (ratio <= 0.5) return 'text-emerald-600';
      if (ratio <= 0.8) return 'text-amber-600';
      return 'text-red-600';
    } else {
      if (ratio >= 1.2) return 'text-emerald-600';
      if (ratio >= 1.0) return 'text-blue-600';
      if (ratio >= 0.8) return 'text-amber-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Liquidity Position Summary"
        description="Real-time comprehensive liquidity monitoring and position analysis"
      />

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Liquidity</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${(liquidityData.totalLiquidity / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+2.3% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Available Liquidity</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${(liquidityData.availableLiquidity / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="mt-2">
                  <Progress value={liquidityData.liquidityRatio} className="h-2" />
                  <p className="text-sm text-slate-600 mt-1">{liquidityData.liquidityRatio}% utilization</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Reserved Funds</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${(liquidityData.reservedLiquidity / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <Clock className="h-4 w-4 text-slate-600 mr-1" />
                  <span className="text-slate-600">Avg. 4.2 days hold</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Stress Test Coverage</p>
                    <p className="text-2xl font-bold text-slate-900">{liquidityData.stressTestCoverage}%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">Above minimum 100%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Positions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Liquidity Positions by Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-semibold text-slate-700">Account</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Balance</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Available</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Reserved</th>
                      <th className="text-center p-3 font-semibold text-slate-700">Utilization</th>
                      <th className="text-center p-3 font-semibold text-slate-700">Status</th>
                      <th className="text-center p-3 font-semibold text-slate-700">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidityData.positions.map((position, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">{position.account}</td>
                        <td className="p-3 text-right font-semibold">
                          ${(position.balance / 1000000000).toFixed(1)}B
                        </td>
                        <td className="p-3 text-right text-emerald-600 font-medium">
                          ${(position.available / 1000000000).toFixed(1)}B
                        </td>
                        <td className="p-3 text-right text-amber-600">
                          ${(position.reserved / 1000000000).toFixed(1)}B
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={position.utilizationRate} className="w-16 h-2" />
                            <span className="text-sm font-medium">{position.utilizationRate}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className={getStatusColor(position.status)}>
                            {position.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center text-sm text-slate-600">
                          {position.lastUpdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Liquidity Risk Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liquidityData.riskMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-900">{metric.metric}</span>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current: {metric.value}%</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                        <Progress 
                          value={Math.min((metric.value / metric.target) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                      <div className={`text-lg font-bold ${getRiskColor(metric.value, metric.target, metric.metric === 'Intraday Liquidity Risk')}`}>
                        {metric.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Flows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Cash Flows (Last 5 periods)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-semibold text-slate-700">Time</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Inflow</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Outflow</th>
                      <th className="text-right p-3 font-semibold text-slate-700">Net Flow</th>
                      <th className="text-center p-3 font-semibold text-slate-700">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidityData.flows.map((flow, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-medium">{flow.time}</td>
                        <td className="p-3 text-right text-emerald-600 font-medium">
                          +${(flow.inflow / 1000000000).toFixed(1)}B
                        </td>
                        <td className="p-3 text-right text-red-600 font-medium">
                          -${(flow.outflow / 1000000000).toFixed(1)}B
                        </td>
                        <td className="p-3 text-right font-bold">
                          <span className={flow.net >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                            {flow.net >= 0 ? '+' : ''}${(flow.net / 1000000000).toFixed(1)}B
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {flow.net >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2" size="sm">
                <RefreshCw className="h-4 w-4" />
                Refresh All Positions
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Download className="h-4 w-4" />
                Export Position Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Bell className="h-4 w-4" />
                Set Liquidity Alerts
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Target className="h-4 w-4" />
                Run Stress Test
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Activity className="h-4 w-4" />
                View Flow Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <BarChart3 className="h-4 w-4" />
                Generate Forecast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Liquidity Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-l-emerald-500 bg-emerald-50">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Optimal Liquidity</p>
                    <p className="text-xs text-emerald-600">All positions within target ranges</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-l-4 border-l-amber-500 bg-amber-50">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Watch: Concentration Risk</p>
                    <p className="text-xs text-amber-600">Counterparty concentration at 67.8%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Real-time Data Feed</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risk Engine</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Running</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup Systems</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Standby</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last System Check</span>
                  <span className="text-xs text-slate-600">09:14:56</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPositionSummaryPage;