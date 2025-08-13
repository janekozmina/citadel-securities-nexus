import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  FileText, 
  Settings, 
  DollarSign, 
  RefreshCw, 
  Database,
  BookOpen,
  Gavel,
  Users,
  CreditCard,
  AlertTriangle,
  Plus,
  Edit,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const configItems = [
  { 
    title: 'Authorizations', 
    description: 'Configure authorization rules and permissions',
    icon: Shield,
    items: ['Payment authorization limits', 'User access controls', 'API permissions']
  },
  { 
    title: 'NBB pending changes', 
    description: 'Manage database pending changes',
    icon: FileText,
    items: ['Schema changes', 'Data migrations', 'Pending updates']
  },
  { 
    title: 'API gateway', 
    description: 'Configure API gateway settings',
    icon: Settings,
    items: ['Rate limiting', 'Authentication', 'Routing rules']
  },
  { 
    title: 'Billing', 
    description: 'Set up billing configurations',
    icon: DollarSign,
    items: ['Fee structures', 'Billing cycles', 'Payment methods']
  },
  { 
    title: 'Business days', 
    description: 'Define business day calendars',
    icon: RefreshCw,
    items: ['Holidays', 'Working hours', 'Time zones']
  },
  { 
    title: 'Central addressing schema', 
    description: 'Configure addressing and routing',
    icon: Database,
    items: ['BIC codes', 'Routing tables', 'Network addresses']
  },
  { 
    title: 'Dictionaries', 
    description: 'Manage data dictionaries',
    icon: BookOpen,
    items: ['Currency codes', 'Country codes', 'Message types']
  },
  { 
    title: 'Disputes', 
    description: 'Configure dispute management',
    icon: Gavel,
    items: ['Dispute categories', 'Resolution workflows', 'SLA settings']
  },
  { 
    title: 'Maintenance', 
    description: 'System maintenance settings',
    icon: Settings,
    items: ['Maintenance windows', 'Backup schedules', 'Update policies']
  },
  { 
    title: 'Messages', 
    description: 'Configure message formats and routing',
    icon: FileText,
    items: ['Message templates', 'Validation rules', 'Format definitions']
  },
  { 
    title: 'Participants', 
    description: 'Manage system participants',
    icon: Users,
    items: ['Bank registration', 'Participant profiles', 'Connection settings']
  },
  { 
    title: 'Payments', 
    description: 'Configure payment processing',
    icon: CreditCard,
    items: ['Payment types', 'Processing rules', 'Limits and controls']
  },
  { 
    title: 'Reports', 
    description: 'Set up reporting configurations',
    icon: FileText,
    items: ['Report templates', 'Scheduling', 'Distribution lists']
  },
  { 
    title: 'Requests to pay', 
    description: 'Configure payment request settings',
    icon: DollarSign,
    items: ['Request formats', 'Approval workflows', 'Notification rules']
  },
  { 
    title: 'Stand-in mode', 
    description: 'Configure stand-in processing',
    icon: AlertTriangle,
    items: ['Fallback rules', 'Processing limits', 'Recovery procedures']
  },
  { 
    title: 'System tables', 
    description: 'Manage system reference tables',
    icon: Database,
    items: ['Reference data', 'Configuration tables', 'Lookup values']
  }
];

interface FormConfigData {
  formName: string;
  systemType: 'rtgs' | 'csd' | 'both';
  status: 'active' | 'inactive' | 'draft';
  validationRules: string;
  approvalWorkflow: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
    validation: string;
  }>;
}

