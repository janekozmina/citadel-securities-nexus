import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, Plus, Edit, Trash, Search } from 'lucide-react';

const CurrenciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCurrencies = [
    {
      id: 'CURR001',
      code: 'BHD',
      name: 'Bahraini Dinar',
      symbol: 'BD',
      decimals: 3,
      exchangeRate: 1.0000,
      status: 'Active',
      isBase: true
    },
    {
      id: 'CURR002',
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      decimals: 2,
      exchangeRate: 2.6596,
      status: 'Active',
      isBase: false
    },
    {
      id: 'CURR003',
      code: 'SAR',
      name: 'Saudi Riyal',
      symbol: 'SR',
      decimals: 2,
      exchangeRate: 10.0050,
      status: 'Active',
      isBase: false
    },
    {
      id: 'CURR004',
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'د.إ',
      decimals: 2,
      exchangeRate: 9.7650,
      status: 'Active',
      isBase: false
    },
    {
      id: 'CURR005',
      code: 'KWD',
      name: 'Kuwaiti Dinar',
      symbol: 'KD',
      decimals: 3,
      exchangeRate: 0.8125,
      status: 'Active',
      isBase: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Currencies Management</h1>
        <p className="text-muted-foreground">Manage supported currencies and exchange rates</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search currencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Currency
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Currency Definitions
          </CardTitle>
          <CardDescription>Configure supported currencies and their exchange rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency Code</TableHead>
                <TableHead>Currency Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Decimals</TableHead>
                <TableHead>Exchange Rate (vs BHD)</TableHead>
                <TableHead>Base Currency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCurrencies.map((currency) => (
                <TableRow key={currency.id}>
                  <TableCell className="font-mono font-bold">{currency.code}</TableCell>
                  <TableCell className="font-medium">{currency.name}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>{currency.decimals}</TableCell>
                  <TableCell className="font-mono">
                    {currency.isBase ? '1.0000 (Base)' : currency.exchangeRate.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {currency.isBase ? (
                      <Badge variant="default">Base Currency</Badge>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{currency.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={currency.isBase}>
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrenciesPage;