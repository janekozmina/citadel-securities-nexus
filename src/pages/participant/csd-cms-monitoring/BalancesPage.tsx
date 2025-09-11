import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const BalancesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const participantCode = 'PTCP001'; // Unique participant code for logged-in user
  
  const balancesData = [
    {
      account: 'NBBDEPO',
      participantCode: participantCode,
      participantName: portalConfig.banks.commercial[0], // National Bank of Bahrain
      instrument: 'BHRGOVBND23741',
      instrumentName: 'BHRGOVBND23741',
      maturityDate: '12.01.2026',
      avai: 10,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: formatCurrency(10000000),
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'NBBDEPO',
      participantCode: participantCode,
      participantName: portalConfig.banks.commercial[0],
      instrument: 'BHRGOVBOND01',
      instrumentName: 'BHRGOVBOND01',
      maturityDate: '11.04.2028',
      avai: 0,
      blck: 0,
      rstr: 2000,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: formatCurrency(10001000),
      failblk: 0,
      faiplstr: 2000,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'BBKDEPO',
      participantCode: participantCode,
      participantName: portalConfig.banks.commercial[3], // Bank of Bahrain and Kuwait
      instrument: 'BHRGOVBND23669',
      instrumentName: 'BHRGOVBND23669',
      maturityDate: '18.07.2025',
      avai: 3,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: formatCurrency(3000000),
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'GIBDEPO',
      participantCode: participantCode,
      participantName: portalConfig.banks.commercial[16], // Gulf International Bank
      instrument: 'BHRGOVBOND05',
      instrumentName: 'BHRGOVBOND05',
      maturityDate: '14.07.2028',
      avai: 200000000,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: formatCurrency(200000000),
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    }
  ];

  const filteredData = balancesData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Balances</h1>
        <p className="text-muted-foreground">Account balances and position overview</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Balances Overview</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Badge variant="secondary">{filteredData.length} row(s)</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Account</TableHead>
                  <TableHead className="font-semibold">Participant code</TableHead>
                  <TableHead className="font-semibold">Participant name</TableHead>
                  <TableHead className="font-semibold">Instrument</TableHead>
                  <TableHead className="font-semibold">Instrument Name</TableHead>
                  <TableHead className="font-semibold">Maturity date</TableHead>
                  <TableHead className="font-semibold">AVAI</TableHead>
                  <TableHead className="font-semibold">BLCK</TableHead>
                  <TableHead className="font-semibold">RSTR</TableHead>
                  <TableHead className="font-semibold">PLED</TableHead>
                  <TableHead className="font-semibold">ISSU</TableHead>
                  <TableHead className="font-semibold">PEDA</TableHead>
                  <TableHead className="font-semibold">BORR</TableHead>
                  <TableHead className="font-semibrel">DRAW</TableHead>
                  <TableHead className="font-semibold">FailAV</TableHead>
                  <TableHead className="font-semibold">FailBLK</TableHead>
                  <TableHead className="font-semibold">FaiPLSTR</TableHead>
                  <TableHead className="font-semibold">FaiPLED</TableHead>
                  <TableHead className="font-semibold">FaiPMNDCA</TableHead>
                  <TableHead className="font-semibold">FaCRAW</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-mono">{row.account}</TableCell>
                    <TableCell className="font-mono">{row.participantCode}</TableCell>
                    <TableCell className="truncate max-w-32" title={row.participantName}>
                      {row.participantName}
                    </TableCell>
                    <TableCell className="font-mono">{row.instrument}</TableCell>
                    <TableCell className="font-mono">{row.instrumentName}</TableCell>
                    <TableCell className="font-mono">{row.maturityDate}</TableCell>
                    <TableCell className={`font-mono ${row.avai > 0 ? 'text-red-600 bg-red-50' : ''}`}>
                      {row.avai}
                    </TableCell>
                    <TableCell className="font-mono">{row.blck}</TableCell>
                    <TableCell className="font-mono">{row.rstr}</TableCell>
                    <TableCell className="font-mono">{row.pled}</TableCell>
                    <TableCell className="font-mono">{row.issu}</TableCell>
                    <TableCell className="font-mono">{row.peda}</TableCell>
                    <TableCell className="font-mono">{row.borr}</TableCell>
                    <TableCell className="font-mono">{row.draw}</TableCell>
                    <TableCell className="font-mono">{row.failav}</TableCell>
                    <TableCell className="font-mono">{row.failblk}</TableCell>
                    <TableCell className="font-mono">{row.faiplstr}</TableCell>
                    <TableCell className="font-mono">{row.faipled}</TableCell>
                    <TableCell className="font-mono">{row.faipmndca}</TableCell>
                    <TableCell className="font-mono">{row.facraw}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalancesPage;