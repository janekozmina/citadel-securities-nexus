import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Building, AlertCircle, Clock, Banknote, FileText, Activity, BarChart3, Shield, Settings, FileWarning, Timer } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  // RTGS View Stats
  const rtgsStats = [
    {
      title: 'Transactions in Queue',
      value: '234',
      change: 'Pending processing',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Total Transactions Settled',
      value: 'AED 2.4B / 12,450',
      change: 'Amount / Volume',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Transaction Value',
      value: 'AED 192K',
      change: 'Per transaction',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  // CSD View Stats (current stats)
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
      value: 'AED 45M',
      change: "Today's settled transactions",
      icon: Banknote,
      color: 'text-green-600'
    },
    {
      title: 'Pending Settlements',
      value: 'AED 55M',
      change: "Today's and tomorrow planned",
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      title: 'Corporate Actions',
      value: 'AED 55M',
      change: 'This week: Maturity',
      icon: Users,
      color: 'text-indigo-600',
      subtitle: 'ISIN: ABC1234'
    }
  ];

  // Consolidated View Stats
  const consolidatedStats = [
    {
      title: 'Compliance Alerts',
      value: '3',
      change: 'Active alerts',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'End-of-Day Operations',
      value: '85%',
      change: 'Completion status',
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      title: 'Incident Log & Escalation',
      value: '2',
      change: 'Open incidents',
      icon: FileWarning,
      color: 'text-yellow-600'
    }
  ];

  const renderStatsGrid = (stats: any[], columns: number = 4) => (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {stats.map((stat, index) => (
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
  );

  const renderRTGSDashboards = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Warehoused Payments</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Warehoused Payments Dashboard
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cross-Border Flow Today</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Cross-Border Flow Dashboard
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Collateral Monitoring</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Collateral Monitoring Dashboard
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
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Combined Settlement Dashboard
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Liquidity Position (Intraday)</h3>
          <p className="text-sm text-slate-600 mb-4">Cash + Eligible Securities</p>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Liquidity Position Dashboard
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Outstanding Settlements by Priority & Age</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
            Outstanding Settlements Dashboard
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
          <p className="text-slate-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      <Tabs defaultValue="rtgs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rtgs">RTGS</TabsTrigger>
          <TabsTrigger value="csd">CSD</TabsTrigger>
          <TabsTrigger value="consolidated">Consolidated</TabsTrigger>
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