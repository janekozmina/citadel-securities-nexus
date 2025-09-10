import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, X } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const MarginCallReleasePage = () => {
  const [repoTransaction, setRepoTransaction] = useState('CITIS0011125S005');
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [totalRequested, setTotalRequested] = useState('500,000.00');
  const [totalChosen, setTotalChosen] = useState('500,000.00');

  const collateralData = [
    {
      instrumentCode: 'FR001',
      chosenQuantity: 5,
      availableQuantity: 2065.00,
      availableCollateralValue: 206500000.00,
      marketPrice: 100,
      accruedInterest: 3.543956044,
      poolFactor: 1,
      haircut: 0,
      exchangeRate: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collateral Release</h1>
        <p className="text-muted-foreground">Manage collateral release for margin call operations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collateral Release Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Repo transaction</label>
              <Input 
                value={repoTransaction} 
                onChange={(e) => setRepoTransaction(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instrument code</label>
              <div className="flex gap-2 mt-1">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR001">FR001</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Total requested</label>
              <div className="flex gap-2 mt-1">
                <Input value={totalRequested} onChange={(e) => setTotalRequested(e.target.value)} />
                <span className="flex items-center px-3 py-2 bg-muted rounded text-sm">
                  {portalConfig.currencies.primary}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Total chosen</label>
              <div className="flex gap-2 mt-1">
                <Input value={totalChosen} onChange={(e) => setTotalChosen(e.target.value)} />
                <span className="flex items-center px-3 py-2 bg-muted rounded text-sm">
                  {portalConfig.currencies.primary}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Is enough to cover loan</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">No</Badge>
            </div>
          </div>

          {/* Collateral Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold"></th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Instrument code</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Chosen quantity*</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Available quantity</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Available collateral value</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Market price</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Accrued interest (per unit)</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Pool factor</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Haircut</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Exchange rate</th>
                </tr>
              </thead>
              <tbody>
                {collateralData.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="border border-gray-200 px-4 py-2">
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4 text-blue-600" />
                      </Button>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.instrumentCode}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <Input 
                        type="number" 
                        value={item.chosenQuantity} 
                        className="w-20 text-sm"
                      />
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.availableQuantity.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{formatCurrency(item.availableCollateralValue)}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.marketPrice}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.accruedInterest}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.poolFactor}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.haircut}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{item.exchangeRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <Button>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarginCallReleasePage;