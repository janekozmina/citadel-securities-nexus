import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Brain, TrendingUp, AlertTriangle, BarChart3, Zap, Clock, Target, Layers, Play, GitBranch, History, Eye, Code, Calendar } from 'lucide-react';

export default function LiquidityForecastingPage() {
  const [isRunningForecast, setIsRunningForecast] = useState(false);
  const [customScenarioDialogOpen, setCustomScenarioDialogOpen] = useState(false);
  const [compareHistoricalDialogOpen, setCompareHistoricalDialogOpen] = useState(false);
  const [customScenario, setCustomScenario] = useState(`# Custom Liquidity Scenario
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def custom_scenario():
    """
    Define custom scenario parameters for liquidity forecasting
    """
    # Market stress parameters
    market_volatility = 0.25  # 25% increase in volatility
    settlement_delays = 0.15  # 15% probability of delays
    
    # Liquidity shocks
    withdrawal_shock = -50000000  # 50M BHD sudden withdrawal
    margin_calls = 15000000      # 15M BHD additional margin
    
    # Calculate scenario impact
    base_liquidity = get_base_liquidity()
    stressed_liquidity = base_liquidity * (1 - market_volatility)
    
    return {
        'scenario_name': 'Custom Stress Test',
        'probability': 0.15,
        'predicted_liquidity': stressed_liquidity + withdrawal_shock + margin_calls,
        'risk_factors': [
            'Market volatility spike',
            'Large withdrawal event',
            'Increased margin requirements'
        ]
    }

# Execute scenario
scenario_result = custom_scenario()
print(f"Predicted Liquidity: {scenario_result['predicted_liquidity']:,.2f} BHD")
print(f"Risk Level: {'High' if scenario_result['predicted_liquidity'] < 30000000 else 'Medium'}")
`);
  const [selectedHistoricalPeriod, setSelectedHistoricalPeriod] = useState('');

  const handleRunForecast = () => {
    setIsRunningForecast(true);
    // Simulate forecast run
    setTimeout(() => {
      setIsRunningForecast(false);
      // Update forecast data here
    }, 3000);
  };

  const forecastData = {
    models: [
      { name: 'LSTM Neural Network', code: 'LSTM-v2.1', accuracy: 0.87, status: 'Active' },
      { name: 'Random Forest Ensemble', code: 'RF-v1.8', accuracy: 0.83, status: 'Active' },
      { name: 'ARIMA-GARCH Hybrid', code: 'AG-v3.2', accuracy: 0.79, status: 'Standby' }
    ],
    scenarios: [
      {
        name: 'Base Case',
        probability: 0.65,
        predictedLiquidity: 42.8,
        riskLevel: 'Low',
        confidence: 0.87,
        keyFactors: ['Normal market conditions', 'Standard settlement flows', 'Regular auction activity']
      },
      {
        name: 'Stress Scenario',
        probability: 0.25,
        predictedLiquidity: 28.5,
        riskLevel: 'High',
        confidence: 0.72,
        keyFactors: ['Market volatility spike', 'Increased margin calls', 'Settlement delays']
      },
      {
        name: 'Optimistic Case',
        probability: 0.10,
        predictedLiquidity: 58.2,
        riskLevel: 'Very Low',
        confidence: 0.91,
        keyFactors: ['Favorable market conditions', 'High inflows', 'Reduced redemptions']
      }
    ],
    weeklyForecast: [
      { week: 'Week 1', predicted: 42.8, actual: null, confidence: 0.87 },
      { week: 'Week 2', predicted: 44.2, actual: null, confidence: 0.84 },
      { week: 'Week 3', predicted: 41.5, actual: null, confidence: 0.81 },
      { week: 'Week 4', predicted: 43.1, actual: null, confidence: 0.79 }
    ],
    mlInsights: {
      performance: {
        accuracy: 0.87,
        precision: 0.84,
        recall: 0.89,
        f1Score: 0.86
      },
      modelStatus: 'Optimal',
      lastTraining: '2025-01-15',
      nextTraining: '2025-02-01',
      dataPoints: 15420,
      features: 42
    },
    cashFlowPredictions: [
      { time: '09:00', prediction: 'High Inflow', amount: '+45.2M', confidence: 0.92 },
      { time: '11:30', prediction: 'Moderate Outflow', amount: '-18.7M', confidence: 0.78 },
      { time: '14:00', prediction: 'Settlement Peak', amount: '-67.3M', confidence: 0.95 },
      { time: '16:30', prediction: 'Recovery Inflow', amount: '+32.1M', confidence: 0.83 }
    ],
    riskAlerts: [
      {
        id: 1,
        severity: 'Medium',
        message: 'Settlement concentration risk detected for 14:00-15:00 window',
        recommendation: 'Consider pre-positioning additional liquidity',
        probability: 0.23
      },
      {
        id: 2,
        severity: 'Low',
        message: 'Slight increase in volatility expected mid-week',
        recommendation: 'Monitor margin requirements closely',
        probability: 0.31
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      case 'Very Low': return 'text-emerald-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Liquidity Forecasting (AI/ML-powered)"
        description="Advanced ML-powered liquidity forecasting and scenario analysis for the Central Securities Depository"
      />

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Model Status and Actions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Active ML Models</CardTitle>
                  <CardDescription>Currently deployed forecasting models</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleRunForecast} disabled={isRunningForecast} className="gap-2">
                    <Play className="h-4 w-4" />
                    {isRunningForecast ? 'Running Forecast...' : 'Run New Forecast'}
                  </Button>
                  <Dialog open={customScenarioDialogOpen} onOpenChange={setCustomScenarioDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Code className="h-4 w-4" />
                        Create Custom Scenario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create Custom Scenario</DialogTitle>
                        <DialogDescription>
                          Define a custom liquidity scenario using Python code
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Scenario Code</Label>
                          <Textarea
                            value={customScenario}
                            onChange={(e) => setCustomScenario(e.target.value)}
                            placeholder="Enter Python code for custom scenario..."
                            className="min-h-[400px] font-mono text-sm"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCustomScenarioDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setCustomScenarioDialogOpen(false)}>
                          Execute Scenario
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={compareHistoricalDialogOpen} onOpenChange={setCompareHistoricalDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <History className="h-4 w-4" />
                        Compare Historical
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Compare Historical Data</DialogTitle>
                        <DialogDescription>
                          Select historical periods to compare with current forecasts
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Historical Period</Label>
                          <Select value={selectedHistoricalPeriod} onValueChange={setSelectedHistoricalPeriod}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period to compare" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="last-week">Last Week</SelectItem>
                              <SelectItem value="last-month">Last Month</SelectItem>
                              <SelectItem value="last-quarter">Last Quarter</SelectItem>
                              <SelectItem value="stress-period-2023">Stress Period (Mar 2023)</SelectItem>
                              <SelectItem value="high-volatility-2024">High Volatility (Sep 2024)</SelectItem>
                              <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedHistoricalPeriod === 'custom' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Start Date</Label>
                              <Button variant="outline" className="w-full justify-start gap-2">
                                <Calendar className="h-4 w-4" />
                                Select start date
                              </Button>
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Button variant="outline" className="w-full justify-start gap-2">
                                <Calendar className="h-4 w-4" />
                                Select end date
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCompareHistoricalDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => setCompareHistoricalDialogOpen(false)}
                          disabled={!selectedHistoricalPeriod}
                        >
                          Compare Data
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {forecastData.models.map((model, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge variant={model.status === 'Active' ? 'default' : 'secondary'}>
                        {model.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">Code: {model.code}</div>
                    <div className="text-sm text-muted-foreground">
                      Accuracy: {(model.accuracy * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="scenarios" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
              <TabsTrigger value="insights">ML Insights</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow Predictions</TabsTrigger>
              <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios">
              <div className="space-y-6">
                {/* Scenario Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {forecastData.scenarios.map((scenario, index) => (
                    <Card key={index} className="relative overflow-hidden border-l-4" 
                          style={{ borderLeftColor: scenario.riskLevel === 'High' ? '#ef4444' : scenario.riskLevel === 'Low' ? '#22c55e' : '#3b82f6' }}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-xl font-bold">{scenario.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
                            {(scenario.probability * 100).toFixed(0)}% probability
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Predicted Liquidity</div>
                        <div className="text-3xl font-bold text-primary">
                          ${scenario.predictedLiquidity}B
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
                            <div className={`font-semibold text-sm ${getRiskColor(scenario.riskLevel)}`}>
                              {scenario.riskLevel}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                            <div className="font-semibold text-sm text-blue-600">
                              {(scenario.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-3">Key Factors:</div>
                          <ul className="space-y-2">
                            {scenario.keyFactors.map((factor, factorIndex) => (
                              <li key={factorIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* 4-Week Forecast Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      4-Week Forecast
                    </CardTitle>
                    <CardDescription>Predicted liquidity levels for the next four weeks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {forecastData.weeklyForecast.map((week, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="font-medium">{week.week}</div>
                            <div className="text-sm text-muted-foreground">
                              Predicted: <span className="font-medium text-primary">${week.predicted}B</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">
                              Confidence: <span className="font-medium">{(week.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={week.confidence * 100} className="w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Model Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{(forecastData.mlInsights.performance.accuracy * 100).toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{(forecastData.mlInsights.performance.f1Score * 100).toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">F1 Score</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Precision</span>
                        <span className="text-sm font-medium">{(forecastData.mlInsights.performance.precision * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Recall</span>
                        <span className="text-sm font-medium">{(forecastData.mlInsights.performance.recall * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Model Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="default">{forecastData.mlInsights.modelStatus}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Training</span>
                      <span className="text-sm font-medium">{forecastData.mlInsights.lastTraining}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Training</span>
                      <span className="text-sm font-medium">{forecastData.mlInsights.nextTraining}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Data Points</span>
                      <span className="text-sm font-medium">{forecastData.mlInsights.dataPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Features</span>
                      <span className="text-sm font-medium">{forecastData.mlInsights.features}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cashflow">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Intraday Cash Flow Predictions
                  </CardTitle>
                  <CardDescription>Predicted cash flows throughout the trading day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecastData.cashFlowPredictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {prediction.time}
                          </div>
                          <div>
                            <div className="font-medium">{prediction.prediction}</div>
                            <div className="text-sm text-muted-foreground">
                              Confidence: {(prediction.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${prediction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {prediction.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <div className="space-y-4">
                {forecastData.riskAlerts.map((alert, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${getSeverityColor(alert.severity)}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'}>
                              {alert.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {(alert.probability * 100).toFixed(0)}% probability
                            </span>
                          </div>
                          <div className="font-medium mb-2">{alert.message}</div>
                          <div className="text-sm text-muted-foreground mb-3">
                            <strong>Recommendation:</strong> {alert.recommendation}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Take Action
                            </Button>
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

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gap-2">
                <Play className="h-4 w-4" />
                Schedule Auto-Forecast
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <GitBranch className="h-4 w-4" />
                Model Settings
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <BarChart3 className="h-4 w-4" />
                Export Results
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update:</span>
                  <span className="font-medium">Jan 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Training:</span>
                  <span className="font-medium">Feb 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model Version:</span>
                  <span className="font-medium">v2.1.3</span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Zap className="h-4 w-4" />
                Retrain Models
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800">Settlement Risk</div>
                    <div className="text-yellow-700">High volume expected at 14:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-800">Forecast Update</div>
                    <div className="text-blue-700">New predictions available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}