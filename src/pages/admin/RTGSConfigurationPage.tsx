import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  Plus
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

interface ParticipantFormData {
  bankName: string;
  bicCode: string;
  type: string;
  status: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  connectionType: string;
  ipAddress: string;
  port: string;
  certificate: string;
}

export default function RTGSConfigurationPage() {
  useEffect(() => {
    document.title = 'RTGS Configuration | Unified Portal';
  }, []);

  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [participantForm, setParticipantForm] = useState<ParticipantFormData>({
    bankName: '',
    bicCode: '',
    type: 'conventional',
    status: 'active',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    connectionType: 'direct',
    ipAddress: '',
    port: '',
    certificate: ''
  });

  const bahrainiBanks = [
    'Ahli United Bank',
    'Arab Banking Corporation (Bank ABC)',
    'Gulf International Bank (GIB)',
    'National Bank of Bahrain (NBB)',
    'Bank of Bahrain and Kuwait (BBK)',
    'Ithmaar Bank',
    'Al Baraka',
    'Al-Salam Bank',
    'Bahrain Islamic Bank',
    'Khaleeji Bank',
    'National Bank of Bahrain (NBB)',
    'Citibank Bahrain',
    'HSBC Bank Middle East (Bahrain)',
    'Standard Chartered Bank (Bahrain)',
    'ICICI Bank (Bahrain)',
    'State Bank of India (Bahrain)',
    'Bank Melli Iran',
    'Saderat Bank of Iran',
    'Future Bank',
    'BMI Bank',
    'Addax Bank',
    'Allied Bank (Wholesale)',
    'APICORP',
    'Askari Bank (Wholesale)',
    'Alubaf Arab International Bank',
    'The Arab Investment Company (TAIC)',
    'ABC Islamic Bank'
  ];

  const handleParticipantSubmit = () => {
    // Validate required fields
    if (!participantForm.bankName || !participantForm.bicCode || !participantForm.contactPerson) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate saving
    toast.success('Participant configuration saved successfully');
    setIsParticipantDialogOpen(false);
    setParticipantForm({
      bankName: '',
      bicCode: '',
      type: 'conventional',
      status: 'active',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      connectionType: 'direct',
      ipAddress: '',
      port: '',
      certificate: ''
    });
  };

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">RTGS Configuration</h1>
            <p className="text-muted-foreground">Configure various RTGS-related forms and settings</p>
          </div>
          
          <Dialog open={isParticipantDialogOpen} onOpenChange={setIsParticipantDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Participant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Participant Configuration</DialogTitle>
                <DialogDescription>
                  Configure a new participant in the RTGS system
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Basic Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Select value={participantForm.bankName} onValueChange={(value) => setParticipantForm(prev => ({...prev, bankName: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {bahrainiBanks.map((bank) => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bicCode">BIC Code *</Label>
                      <Input 
                        id="bicCode"
                        value={participantForm.bicCode}
                        onChange={(e) => setParticipantForm(prev => ({...prev, bicCode: e.target.value}))}
                        placeholder="BMIBMABBXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Bank Type</Label>
                      <Select value={participantForm.type} onValueChange={(value) => setParticipantForm(prev => ({...prev, type: value}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="islamic">Islamic</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="foreign">Foreign</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={participantForm.status} onValueChange={(value) => setParticipantForm(prev => ({...prev, status: value}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending Approval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Contact Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input 
                        id="contactPerson"
                        value={participantForm.contactPerson}
                        onChange={(e) => setParticipantForm(prev => ({...prev, contactPerson: e.target.value}))}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={participantForm.email}
                        onChange={(e) => setParticipantForm(prev => ({...prev, email: e.target.value}))}
                        placeholder="john.doe@bank.bh"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        value={participantForm.phone}
                        onChange={(e) => setParticipantForm(prev => ({...prev, phone: e.target.value}))}
                        placeholder="+973 1234 5678"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address"
                        value={participantForm.address}
                        onChange={(e) => setParticipantForm(prev => ({...prev, address: e.target.value}))}
                        placeholder="Bank address in Bahrain"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Configuration */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Technical Configuration</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="connectionType">Connection Type</Label>
                      <Select value={participantForm.connectionType} onValueChange={(value) => setParticipantForm(prev => ({...prev, connectionType: value}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">Direct Connection</SelectItem>
                          <SelectItem value="swift">SWIFT Network</SelectItem>
                          <SelectItem value="vpn">VPN Tunnel</SelectItem>
                          <SelectItem value="dedicated">Dedicated Line</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ipAddress">IP Address</Label>
                      <Input 
                        id="ipAddress"
                        value={participantForm.ipAddress}
                        onChange={(e) => setParticipantForm(prev => ({...prev, ipAddress: e.target.value}))}
                        placeholder="192.168.1.100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input 
                        id="port"
                        value={participantForm.port}
                        onChange={(e) => setParticipantForm(prev => ({...prev, port: e.target.value}))}
                        placeholder="8443"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="certificate">Certificate</Label>
                      <Input 
                        id="certificate"
                        value={participantForm.certificate}
                        onChange={(e) => setParticipantForm(prev => ({...prev, certificate: e.target.value}))}
                        placeholder="Certificate fingerprint"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsParticipantDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleParticipantSubmit}>
                  Save Participant
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {configItems.map((item) => {
            const IconComponent = item.icon;
            
            return (
              <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
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
                  <div className="space-y-2">
                    {item.items.map((subItem, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-1 text-xs">
                        {subItem}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}