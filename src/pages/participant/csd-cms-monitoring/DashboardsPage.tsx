import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, MessageSquare, Banknote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DashboardsPage = () => {
  // Mock data for Transaction DEPO chart
  const transactionData = [
    { name: 'FG of Nigeria', value: 35.36, color: '#8B5CF6' }
  ];

  // Mock data for Business day timeline
  const businessDayData = [
    { period: 'Exchange period - Morning', time: '11:00', status: 'active' },
    { period: 'Exchange period - Afternoon', time: '12:00', status: 'active' },
    { period: 'Exchange period - Evening', time: '14:00', status: 'upcoming' },
    { period: 'End of day', time: '16:00', status: 'upcoming' }
  ];

  // Mock data for Message types
  const messageTypeData = [
    { name: 'pacs.008', value: 12 },
    { name: 'camt.053', value: 8 },
    { name: 'pacs.002', value: 4 },
    { name: 'camt.052', value: 3 },
    { name: 'pain.001', value: 2 }
  ];

  // Mock connected users data
  const connectedUsers = [
    { login: 'CITI1', username: 'CITI1 CITI1', loginTime: '30.12.2021 14:00:26', status: 'online' },
    { login: 'Diamond', username: 'Diamond Diamond', loginTime: '30.12.2021 12:36:17', status: 'offline' },
    { login: 'system', username: 'system system', loginTime: '30.12.2021 12:35:31', status: 'offline' },
    { login: 'ABQN1', username: 'ABQN1 ABQN1', loginTime: '30.12.2021 10:32:45', status: 'offline' },
    { login: 'FCMB1', username: 'FCMB FCMB', loginTime: '29.12.2021 19:48:30', status: 'offline' },
    { login: 'AFRZN2', username: 'AFRZN2 AFRZN2', loginTime: '29.12.2021 19:47:43', status: 'offline' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">CSD/CMS Monitoring Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring and analytics for CSD/CMS operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions DEPO */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Transactions DEPO</CardTitle>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4 border border-current"></div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">↗</div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">⌄</div>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="flex-1">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">FG of Nigeria</div>
                  <div className="space-y-1">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Government Variable Rate Bonds</div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Treasury Bonds</div>
                    <div className="bg-blue-300 text-white px-3 py-1 rounded text-sm">Zero Coupon Bonds</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Periods</div>
                  <div className="text-2xl font-bold text-purple-600">T = 0</div>
                </div>
              </div>
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={transactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#8B5CF6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <div className="text-lg font-semibold">Amount</div>
                  <div className="text-lg font-bold">35.36k</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business day */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Business day</CardTitle>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4 border border-current"></div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">↗</div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">⌄</div>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {businessDayData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium">{item.time}</div>
                    <div className={`px-3 py-1 rounded text-xs font-medium ${
                      item.status === 'active' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.period}
                    </div>
                  </div>
                  <div className="h-2 flex-1 mx-4 bg-gray-200 rounded">
                    <div 
                      className={`h-full rounded ${
                        item.status === 'active' ? 'bg-blue-500' : 'bg-red-400'
                      }`}
                      style={{ width: item.status === 'active' ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connected users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Connected users</CardTitle>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4 border border-current"></div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">↗</div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">⌄</div>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <div>Login</div>
                <div>User name</div>
                <div>Login time</div>
              </div>
              {connectedUsers.map((user, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-sm items-center py-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    {user.login}
                  </div>
                  <div>{user.username}</div>
                  <div className="flex items-center gap-1">
                    {user.loginTime}
                    <Clock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message types */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Message types</CardTitle>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4 border border-current"></div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">↗</div>
              </button>
              <button className="p-1 hover:bg-muted rounded">
                <div className="w-4 h-4">⌄</div>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardsPage;