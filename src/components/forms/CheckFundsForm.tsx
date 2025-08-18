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
  const [formData, setFormData] = useState({
    participant: '',
    account: '',
    amount: ''
  });

  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate check funds results - expanded dataset without filtering
    const mockResults = [
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
    
    setResults(mockResults);
    setShowResults(true);
    onSubmit(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showResults) {
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
              <Table className="w-full min-w-max">
                <TableHeader>
                  <TableRow className="bg-blue-600">
                    <TableHead className="text-white min-w-[120px]">Reference</TableHead>
                    <TableHead className="text-white min-w-[140px]">Priority / Acc.</TableHead>
                    <TableHead className="text-white min-w-[120px]">Subbalance / Currency</TableHead>
                    <TableHead className="text-white min-w-[120px]">Actual balance</TableHead>
                    <TableHead className="text-white min-w-[120px]">Movement</TableHead>
                    <TableHead className="text-white min-w-[130px]">Resulting balance</TableHead>
                    <TableHead className="text-white min-w-[150px]">Description</TableHead>
                    <TableHead className="text-white min-w-[60px]">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <TableCell className="font-mono text-sm">{result.reference}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{result.priority}</div>
                          <div className="text-gray-600 break-all">{result.account}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{result.subbalance}</div>
                          <div className="text-gray-600">{result.currency}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{result.actualBalance}</TableCell>
                      <TableCell className="font-mono text-sm">{result.movement}</TableCell>
                      <TableCell className={`font-mono text-sm ${result.resultingBalance.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {result.resultingBalance}
                      </TableCell>
                      <TableCell className="text-sm">
                        {result.description && (
                          <Badge variant="destructive" className="text-xs">
                            {result.description}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.type === 'D' ? 'destructive' : 'default'}>
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="participant">Participant</Label>
          <Select value={formData.participant} onValueChange={(value) => updateField('participant', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select participant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ahli">Ahli United Bank</SelectItem>
              <SelectItem value="abc">Arab Banking Corporation (Bank ABC)</SelectItem>
              <SelectItem value="gib">Gulf International Bank (GIB)</SelectItem>
              <SelectItem value="nbb">National Bank of Bahrain (NBB)</SelectItem>
              <SelectItem value="bbk">Bank of Bahrain and Kuwait (BBK)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="account">Account</Label>
          <Select value={formData.account} onValueChange={(value) => updateField('account', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="000308004201601003">000308004201601003</SelectItem>
              <SelectItem value="000308004201601004">000308004201601004</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => updateField('amount', e.target.value)}
            placeholder="Enter amount to check"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Check Funds
        </Button>
      </div>
    </form>
  );
}