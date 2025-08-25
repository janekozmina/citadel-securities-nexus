import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Calendar,
  Target,
  AlertCircle,
  LineChart,
  BarChart3,
  Clock,
  Zap,
  Settings,
  Download,
  Play,
  RefreshCw,
  Layers,
  Activity
} from 'lucide-react';

const LiquidityForecastingPage = () => {
  const forecastData = {
    scenarios: [
      {
        name: 'Base Case',
        probability: 65,
        liquidityLevel: 42800000000,
        riskScore: 'Low',
        confidence: 87,
        keyFactors: ['Normal market conditions', 'Standard settlement flows', 'Regular auction activity']
      },
      {
        name: 'Stress Scenario',
        probability: 25,
        liquidityLevel: 28500000000,
        riskScore: 'High',
        confidence: 72,
        keyFactors: ['Market volatility spike', 'Increased margin calls', 'Settlement delays']
      },
      {
        name: 'Optimistic Case',
        probability: 10,
        liquidityLevel: 58200000000,
        riskScore: 'Very Low',
        confidence: 91,
        keyFactors: ['Favorable market conditions', 'High inflows', 'Reduced redemptions']
      }
    ],
    weeklyForecast: [
      { period: 'Week 1', baseCase: 42.8, stressCase: 28.5, optimistic: 58.2, actual: null },
      { period: 'Week 2', baseCase: 44.2, stressCase: 29.8, optimistic: 59.7, actual: null },
      { period: 'Week 3', baseCase: 43.5, stressCase: 27.9, optimistic: 57.8, actual: null },
      { period: 'Week 4', baseCase: 45.1, stressCase: 31.2, optimistic: 61.4, actual: null }
    ],
    mlPredictions: {
      nextDayAccuracy: 94.2,
      weeklyAccuracy: 87.8,
      monthlyAccuracy: 79.5,
      lastUpdate: '2024-01-15 09:15:00',
      modelsRunning: 5,
      trainingDataPoints: 125847
    },
    cashFlowPredictions: [
      { time: '10:00', predictedIn: 2800000000, predictedOut: 1900000000, confidence: 92 },
      { time: '11:00', predictedIn: 3200000000, predictedOut: 2400000000, confidence: 89 },
      { time: '12:00', predictedIn: 4100000000, predictedOut: 3800000000, confidence: 85 },
      { time: '13:00', predictedIn: 2900000000, predictedOut: 2100000000, confidence: 88 },
      { time: '14:00', predictedIn: 3600000000, predictedOut: 2800000000, confidence: 91 }
    ],
    riskAlerts: [
      {
        severity: 'Medium',
        message: 'Predicted liquidity shortfall in Week 3 stress scenario',
        impact: '$14.6B below minimum threshold',
        probability: 25,
        recommendation: 'Consider pre-positioning additional collateral'
      },
      {
        severity: 'Low',
        message: 'Seasonal pattern detected - Q1 typically shows 8% increase',
        impact: 'Positive impact on base case forecast',
        probability: 78,
        recommendation: 'Leverage seasonal trends for optimization'
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low': return 'text-emerald-600';
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-amber-600';
      case 'High': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Liquidity Forecasting"
        description="Advanced AI-powered liquidity forecasting and scenario analysis"
      />

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Controls */}
          <div className="flex gap-4 items-center">
            <Select defaultValue="7days">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Forecast Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">Next Day</SelectItem>
                <SelectItem value="7days">Next 7 Days</SelectItem>
                <SelectItem value="30days">Next 30 Days</SelectItem>
                <SelectItem value="90days">Next Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Scenario Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scenarios</SelectItem>
                <SelectItem value="base">Base Case Only</SelectItem>
                <SelectItem value="stress">Stress Test</SelectItem>
                <SelectItem value="custom">Custom Scenario</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Run Forecast
            </Button>
          </div>

          <Tabs defaultValue="scenarios" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
              <TabsTrigger value="ml-insights">ML Insights</TabsTrigger>
              <TabsTrigger value="cash-flows">Cash Flow Predictions</TabsTrigger>
              <TabsTrigger value="risk-alerts">Risk Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="space-y-6">
              {/* Scenario Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {forecastData.scenarios.map((scenario, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{scenario.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {scenario.probability}% probability
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Predicted Liquidity</p>
                          <p className="text-2xl font-bold text-slate-900">
                            ${(scenario.liquidityLevel / 1000000000).toFixed(1)}B
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Risk Level</span>
                          <span className={`font-semibold ${getRiskColor(scenario.riskScore)}`}>
                            {scenario.riskScore}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Confidence</span>
                          <span className="font-semibold text-blue-600">{scenario.confidence}%</span>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Key Factors:</p>
                          <ul className="space-y-1">
                            {scenario.keyFactors.map((factor, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                <div className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Weekly Forecast Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    4-Week Liquidity Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left p-3 font-semibold text-slate-700">Period</th>
                          <th className="text-right p-3 font-semibold text-emerald-700">Base Case (65%)</th>
                          <th className="text-right p-3 font-semibold text-red-700">Stress Case (25%)</th>
                          <th className="text-right p-3 font-semibold text-blue-700">Optimistic (10%)</th>
                          <th className="text-center p-3 font-semibold text-slate-700">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecastData.weeklyForecast.map((week, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-3 font-medium">{week.period}</td>
                            <td className="p-3 text-right font-semibold text-emerald-600">
                              ${week.baseCase}B
                            </td>
                            <td className="p-3 text-right font-semibold text-red-600">
                              ${week.stressCase}B
                            </td>
                            <td className="p-3 text-right font-semibold text-blue-600">
                              ${week.optimistic}B
                            </td>
                            <td className="p-3 text-center">
                              {index > 0 && week.baseCase > forecastData.weeklyForecast[index-1].baseCase ? (
                                <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto" />
                              ) : index > 0 ? (
                                <TrendingDown className="h-4 w-4 text-red-600 mx-auto" />
                              ) : (
                                <div className="w-4 h-4 mx-auto"></div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ml-insights" className="space-y-6">
              {/* ML Model Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Model Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Next Day Accuracy</span>
                      <span className="font-bold text-emerald-600">{forecastData.mlPredictions.nextDayAccuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Weekly Accuracy</span>
                      <span className="font-bold text-blue-600">{forecastData.mlPredictions.weeklyAccuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Monthly Accuracy</span>
                      <span className="font-bold text-amber-600">{forecastData.mlPredictions.monthlyAccuracy}%</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Active Models</span>
                        <span className="font-semibold">{forecastData.mlPredictions.modelsRunning}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Training Data Points</span>
                        <span className="font-semibold">{forecastData.mlPredictions.trainingDataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Model Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">LSTM Neural Network</span>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Random Forest</span>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ARIMA Time Series</span>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ensemble Model</span>
                      <Badge className="bg-blue-100 text-blue-800">Training</Badge>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-slate-600">
                        Last Updated: {forecastData.mlPredictions.lastUpdate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cash-flows" className="space-y-6">
              {/* Intraday Cash Flow Predictions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Intraday Cash Flow Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left p-3 font-semibold text-slate-700">Time</th>
                          <th className="text-right p-3 font-semibold text-emerald-700">Predicted Inflow</th>
                          <th className="text-right p-3 font-semibold text-red-700">Predicted Outflow</th>
                          <th className="text-right p-3 font-semibold text-slate-700">Net Flow</th>
                          <th className="text-center p-3 font-semibold text-slate-700">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecastData.cashFlowPredictions.map((prediction, index) => {
                          const netFlow = prediction.predictedIn - prediction.predictedOut;
                          return (
                            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="p-3 font-medium">{prediction.time}</td>
                              <td className="p-3 text-right font-semibold text-emerald-600">
                                +${(prediction.predictedIn / 1000000000).toFixed(1)}B
                              </td>
                              <td className="p-3 text-right font-semibold text-red-600">
                                -${(prediction.predictedOut / 1000000000).toFixed(1)}B
                              </td>
                              <td className="p-3 text-right font-bold">
                                <span className={netFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                  {netFlow >= 0 ? '+' : ''}${(netFlow / 1000000000).toFixed(1)}B
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    prediction.confidence >= 90 ? 'bg-emerald-500' :
                                    prediction.confidence >= 80 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}></div>
                                  <span className="text-sm font-medium">{prediction.confidence}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk-alerts" className="space-y-6">
              {/* Risk Alerts */}
              <div className="space-y-4">
                {forecastData.riskAlerts.map((alert, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity} Risk
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-600">Probability</div>
                          <div className="font-bold text-slate-900">{alert.probability}%</div>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-slate-900 mb-2">{alert.message}</h4>
                      <p className="text-sm text-slate-600 mb-2">{alert.impact}</p>
                      
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Recommendation</p>
                            <p className="text-sm text-blue-700">{alert.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Forecast Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2" size="sm">
                <Play className="h-4 w-4" />
                Run New Forecast
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <RefreshCw className="h-4 w-4" />
                Update ML Models
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Download className="h-4 w-4" />
                Export Forecast Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Calendar className="h-4 w-4" />
                Schedule Auto-Forecast
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Layers className="h-4 w-4" />
                Create Custom Scenario
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <BarChart3 className="h-4 w-4" />
                Compare Historical
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Training</span>
                <span className="text-xs text-slate-600">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Training</span>
                <span className="text-xs text-slate-600">In 6 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Training Status</span>
                <Badge className="bg-emerald-100 text-emerald-800">Complete</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Brain className="h-4 w-4 mr-2" />
                Retrain Models
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-l-amber-500 bg-amber-50">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Medium Risk Alert</p>
                    <p className="text-xs text-amber-600">Stress scenario shows potential shortfall</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-l-4 border-l-blue-500 bg-blue-50">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Seasonal Pattern</p>
                    <p className="text-xs text-blue-600">Q1 increase trend detected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiquidityForecastingPage;