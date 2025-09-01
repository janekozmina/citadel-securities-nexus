import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, RotateCcw, Printer, Save, Upload } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface SimulateAuctionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auction?: {
    docId: string;
    issueCode: string;
    auctionCode: string;
    status: string;
  };
}

const SimulateAuctionDialog: React.FC<SimulateAuctionDialogProps> = ({ 
  open, 
  onOpenChange, 
  auction 
}) => {
  const [simulationResults, setSimulationResults] = useState({
    satisfied: 2,
    partlySatisfied: 1,
    rejected: 1,
    satisfiedValue: 50000000,
    partlySatisfiedValue: 15000000,
    rejectedValue: 10000000,
    partlyRejectedValue: 5000000,
    winnerPrice: 5.80000,
    minPrice: 5.50000,
    maxPrice: 6.00000
  });

  const runSimulation = () => {
    // Generate random simulation results
    const randomSatisfied = Math.floor(Math.random() * 3) + 1;
    const randomPartlySatisfied = Math.floor(Math.random() * 2);
    const randomRejected = Math.floor(Math.random() * 2) + 1;
    const randomPartlyRejected = Math.floor(Math.random() * 2);
    
    const randomSatisfiedValue = Math.floor(Math.random() * 40000000) + 30000000;
    const randomPartlySatisfiedValue = Math.floor(Math.random() * 20000000) + 10000000;
    const randomRejectedValue = Math.floor(Math.random() * 20000000) + 5000000;
    const randomPartlyRejectedValue = Math.floor(Math.random() * 10000000) + 2000000;
    
    const randomWinnerPrice = (Math.random() * 1.5 + 5.0).toFixed(5);
    
    setSimulationResults({
      satisfied: randomSatisfied,
      partlySatisfied: randomPartlySatisfied,
      rejected: randomRejected,
      satisfiedValue: randomSatisfiedValue,
      partlySatisfiedValue: randomPartlySatisfiedValue,
      rejectedValue: randomRejectedValue,
      partlyRejectedValue: randomPartlyRejectedValue,
      winnerPrice: parseFloat(randomWinnerPrice),
      minPrice: 5.50000,
      maxPrice: 6.00000
    });
  };

  const saveSimulation = () => {
    toast({
      title: "Simulation Saved",
      description: "Simulation results have been saved successfully.",
    });
  };

  const loadSimulation = () => {
    // Load different simulation results to show change
    const loadedResults = {
      satisfied: Math.floor(Math.random() * 4) + 1,
      partlySatisfied: Math.floor(Math.random() * 3),
      rejected: Math.floor(Math.random() * 3) + 1,
      satisfiedValue: Math.floor(Math.random() * 30000000) + 40000000,
      partlySatisfiedValue: Math.floor(Math.random() * 15000000) + 20000000,
      rejectedValue: Math.floor(Math.random() * 15000000) + 8000000,
      partlyRejectedValue: Math.floor(Math.random() * 8000000) + 3000000,
      winnerPrice: (Math.random() * 1.0 + 5.2).toFixed(5),
      minPrice: 5.50000,
      maxPrice: 6.00000
    };
    
    setSimulationResults({
      ...loadedResults,
      winnerPrice: parseFloat(loadedResults.winnerPrice)
    });
    
    const lastSimulationDate = new Date().toLocaleDateString();
    toast({
      title: "Simulation Loaded",
      description: `The last simulation created on ${lastSimulationDate} is loaded.`,
    });
  };

  // Prepare pie chart data
  const ordersQuantityData = [
    { 
      name: 'Satisfied Orders', 
      value: simulationResults.satisfied, 
      color: '#22c55e',
      fullName: 'Satisfied Orders'
    },
    { 
      name: 'Partly Satisfied Orders', 
      value: simulationResults.partlySatisfied, 
      color: '#84cc16',
      fullName: 'Partly Satisfied Orders'
    },
    { 
      name: 'Partly Rejected Orders', 
      value: Math.floor(Math.random() * 2), 
      color: '#f97316',
      fullName: 'Partly Rejected Orders'
    },
    { 
      name: 'Rejected Orders', 
      value: simulationResults.rejected, 
      color: '#ef4444',
      fullName: 'Rejected Orders'
    }
  ];

  const ordersValueData = [
    { 
      name: 'Satisfied Orders Value', 
      value: simulationResults.satisfiedValue, 
      color: '#22c55e',
      displayValue: (simulationResults.satisfiedValue / 1000000).toFixed(1) + 'M'
    },
    { 
      name: 'Partly Satisfied Orders Value', 
      value: simulationResults.partlySatisfiedValue, 
      color: '#84cc16',
      displayValue: (simulationResults.partlySatisfiedValue / 1000000).toFixed(1) + 'M'
    },
    { 
      name: 'Partly Rejected Orders Value', 
      value: simulationResults.partlyRejectedValue, 
      color: '#f97316',
      displayValue: (simulationResults.partlyRejectedValue / 1000000).toFixed(1) + 'M'
    },
    { 
      name: 'Rejected Orders Value', 
      value: simulationResults.rejectedValue, 
      color: '#ef4444',
      displayValue: (simulationResults.rejectedValue / 1000000).toFixed(1) + 'M'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full h-[90vh] flex flex-col p-6">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0 mb-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-6 w-6 text-primary" />
            <DialogTitle>Auction Simulation Results</DialogTitle>
          </div>
          {auction && (
            <div className="text-sm text-muted-foreground">
              Auction Code: {auction.auctionCode} - Issue: {auction.issueCode}
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Calculation Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Amount Calculations */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Amount Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm">Calculate to satisfy following quantity</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value="50,000,000"
                      className="w-32 h-8 text-sm"
                      readOnly
                    />
                    <div className="flex items-center gap-1">
                      <Checkbox id="use-quantity" defaultChecked />
                      <label htmlFor="use-quantity" className="text-sm">Use</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cut off Price Calculations */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Cut off Price Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm">Cut Off Price/Rate</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value="5.50000"
                      className="w-32 h-8 text-sm"
                      readOnly
                    />
                    <div className="flex items-center gap-1">
                      <Checkbox id="use-cutoff" defaultChecked />
                      <label htmlFor="use-cutoff" className="text-sm">Use</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bids Summary Charts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Bids Summary Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Orders Quantity Pie Chart */}
                <div>
                  <h3 className="text-center font-medium mb-4">Orders Quantity</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ordersQuantityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ordersQuantityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string, props: any) => [
                          value,
                          props.payload.fullName
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {ordersQuantityData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {entry.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orders Value Pie Chart */}
                <div>
                  <h3 className="text-center font-medium mb-4">Orders Value</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ordersValueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ordersValueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `$${(value / 1000000).toFixed(1)}M`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {ordersValueData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {entry.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auction Summary */}
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Issued Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Registration Date</span>
                  <span>July 14, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Issue Date</span>
                  <span>July 14, 2025</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Auction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Auction Amount</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Orders Amount</span>
                  <span>60,000,000</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Concurrent Orders Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Orders Min Price</span>
                  <span>5.00000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Orders Max Price</span>
                  <span>6.00000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Orders Avg Price</span>
                  <span>5.66667</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calculated Bids Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Calculated Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">DocId</th>
                      <th className="text-left p-2">IssueCode</th>
                      <th className="text-left p-2">QuotationMethodCode</th>
                      <th className="text-left p-2">PriceQual</th>
                      <th className="text-left p-2">PriceType</th>
                      <th className="text-left p-2">AuctionPriceCurrencyCode</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">302</td>
                      <td className="p-2">14,862</td>
                      <td className="p-2">{auction?.issueCode || 'TESTGOVBOND06'}</td>
                      <td className="p-2">PYIEL</td>
                      <td className="p-2">YIEL</td>
                      <td className="p-2">P</td>
                      <td className="p-2"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">301</td>
                      <td className="p-2">14,861</td>
                      <td className="p-2">{auction?.issueCode || 'TESTGOVBOND06'}</td>
                      <td className="p-2">PYIEL</td>
                      <td className="p-2">YIEL</td>
                      <td className="p-2">P</td>
                      <td className="p-2"></td>
                    </tr>
                    <tr>
                      <td className="p-2">300</td>
                      <td className="p-2">14,860</td>
                      <td className="p-2">{auction?.issueCode || 'TESTGOVBOND06'}</td>
                      <td className="p-2">PYIEL</td>
                      <td className="p-2">YIEL</td>
                      <td className="p-2">P</td>
                      <td className="p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Calculation Summary */}
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Satisfied Orders Qty Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Satisfied Orders</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">{simulationResults.satisfied}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Partly Satisfied Orders</span>
                  <Badge variant="outline">{simulationResults.partlySatisfied}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sum</span>
                  <Badge variant="outline">{simulationResults.satisfied + simulationResults.partlySatisfied}</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Rejected Orders Qty Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rejected Orders</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700">{simulationResults.rejected}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Partly Rejected Orders</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sum</span>
                  <Badge variant="outline">{simulationResults.rejected}</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Winner Price/Rate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Minimum Price/Rate</span>
                  <span>{simulationResults.minPrice.toFixed(5)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maximum Price/Rate</span>
                  <span>{simulationResults.maxPrice.toFixed(5)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>WA Price/Rate</span>
                  <span className="font-medium">{simulationResults.winnerPrice.toFixed(5)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Satisfied Orders Value Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Satisfied Orders Value</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {simulationResults.satisfiedValue.toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Rejected Orders Value Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Rejected Orders Value</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {simulationResults.rejectedValue.toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t flex-shrink-0">
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print...
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={runSimulation}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Simulate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={saveSimulation}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Simulation
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadSimulation}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Load Simulation
            </Button>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimulateAuctionDialog;