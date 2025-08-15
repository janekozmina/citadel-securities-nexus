import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowUpDown, TrendingUp, DollarSign, AlertCircle, Wallet, Activity, BarChart3, Shield } from 'lucide-react';
import { LiquidityWidget } from '@/components/common/LiquidityWidget';
import { DataTable } from '@/components/common/DataTable';

const balancesData = [
  { id: '0003800040124240088', participant: 'BANQUE DE TUNISIE ET DES EMIRATS', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 4439.726, currency: 'TND', debitTurnover: 100.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 4439.726 },
  { id: '0003800040124300078', participant: 'BANQUE NATIONALE AGRICOLE', accountCode: 'SA', accountType: 'BANQTFTT25', reservedAmount: 4434.569, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 4434.569 },
  { id: '0003800040120300031', participant: 'NORTH AFRICA INTERNATIONAL BANK', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 1569.996, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 1569.996 },
  { id: '0003800040120300064', participant: 'Union Internationale de Banques', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 1200.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 1000.000, totalDebitQueue: 0.000, totalCreditQueue: 1200.000, balance: 1200.000 },
  { id: '0003800040120700025', participant: 'CITE BANK S.A', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 258.370, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 258.370 },
  { id: '0003800040120700083', participant: 'QNBANK BANK', accountCode: 'SA', accountType: 'BCTNTTNT25', reservedAmount: 134.750, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 134.750 },
  { id: '0003800040120300070', participant: 'BANQUE DE TUNISIE', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 80.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 80.000 },
  { id: '0003800040120300049', participant: 'BANQUE DE TUNISIE', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 75.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 75.000 },
  { id: '0003800040120300076', participant: 'BANQUE NATIONALE AGRICOLE', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 30.600, currency: 'TND', debitTurnover: 630.000, creditTurnover: 700.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 30.600 },
  { id: '0003800040124120001', participant: 'Union Internationale de Banques', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 22.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 22.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 22.000 },
];

const reservesData = [
  { accountId: 'RSV001', institution: 'Central Bank of Bahrain', reserveType: 'Mandatory Reserve', amount: 150000000, rate: 2.5, currency: 'BHD', lastUpdated: '2024-01-15T10:30:00Z', status: 'Active' },
  { accountId: 'RSV002', institution: 'Ahli United Bank', reserveType: 'Excess Reserve', amount: 45000000, rate: 1.8, currency: 'BHD', lastUpdated: '2024-01-15T09:45:00Z', status: 'Active' },
  { accountId: 'RSV003', institution: 'National Bank of Bahrain', reserveType: 'Mandatory Reserve', amount: 85000000, rate: 2.5, currency: 'BHD', lastUpdated: '2024-01-15T08:20:00Z', status: 'Active' },
  { accountId: 'RSV004', institution: 'BBK Bank', reserveType: 'Liquidity Buffer', amount: 32000000, rate: 1.5, currency: 'BHD', lastUpdated: '2024-01-15T11:15:00Z', status: 'Under Review' },
  { accountId: 'RSV005', institution: 'Gulf International Bank', reserveType: 'Excess Reserve', amount: 28000000, rate: 1.8, currency: 'BHD', lastUpdated: '2024-01-15T10:00:00Z', status: 'Active' },
];

const collateralData = [
  { accountId: 'COL001', institution: 'Ahli United Bank', collateralType: 'Government Bonds', value: 75000000, haircut: 5, eligibility: 'AAA', currency: 'BHD', maturityDate: '2026-12-31', status: 'Pledged' },
  { accountId: 'COL002', institution: 'National Bank of Bahrain', collateralType: 'Corporate Bonds', value: 45000000, haircut: 15, eligibility: 'AA', currency: 'BHD', maturityDate: '2025-06-30', status: 'Available' },
  { accountId: 'COL003', institution: 'BBK Bank', collateralType: 'Treasury Bills', value: 25000000, haircut: 2, eligibility: 'AAA', currency: 'BHD', maturityDate: '2024-03-15', status: 'Pledged' },
  { accountId: 'COL004', institution: 'Gulf International Bank', collateralType: 'Equity Securities', value: 18000000, haircut: 25, eligibility: 'A', currency: 'BHD', maturityDate: 'N/A', status: 'Under Evaluation' },
  { accountId: 'COL005', institution: 'Al Salam Bank', collateralType: 'Government Bonds', value: 38000000, haircut: 5, eligibility: 'AAA', currency: 'BHD', maturityDate: '2027-08-15', status: 'Available' },
];

