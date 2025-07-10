
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, BarChart3, Monitor } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ReportingPage = () => {
  const [showPositionReport, setShowPositionReport] = useState(false);

  // Mock position monitoring data based on the image
  const positionData = [
    {
      participantId: 'P001',
      participantName: 'ABC Bank',
      securitiesAccount: '001-CUST-01',
      isin: 'AE123456789',
      securityName: 'UAE Treasury Bond 26',
      assetType: 'Bond',
      quantity: 1000000,
      settlementStatus: 'Settled',
      marketValue: 9800000
    },
    {
      participantId: 'P001',
      participantName: 'ABC Bank',
      securitiesAccount: '001-CUST-01',
      isin: 'AE987654321',
      securityName: 'Emaar Properties',
      assetType: 'Equity',
      quantity: 500000,
      settlementStatus: 'Settled',
      marketValue: 2750000
    },
    {
      participantId: 'P002',
      participantName: 'XYZ Securities',
      securitiesAccount: '002-CUST-02',
      isin: 'AE123456789',
      securityName: 'UAE Treasury Bond 26',
      assetType: 'Bond',
      quantity: 750000,
      settlementStatus: 'Settled',
      marketValue: 7350000
    },
    {
      participantId: 'P002',
      participantName: 'XYZ Securities',
      securitiesAccount: '002-CUST-02',
      isin: 'AE112233445',
      securityName: 'ADNOC Drilling',
      assetType: 'Equity',
      quantity: 100000,
      settlementStatus: 'Pending',
      marketValue: 390000
    }
  ];

  const downloadPDF = () => {
    // Mock PDF download functionality
    const element = document.createElement('a');
    const file = new Blob(['Daily Securities Position Report - Generated on 2025-07-10'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Daily_Securities_Position_Report_2025-07-10.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reporting & Compliance</h1>
          <p className="text-slate-600">Generate and manage regulatory reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Account Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Generate detailed account statements for participants showing all transactions and positions.
            </p>
            <Button className="w-full">
              Generate Account Statement
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Reconciliation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Perform reconciliation between internal records and external confirmations.
            </p>
            <Button className="w-full">
              Generate Reconciliation Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Position Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Monitor daily securities positions across all participants and accounts.
            </p>
            <Dialog open={showPositionReport} onOpenChange={setShowPositionReport}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  View Position Monitoring
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">📊 Report Metadata</h3>
                      <div className="text-sm text-slate-600 mt-2 space-y-1">
                        <div><strong>Report Name:</strong> Daily Securities Position Report</div>
                        <div><strong>Date:</strong> 2025-07-10</div>
                        <div><strong>Generated by:</strong> Custody Hub System</div>
                        <div><strong>Report Type:</strong> Snapshot (can also be Movement-Based)</div>
                      </div>
                    </div>
                    <Button onClick={downloadPDF} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">📊 Tabular Example</h4>
                  <div className="border rounded-lg overflow-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-3 border-b font-medium">Participant ID</th>
                          <th className="text-left p-3 border-b font-medium">Participant Name</th>
                          <th className="text-left p-3 border-b font-medium">Securities Account</th>
                          <th className="text-left p-3 border-b font-medium">ISIN</th>
                          <th className="text-left p-3 border-b font-medium">Security Name</th>
                          <th className="text-left p-3 border-b font-medium">Asset Type</th>
                          <th className="text-right p-3 border-b font-medium">Quantity</th>
                          <th className="text-left p-3 border-b font-medium">Settlement Status</th>
                          <th className="text-right p-3 border-b font-medium">Market Value (AED)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positionData.map((row, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="p-3 border-b">{row.participantId}</td>
                            <td className="p-3 border-b">{row.participantName}</td>
                            <td className="p-3 border-b font-mono text-sm">{row.securitiesAccount}</td>
                            <td className="p-3 border-b font-mono text-sm">{row.isin}</td>
                            <td className="p-3 border-b">{row.securityName}</td>
                            <td className="p-3 border-b">
                              <Badge variant="outline">{row.assetType}</Badge>
                            </td>
                            <td className="p-3 border-b text-right">{row.quantity.toLocaleString()}</td>
                            <td className="p-3 border-b">
                              <Badge 
                                className={
                                  row.settlementStatus === 'Settled' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {row.settlementStatus}
                              </Badge>
                            </td>
                            <td className="p-3 border-b text-right font-medium">{row.marketValue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportingPage;
