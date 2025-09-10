import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Calendar } from 'lucide-react';

const FinancialCalculatorPage = () => {
  const [calculatorData, setCalculatorData] = useState({
    code: 'TESTGOVBOND01 - TESTGOVBOND01',
    settlementDate: '14.07.2025',
    maturityDate: '11.04.2028',
    currentCoupon: '2',
    couponFrequency: 'QUTR - Payment frequency is quarterly',
    lastCouponDate: '11.07.2025',
    nextCouponDate: '11.10.2025',
    accruedInterestPercent: '0.00000',
    accruedInterestPerUnit: '0.00000',
    currency: 'AED',
    dayCountConventionDefault: 'A005 - Actual/365 (Fixed)',
    dayCountConventionAll: 'A005 - Actual/365 (Fixed)',
    quotationMethod: 'PYIEL - Quotation based on yield. Standard P(Y...',
    quotation: '5.50000',
    price: '86.08090',
    cleanPrice: '86.08090',
    currentYield: '0.00000',
    yieldToMaturity: '5.50000'
  });

  const handleInputChange = (field: string, value: string) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatePrice = () => {
    // Mock calculation - in real implementation this would call actual financial calculation APIs
    console.log('Calculating price based on current parameters...');
  };

  const calculateParameters = () => {
    // Mock calculation - in real implementation this would call actual financial calculation APIs
    console.log('Calculating parameters based on current data...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="w-8 h-8" />
          Financial Calculator
        </h1>
        <p className="text-muted-foreground">Advanced financial calculation tools for bonds and securities</p>
      </div>

      <Card className="max-w-6xl">
        <CardHeader>
          <CardTitle>Financial Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Parameters */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Code*</Label>
                  <Input
                    id="code"
                    value={calculatorData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="bg-muted"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="settlementDate">Settlement date</Label>
                    <div className="relative">
                      <Input
                        id="settlementDate"
                        value={calculatorData.settlementDate}
                        onChange={(e) => handleInputChange('settlementDate', e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="maturityDate">Maturity date</Label>
                    <Input
                      id="maturityDate"
                      value={calculatorData.maturityDate}
                      onChange={(e) => handleInputChange('maturityDate', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentCoupon">Current coupon</Label>
                    <Input
                      id="currentCoupon"
                      type="number"
                      value={calculatorData.currentCoupon}
                      onChange={(e) => handleInputChange('currentCoupon', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="couponFrequency">Coupon frequency</Label>
                    <Input
                      id="couponFrequency"
                      value={calculatorData.couponFrequency}
                      onChange={(e) => handleInputChange('couponFrequency', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lastCouponDate">Last coupon date</Label>
                    <Input
                      id="lastCouponDate"
                      value={calculatorData.lastCouponDate}
                      onChange={(e) => handleInputChange('lastCouponDate', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="nextCouponDate">Next coupon date</Label>
                    <Input
                      id="nextCouponDate"
                      value={calculatorData.nextCouponDate}
                      onChange={(e) => handleInputChange('nextCouponDate', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accruedInterestPercent">Accrued interest (%)</Label>
                    <Input
                      id="accruedInterestPercent"
                      value={calculatorData.accruedInterestPercent}
                      onChange={(e) => handleInputChange('accruedInterestPercent', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="accruedInterestPerUnit">Accrued interest (per unit)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accruedInterestPerUnit"
                        value={calculatorData.accruedInterestPerUnit}
                        onChange={(e) => handleInputChange('accruedInterestPerUnit', e.target.value)}
                        className="bg-muted"
                        readOnly
                      />
                      <div className="bg-muted px-3 py-2 rounded border text-sm">
                        {calculatorData.currency}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dayCountConventionDefault">Day count convention (Default)</Label>
                  <Input
                    id="dayCountConventionDefault"
                    value={calculatorData.dayCountConventionDefault}
                    onChange={(e) => handleInputChange('dayCountConventionDefault', e.target.value)}
                    className="bg-muted"
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="dayCountConventionAll">Day count convention (All)</Label>
                  <Input
                    id="dayCountConventionAll"
                    value={calculatorData.dayCountConventionAll}
                    onChange={(e) => handleInputChange('dayCountConventionAll', e.target.value)}
                    className="bg-muted"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Calculation Results */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quotationMethod">Quotation method</Label>
                  <Select value={calculatorData.quotationMethod} onValueChange={(value) => handleInputChange('quotationMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PYIEL - Quotation based on yield. Standard P(Y...">
                        PYIEL - Quotation based on yield. Standard P(Y...)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quotation">Quotation*</Label>
                  <div className="flex gap-2">
                    <Input
                      id="quotation"
                      type="number"
                      step="0.00001"
                      value={calculatorData.quotation}
                      onChange={(e) => handleInputChange('quotation', e.target.value)}
                    />
                    <Button onClick={calculatePrice} variant="outline">
                      Calculate price
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={calculatorData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="cleanPrice">Clean price</Label>
                    <Input
                      id="cleanPrice"
                      value={calculatorData.cleanPrice}
                      onChange={(e) => handleInputChange('cleanPrice', e.target.value)}
                      className="bg-muted"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={calculateParameters} variant="outline">
                    Calculate parameters
                  </Button>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Current yield</Label>
                      <div className="font-mono text-lg">{calculatorData.currentYield}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Yield to maturity</Label>
                      <div className="font-mono text-lg">{calculatorData.yieldToMaturity}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCalculatorPage;