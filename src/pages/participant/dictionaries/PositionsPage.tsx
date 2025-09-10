import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Search, FileText, Download, Calendar } from 'lucide-react';

interface Position {
  accountCode: string;
  currency: string;
  type: string;
  owner: string;
  ownerBIC: string;
  currentBalance: number;
}

interface Report {
  id: string;
  reference: string;
  type: string;
  reportType: string;
  modificationDate: string;
}

const PositionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);

  const positions: Position[] = [
    {
      accountCode: '100101',
      currency: 'BHD',
      type: 'RTGS Account',
      owner: 'NATIONAL BANK OF BAHRAIN',
      ownerBIC: 'NBOBBHB0',
      currentBalance: 15750000
    },
    {
      accountCode: 'CUS',
      currency: 'BHD',
      type: 'SSS Account',
      owner: 'NATIONAL BANK OF BAHRAIN',
      ownerBIC: 'NBOBBHB0',
      currentBalance: 8924500
    },
    {
      accountCode: 'IDC',
      currency: 'BHD',
      type: 'SSS Account',
      owner: 'NATIONAL BANK OF BAHRAIN',
      ownerBIC: 'NBOBBHB0',
      currentBalance: 12340000
    },
    {
      accountCode: 'NRD',
      currency: 'BHD',
      type: 'SSS Account',
      owner: 'NATIONAL BANK OF BAHRAIN',
      ownerBIC: 'NBOBBHB0',
      currentBalance: 25680000
    },
    {
      accountCode: 'TRD',
      currency: 'BHD',
      type: 'SSS Account',
      owner: 'NATIONAL BANK OF BAHRAIN',
      ownerBIC: 'NBOBBHB0',
      currentBalance: 5123450
    }
  ];

  const reports: Report[] = [
    // Mock empty reports - will show "No data available in table"
  ];

  const filteredPositions = positions.filter(position =>
    position.accountCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.ownerBIC.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePositionClick = (position: Position) => {
    setSelectedPosition(position);
    setIsPositionDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsPositionDialogOpen(false);
    setSelectedPosition(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Positions</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredPositions.length} row(s)
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account code</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Owner BIC</TableHead>
                <TableHead>Current Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPositions.map((position) => (
                <TableRow 
                  key={position.accountCode}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handlePositionClick(position)}
                >
                  <TableCell className="font-medium text-blue-600">
                    {position.accountCode}
                  </TableCell>
                  <TableCell>{position.currency}</TableCell>
                  <TableCell>{position.type}</TableCell>
                  <TableCell>{position.owner}</TableCell>
                  <TableCell>{position.ownerBIC}</TableCell>
                  <TableCell className="font-mono">
                    {position.currentBalance.toLocaleString()} {position.currency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Position Details Dialog */}
      <Dialog open={isPositionDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Position</DialogTitle>
          </DialogHeader>
          
          {selectedPosition && (
            <div className="space-y-6">
              {/* Position Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Account code</span>
                  <p className="font-medium">{selectedPosition.accountCode}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Currency</span>
                  <p className="font-medium">{selectedPosition.currency}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Get balance report
                </Button>
                <Button variant="outline" size="sm">
                  Get account statement
                </Button>
                <Button variant="outline" size="sm">
                  Get customer statement
                </Button>
                <Button variant="outline" size="sm">
                  Get interim transactions report
                </Button>
              </div>

              {/* Reports Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Reports</h3>
                    <p className="text-sm text-blue-600">with modification date 10.09.2025</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Search"
                      className="w-64"
                    />
                    <span className="text-sm text-muted-foreground">
                      {reports.length} row(s)
                    </span>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Report Type</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Modification date
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No data available in table
                        </TableCell>
                      </TableRow>
                    ) : (
                      reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>{report.reference}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.reportType}</TableCell>
                          <TableCell>{report.modificationDate}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PositionsPage;