import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const InstrumentReferencePage = () => {
  const instrumentData = [
    { isin: "US0378331005", name: "Apple Inc.", issuer: "Apple Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "APPLE", issueDate: "1980-12-12", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US30303M1027", name: "Meta Platforms Inc.", issuer: "Meta Platforms", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "META", issueDate: "2012-05-18", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US88160R1014", name: "Tesla Inc.", issuer: "Tesla Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "TESLA", issueDate: "2010-06-29", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US02079K3059", name: "Alphabet Inc.", issuer: "Alphabet Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "GOOGL", issueDate: "2004-08-19", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US5949181045", name: "Microsoft Corp.", issuer: "Microsoft Corp.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "MSFT", issueDate: "1986-03-13", maturity: "N/A", exCoupon: "N/A" },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Instrument Reference</h1>
            <p className="text-slate-600">Manage financial instruments and their reference data</p>
          </div>
        </div>

        <div className="flex h-full">
          {/* Center Content */}
          <div className="flex-1 space-y-6 pr-6">
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">ISIN</th>
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Issuer</th>
                        <th className="text-left p-3 font-semibold">Asset Type</th>
                        <th className="text-left p-3 font-semibold">Currency</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">CFI</th>
                        <th className="text-left p-3 font-semibold">FISN</th>
                        <th className="text-left p-3 font-semibold">Issue Date</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Ex-Coupon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instrumentData.map((instrument, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-mono text-sm">{instrument.isin}</td>
                          <td className="p-3">{instrument.name}</td>
                          <td className="p-3">{instrument.issuer}</td>
                          <td className="p-3">{instrument.assetType}</td>
                          <td className="p-3">{instrument.currency}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {instrument.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-sm">{instrument.cfi}</td>
                          <td className="p-3">{instrument.fisn}</td>
                          <td className="p-3">{instrument.issueDate}</td>
                          <td className="p-3">{instrument.maturity}</td>
                          <td className="p-3">{instrument.exCoupon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">Add New Instrument</Button>
                <Button variant="outline" className="w-full justify-start">Import Instruments</Button>
                <Button variant="outline" className="w-full justify-start">Export Data</Button>
                <Button variant="outline" className="w-full justify-start">Bulk Update</Button>
                <Button variant="outline" className="w-full justify-start">Generate Report</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InstrumentReferencePage;