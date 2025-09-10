import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, RefreshCw, Download, Globe } from 'lucide-react';

const ExchangeRatesPage = () => {
  const mockExchangeRates = [
    {
      currency: 'SAR',
      fullName: 'Saudi Riyal',
      rate: 10.0050,
      change: 0.0025,
      changePercent: 0.025,
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      currency: 'AED',
      fullName: 'UAE Dirham',
      rate: 9.8200,
      change: -0.0120,
      changePercent: -0.122,
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      currency: 'KWD',
      fullName: 'Kuwaiti Dinar',
      rate: 0.8125,
      change: 0.0005,
      changePercent: 0.062,
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      currency: 'QAR',
      fullName: 'Qatari Riyal',
      rate: 9.6750,
      change: -0.0080,
      changePercent: -0.083,
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      currency: 'OMR',
      fullName: 'Omani Rial',
      rate: 1.0205,
      change: 0.0015,
      changePercent: 0.147,
      lastUpdated: '2024-01-15 14:30:00'
    }
  ];

  const formatChange = (change: number, percent: number) => {
    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
    
    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        <Icon className="w-4 h-4" />
        <span>{Math.abs(change).toFixed(4)} ({Math.abs(percent).toFixed(3)}%)</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exchange Rates</h1>
        <p className="text-muted-foreground">GCC currency exchange rates for multi-currency transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Base Currency</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD</div>
            <p className="text-xs text-muted-foreground">Bahraini Dinar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14:30</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strongest Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR</div>
            <p className="text-xs text-muted-foreground">10.0050</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Volatile</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">OMR</div>
            <p className="text-xs text-muted-foreground">±0.147%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            GCC Exchange Rates
          </CardTitle>
          <CardDescription>Real-time exchange rates for GCC currencies (1 BHD =)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Rates
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Rates
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Exchange Rate</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExchangeRates.map((rate) => (
                <TableRow key={rate.currency}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-sm">
                      {rate.currency}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{rate.fullName}</TableCell>
                  <TableCell>
                    <div className="font-mono text-lg">{rate.rate.toFixed(4)}</div>
                  </TableCell>
                  <TableCell>
                    {formatChange(rate.change, rate.changePercent)}
                  </TableCell>
                  <TableCell>{rate.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge variant="default">Live</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Calculation Examples</CardTitle>
          <CardDescription>Sample conversions from 1 BHD to other GCC currencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExchangeRates.map((rate) => (
              <div key={rate.currency} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">1 BHD</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium">{rate.rate.toFixed(4)} {rate.currency}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {rate.fullName}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeRatesPage;