import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Building, AlertCircle } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Transactions Today',
      value: '109k',
      change: '+5.2% from yesterday',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Processing Time',
      value: '8.56 seconds',
      change: 'average time',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Active Participants',
      value: '196',
      change: 'registered participants',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Processing Delay Share',
      value: '1.1%',
      change: 'last hour',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Home Page</h1>
          <p className="text-slate-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Trading System</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Settlement System</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Clearing System</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Risk Monitor</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Monitoring</span>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Section for New Users */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            Welcome to the CSD Portal. Here are some quick steps to get you started:
          </p>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Explore the navigation menu to access different modules</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Check system status and recent activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Access role-specific functionalities based on your permissions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
