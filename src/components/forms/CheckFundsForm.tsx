import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface CheckFundsFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CheckFundsForm({ onSubmit, onCancel }: CheckFundsFormProps) {
  // Show results directly without form step
  const results = [
    {
      reference: '546521216258112',
      priority: '10',
      account: '000308004201601003',
      subbalance: 'AVAI',
      currency: 'BHD',
      actualBalance: '39,773,649.000',
      movement: '100,000,000.000',
      resultingBalance: '-60,226,351.000',
      description: 'Lack of available balance',
      type: 'D'
    },
    {
      reference: '546521216258112',
      priority: '10',
      account: '000308004201601003',
      subbalance: 'AVAI',
      currency: 'BHD',
      actualBalance: '160,290,300.000',
      movement: '100,000,000.000',
      resultingBalance: '60,290,300.000',
      description: '',
      type: 'C'
    },
    {
      reference: '546521216258113',
      priority: '5',
      account: '000308004201601004',
      subbalance: 'RESV',
      currency: 'BHD',
      actualBalance: '25,500,000.000',
      movement: '50,000,000.000',
      resultingBalance: '-24,500,000.000',
      description: 'Insufficient reserve funds',
      type: 'D'
    },
    {
      reference: '546521216258114',
      priority: '15',
      account: '000308004201601005',
      subbalance: 'AVAI',
      currency: 'BHD',
      actualBalance: '75,000,000.000',
      movement: '25,000,000.000',
      resultingBalance: '50,000,000.000',
      description: '',
      type: 'C'
    },
    {
      reference: '546521216258115',
      priority: '8',
      account: '000308004201601006',
      subbalance: 'COLL',
      currency: 'BHD',
      actualBalance: '12,250,000.000',
      movement: '30,000,000.000',
      resultingBalance: '-17,750,000.000',
      description: 'Collateral insufficient',
      type: 'D'
    }
  ];

  // Show table directly without form submission
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Check Funds Result</h3>
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600">
                  <TableHead className="text-white text-xs">Reference</TableHead>
                  <TableHead className="text-white text-xs">Priority / Acc.</TableHead>
                  <TableHead className="text-white text-xs">Subbal. / Curr.</TableHead>
                  <TableHead className="text-white text-xs">Actual Balance</TableHead>
                  <TableHead className="text-white text-xs">Movement</TableHead>
                  <TableHead className="text-white text-xs">Result Balance</TableHead>
                  <TableHead className="text-white text-xs">Description</TableHead>
                  <TableHead className="text-white text-xs">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <TableCell className="font-mono text-xs px-2">{result.reference}</TableCell>
                    <TableCell className="px-2">
                      <div className="text-xs">
                        <div>{result.priority}</div>
                        <div className="text-gray-600 text-[10px]">{result.account}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="text-xs">
                        <div>{result.subbalance}</div>
                        <div className="text-gray-600">{result.currency}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs px-2">{result.actualBalance}</TableCell>
                    <TableCell className="font-mono text-xs px-2">{result.movement}</TableCell>
                    <TableCell className={`font-mono text-xs px-2 ${result.resultingBalance.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {result.resultingBalance}
                    </TableCell>
                    <TableCell className="text-xs px-2">
                      {result.description && (
                        <Badge variant="destructive" className="text-[10px] px-1 py-0">
                          {result.description}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-2">
                      <Badge variant={result.type === 'D' ? 'destructive' : 'default'} className="text-xs">
                        {result.type}
                      </Badge>
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
}