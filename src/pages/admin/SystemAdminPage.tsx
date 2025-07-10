import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Settings, Database, Mail, Network, Shield, Users } from 'lucide-react';
import { useState } from 'react';

interface ConfigParameter {
  code: string;
  value: string;
  group: string;
  externalCode: string;
  externalSynchronization: boolean;
  description: string;
}

const SystemAdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const configParameters: ConfigParameter[] = [
    {
      code: 'portal.cash_account_servicer_type_codes',
      value: 'RTGS',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'List of available cash account servicer type codes'
    },
    {
      code: 'portal.general.menu_home_label',
      value: 'Portal',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'Menu home label'
    },
    {
      code: 'portal.use_extended_investor_participant_types',
      value: 'Yes',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'Use extended investor participant types'
    },
    {
      code: 'portal.central_node_params.allow_sdf_slf_both',
      value: 'No',
      group: 'Central node parameters',
      externalCode: 'AllowSDFSLFBoth',
      externalSynchronization: true,
      description: 'Both SDF and SLF are allowed to be active simultaneously'
    },
    {
      code: 'portal.email.from',
      value: 'demo-csd@rim.com',
      group: 'Email',
      externalCode: '',
      externalSynchronization: false,
      description: 'Email field "From"'
    }
  ];

  const groups = ['all', ...Array.from(new Set(configParameters.map(param => param.group)))];

  const filteredParameters = configParameters.filter(param => {
    const matchesSearch = param.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         param.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || param.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const groupedParameters = filteredParameters.reduce((acc, param) => {
    if (!acc[param.group]) {
      acc[param.group] = [];
    }
    acc[param.group].push(param);
    return acc;
  }, {} as Record<string, ConfigParameter[]>);

  const handleValueChange = (code: string, newValue: string) => {
    setEditingValues(prev => ({
      ...prev,
      [code]: newValue
    }));
  };

  const getCurrentValue = (param: ConfigParameter) => {
    return editingValues[param.code] !== undefined ? editingValues[param.code] : param.value;
  };

  const isYesNoValue = (value: string) => {
    return value.toLowerCase() === 'yes' || value.toLowerCase() === 'no';
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'Central node parameters':
        return <Settings className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      case 'Gateway connection':
        return <Network className="h-4 w-4" />;
      case 'Integration':
        return <Database className="h-4 w-4" />;
      case 'Interface':
        return <Shield className="h-4 w-4" />;
      case 'RIM parameters':
        return <Users className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">System Administration</h1>
          <p className="text-slate-600">Configure system parameters and settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {groups.slice(1).map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedParameters).map(([groupName, parameters]) => (
              <div key={groupName} className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  {getGroupIcon(groupName)}
                  <h3 className="text-lg font-semibold text-slate-800">{groupName}</h3>
                  <span className="text-sm text-slate-500">({parameters.length} parameters)</span>
                </div>
                
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[300px]">Code</TableHead>
                        <TableHead className="min-w-[150px]">Value</TableHead>
                        <TableHead className="min-w-[120px]">External Code</TableHead>
                        <TableHead className="w-20">Sync</TableHead>
                        <TableHead className="min-w-[200px]">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parameters.map((param) => (
                        <TableRow key={param.code}>
                          <TableCell className="font-mono text-xs">{param.code}</TableCell>
                          <TableCell>
                            {isYesNoValue(param.value) ? (
                              <RadioGroup
                                value={getCurrentValue(param)}
                                onValueChange={(value) => handleValueChange(param.code, value)}
                                className="flex flex-row space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Yes" id={`${param.code}-yes`} />
                                  <Label htmlFor={`${param.code}-yes`} className="text-sm">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="No" id={`${param.code}-no`} />
                                  <Label htmlFor={`${param.code}-no`} className="text-sm">No</Label>
                                </div>
                              </RadioGroup>
                            ) : (
                              <Input
                                value={getCurrentValue(param)}
                                onChange={(e) => handleValueChange(param.code, e.target.value)}
                                className="w-full text-sm"
                                placeholder={param.value || "—"}
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {param.externalCode || <span className="text-slate-400">—</span>}
                          </TableCell>
                          <TableCell>
                            <Badge variant={param.externalSynchronization ? 'default' : 'secondary'} className="text-xs">
                              {param.externalSynchronization ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-slate-700 whitespace-normal break-words max-w-xs">
                              {param.description}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>

          {filteredParameters.length === 0 && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No parameters found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAdminPage;