export default function FormConfigurationPage() {
  useEffect(() => {
    document.title = 'Form Configuration | Unified Portal';
  }, []);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedConfigItem, setSelectedConfigItem] = useState<string | null>(null);
  const [formConfig, setFormConfig] = useState<FormConfigData>({
    formName: '',
    systemType: 'rtgs',
    status: 'draft',
    validationRules: '',
    approvalWorkflow: '',
    fields: []
  });

  const handleFormSave = () => {
    if (!formConfig.formName || !selectedConfigItem) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(`${selectedConfigItem} form configuration saved successfully`);
    setIsFormDialogOpen(false);
    setSelectedConfigItem(null);
    setFormConfig({
      formName: '',
      systemType: 'rtgs',
      status: 'draft',
      validationRules: '',
      approvalWorkflow: '',
      fields: []
    });
  };

  const openFormConfig = (itemTitle: string) => {
    setSelectedConfigItem(itemTitle);
    setFormConfig(prev => ({
      ...prev,
      formName: `${itemTitle} Form`
    }));
    setIsFormDialogOpen(true);
  };

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Form Configuration</h1>
            <p className="text-muted-foreground">Configure forms for various RTGS and CSD operations</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Configuration Overview</TabsTrigger>
            <TabsTrigger value="rtgs">RTGS Forms</TabsTrigger>
            <TabsTrigger value="csd">CSD Forms</TabsTrigger>
            <TabsTrigger value="shared">Shared Forms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {configItems.map((item) => {
                const IconComponent = item.icon;
                
                return (
                  <Card key={item.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {item.items.map((subItem, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subItem}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full gap-2"
                          onClick={() => openFormConfig(item.title)}
                        >
                          <Settings className="h-3 w-3" />
                          Configure Forms
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="rtgs">
            <Card>
              <CardHeader>
                <CardTitle>RTGS System Forms</CardTitle>
                <CardDescription>Forms specific to Real-Time Gross Settlement operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {configItems.filter(item => 
                    ['Payments', 'Messages', 'Authorizations', 'Central addressing schema'].includes(item.title)
                  ).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                           onClick={() => openFormConfig(item.title)}>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csd">
            <Card>
              <CardHeader>
                <CardTitle>CSD System Forms</CardTitle>
                <CardDescription>Forms specific to Central Securities Depository operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {configItems.filter(item => 
                    ['System tables', 'Reports', 'Participants', 'Disputes'].includes(item.title)
                  ).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                           onClick={() => openFormConfig(item.title)}>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared">
            <Card>
              <CardHeader>
                <CardTitle>Shared Forms</CardTitle>
                <CardDescription>Forms used by both RTGS and CSD systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {configItems.filter(item => 
                    ['Business days', 'Maintenance', 'Billing', 'API gateway'].includes(item.title)
                  ).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                           onClick={() => openFormConfig(item.title)}>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Configuration Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure {selectedConfigItem} Forms</DialogTitle>
              <DialogDescription>
                Set up form configurations, validation rules, and workflows for {selectedConfigItem}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Basic Configuration */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Basic Configuration</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="formName">Form Name *</Label>
                    <Input 
                      id="formName"
                      value={formConfig.formName}
                      onChange={(e) => setFormConfig(prev => ({...prev, formName: e.target.value}))}
                      placeholder="Enter form name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="systemType">System Type *</Label>
                    <Select value={formConfig.systemType} onValueChange={(value: 'rtgs' | 'csd' | 'both') => setFormConfig(prev => ({...prev, systemType: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rtgs">RTGS Only</SelectItem>
                        <SelectItem value="csd">CSD Only</SelectItem>
                        <SelectItem value="both">Both Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formConfig.status} onValueChange={(value: 'active' | 'inactive' | 'draft') => setFormConfig(prev => ({...prev, status: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="approvalWorkflow">Approval Workflow</Label>
                    <Select value={formConfig.approvalWorkflow} onValueChange={(value) => setFormConfig(prev => ({...prev, approvalWorkflow: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workflow" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Approval</SelectItem>
                        <SelectItem value="dual">Dual Approval</SelectItem>
                        <SelectItem value="multi">Multi-level Approval</SelectItem>
                        <SelectItem value="none">No Approval Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Validation Rules */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Validation Rules</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="validationRules">Validation Logic</Label>
                  <Textarea 
                    id="validationRules"
                    value={formConfig.validationRules}
                    onChange={(e) => setFormConfig(prev => ({...prev, validationRules: e.target.value}))}
                    placeholder="Enter validation rules and business logic..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Form Structure Preview */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Form Structure Preview</h3>
                
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Common Fields for {selectedConfigItem}:</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Participant ID</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Transaction Amount</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Currency</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Reference Number</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span>Additional Notes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span>Attachments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleFormSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}