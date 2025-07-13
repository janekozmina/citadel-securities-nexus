import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, DollarSign, Percent, Clock, Shield } from 'lucide-react';

const CollateralManagerPage = () => {
  const operationsData = {
    centralBankRepo: [
      { operation: 'CB Repo 1', amount: 25000000000, rate: 2.45, maturity: '2024-01-30', status: 'Active' },
      { operation: 'CB Repo 2', amount: 15000000000, rate: 2.65, maturity: '2024-02-15', status: 'Active' },
      { operation: 'CB Repo 3', amount: 8500000000, rate: 2.55, maturity: '2024-01-25', status: 'Pending' },
      { operation: 'CB Repo 4', amount: 12000000000, rate: 2.70, maturity: '2024-02-08', status: 'Active' }
    ],
    interbankRepo: [
      { counterparty: 'Bank A', amount: 18000000000, rate: 2.85, maturity: '2024-02-20', status: 'Active' },
      { counterparty: 'Bank B', amount: 9500000000, rate: 3.15, maturity: '2024-01-28', status: 'Active' },
      { counterparty: 'Bank C', amount: 6800000000, rate: 2.95, maturity: '2024-02-12', status: 'Pending' },
      { counterparty: 'Bank D', amount: 4200000000, rate: 3.25, maturity: '2024-01-22', status: 'Active' }
    ],
    ilfOperations: [
      { facility: 'ILF Term 1', amount: 5000000000, rate: 3.25, term: '90 Days', status: 'Active' },
      { facility: 'ILF Term 2', amount: 12000000000, rate: 2.95, term: '180 Days', status: 'Pending' },
      { facility: 'ILF Overnight', amount: 2500000000, rate: 4.50, term: 'Overnight', status: 'Active' },
      { facility: 'ILF Short', amount: 8500000000, rate: 3.15, term: '30 Days', status: 'Active' }
    ],
    islamicOperations: [
      { instrument: 'Sukuk Repo', amount: 18000000000, profit: 2.85, structure: 'Murabaha', status: 'Active' },
      { instrument: 'Islamic ILF', amount: 9500000000, profit: 3.15, structure: 'Ijara', status: 'Active' },
      { instrument: 'Shariah Compliant', amount: 6800000000, profit: 2.95, structure: 'Wakala', status: 'Pending' },
      { instrument: 'Islamic Dev', amount: 4200000000, profit: 3.25, structure: 'Mudaraba', status: 'Active' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Standby': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Collateral Manager</h1>
            <p className="text-slate-600">Advanced collateral management and operations oversight</p>
          </div>
        </div>

        <div className="flex h-full">
          {/* Center Content */}
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Operations volume Repo with Central Bank</p>
                      <p className="text-2xl font-bold">AED 60.5B</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Operations volume Interbank Repo</p>
                      <p className="text-2xl font-bold">AED 38.5B</p>
                    </div>
                    <Percent className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Operations volume ILF</p>
                      <p className="text-2xl font-bold">AED 28.0B</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Operations volume Islamic</p>
                      <p className="text-2xl font-bold">AED 38.5B</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Central Bank Repo Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Central Bank Repo Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Operation</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsData.centralBankRepo.map((repo, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{repo.operation}</td>
                          <td className="p-3">AED {(repo.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{repo.rate}%</td>
                          <td className="p-3">{repo.maturity}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(repo.status)}>
                              {repo.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Interbank Repo Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Interbank Repo Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Counterparty</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsData.interbankRepo.map((repo, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{repo.counterparty}</td>
                          <td className="p-3">AED {(repo.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{repo.rate}%</td>
                          <td className="p-3">{repo.maturity}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(repo.status)}>
                              {repo.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* ILF Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Intraday Liquidity Facility (ILF) Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Facility</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Term</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsData.ilfOperations.map((ilf, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{ilf.facility}</td>
                          <td className="p-3">AED {(ilf.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{ilf.rate}%</td>
                          <td className="p-3">{ilf.term}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(ilf.status)}>
                              {ilf.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Islamic Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Islamic Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Instrument</th>
                        <th className="text-left p-3 font-semibold">Amount</th>
                        <th className="text-left p-3 font-semibold">Profit Rate (%)</th>
                        <th className="text-left p-3 font-semibold">Structure</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsData.islamicOperations.map((op, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{op.instrument}</td>
                          <td className="p-3">AED {(op.amount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{op.profit}%</td>
                          <td className="p-3">{op.structure}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(op.status)}>
                              {op.status}
                            </Badge>
                          </td>
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
                <Button className="w-full justify-start">Manage Collateral</Button>
                <Button variant="outline" className="w-full justify-start">Manage ILF</Button>
                <Button variant="outline" className="w-full justify-start">Manage Repo</Button>
                <Button variant="outline" className="w-full justify-start">Manage SBL</Button>
                <Button variant="outline" className="w-full justify-start">Collateral Exposure scenarios</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollateralManagerPage;