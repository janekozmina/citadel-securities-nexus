import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Building, AlertCircle, Clock, Banknote, FileText, Activity, BarChart3, Shield, Settings, FileWarning, Timer, ArrowUpRight, ArrowDownRight, Minus, RefreshCw } from 'lucide-react';
import { useBusinessDaySimulation } from '@/hooks/useBusinessDaySimulation';

const HomePage = () => {
  const { user } = useAuth();
  const { rtgsMetrics, csdMetrics, lastUpdated, isBusinessHours } = useBusinessDaySimulation();

  // RTGS View Stats - Dynamic
  const rtgsStats = [
    {
      title: 'Transactions in Queue',
      value: rtgsMetrics.queuedPayments.toString(),
      change: 'Pending processing',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Total Transactions Settled',
      value: `BD ${(rtgsMetrics.totalLiquidity / 1000)}B / ${rtgsMetrics.settledTransactions.toLocaleString()}`,
      change: 'Amount / Volume',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Transaction Value',
      value: `BD ${(rtgsMetrics.averageTransactionValue / 1000000).toFixed(1)}M`,
      change: 'Per transaction',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  // CSD View Stats - Dynamic
  const csdStats = [
    {
      title: 'Total Transactions Today',
      value: '1,000,000',
      change: '',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Processing Time',
      value: '35 ms',
      change: '',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Total Securities Held',
      value: '20,500,000',
      change: 'Equities, Bonds, ETFs',
      icon: Building,
      color: 'text-purple-600'
    },
    {
      title: 'Total MBills Held',
      value: '10,000,000',
      change: 'Equities, Bonds, ETFs',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Daily Settled',
      value: `BD ${(csdMetrics.settlementValue / 1000000000).toFixed(1)}B`,
      change: "Today's settled transactions",
      icon: Banknote,
      color: 'text-green-600'
    },
    {
      title: 'Pending Settlements',
      value: `BD ${(csdMetrics.pendingInstructions * 5.5).toFixed(0)}M`,
      change: "Today's and tomorrow planned",
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      title: 'Corporate Actions',
      value: csdMetrics.corporateActions.toString(),
      change: 'This week: Maturity',
      icon: Users,
      color: 'text-indigo-600',
      subtitle: 'ISIN: ABC1234'
    }
  ];

  // Consolidated View Stats - Dynamic
  const consolidatedStats = [
    {
      title: 'Compliance Alerts',
      value: rtgsMetrics.activeAlerts.toString(),
      change: 'Active alerts',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'End-of-Day Operations',
      value: `${rtgsMetrics.utilizationRate}%`,
      change: 'Completion status',
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      title: 'Incident Log & Escalation',
      value: Math.max(0, Math.floor(csdMetrics.failedSettlements / 6)).toString(),
      change: 'Open incidents',
      icon: FileWarning,
      color: 'text-yellow-600'
    }
  ];

  const renderStatsGrid = (stats: any[], columns: number = 4) => (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white transition-all duration-300 animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-600 truncate">{stat.title}</p>
                {stat.subtitle && (
                  <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
                )}
                <p className="text-xl font-bold text-slate-900 mt-2 transition-all duration-500">{stat.value}</p>
                {stat.change && (
                  <p className="text-xs text-slate-500 mt-1 truncate">{stat.change}</p>
                )}
              </div>
              <stat.icon className={`h-7 w-7 ${stat.color} flex-shrink-0 ml-3 transition-colors duration-300`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRTGSDashboards = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Warehoused Payments</h3>
           <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 transition-all duration-500">
             <div className="flex justify-between items-center mb-4">
               <span className="text-2xl font-bold text-blue-800 transition-all duration-500">{rtgsMetrics.queuedPayments + 80}</span>
               <ArrowUpRight className="h-5 w-5 text-green-600" />
             </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">High Priority</span>
                <span className="text-sm font-medium">45</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Normal Priority</span>
                <span className="text-sm font-medium">82</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cross-Border Flow Today</h3>
           <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 transition-all duration-500">
             <div className="flex justify-between items-center mb-4">
               <span className="text-2xl font-bold text-green-800 transition-all duration-500">BD {(rtgsMetrics.totalLiquidity / 600).toFixed(1)}B</span>
               <ArrowUpRight className="h-5 w-5 text-green-600" />
             </div>
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-slate-600">Inbound</span>
                 <span className="text-sm font-medium text-green-700 transition-all duration-500">BD {(rtgsMetrics.cashLiquidity / 487).toFixed(0)}M</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-slate-600">Outbound</span>
                 <span className="text-sm font-medium text-red-700 transition-all duration-500">BD {(rtgsMetrics.pledgedCollateral / 833).toFixed(0)}M</span>
               </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-slate-500 mb-2">Volume Distribution</div>
                <div className="flex space-x-1">
                  <div className="flex-1 bg-green-500 h-2 rounded"></div>
                  <div className="flex-1 bg-green-400 h-2 rounded"></div>
                  <div className="flex-1 bg-green-300 h-2 rounded"></div>
                  <div className="flex-1 bg-red-300 h-2 rounded"></div>
                  <div className="flex-1 bg-red-400 h-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Collateral Monitoring</h3>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 h-full">
               <div className="text-center">
                 <div className="text-2xl font-bold text-purple-800 mb-2 transition-all duration-500">{(rtgsMetrics.utilizationRate + 30).toFixed(1)}%</div>
                 <div className="text-sm text-slate-600 mb-2">Collateral Ratio</div>
                <div className="w-16 h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
              </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-purple-800 mb-2 transition-all duration-500">BD {(rtgsMetrics.pledgedCollateral / 190).toFixed(1)}B</div>
                 <div className="text-sm text-slate-600 mb-2">Total Value</div>
                <div className="space-y-1">
                  <div className="w-full bg-purple-200 rounded h-1">
                    <div className="bg-purple-600 h-1 rounded" style={{width: '70%'}}></div>
                  </div>
                  <div className="w-full bg-purple-200 rounded h-1">
                    <div className="bg-purple-400 h-1 rounded" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800 mb-2">12</div>
                <div className="text-sm text-slate-600 mb-2">Active Positions</div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-8 bg-purple-600 rounded"></div>
                  <div className="w-2 h-6 bg-purple-500 rounded"></div>
                  <div className="w-2 h-10 bg-purple-400 rounded"></div>
                  <div className="w-2 h-4 bg-purple-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCSDDashboards = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent className="p-0">
          <iframe
            width="100%"
            height="400"
            seamless
            frameBorder="0"
            scrolling="no"
            src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/y3Q46MP9OLo/?standalone=1&height=400"
            className="w-full border-0 rounded-lg"
            title="Superset Dashboard 1"
          />
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-0">
          <iframe
            width="100%"
            height="400"
            seamless
            frameBorder="0"
            scrolling="no"
            src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/MknwLxJnw7z/?standalone=1&height=400"
            className="w-full border-0 rounded-lg"
            title="Superset Dashboard 2"
          />
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-0">
          <iframe
            width="100%"
            height="400"
            seamless
            frameBorder="0"
            scrolling="no"
            src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/onR4pVbAZVl/?standalone=1&height=400"
            className="w-full border-0 rounded-lg"
            title="Superset Dashboard 3"
          />
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-0">
          <iframe
            width="100%"
            height="400"
            seamless
            frameBorder="0"
            scrolling="no"
            src="http://superset.k8s1.moscow.cma.ru/superset/explore/p/0z24Mxv9ONX/?standalone=1&height=400"
            className="w-full border-0 rounded-lg"
            title="Superset Dashboard 4"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderConsolidatedDashboards = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Combined Settlement Volume & Value</h3>
          <p className="text-sm text-slate-600 mb-4">Today vs. Yesterday</p>
          <div className="h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div>
                <div className="text-sm text-slate-600 mb-2">Today</div>
                <div className="text-2xl font-bold text-orange-800 mb-1">AED 3.2B</div>
                <div className="text-sm text-slate-600 mb-3">18,450 transactions</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12% volume</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8% value</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-2">Yesterday</div>
                <div className="text-xl font-bold text-slate-700 mb-1">AED 2.9B</div>
                <div className="text-sm text-slate-600 mb-3">16,890 transactions</div>
                <div className="mt-4">
                  <div className="w-full bg-orange-200 rounded-full h-3 mb-2">
                    <div className="bg-orange-600 h-3 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <div className="text-xs text-slate-500">Comparison Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Liquidity Position (Intraday)</h3>
          <p className="text-sm text-slate-600 mb-4">Cash + Eligible Securities</p>
          <div className="h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-teal-800">AED 5.4B</span>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Available</div>
                  <div className="text-lg font-semibold text-teal-700">92%</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Cash</span>
                    <span className="font-medium">AED 2.1B</span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Eligible Securities</span>
                    <span className="font-medium">AED 3.3B</span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Utilization Rate</span>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-teal-200 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-teal-800">8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Outstanding Settlements by Priority & Age</h3>
          <div className="h-64 bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4 h-full">
              <div className="text-center">
                <div className="text-lg font-bold text-red-800 mb-2">High Priority</div>
                <div className="text-3xl font-bold text-red-700 mb-2">23</div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600">0-2 hours: 15</div>
                  <div className="text-xs text-slate-600">2-6 hours: 6</div>
                  <div className="text-xs text-slate-600">6+ hours: 2</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-800 mb-2">Medium Priority</div>
                <div className="text-3xl font-bold text-yellow-700 mb-2">47</div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600">0-4 hours: 28</div>
                  <div className="text-xs text-slate-600">4-12 hours: 15</div>
                  <div className="text-xs text-slate-600">12+ hours: 4</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-800 mb-2">Low Priority</div>
                <div className="text-3xl font-bold text-blue-700 mb-2">156</div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600">0-24 hours: 98</div>
                  <div className="text-xs text-slate-600">1-3 days: 45</div>
                  <div className="text-xs text-slate-600">3+ days: 13</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800 mb-2">Total Value</div>
                <div className="text-2xl font-bold text-slate-700 mb-2">AED 890M</div>
                <div className="mt-4">
                  <div className="flex justify-center space-x-1">
                    <div className="w-3 h-12 bg-red-500 rounded"></div>
                    <div className="w-3 h-8 bg-yellow-500 rounded"></div>
                    <div className="w-3 h-16 bg-blue-500 rounded"></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">Distribution</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Split CSD stats into two rows for original layout
  const firstRowCSDStats = csdStats.slice(0, 4);
  const secondRowCSDStats = csdStats.slice(4);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Home Page</h1>
          <div className="flex items-center gap-2 text-slate-600">
            <span>Welcome back, {user?.name}</span>
            <div className="flex items-center gap-1 text-xs">
              <RefreshCw className={`h-3 w-3 ${isBusinessHours ? 'animate-spin' : ''}`} />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="consolidated" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="rtgs" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6 py-2 text-sm font-medium transition-all"
          >
            RTGS
          </TabsTrigger>
          <TabsTrigger 
            value="csd" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6 py-2 text-sm font-medium transition-all"
          >
            CSD
          </TabsTrigger>
          <TabsTrigger 
            value="consolidated" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6 py-2 text-sm font-medium transition-all"
          >
            Consolidated
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rtgs" className="space-y-6">
          {/* RTGS Stats */}
          {renderStatsGrid(rtgsStats, 3)}
          
          {/* RTGS Dashboards */}
          {renderRTGSDashboards()}
        </TabsContent>

        <TabsContent value="csd" className="space-y-6">
          {/* CSD Stats Grid - First Row */}
          <div className="grid grid-cols-4 gap-4">
            {firstRowCSDStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-600 truncate">{stat.title}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
                      )}
                      <p className="text-xl font-bold text-slate-900 mt-2">{stat.value}</p>
                      {stat.change && (
                        <p className="text-xs text-slate-500 mt-1 truncate">{stat.change}</p>
                      )}
                    </div>
                    <stat.icon className={`h-7 w-7 ${stat.color} flex-shrink-0 ml-3`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CSD Stats Grid - Second Row */}
          <div className="grid grid-cols-3 gap-4">
            {secondRowCSDStats.map((stat, index) => (
              <Card key={index + 4} className="bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-600 truncate">{stat.title}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
                      )}
                      <p className="text-xl font-bold text-slate-900 mt-2">{stat.value}</p>
                      {stat.change && (
                        <p className="text-xs text-slate-500 mt-1 truncate">{stat.change}</p>
                      )}
                    </div>
                    <stat.icon className={`h-7 w-7 ${stat.color} flex-shrink-0 ml-3`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CSD Dashboards */}
          {renderCSDDashboards()}
        </TabsContent>

        <TabsContent value="consolidated" className="space-y-6">
          {/* Consolidated Stats */}
          {renderStatsGrid(consolidatedStats, 3)}
          
          {/* Consolidated Dashboards */}
          {renderConsolidatedDashboards()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;