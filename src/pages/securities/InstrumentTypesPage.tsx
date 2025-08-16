import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { PeriodControl } from '@/components/common/PeriodControl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Edit, Save, X, BarChart3, TrendingUp, Settings2 } from 'lucide-react';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { InstrumentTypeEditDialog } from '@/components/dialogs/InstrumentTypeEditDialog';

interface InstrumentType {
  code: string;
  name: string;
  catCode: string;
  catName: string;
  rateFixAlg: string;
  qmCode: string;
  qmName: string;
  dShiftIssu: number;
  genTranche: boolean;
  cbCode: string;
  cbName: string;
  pricCbCd: string;
  pricCbNm: string;
  rtCode: string;
  rtName: string;
  rateCalcAlg: string;
  brShiftDays: number;
  mrop: number;
  threshold: number;
  cLastCoup: boolean;
  rndMethod: string;
  precAmt: number;
  rateScale: number;
  pricScale: number;
  proceedShift: number;
  proceedProcType: string;
  exDays: number;
  debit: boolean;
  balType: string;
  rrmethod: string;
  pabsRmethod: string;
  aiCalcType: string;
  rwrdRate?: number;
  intAtMatu: boolean;
  lockDays: number;
  lockNoticeDays: number;
  mhp: number;
  marketDataType: string;
  genCodeMsk: string;
  pabsScale: number;
  totalCVRmethod: string;
  isSharia: boolean;
  isRpuForTcv: boolean;
}

// Sample data for dashboard with periods
const generateUsageData = (period: string) => {
  const baseData = {
    'current-month': [
      { period: 'Week 1', govBonds: 245, corpBonds: 189, equities: 134, sukuk: 87, mmkt: 45 },
      { period: 'Week 2', govBonds: 267, corpBonds: 203, equities: 142, sukuk: 93, mmkt: 52 },
      { period: 'Week 3', govBonds: 289, corpBonds: 218, equities: 156, sukuk: 98, mmkt: 48 },
      { period: 'Week 4', govBonds: 301, corpBonds: 234, equities: 167, sukuk: 104, mmkt: 55 }
    ],
    'last-3-months': [
      { period: 'Month 1', govBonds: 1245, corpBonds: 945, equities: 634, sukuk: 387, mmkt: 245 },
      { period: 'Month 2', govBonds: 1367, corpBonds: 1034, equities: 698, sukuk: 423, mmkt: 267 },
      { period: 'Month 3', govBonds: 1489, corpBonds: 1123, equities: 756, sukuk: 456, mmkt: 289 }
    ],
    'current-year': [
      { period: 'Q1', govBonds: 4245, corpBonds: 3102, equities: 2088, sukuk: 1266, mmkt: 801 },
      { period: 'Q2', govBonds: 4567, corpBonds: 3345, equities: 2234, sukuk: 1389, mmkt: 867 },
      { period: 'Q3', govBonds: 4689, corpBonds: 3456, equities: 2356, sukuk: 1456, mmkt: 923 },
      { period: 'Q4', govBonds: 4823, corpBonds: 3578, equities: 2456, sukuk: 1523, mmkt: 978 }
    ]
  };
  return baseData[period as keyof typeof baseData] || baseData['current-month'];
};

