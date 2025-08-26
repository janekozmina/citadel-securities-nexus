import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Star, TrendingUp, AlertTriangle, DollarSign, Target, Plus, Settings, Edit, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function HaircutsManagementPage() {
  const { toast } = useToast();
  const [setHaircutsOpen, setSetHaircutsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [haircutRate, setHaircutRate] = useState('');
  const [ilfMatrixOpen, setIlfMatrixOpen] = useState(false);
  const [repoMatrixOpen, setRepoMatrixOpen] = useState(false);
  const [ilfMatrix, setIlfMatrix] = useState([
    { assetClass: 'Government Securities', aaa: '0.5', aa: '1.0', a: '2.0', bbb: '5.0', below: 'Not Eligible' },
    { assetClass: 'Islamic Bonds (Sukuk)', aaa: '2.0', aa: '3.0', a: '5.0', bbb: '8.0', below: '15.0' },
    { assetClass: 'Bank Deposits', aaa: '1.0', aa: '1.5', a: '2.5', bbb: '6.0', below: 'Not Eligible' },
    { assetClass: 'Corporate Sukuk', aaa: '3.0', aa: '4.0', a: '7.0', bbb: '12.0', below: '20.0' },
    { assetClass: 'Equity Securities', aaa: '15.0', aa: '20.0', a: '25.0', bbb: '35.0', below: '45.0' }
  ]);
  const [repoMatrix, setRepoMatrix] = useState([
    { assetClass: 'Government Securities', aaa: '1.0', aa: '2.0', a: '3.5', bbb: '8.0', below: 'Not Eligible' },
    { assetClass: 'Corporate Bonds', aaa: '4.0', aa: '6.0', a: '8.5', bbb: '15.0', below: '25.0' },
    { assetClass: 'Bank Securities', aaa: '3.0', aa: '4.0', a: '6.0', bbb: '12.0', below: 'Not Eligible' },
    { assetClass: 'Municipal Bonds', aaa: '2.5', aa: '3.5', a: '5.5', bbb: '10.0', below: '18.0' },
    { assetClass: 'Equity Securities', aaa: '20.0', aa: '25.0', a: '30.0', bbb: '40.0', below: '50.0' }
  ]);

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'add-asset':
        toast({
          title: "Add Asset",
          description: "Opening new asset registration form...",
        });
        break;
      case 'set-haircuts':
        setSetHaircutsOpen(true);
        break;
      case 'update-ratings':
        toast({
          title: "Credit Ratings Update",
          description: "Initiating credit ratings update process...",
        });
        break;
      case 'export-schedule':
        toast({
          title: "Export Started",
          description: "Haircut schedule export has been initiated.",
        });
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const handleSetHaircuts = () => {
    if (selectedAsset && haircutRate) {
      toast({
        title: "Haircuts Updated",
        description: `Haircut rate set to ${haircutRate}% for ${selectedAsset}`,
      });
      setSetHaircutsOpen(false);
      setSelectedAsset('');
      setHaircutRate('');
    }
  };

  const handleIlfMatrixUpdate = (rowIndex: number, rating: string, value: string) => {
    const updatedMatrix = [...ilfMatrix];
    updatedMatrix[rowIndex] = { ...updatedMatrix[rowIndex], [rating]: value };
    setIlfMatrix(updatedMatrix);
  };

  const handleRepoMatrixUpdate = (rowIndex: number, rating: string, value: string) => {
    const updatedMatrix = [...repoMatrix];
    updatedMatrix[rowIndex] = { ...updatedMatrix[rowIndex], [rating]: value };
    setRepoMatrix(updatedMatrix);
  };

  const saveIlfMatrix = () => {
    toast({
      title: "ILF Matrix Updated",
      description: "Islamic Lending Facility haircut matrix has been successfully updated.",
    });
    setIlfMatrixOpen(false);
  };

  const saveRepoMatrix = () => {
    toast({
      title: "REPO Matrix Updated", 
      description: "REPO haircut matrix has been successfully updated.",
    });
    setRepoMatrixOpen(false);
  };

  const haircutsMetrics = [
    {
      title: 'Eligible Assets',
      value: '2,847',
      change: '+23',
      changeType: 'positive' as const,
      icon: Shield
    },
    {
      title: 'Avg Haircut Rate',
      value: '15.3%',
      change: '-0.5%',
      changeType: 'positive' as const,
      icon: Target
    },
    {
      title: 'AAA Rated Assets',
      value: '1,234',
      change: '+18',
      changeType: 'positive' as const,
      icon: Star
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '-3',
      changeType: 'positive' as const,
      icon: AlertTriangle
    }
  ];

  const haircutsData = [
    {
      id: 1,
      instrument: 'Government Bonds - Bahrain',
      instrumentType: 'Sovereign Debt',
      creditRating: 'AA-',
      maturity: '< 1 Year',
      haircut: '2.0%',
      eligibilityRule: 'Minimum BHD 10M',
      lastUpdated: '2025-01-15',
      status: 'Active'
    },
    {
      id: 2,
      instrument: 'Corporate Bonds - ALBA',
      instrumentType: 'Corporate Debt',
      creditRating: 'A+',
      maturity: '1-5 Years',
      haircut: '8.5%',
      eligibilityRule: 'Listed Securities Only',
      lastUpdated: '2025-01-12',
      status: 'Active'
    },
    {
      id: 3,
      instrument: 'Bank Deposits - CBB',
      instrumentType: 'Cash Equivalent',
      creditRating: 'AA',
      maturity: 'On Demand',
      haircut: '0.0%',
      eligibilityRule: 'Central Bank Only',
      lastUpdated: '2025-01-10',
      status: 'Active'
    },
    {
      id: 4,
      instrument: 'Islamic Sukuk - GFH',
      instrumentType: 'Islamic Securities',
      creditRating: 'BBB+',
      maturity: '5-10 Years',
      haircut: '12.0%',
      eligibilityRule: 'Sharia Compliant',
      lastUpdated: '2025-01-08',
      status: 'Under Review'
    },
    {
      id: 5,
      instrument: 'Equities - Batelco',
      instrumentType: 'Equity Securities',
      creditRating: 'A-',
      maturity: 'Perpetual',
      haircut: '25.0%',
      eligibilityRule: 'Market Cap > BHD 100M',
      lastUpdated: '2025-01-05',
      status: 'Active'
    }
  ];

  const ilfMatrixData = [
    {
      id: 1,
      collateralType: 'Government bond',
      '0-1year': { value: '0.5%', risk: 'Low' },
      '1-3years': { value: '1%', risk: 'Low' },
      '3-5years': { value: '1.5%', risk: 'Low' },
      '5-7years': { value: '2%', risk: 'Low' },
      '7-10years': { value: '3%', risk: 'Medium' },
      '10+years': { value: '5%', risk: 'Medium' }
    },
    {
      id: 2,
      collateralType: 'Corporate Bonds',
      '0-1year': { value: '1%', risk: 'Low' },
      '1-3years': { value: '1.5%', risk: 'Low' },
      '3-5years': { value: '2.5%', risk: 'Medium' },
      '5-7years': { value: '3.5%', risk: 'Medium' },
      '7-10years': { value: '4.5%', risk: 'Medium' },
      '10+years': { value: '6%', risk: 'Medium' }
    },
    {
      id: 3,
      collateralType: 'Central Bank Bills',
      '0-1year': { value: '0.3%', risk: 'Low' },
      '1-3years': { value: '0.6%', risk: 'Low' },
      '3-5years': { value: '1.2%', risk: 'Low' },
      '5-7years': { value: '1.8%', risk: 'Low' },
      '7-10years': { value: '2.5%', risk: 'Medium' },
      '10+years': { value: '4%', risk: 'Medium' }
    },
    {
      id: 4,
      collateralType: 'Senior tranche of MBS',
      '0-1year': { value: '20%', risk: 'High' },
      '1-3years': { value: '20%', risk: 'High' },
      '3-5years': { value: '20%', risk: 'High' },
      '5-7years': { value: '20%', risk: 'High' },
      '7-10years': { value: '20%', risk: 'High' },
      '10+years': { value: '20%', risk: 'High' }
    },
    {
      id: 5,
      collateralType: 'Junior tranche of MBS',
      '0-1year': { value: '40%', risk: 'High' },
      '1-3years': { value: '40%', risk: 'High' },
      '3-5years': { value: '40%', risk: 'High' },
      '5-7years': { value: '40%', risk: 'High' },
      '7-10years': { value: '40%', risk: 'High' },
      '10+years': { value: '40%', risk: 'High' }
    },
    {
      id: 6,
      collateralType: 'Senior tranche of ABS (performing loans)',
      '0-1year': { value: '20%', risk: 'High' },
      '1-3years': { value: '20%', risk: 'High' },
      '3-5years': { value: '20%', risk: 'High' },
      '5-7years': { value: '20%', risk: 'High' },
      '7-10years': { value: '20%', risk: 'High' },
      '10+years': { value: '20%', risk: 'High' }
    }
  ];

  const islamicIlfMatrixData = [
    {
      id: 1,
      collateralType: 'Sukuks (Islamic bonds)',
      '0-1year': { value: '1.2%', risk: 'Low' },
      '1-3years': { value: '1.8%', risk: 'Low' },
      '3-5years': { value: '2.8%', risk: 'Medium' },
      '5-7years': { value: '3.8%', risk: 'Medium' },
      '7-10years': { value: '5%', risk: 'Medium' },
      '10+years': { value: '9%', risk: 'Medium' }
    },
    {
      id: 2,
      collateralType: 'Islamic Government Bonds',
      '0-1year': { value: '0.8%', risk: 'Low' },
      '1-3years': { value: '1.2%', risk: 'Low' },
      '3-5years': { value: '2.0%', risk: 'Low' },
      '5-7years': { value: '2.8%', risk: 'Medium' },
      '7-10years': { value: '4%', risk: 'Medium' },
      '10+years': { value: '6%', risk: 'Medium' }
    },
    {
      id: 3,
      collateralType: 'Sharia-compliant Corporate Securities',
      '0-1year': { value: '2%', risk: 'Low' },
      '1-3years': { value: '3%', risk: 'Medium' },
      '3-5years': { value: '4%', risk: 'Medium' },
      '5-7years': { value: '5.5%', risk: 'Medium' },
      '7-10years': { value: '7%', risk: 'Medium' },
      '10+years': { value: '10%', risk: 'High' }
    },
    {
      id: 4,
      collateralType: 'Islamic Banking Securities',
      '0-1year': { value: '1.5%', risk: 'Low' },
      '1-3years': { value: '2.2%', risk: 'Low' },
      '3-5years': { value: '3.2%', risk: 'Medium' },
      '5-7years': { value: '4.2%', risk: 'Medium' },
      '7-10years': { value: '5.5%', risk: 'Medium' },
      '10+years': { value: '8%', risk: 'Medium' }
    }
  ];

  const repoMatrixData = [
    {
      id: 1,
      collateralType: 'Government bond',
      '0-1year': { value: '0.5%', risk: 'Low' },
      '1-3years': { value: '1%', risk: 'Low' },
      '3-5years': { value: '1.5%', risk: 'Low' },
      '5-7years': { value: '2%', risk: 'Low' },
      '7-10years': { value: '3%', risk: 'Medium' },
      '10+years': { value: '5%', risk: 'Medium' }
    },
    {
      id: 2,
      collateralType: 'Corporate Bonds',
      '0-1year': { value: '1%', risk: 'Low' },
      '1-3years': { value: '1.5%', risk: 'Low' },
      '3-5years': { value: '2.5%', risk: 'Medium' },
      '5-7years': { value: '3.5%', risk: 'Medium' },
      '7-10years': { value: '4.5%', risk: 'Medium' },
      '10+years': { value: '6%', risk: 'Medium' }
    },
    {
      id: 3,
      collateralType: 'Central Bank Bills',
      '0-1year': { value: '0.3%', risk: 'Low' },
      '1-3years': { value: '0.6%', risk: 'Low' },
      '3-5years': { value: '1.2%', risk: 'Low' },
      '5-7years': { value: '1.8%', risk: 'Low' },
      '7-10years': { value: '2.5%', risk: 'Medium' },
      '10+years': { value: '4%', risk: 'Medium' }
    },
    {
      id: 4,
      collateralType: 'Sukuks (Islamic bonds)',
      '0-1year': { value: '1.2%', risk: 'Low' },
      '1-3years': { value: '1.8%', risk: 'Low' },
      '3-5years': { value: '2.8%', risk: 'Medium' },
      '5-7years': { value: '3.8%', risk: 'Medium' },
      '7-10years': { value: '5%', risk: 'Medium' },
      '10+years': { value: '9%', risk: 'Medium' }
    },
    {
      id: 5,
      collateralType: 'Senior tranche of MBS',
      '0-1year': { value: '20%', risk: 'High' },
      '1-3years': { value: '20%', risk: 'High' },
      '3-5years': { value: '20%', risk: 'High' },
      '5-7years': { value: '20%', risk: 'High' },
      '7-10years': { value: '20%', risk: 'High' },
      '10+years': { value: '20%', risk: 'High' }
    },
    {
      id: 6,
      collateralType: 'Junior tranche of MBS',
      '0-1year': { value: '40%', risk: 'High' },
      '1-3years': { value: '40%', risk: 'High' },
      '3-5years': { value: '40%', risk: 'High' },
      '5-7years': { value: '40%', risk: 'High' },
      '7-10years': { value: '40%', risk: 'High' },
      '10+years': { value: '40%', risk: 'High' }
    },
    {
      id: 7,
      collateralType: 'Senior tranche of ABS (performing loans)',
      '0-1year': { value: '20%', risk: 'High' },
      '1-3years': { value: '20%', risk: 'High' },
      '3-5years': { value: '20%', risk: 'High' },
      '5-7years': { value: '20%', risk: 'High' },
      '7-10years': { value: '20%', risk: 'High' },
      '10+years': { value: '20%', risk: 'High' }
    }
  ];

  const haircutsColumns = [
    { key: 'instrument', label: 'Instrument', type: 'text' as const, sortable: true },
    { key: 'instrumentType', label: 'Type', type: 'text' as const, sortable: true },
    { key: 'creditRating', label: 'Credit Rating', type: 'text' as const, sortable: true },
    { key: 'maturity', label: 'Maturity', type: 'text' as const, sortable: true },
    { key: 'haircut', label: 'Haircut Rate', type: 'text' as const, sortable: true },
    { key: 'eligibilityRule', label: 'Eligibility Rule', type: 'text' as const },
    { key: 'lastUpdated', label: 'Last Updated', type: 'date' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Suspended', label: 'Suspended' }
      ]
    }
  ];

  const [editingCell, setEditingCell] = useState<{rowId: number, period: string} | null>(null);
  
  const maturityPeriods = [
    { key: '0-1year', label: '0-1 year' },
    { key: '1-3years', label: '1-3 years' },
    { key: '3-5years', label: '3-5 years' },
    { key: '5-7years', label: '5-7 years' },
    { key: '7-10years', label: '7-10 years' },
    { key: '10+years', label: '10+ years' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-50 border-green-200 text-green-700';
      case 'Medium': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'High': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handleCellEdit = (rowId: number, period: string, newValue: string, matrixType: string) => {
    // Update the matrix data here based on matrix type
    toast({
      title: "Haircut Updated",
      description: `${matrixType} haircut rate updated to ${newValue}`,
    });
    setEditingCell(null);
  };

  const renderHaircutMatrix = (data: any[], title: string, subtitle: string, matrixType: string) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {title}
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">
                    Collateral Type / Repo Operation
                  </th>
                  {maturityPeriods.map((period) => (
                    <th key={period.key} className="text-center p-3 font-medium text-muted-foreground min-w-[100px]">
                      {period.label}
                    </th>
                  ))}
                  <th className="text-center p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="font-medium">{row.collateralType}</div>
                      <div className="text-sm text-blue-600">{matrixType}</div>
                    </td>
                    {maturityPeriods.map((period) => {
                      const cellData = row[period.key as keyof typeof row] as {value: string, risk: string};
                      const isEditing = editingCell?.rowId === row.id && editingCell?.period === period.key;
                      
                      return (
                        <td key={period.key} className="p-2 text-center">
                          {isEditing ? (
                            <Input
                              value={cellData.value}
                              onChange={(e) => handleCellEdit(row.id, period.key, e.target.value, matrixType)}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingCell(null);
                                }
                              }}
                              className="w-16 h-8 text-center text-xs"
                              autoFocus
                            />
                          ) : (
                            <div
                              className={`inline-flex flex-col items-center gap-1 px-2 py-1 rounded border cursor-pointer transition-colors hover:bg-opacity-80 ${getRiskColor(cellData.risk)}`}
                              onClick={() => setEditingCell({rowId: row.id, period: period.key})}
                            >
                              <span className="text-xs font-medium">{cellData.value}</span>
                              <Badge 
                                variant={cellData.risk === 'Low' ? 'default' : cellData.risk === 'Medium' ? 'secondary' : 'destructive'}
                                className="text-[10px] px-1 h-4"
                              >
                                {cellData.risk}
                              </Badge>
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader 
          title="Haircuts Management"
          description="Master list of accepted collateral with eligibility rules and haircut schedules"
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {haircutsMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                      </span>
                      {' '}vs last month
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <metric.icon className="h-8 w-8 text-primary mb-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ILF Matrix Configuration */}
        {renderHaircutMatrix(
          ilfMatrixData,
          "ILF (Intraday Liquidity Facility)",
          "Configure haircut percentages for ILF operations across different collateral types and maturity periods",
          "ILF (Intraday Liquidity Facility)"
        )}

        {/* Islamic ILF Matrix Configuration */}
        {renderHaircutMatrix(
          islamicIlfMatrixData,
          "Islamic ILF Configuration",
          "Configure haircut percentages for Islamic ILF operations with Sharia-compliant collateral",
          "Islamic ILF"
        )}

        {/* REPO Matrix Configuration */}
        {renderHaircutMatrix(
          repoMatrixData,
          "REPO Operations (>14 days)",
          "Configure haircut percentages for REPO operations with maturity greater than 14 days",
          "Repo Operations (>14)"
        )}

        {/* Eligible Instruments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Eligible Collateral Instruments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Accepted Collateral"
              columns={haircutsColumns}
              data={haircutsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="haircuts-management" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>

      {/* Set Haircuts Dialog */}
      <Dialog open={setHaircutsOpen} onOpenChange={setSetHaircutsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Haircuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="asset">Asset Class</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government-bonds">Government Bonds</SelectItem>
                  <SelectItem value="corporate-bonds">Corporate Bonds</SelectItem>
                  <SelectItem value="equities">Equities</SelectItem>
                  <SelectItem value="cash-deposits">Cash Deposits</SelectItem>
                  <SelectItem value="islamic-sukuk">Islamic Sukuk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Haircut Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={haircutRate}
                onChange={(e) => setHaircutRate(e.target.value)}
                placeholder="Enter haircut rate"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSetHaircutsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSetHaircuts}>
                Update Haircuts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ILF Haircut Matrix Dialog */}
      <Dialog open={ilfMatrixOpen} onOpenChange={setIlfMatrixOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Edit ILF (Islamic Lending Facility) Haircut Matrix
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-medium">Asset Class</th>
                    <th className="border border-border p-3 text-center font-medium">AAA</th>
                    <th className="border border-border p-3 text-center font-medium">AA</th>
                    <th className="border border-border p-3 text-center font-medium">A</th>
                    <th className="border border-border p-3 text-center font-medium">BBB</th>
                    <th className="border border-border p-3 text-center font-medium">Below BBB</th>
                  </tr>
                </thead>
                <tbody>
                  {ilfMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-border p-3 font-medium">{row.assetClass}</td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.aaa}
                          onChange={(e) => handleIlfMatrixUpdate(rowIndex, 'aaa', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.aa}
                          onChange={(e) => handleIlfMatrixUpdate(rowIndex, 'aa', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.a}
                          onChange={(e) => handleIlfMatrixUpdate(rowIndex, 'a', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.bbb}
                          onChange={(e) => handleIlfMatrixUpdate(rowIndex, 'bbb', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.below}
                          onChange={(e) => handleIlfMatrixUpdate(rowIndex, 'below', e.target.value)}
                          className="text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIlfMatrixOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveIlfMatrix}>
                Save ILF Matrix
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* REPO Haircut Matrix Dialog */}
      <Dialog open={repoMatrixOpen} onOpenChange={setRepoMatrixOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit REPO Haircut Matrix
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-medium">Asset Class</th>
                    <th className="border border-border p-3 text-center font-medium">AAA</th>
                    <th className="border border-border p-3 text-center font-medium">AA</th>
                    <th className="border border-border p-3 text-center font-medium">A</th>
                    <th className="border border-border p-3 text-center font-medium">BBB</th>
                    <th className="border border-border p-3 text-center font-medium">Below BBB</th>
                  </tr>
                </thead>
                <tbody>
                  {repoMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-border p-3 font-medium">{row.assetClass}</td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.aaa}
                          onChange={(e) => handleRepoMatrixUpdate(rowIndex, 'aaa', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.aa}
                          onChange={(e) => handleRepoMatrixUpdate(rowIndex, 'aa', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.a}
                          onChange={(e) => handleRepoMatrixUpdate(rowIndex, 'a', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.bbb}
                          onChange={(e) => handleRepoMatrixUpdate(rowIndex, 'bbb', e.target.value)}
                          className="text-center"
                        />
                      </td>
                      <td className="border border-border p-2">
                        <Input
                          value={row.below}
                          onChange={(e) => handleRepoMatrixUpdate(rowIndex, 'below', e.target.value)}
                          className="text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setRepoMatrixOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveRepoMatrix}>
                Save REPO Matrix
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}