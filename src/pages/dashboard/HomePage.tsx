import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
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
      value: `BHD ${(rtgsMetrics.totalLiquidity / 1000)}B / ${rtgsMetrics.settledTransactions.toLocaleString()}`,
      change: 'Amount / Volume',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Transaction Value',
      value: `BHD ${(rtgsMetrics.averageTransactionValue / 1000000).toFixed(1)}M`,
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
      value: `BHD ${(csdMetrics.settlementValue / 1000000000).toFixed(1)}B`,
      change: "Today's settled transactions",
      icon: Banknote,
      color: 'text-green-600'
    },
    {
      title: 'Pending Settlements',
      value: `BHD ${(csdMetrics.pendingInstructions * 5.5).toFixed(0)}M`,
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

  // System Status Component
  const SystemStatus = () => (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">RTGS Systems</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">RTGS System</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Settlement Engine</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Queue Manager</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">CSD Systems</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">CSD Core</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Settlement System</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Corporate Actions</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">CMS Systems</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Collateral Management</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Risk Engine</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Valuation Service</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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


  return (
    <div className="space-y-6">
      <div className="bg-white p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.username || 'User'}
            </h1>
            <p className="text-slate-600 mt-2">
              {isBusinessHours ? 'Business day operations are active' : 'Outside business hours - simulation mode'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Last updated</div>
            <div className="text-lg font-semibold flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${isBusinessHours ? 'animate-spin' : ''}`} />
              {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* System Status Section */}
        <div className="mb-6">
          <SystemStatus />
        </div>

        {/* RTGS and CSD Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* RTGS Section */}
          <div className="space-y-6">
            {renderStatsGrid(rtgsStats, 1)}
          </div>

          {/* CSD Section */}
          <div className="space-y-6">
            {renderStatsGrid(csdStats, 1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;