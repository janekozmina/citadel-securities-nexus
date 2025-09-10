import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Calendar } from 'lucide-react';
import portalConfig from '@/config/portalConfig';

const YieldCurvePage = () => {
  const [curveCode, setCurveCode] = useState('AEDAAA');
  const [date, setDate] = useState('14.07.2025');
  const [currency, setCurrency] = useState('AED');

  // Mock yield curve data
  const yieldCurveChartData = [
    { duration: 0, yield: 3 },
    { duration: 1000, yield: 8.5 },
    { duration: 2000, yield: 12 },
    { duration: 3000, yield: 14.5 },
    { duration: 4000, yield: 16 },
    { duration: 5000, yield: 17.5 },
    { duration: 6000, yield: 18.2 },
    { duration: 7000, yield: 19 }
  ];

  const yieldCurveTableData = [
    {
      definition: 'AEDAAA',
      valueDate: '2025-07-14',
      currencyCode: 'AED',
      yieldCurveModel: 'STND',
      securityType: 'CBNB',
      durationStart: 0,
      durationEnd: 7,
      yieldValue: 1
    },
    {
      definition: 'AEDAAA',
      valueDate: '2025-07-14',
      currencyCode: 'AED',
      yieldCurveModel: 'STND',
      securityType: 'CBNB',
      durationStart: 8,
      durationEnd: 14,
      yieldValue: 2.46
    },
    {
      definition: 'AEDAAA',
      valueDate: '2025-07-14',
      currencyCode: 'AED',
      yieldCurveModel: 'STND',
      securityType: 'CBNB',
      durationStart: 15,
      durationEnd: 30,
      yieldValue: 3.02
    },
    {
      definition: 'AEDAAA',
      valueDate: '2025-07-14',
      currencyCode: 'AED',
      yieldCurveModel: 'STND',
      securityType: 'CBNB',
      durationStart: 31,
      durationEnd: 60,
      yieldValue: 4.34
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Yield curve</h1>
        <p className="text-muted-foreground">View and analyze yield curve data and trends</p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Curve code</label>
              <Select value={curveCode} onValueChange={setCurveCode}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AEDAAA">AEDAAA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Input 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-40 pr-8"
                />
                <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AED">AED</SelectItem>
                  <SelectItem value={portalConfig.currencies.primary}>{portalConfig.currencies.primary}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Yield Curve Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Yield curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldCurveChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="duration" 
                  domain={[0, 7000]}
                  type="number"
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis 
                  domain={[0, 20]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Yield']}
                  labelFormatter={(label) => `Duration: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Yield Curve Data */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Yield curve data</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">20 row(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Yield curve definition</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Value date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency code</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Yield curve model</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Security type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Duration start</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Duration end</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Yield value</th>
                </tr>
              </thead>
              <tbody>
                {yieldCurveTableData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm">{item.definition}</td>
                    <td className="py-2 px-4 text-sm">{item.valueDate}</td>
                    <td className="py-2 px-4 text-sm">{item.currencyCode}</td>
                    <td className="py-2 px-4 text-sm">{item.yieldCurveModel}</td>
                    <td className="py-2 px-4 text-sm">{item.securityType}</td>
                    <td className="py-2 px-4 text-sm">{item.durationStart}</td>
                    <td className="py-2 px-4 text-sm">{item.durationEnd}</td>
                    <td className="py-2 px-4 text-sm">{item.yieldValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YieldCurvePage;