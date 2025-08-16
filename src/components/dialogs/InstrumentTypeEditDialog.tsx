import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Save, X } from 'lucide-react';

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

interface InstrumentTypeEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instrumentType: InstrumentType | null;
  onSave: (data: Partial<InstrumentType>) => void;
}

export function InstrumentTypeEditDialog({ 
  open, 
  onOpenChange, 
  instrumentType, 
  onSave 
}: InstrumentTypeEditDialogProps) {
  const [formData, setFormData] = React.useState<Partial<InstrumentType>>({});

  React.useEffect(() => {
    if (instrumentType) {
      setFormData({ ...instrumentType });
    }
  }, [instrumentType]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleFieldChange = (field: keyof InstrumentType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!instrumentType) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-background border border-border shadow-lg z-[100]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Instrument Type: {instrumentType.code}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={formData.code || ''}
                  onChange={(e) => handleFieldChange('code', e.target.value)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catCode">Category Code</Label>
                <Select value={formData.catCode || ''} onValueChange={(value) => handleFieldChange('catCode', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="FXDINC">FXDINC</SelectItem>
                    <SelectItem value="EQTY">EQTY</SelectItem>
                    <SelectItem value="MMKT">MMKT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rateFixAlg">Rate Fixing Algorithm</Label>
                <Select value={formData.rateFixAlg || ''} onValueChange={(value) => handleFieldChange('rateFixAlg', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="CBEG">CBEG</SelectItem>
                    <SelectItem value="CEND">CEND</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qmCode">Quotation Method</Label>
                <Select value={formData.qmCode || ''} onValueChange={(value) => handleFieldChange('qmCode', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="DIRP">DIRP</SelectItem>
                    <SelectItem value="YLD">YLD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dShiftIssu">Date Shift Issue</Label>
                <Input
                  id="dShiftIssu"
                  type="number"
                  value={formData.dShiftIssu || 0}
                  onChange={(e) => handleFieldChange('dShiftIssu', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genTranche">Generate Tranche</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="genTranche"
                    checked={formData.genTranche || false}
                    onCheckedChange={(checked) => handleFieldChange('genTranche', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.genTranche ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Day Count & Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Day Count & Pricing</h3>
              
              <div className="space-y-2">
                <Label htmlFor="cbCode">Day Count Basis</Label>
                <Select value={formData.cbCode || ''} onValueChange={(value) => handleFieldChange('cbCode', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="ACT/360">ACT/360</SelectItem>
                    <SelectItem value="ACT/365">ACT/365</SelectItem>
                    <SelectItem value="30/360">30/360</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricCbCd">Pricing Basis</Label>
                <Select value={formData.pricCbCd || ''} onValueChange={(value) => handleFieldChange('pricCbCd', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="CLOSE">CLOSE</SelectItem>
                    <SelectItem value="AVG">AVG</SelectItem>
                    <SelectItem value="OPEN">OPEN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rtCode">Rate Type</Label>
                <Select value={formData.rtCode || ''} onValueChange={(value) => handleFieldChange('rtCode', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="LIBOR">LIBOR</SelectItem>
                    <SelectItem value="SOFR">SOFR</SelectItem>
                    <SelectItem value="FIXED">FIXED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rateCalcAlg">Rate Calculation</Label>
                <Select value={formData.rateCalcAlg || ''} onValueChange={(value) => handleFieldChange('rateCalcAlg', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="STRT">STRT</SelectItem>
                    <SelectItem value="REVS">REVS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brShiftDays">Benchmark Shift Days</Label>
                <Input
                  id="brShiftDays"
                  type="number"
                  value={formData.brShiftDays || 0}
                  onChange={(e) => handleFieldChange('brShiftDays', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mrop">Max Reopen Period</Label>
                <Input
                  id="mrop"
                  type="number"
                  value={formData.mrop || 0}
                  onChange={(e) => handleFieldChange('mrop', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="threshold">Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.0001"
                  value={formData.threshold || 0}
                  onChange={(e) => handleFieldChange('threshold', parseFloat(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
            </div>

            {/* Configuration Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration Parameters</h3>
              
              <div className="space-y-2">
                <Label htmlFor="cLastCoup">Calculate Last Coupon</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="cLastCoup"
                    checked={formData.cLastCoup || false}
                    onCheckedChange={(checked) => handleFieldChange('cLastCoup', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.cLastCoup ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rndMethod">Rounding Method</Label>
                <Select value={formData.rndMethod || ''} onValueChange={(value) => handleFieldChange('rndMethod', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="precAmt">Amount Precision</Label>
                <Input
                  id="precAmt"
                  type="number"
                  value={formData.precAmt || 0}
                  onChange={(e) => handleFieldChange('precAmt', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rateScale">Rate Scale</Label>
                <Input
                  id="rateScale"
                  type="number"
                  value={formData.rateScale || 0}
                  onChange={(e) => handleFieldChange('rateScale', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricScale">Price Scale</Label>
                <Input
                  id="pricScale"
                  type="number"
                  value={formData.pricScale || 0}
                  onChange={(e) => handleFieldChange('pricScale', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="proceedShift">Proceed Shift</Label>
                <Input
                  id="proceedShift"
                  type="number"
                  value={formData.proceedShift || 0}
                  onChange={(e) => handleFieldChange('proceedShift', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="proceedProcType">Proceed Process Type</Label>
                <Select value={formData.proceedProcType || ''} onValueChange={(value) => handleFieldChange('proceedProcType', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="exDays">Ex Days</Label>
                <Input
                  id="exDays"
                  type="number"
                  value={formData.exDays || 0}
                  onChange={(e) => handleFieldChange('exDays', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="debit">Debit Flag</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="debit"
                    checked={formData.debit || false}
                    onCheckedChange={(checked) => handleFieldChange('debit', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.debit ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="balType">Balance Type</Label>
                <Select value={formData.balType || ''} onValueChange={(value) => handleFieldChange('balType', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-[200]">
                    <SelectItem value="CUSTODY">CUSTODY</SelectItem>
                    <SelectItem value="TRADING">TRADING</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rwrdRate">Reward Rate</Label>
                <Input
                  id="rwrdRate"
                  type="number"
                  step="0.0001"
                  value={formData.rwrdRate || 0}
                  onChange={(e) => handleFieldChange('rwrdRate', parseFloat(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intAtMatu">Interest at Maturity</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="intAtMatu"
                    checked={formData.intAtMatu || false}
                    onCheckedChange={(checked) => handleFieldChange('intAtMatu', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.intAtMatu ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lockDays">Lock Days</Label>
                <Input
                  id="lockDays"
                  type="number"
                  value={formData.lockDays || 0}
                  onChange={(e) => handleFieldChange('lockDays', parseInt(e.target.value) || 0)}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isSharia">Sharia Compliant</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isSharia"
                    checked={formData.isSharia || false}
                    onCheckedChange={(checked) => handleFieldChange('isSharia', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.isSharia ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <Separator />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}