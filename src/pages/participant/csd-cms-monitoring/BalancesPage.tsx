import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

const BalancesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const balancesData = [
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'CUAENH6N23741',
      instrumentName: 'CUAENH6N23741',
      maturityDate: '12.01.2026',
      avai: 10,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: '10,000,000',
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'TESTGOVBOND01',
      instrumentName: 'TESTGOVBOND01',
      maturityDate: '11.04.2028',
      avai: 0,
      blck: 0,
      rstr: 2000,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: 10001000,
      failblk: 0,
      faiplstr: 2000,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'CUAENH6N23669',
      instrumentName: 'CUAENH6N23669',
      maturityDate: '18.07.2025',
      avai: 3,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: '3,000,000',
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'TESTGOVBOND05',
      instrumentName: 'TESTGOVBOND05',
      maturityDate: '14.07.2028',
      avai: 200000000,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: '200,000,000',
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'TESTGOVBOND06',
      instrumentName: 'TESTGOVBOND06',
      maturityDate: '14.07.2027',
      avai: 300000000,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: '300,000,000',
      failblk: 0,
      faiplstr: 0,
      faipled: 0,
      faipmndca: 0,
      facraw: 0
    },
    {
      account: 'CITIDEPO',
      participantCode: 'CITIPNMK',
      participantName: 'CITI BANK',
      instrument: 'CUAENH6N23745',
      instrumentName: 'CUAENH6N23745',
      maturityDate: '13.10.2025',
      avai: 30,
      blck: 0,
      rstr: 0,
      pled: 0,
      issu: 0,
      peda: 0,
      borr: 0,
      draw: 0,
      failav: '30,000,000',
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
              <div className="text-sm text-muted-foreground">
                {filteredData.length} row(s)
              </div>
              <button className="p-2 hover:bg-muted rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Account</TableHead>
                  <TableHead className="text-xs">Participant code</TableHead>
                  <TableHead className="text-xs">Participant name</TableHead>
                  <TableHead className="text-xs">Instrument</TableHead>
                  <TableHead className="text-xs">Instrument Name</TableHead>
                  <TableHead className="text-xs">Maturity date</TableHead>
                  <TableHead className="text-xs">AVAI</TableHead>
                  <TableHead className="text-xs">BLCK</TableHead>
                  <TableHead className="text-xs">RSTR</TableHead>
                  <TableHead className="text-xs">PLED</TableHead>
                  <TableHead className="text-xs">ISSU</TableHead>
                  <TableHead className="text-xs">PEDA</TableHead>
                  <TableHead className="text-xs">BORR</TableHead>
                  <TableHead className="text-xs">DRAW</TableHead>
                  <TableHead className="text-xs">FailAV</TableHead>
                  <TableHead className="text-xs">FailBLK</TableHead>
                  <TableHead className="text-xs">FaiPLSTR</TableHead>
                  <TableHead className="text-xs">FaiPLED</TableHead>
                  <TableHead className="text-xs">FaiPMNDCA</TableHead>
                  <TableHead className="text-xs">FaCRAW</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index} className="text-xs">
                    <TableCell className="font-mono">{row.account}</TableCell>
                    <TableCell className="font-mono">{row.participantCode}</TableCell>
                    <TableCell>{row.participantName}</TableCell>
                    <TableCell className="font-mono">{row.instrument}</TableCell>
                    <TableCell className="font-mono">{row.instrumentName}</TableCell>
                    <TableCell>{row.maturityDate}</TableCell>
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