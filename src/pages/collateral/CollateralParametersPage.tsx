import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PeriodControl } from '@/components/common/PeriodControl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, TrendingUp, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for collateral usage dashboard
const generateCollateralUsageData = (period: string) => {
  const baseData = [
    { month: 'Jan', govBonds: 45, corpBonds: 28, sukuk: 15, centralBankBills: 35, mbs: 8 },
    { month: 'Feb', govBonds: 52, corpBonds: 31, sukuk: 18, centralBankBills: 38, mbs: 12 },
    { month: 'Mar', govBonds: 48, corpBonds: 29, sukuk: 16, centralBankBills: 32, mbs: 10 },
    { month: 'Apr', govBonds: 55, corpBonds: 34, sukuk: 20, centralBankBills: 40, mbs: 15 },
    { month: 'May', govBonds: 58, corpBonds: 36, sukuk: 22, centralBankBills: 42, mbs: 18 },
    { month: 'Jun', govBonds: 62, corpBonds: 38, sukuk: 24, centralBankBills: 45, mbs: 20 },
  ];

  // Adjust data based on period
  const multiplier = period === 'current-year' ? 1.5 : period === 'last-3-months' ? 0.8 : 1;
  return baseData.map(item => ({
    ...item,
    govBonds: Math.round(item.govBonds * multiplier),
    corpBonds: Math.round(item.corpBonds * multiplier),
    sukuk: Math.round(item.sukuk * multiplier),
    centralBankBills: Math.round(item.centralBankBills * multiplier),
    mbs: Math.round(item.mbs * multiplier),
  }));
};

// Haircut matrix data structure
const haircutMatrix = [
  {
    category: "ILF (Intraday Liquidity Facility)",
    isCategory: true,
  },
  {
    collateralType: "Government bond",
    "0-1": 0.5,
    "1-3": 1.0,
    "3-5": 1.5,
    "5-7": 2.0,
    "7-10": 3.0,
    "10+": 5.0,
  },
  {
    collateralType: "Corporate Bonds",
    "0-1": 1.0,
    "1-3": 1.5,
    "3-5": 2.5,
    "5-7": 3.5,
    "7-10": 4.5,
    "10+": 8.0,
  },
  {
    collateralType: "Central Bank Bills",
    "0-1": 0.3,
    "1-3": 0.8,
    "3-5": 1.2,
    "5-7": 1.8,
    "7-10": 2.5,
    "10+": 4.0,
  },
  {
    collateralType: "Sukuks (Islamic bonds)",
    "0-1": 1.2,
    "1-3": 1.8,
    "3-5": 2.8,
    "5-7": 3.8,
    "7-10": 5.0,
    "10+": 9.0,
  },
  {
    collateralType: "Senior tranche of MBS",
    "0-1": 20,
    "1-3": 20,
    "3-5": 20,
    "5-7": 20,
    "7-10": 20,
    "10+": 20,
  },
  {
    collateralType: "Junior tranche of MBS",
    "0-1": 40,
    "1-3": 40,
    "3-5": 40,
    "5-7": 40,
    "7-10": 40,
    "10+": 40,
  },
  {
    collateralType: "Senior tranche of ABS (performing loans)",
    "0-1": 20,
    "1-3": 20,
    "3-5": 20,
    "5-7": 20,
    "7-10": 20,
    "10+": 20,
  },
  {
    category: "Repo Operations (>1d)",
    isCategory: true,
  },
  {
    collateralType: "Government bond",
    "0-1": 0.5,
    "1-3": 1.0,
    "3-5": 1.5,
    "5-7": 2.0,
    "7-10": 3.0,
    "10+": 5.0,
  },
  {
    collateralType: "Corporate Bonds",
    "0-1": 1.0,
    "1-3": 1.5,
    "3-5": 2.5,
    "5-7": 3.5,
    "7-10": 4.5,
    "10+": 8.0,
  },
  {
    collateralType: "Central Bank Bills",
    "0-1": 0.3,
    "1-3": 0.8,
    "3-5": 1.2,
    "5-7": 1.8,
    "7-10": 2.5,
    "10+": 4.0,
  },
  {
    collateralType: "Sukuks (Islamic bonds)",
    "0-1": 1.2,
    "1-3": 1.8,
    "3-5": 2.8,
    "5-7": 3.8,
    "7-10": 5.0,
    "10+": 9.0,
  },
  {
    collateralType: "Senior tranche of MBS",
    "0-1": 20,
    "1-3": 20,
    "3-5": 20,
    "5-7": 20,
    "7-10": 20,
    "10+": 20,
  },
  {
    collateralType: "Junior tranche of MBS",
    "0-1": 40,
    "1-3": 40,
    "3-5": 40,
    "5-7": 40,
    "7-10": 40,
    "10+": 40,
  },
  {
    collateralType: "Senior tranche of ABS (performing loans)",
    "0-1": 20,
    "1-3": 20,
    "3-5": 20,
    "5-7": 20,
    "7-10": 20,
    "10+": 20,
  },
];

export default function CollateralParametersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const usageData = generateCollateralUsageData(selectedPeriod);

  const handleEdit = (collateralType: string, period: string) => {
    console.log(`Editing haircut for ${collateralType} - ${period}`);
    // TODO: Implement edit functionality
  };

  const getRiskLevel = (value: number) => {
    if (value <= 2) return { level: 'Low', color: 'bg-green-100 text-green-800' };
    if (value <= 10) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'High', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader 
        title="Collateral Parameters"
        description="Manage haircut rates and collateral parameters for different instrument types and maturity periods"
      />

      {/* Collateral Usage Dashboard */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Collateral Usage Trends
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Monthly usage patterns for different collateral types
            </p>
          </div>
          <PeriodControl value={selectedPeriod} onValueChange={setSelectedPeriod} />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="govBonds" fill="hsl(220, 70%, 50%)" name="Government Bonds" />
                <Bar dataKey="corpBonds" fill="hsl(160, 60%, 45%)" name="Corporate Bonds" />
                <Bar dataKey="sukuk" fill="hsl(280, 65%, 55%)" name="Sukuk" />
                <Line type="monotone" dataKey="centralBankBills" stroke="hsl(25, 85%, 55%)" strokeWidth={3} name="Central Bank Bills" />
                <Line type="monotone" dataKey="mbs" stroke="hsl(340, 75%, 55%)" strokeWidth={3} name="MBS" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Haircut Matrix Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Haircut Matrix Configuration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure haircut percentages for different collateral types and maturity periods
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-64">Collateral Type / Repo Operation</TableHead>
                  <TableHead className="text-center">0-1 year</TableHead>
                  <TableHead className="text-center">1-3 years</TableHead>
                  <TableHead className="text-center">3-5 years</TableHead>
                  <TableHead className="text-center">5-7 years</TableHead>
                  <TableHead className="text-center">7-10 years</TableHead>
                  <TableHead className="text-center">10+ years</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {haircutMatrix.map((row, index) => {
                  if (row.isCategory) {
                    return (
                      <TableRow key={index} className="bg-muted/50">
                        <TableCell 
                          colSpan={8} 
                          className="font-semibold text-primary py-3"
                        >
                          {row.category}
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{row.collateralType}</TableCell>
                      {(['0-1', '1-3', '3-5', '5-7', '7-10', '10+'] as const).map((period) => {
                        const value = row[period] as number;
                        const risk = getRiskLevel(value);
                        return (
                          <TableCell key={period} className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-mono">{value}%</span>
                              <Badge variant="secondary" className={risk.color}>
                                {risk.level}
                              </Badge>
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(row.collateralType!, '0-1')}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}