// Sample instrument types data
const initialInstrumentTypes: InstrumentType[] = [
  {
    code: 'GOVBOND',
    name: '10-Year Government Bond',
    catCode: 'FXDINC',
    catName: 'Fixed Income',
    rateFixAlg: 'CBEG',
    qmCode: 'DIRP',
    qmName: 'Direct Pricing',
    dShiftIssu: 2,
    genTranche: true,
    cbCode: 'ACT/360',
    cbName: 'Actual/360',
    pricCbCd: 'CLOSE',
    pricCbNm: 'Closing Price',
    rtCode: 'LIBOR',
    rtName: 'LIBOR Rate',
    rateCalcAlg: 'STRT',
    brShiftDays: -2,
    mrop: 5,
    threshold: 1000000000.0000,
    cLastCoup: true,
    rndMethod: '4',
    precAmt: 2,
    rateScale: 4,
    pricScale: 4,
    proceedShift: 1,
    proceedProcType: 'A',
    exDays: 2,
    debit: true,
    balType: 'CUSTODY',
    rrmethod: '4',
    pabsRmethod: '4',
    aiCalcType: 'S',
    rwrdRate: 1.2500,
    intAtMatu: true,
    lockDays: 5,
    lockNoticeDays: 10,
    mhp: 30,
    marketDataType: 'Y',
    genCodeMsk: 'ISIN-{COUNTRY}-{TYPE}',
    pabsScale: 4,
    totalCVRmethod: '4',
    isSharia: false,
    isRpuForTcv: true
  },
  {
    code: 'CORPBOND',
    name: 'Corporate Bond',
    catCode: 'FXDINC',
    catName: 'Fixed Income',
    rateFixAlg: 'CEND',
    qmCode: 'YLD',
    qmName: 'Yield',
    dShiftIssu: 1,
    genTranche: false,
    cbCode: 'ACT/365',
    cbName: 'Actual/365',
    pricCbCd: 'AVG',
    pricCbNm: 'Average Price',
    rtCode: 'SOFR',
    rtName: 'SOFR Rate',
    rateCalcAlg: 'REVS',
    brShiftDays: -1,
    mrop: 3,
    threshold: 500000000.0000,
    cLastCoup: false,
    rndMethod: '100',
    precAmt: 2,
    rateScale: 4,
    pricScale: 4,
    proceedShift: 2,
    proceedProcType: 'M',
    exDays: 3,
    debit: false,
    balType: 'CUSTODY',
    rrmethod: '4',
    pabsRmethod: '4',
    aiCalcType: 'C',
    intAtMatu: false,
    lockDays: 3,
    lockNoticeDays: 5,
    mhp: 15,
    marketDataType: 'M',
    genCodeMsk: 'CORP-{ISSUER}-{YEAR}',
    pabsScale: 4,
    totalCVRmethod: '4',
    isSharia: false,
    isRpuForTcv: false
  }
];

