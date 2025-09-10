import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, X } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const TradesSecondaryMarketPage = () => {
  const tradesData = [
    {
      reference: 'CITIAXXX09045017',
      type: 'Trade',
      status: 'Repo buyback',
      description: 'Collateral is not enough, lack of instruments',
      sellingDocType: 'DvPRepoGLTradeMX',
      buyingDocType: '',
      sellersAccount: 'SSCBCASHVI',
      deliveryAgent: 'CBAIJAEAB',
      buyersAccount: 'CITICASHVI',
      receivingAgent: 'CITIFHMX',
      instrument: 'AED',
      amount: 1984
    },
    {
      reference: 'CITIAXXX09045016',
      type: 'Trade',
      status: 'Repo buyback',
      description: 'Collateral is not enough, lack of instruments',
      sellingDocType: 'CITIDEPO',
      buyingDocType: 'CITIFHMX',
      sellersAccount: 'CITIDEPO',
      deliveryAgent: 'CITIFHMX',
      buyersAccount: 'CITIDEPO',
      receivingAgent: 'CITIFHMX',
      instrument: 'AED',
      amount: 4260
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trades</h1>
        <p className="text-muted-foreground">with value date 14.07.2025</p>
      </div>

      {/* Trades Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">56 row(s)</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            <X className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Reference</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Selling document type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Buying document type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Seller's account</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Delivery agent</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Buyer's account</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Receiving agent</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Instrument</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tradesData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm">{item.reference}</td>
                    <td className="py-2 px-4 text-sm">{item.type}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.description}</td>
                    <td className="py-2 px-4 text-sm">{item.sellingDocType}</td>
                    <td className="py-2 px-4 text-sm">{item.buyingDocType}</td>
                    <td className="py-2 px-4 text-sm">{item.sellersAccount}</td>
                    <td className="py-2 px-4 text-sm">{item.deliveryAgent}</td>
                    <td className="py-2 px-4 text-sm">{item.buyersAccount}</td>
                    <td className="py-2 px-4 text-sm">{item.receivingAgent}</td>
                    <td className="py-2 px-4 text-sm">{item.instrument}</td>
                    <td className="py-2 px-4 text-sm">{formatCurrency(item.amount)}</td>
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

export default TradesSecondaryMarketPage;