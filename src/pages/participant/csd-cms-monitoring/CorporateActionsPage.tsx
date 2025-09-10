import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, FileText, Settings, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const CorporateActionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [selectedDateTo, setSelectedDateTo] = useState('');

  // Mock data for Corporate Actions
  const corporateActionsData = [
    {
      modificationDate: '2022-04-23T17:06:42.025',
      instrumentDescription: 'TBLGSSO301750',
      issuer: 'GSYTNG-LA',
      instrument: 'TBLGSS301750',
      caNumber: 'REDMGVT003004',
      caType: 'REDMST'
    },
    {
      modificationDate: '2022-04-23T11:25:13.663',
      instrumentDescription: 'NGTTY002055',
      issuer: 'CBNING-LA',
      instrument: 'NGTTY002055',
      caNumber: 'NTREGNIN002056',
      caType: 'INTRST'
    },
    {
      modificationDate: '2022-04-23T11:25:13.663',
      instrumentDescription: 'NGTTY002055',
      issuer: 'CBNING-LA',  
      instrument: 'NGTTY002055',
      caNumber: 'NTREGNIN002057',
      caType: 'INTRST'
    },
    {
      modificationDate: '2022-04-23T11:25:13.663',
      instrumentDescription: 'NGTTY002056',
      issuer: 'CBNING-LA',
      instrument: 'NGTTY002056',
      caNumber: 'REDMCHBN002058',
      caType: 'REDMST'
    },
    {
      modificationDate: '2022-04-23T11:06:42.025',
      instrumentDescription: 'NOPBTY002050',
      issuer: 'CBNING-LA',
      instrument: 'NOPBTY002050',
      caNumber: 'NTREGNIN002051',
      caType: 'INTRST'
    },
    {
      modificationDate: '2022-04-23T11:06:42.025',
      instrumentDescription: 'NOPBTY002050',
      issuer: 'CBNING-LA',
      instrument: 'NOPBTY002050',
      caNumber: 'NTREGNIN002052',
      caType: 'INTRST'
    },
    {
      modificationDate: '2020-04-23T11:06:42.025',
      instrumentDescription: 'NOPBTY002050',
      issuer: 'CBNING-LA',
      instrument: 'NOPBTY002050',
      caNumber: 'REDMCHBN002049',
      caType: 'REDMST'
    }
  ];

  // Mock data for CA processing dates
  const caProcessingDates = [
    {
      caStep: 'RG – Registration date',
      date: '15.02.2022',
      isInstructional: 'N'
    },
    {
      caStep: 'NF – Announcement date',
      date: '15.02.2023',
      isInstructional: 'N'
    },
    {
      caStep: 'RD – Record date',
      date: '15.02.2024',
      isInstructional: 'N'
    },
    {
      caStep: 'ASDMF – Send final Allocation Statement to Depository Members',
      date: '15.02.2023',
      isInstructional: 'N'
    },
    {
      caStep: 'PROC – Processing start date',
      date: '15.02.2023',
      isInstructional: 'N'
    },
    {
      caStep: 'FIN – CA closing date',
      date: '15.02.2023',
      isInstructional: 'N'
    },
    {
      caStep: 'IPIX – Interest fixing date',
      date: '15.08.2022',
      isInstructional: 'Y'
    },
    {
      caStep: 'STINT – Start interest calculation date',
      date: '15.08.2022',
      isInstructional: 'Y'
    },
    {
      caStep: 'ENINT – End interest calculation date',
      date: '15.02.2023',
      isInstructional: 'Y'
    }
  ];

  const filteredData = corporateActionsData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getCATypeColor = (type: string) => {
    switch (type) {
      case 'INTRST':
        return 'bg-blue-100 text-blue-800';
      case 'REDMST':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Corporate Actions</h1>
        <p className="text-muted-foreground">Corporate actions management with multi-view</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General CA parameters</TabsTrigger>
          <TabsTrigger value="processing">CA processing dates</TabsTrigger>
          <TabsTrigger value="options">CA options</TabsTrigger>
          <TabsTrigger value="restrictions">CA restrictions</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General CA parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel - Filters */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date from</label>
                      <div className="relative">
                        <Input 
                          type="date" 
                          value={selectedDateFrom}
                          onChange={(e) => setSelectedDateFrom(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date to</label>
                      <div className="relative">
                        <Input 
                          type="date" 
                          value={selectedDateTo}
                          onChange={(e) => setSelectedDateTo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">CA processing steps</label>
                      <Input placeholder="Processing steps" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CA type</label>
                      <Input placeholder="CA type" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Issuer</label>
                      <Input placeholder="Issuer" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CA number</label>
                      <select className="w-full p-2 border rounded">
                        <option value="">Select CA number</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Instrument type</label>
                    <Input placeholder="Instrument type" />
                  </div>
                </div>

                {/* Right Panel - Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {filteredData.length} row(s)
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="text-xs">Modification date</TableHead>
                          <TableHead className="text-xs">Instrument description</TableHead>
                          <TableHead className="text-xs">Issuer</TableHead>
                          <TableHead className="text-xs">Instrument</TableHead>
                          <TableHead className="text-xs">CA number</TableHead>
                          <TableHead className="text-xs">CA type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((action, index) => (
                          <TableRow key={index} className="text-xs hover:bg-muted/30">
                            <TableCell className="font-mono">
                              {new Date(action.modificationDate).toLocaleString()}
                            </TableCell>
                            <TableCell className="font-mono">{action.instrumentDescription}</TableCell>
                            <TableCell className="font-mono">{action.issuer}</TableCell>
                            <TableCell className="font-mono">{action.instrument}</TableCell>
                            <TableCell className="font-mono">{action.caNumber}</TableCell>
                            <TableCell>
                              <Badge className={getCATypeColor(action.caType)} variant="secondary">
                                {action.caType}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CA processing dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-10 w-64"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {caProcessingDates.length} row(s)
                </div>
              </div>

              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>CA step</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Is Instructional?</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caProcessingDates.map((step, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? 'bg-blue-50' : ''}>
                      <TableCell>{step.caStep}</TableCell>
                      <TableCell className="font-mono">{step.date}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={step.isInstructional === 'Y' ? 'default' : 'secondary'}>
                          {step.isInstructional}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CA options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>CA options configuration will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restrictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CA processing schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>CA processing schedule and restrictions will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateActionsPage;