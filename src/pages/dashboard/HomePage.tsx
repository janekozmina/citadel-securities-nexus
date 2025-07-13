
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Building, AlertCircle, Clock, Banknote, FileText } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const stats = [
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

  // Split stats into two rows
  const firstRowStats = stats.slice(0, 4);
  const secondRowStats = stats.slice(4);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Home Page</h1>
          <p className="text-slate-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Stats Grid - First Row */}
      <div className="grid grid-cols-4 gap-4">
        {firstRowStats.map((stat, index) => (
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

      {/* Stats Grid - Second Row */}
      <div className="grid grid-cols-3 gap-4">
        {secondRowStats.map((stat, index) => (
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

      {/* Superset Dashboards Grid */}
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
    </div>
  );
};

export default HomePage;