export default function BalancesLiquidityPage() {

  const totalReserved = balancesData.reduce((sum, balance) => sum + balance.reservedAmount, 0);
  const totalBalance = balancesData.reduce((sum, balance) => sum + balance.balance, 0);

  // Data for liquidity widgets
  const accountBalanceData = {
    realTime: [
      { label: 'Total Balance', value: 'BHD 12.85M', change: { value: 2.3, isPositive: true } },
      { label: 'Available Balance', value: 'BHD 11.92M', change: { value: 1.8, isPositive: true } },
      { label: 'Reserved Amount', value: 'BHD 930K', change: { value: 0.5, isPositive: false } },
    ],
    endOfDay: [
      { label: 'Total Balance', value: 'BHD 12.56M' },
      { label: 'Available Balance', value: 'BHD 11.70M' },
      { label: 'Reserved Amount', value: 'BHD 925K' },
    ]
  };

  const liquidityPositionData = {
    realTime: [
      { label: 'Net Liquidity', value: 'BHD 8.45M', change: { value: 3.2, isPositive: true } },
      { label: 'Intraday Peak', value: 'BHD 9.12M', change: { value: 5.1, isPositive: true } },
      { label: 'Overdraft Usage', value: 'BHD 0', change: { value: 0, isPositive: true } },
      { label: 'Active Consumption', value: '68%' },
    ],
    endOfDay: [
      { label: 'Net Liquidity', value: 'BHD 8.18M' },
      { label: 'Intraday Peak', value: 'BHD 8.67M' },
      { label: 'Overdraft Usage', value: 'BHD 0' },
      { label: 'Active Consumption', value: '65%' },
    ]
  };

  const liquidityForecastData = {
    realTime: [
      { label: 'Next Day Forecast', value: 'BHD 8.92M', change: { value: 5.6, isPositive: true } },
      { label: 'Weekly Avg Projection', value: 'BHD 8.75M', change: { value: 3.5, isPositive: true } },
      { label: 'Risk Level', value: 'Low', change: { value: 2.1, isPositive: false } },
    ],
    endOfDay: [
      { label: 'Next Day Forecast', value: 'BHD 8.45M' },
      { label: 'Weekly Avg Projection', value: 'BHD 8.42M' },
      { label: 'Risk Level', value: 'Low' },
    ]
  };

  const reserveColumns = [
    { key: 'accountId', label: 'Account ID', type: 'text' as const },
    { key: 'institution', label: 'Institution', type: 'text' as const },
    { key: 'reserveType', label: 'Reserve Type', type: 'text' as const },
    { key: 'amount', label: 'Amount', type: 'currency' as const },
    { key: 'rate', label: 'Rate (%)', type: 'number' as const },
    { key: 'currency', label: 'Currency', type: 'text' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
  ];

  const collateralColumns = [
    { key: 'accountId', label: 'Account ID', type: 'text' as const },
    { key: 'institution', label: 'Institution', type: 'text' as const },
    { key: 'collateralType', label: 'Collateral Type', type: 'text' as const },
    { key: 'value', label: 'Value', type: 'currency' as const },
    { key: 'haircut', label: 'Haircut (%)', type: 'number' as const },
    { key: 'eligibility', label: 'Eligibility', type: 'text' as const },
    { key: 'currency', label: 'Currency', type: 'text' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Balances & Liquidity</h1>
            <p className="text-slate-600">Real-time participant balances and reserved amounts monitoring</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Liquidity Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LiquidityWidget
                title="Account Balances"
                icon={Wallet}
                realTimeData={accountBalanceData.realTime}
                endOfDayData={accountBalanceData.endOfDay}
              />
              <LiquidityWidget
                title="Liquidity Position"
                icon={Activity}
                realTimeData={liquidityPositionData.realTime}
                endOfDayData={liquidityPositionData.endOfDay}
              />
              <LiquidityWidget
                title="Liquidity Forecasting"
                icon={BarChart3}
                realTimeData={liquidityForecastData.realTime}
                endOfDayData={liquidityForecastData.endOfDay}
              />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Reserves</div>
                  <div className="text-2xl font-bold">BHD {totalReserved.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Balance</div>
                  <div className="text-2xl font-bold">BHD {totalBalance.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Reserves</div>
                  <div className="text-2xl font-bold text-green-600">{balancesData.filter(b => b.reservedAmount > 0).length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Low Reserves</div>
                  <div className="text-2xl font-bold text-red-600">{balancesData.filter(b => b.reservedAmount < 100).length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Reserve Accounts Table */}
            <DataTable
              title="Reserve Accounts"
              icon={DollarSign}
              columns={reserveColumns}
              data={reservesData}
              searchPlaceholder="Search reserve accounts..."
              itemsPerPage={8}
              filters={[
                {
                  key: 'reserveType',
                  label: 'Reserve Type',
                  options: ['Mandatory Reserve', 'Excess Reserve', 'Liquidity Buffer']
                },
                {
                  key: 'status',
                  label: 'Status',
                  options: ['Active', 'Under Review', 'Inactive']
                },
                {
                  key: 'currency',
                  label: 'Currency',
                  options: ['BHD', 'USD', 'EUR']
                }
              ]}
            />

            {/* Collateral Accounts Table */}
            <DataTable
              title="Collateral Accounts"
              icon={Shield}
              columns={collateralColumns}
              data={collateralData}
              searchPlaceholder="Search collateral accounts..."
              itemsPerPage={8}
              filters={[
                {
                  key: 'collateralType',
                  label: 'Collateral Type',
                  options: ['Government Bonds', 'Corporate Bonds', 'Treasury Bills', 'Equity Securities']
                },
                {
                  key: 'status',
                  label: 'Status',
                  options: ['Pledged', 'Available', 'Under Evaluation']
                },
                {
                  key: 'eligibility',
                  label: 'Eligibility',
                  options: ['AAA', 'AA', 'A']
                }
              ]}
            />
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Liquidity Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Reserve Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Balance Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}