const InstrumentTypesPage = () => {
  const { emulatedDay } = useBusinessDayEmulation();
  const [instrumentTypes, setInstrumentTypes] = useState<InstrumentType[]>(initialInstrumentTypes);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType | null>(null);
  
  const usageData = generateUsageData(selectedPeriod);

  const chartConfig = {
    govBonds: { label: "Government Bonds", color: "hsl(220, 70%, 50%)" }, // Blue
    corpBonds: { label: "Corporate Bonds", color: "hsl(160, 60%, 45%)" }, // Teal
    equities: { label: "Equities", color: "hsl(280, 65%, 55%)" }, // Purple
    sukuk: { label: "Sukuk", color: "hsl(25, 85%, 55%)" }, // Orange
    mmkt: { label: "Money Market", color: "hsl(340, 75%, 55%)" }, // Pink/Red
  };

  const handleEdit = (code: string) => {
    const item = instrumentTypes.find(i => i.code === code);
    if (item) {
      setSelectedInstrument(item);
      setDialogOpen(true);
    }
  };

  const handleSave = (data: Partial<InstrumentType>) => {
    if (selectedInstrument) {
      setInstrumentTypes(prev => 
        prev.map(item => 
          item.code === selectedInstrument.code ? { ...item, ...data } : item
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Instrument Types"
        description="Configure instrument type parameters and view usage analytics"
      />

      {/* Dashboard Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                CSD Instrument Usage Frequency
              </CardTitle>
              <PeriodControl
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="govBonds" stackId="stack" fill="var(--color-govBonds)" name="Government Bonds" />
                  <Bar dataKey="corpBonds" stackId="stack" fill="var(--color-corpBonds)" name="Corporate Bonds" />
                  <Bar dataKey="equities" stackId="stack" fill="var(--color-equities)" name="Equities" />
                  <Bar dataKey="sukuk" stackId="stack" fill="var(--color-sukuk)" name="Sukuk" />
                  <Bar dataKey="mmkt" stackId="stack" fill="var(--color-mmkt)" name="Money Market" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Table */}
      <Card>
        <CardHeader>
          <CardTitle>Instrument Types Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Actions</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rate Fixing</TableHead>
                  <TableHead>Quotation</TableHead>
                  <TableHead>Date Shift</TableHead>
                  <TableHead>Auto Tranche</TableHead>
                  <TableHead>Day Count</TableHead>
                  <TableHead>Price Basis</TableHead>
                  <TableHead>Rate Type</TableHead>
                  <TableHead>Rate Calc</TableHead>
                  <TableHead>Bench Shift</TableHead>
                  <TableHead>Max Reopen</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Last Coupon</TableHead>
                  <TableHead>Round Method</TableHead>
                  <TableHead>Amt Precision</TableHead>
                  <TableHead>Rate Scale</TableHead>
                  <TableHead>Price Scale</TableHead>
                  <TableHead>Proceed Shift</TableHead>
                  <TableHead>Proc Type</TableHead>
                  <TableHead>Ex Days</TableHead>
                  <TableHead>Debit Flag</TableHead>
                  <TableHead>Balance Type</TableHead>
                  <TableHead>Rate Round</TableHead>
                  <TableHead>Price Round</TableHead>
                  <TableHead>AI Calc</TableHead>
                  <TableHead>Reward Rate</TableHead>
                  <TableHead>Int at Maturity</TableHead>
                  <TableHead>Lock Days</TableHead>
                  <TableHead>Notice Days</TableHead>
                  <TableHead>Min Hold Period</TableHead>
                  <TableHead>Market Data</TableHead>
                  <TableHead>Code Mask</TableHead>
                  <TableHead>Unit Scale</TableHead>
                  <TableHead>CV Rounding</TableHead>
                  <TableHead>Sharia</TableHead>
                  <TableHead>Round for CV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instrumentTypes.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(item.code)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.catCode}</TableCell>
                    <TableCell>{item.rateFixAlg}</TableCell>
                    <TableCell>{item.qmCode}</TableCell>
                    <TableCell>{item.dShiftIssu}</TableCell>
                    <TableCell>
                      <Badge variant={item.genTranche ? 'default' : 'secondary'}>
                        {item.genTranche ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.cbCode}</TableCell>
                    <TableCell>{item.pricCbCd}</TableCell>
                    <TableCell>{item.rtCode}</TableCell>
                    <TableCell>{item.rateCalcAlg}</TableCell>
                    <TableCell>{item.brShiftDays}</TableCell>
                    <TableCell>{item.mrop}</TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>
                      <Badge variant={item.cLastCoup ? 'default' : 'secondary'}>
                        {item.cLastCoup ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.rndMethod}</TableCell>
                    <TableCell>{item.precAmt}</TableCell>
                    <TableCell>{item.rateScale}</TableCell>
                    <TableCell>{item.pricScale}</TableCell>
                    <TableCell>{item.proceedShift}</TableCell>
                    <TableCell>{item.proceedProcType}</TableCell>
                    <TableCell>{item.exDays}</TableCell>
                    <TableCell>
                      <Badge variant={item.debit ? 'default' : 'secondary'}>
                        {item.debit ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.balType}</TableCell>
                    <TableCell>{item.rrmethod}</TableCell>
                    <TableCell>{item.pabsRmethod}</TableCell>
                    <TableCell>{item.aiCalcType}</TableCell>
                    <TableCell>{item.rwrdRate}</TableCell>
                    <TableCell>
                      <Badge variant={item.intAtMatu ? 'default' : 'secondary'}>
                        {item.intAtMatu ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lockDays}</TableCell>
                    <TableCell>{item.lockNoticeDays}</TableCell>
                    <TableCell>{item.mhp}</TableCell>
                    <TableCell>{item.marketDataType}</TableCell>
                    <TableCell>{item.genCodeMsk}</TableCell>
                    <TableCell>{item.pabsScale}</TableCell>
                    <TableCell>{item.totalCVRmethod}</TableCell>
                    <TableCell>
                      <Badge variant={item.isSharia ? 'default' : 'secondary'}>
                        {item.isSharia ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.isRpuForTcv ? 'default' : 'secondary'}>
                        {item.isRpuForTcv ? 'Y' : 'N'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <InstrumentTypeEditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        instrumentType={selectedInstrument}
        onSave={handleSave}
      />
    </div>
  );
};

export default InstrumentTypesPage;