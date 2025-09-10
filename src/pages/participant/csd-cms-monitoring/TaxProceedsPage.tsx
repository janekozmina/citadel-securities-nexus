import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, X } from 'lucide-react';
import portalConfig from '@/config/portalConfig';

const TaxProceedsPage = () => {
  const taxProceedsData = [
    // Empty table as shown in the reference image
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tax Proceed</h1>
        <p className="text-muted-foreground">with value date 01.05.26 IS</p>
      </div>

      {/* Tax Proceeds Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="w-64" />
            <span className="text-sm text-muted-foreground">0 row(s)</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            <X className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Agent</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ChargeType</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ChargeCategory</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Income</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ChargeValue</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">SPCode</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ProcessDate</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">PayFlag</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ValueDate</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">AuctionCode</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">ReceiverAccount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">GeneratedTradeId</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">M_DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={15} className="py-8 text-center text-muted-foreground">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxProceedsPage;