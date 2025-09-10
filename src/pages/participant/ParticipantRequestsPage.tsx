import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ParticipantRequestsPage = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    priority: '',
    subject: '',
    description: '',
    expectedDate: ''
  });

  const requestTypes = [
    'Account Configuration',
    'System Access Request',
    'Limit Adjustment',
    'New Service Activation',
    'Technical Support',
    'Compliance Inquiry',
    'Documentation Request',
    'Training Request',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700' }
  ];

  const existingRequests = [
    {
      id: 'REQ-2024-001',
      type: 'Limit Adjustment',
      subject: 'Increase Daily Settlement Limit',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-01-08',
      expectedResponse: '2024-01-12',
      assignedTo: 'Central Bank Operations Team'
    },
    {
      id: 'REQ-2024-002',
      type: 'New Service Activation',
      subject: 'Enable GCC Multi-Currency Operations',
      status: 'in-review',
      priority: 'high',
      submittedDate: '2024-01-05',
      expectedResponse: '2024-01-10',
      assignedTo: 'Technical Review Board'
    },
    {
      id: 'REQ-2024-003',
      type: 'Technical Support',
      subject: 'API Integration Issue Resolution',
      status: 'completed',
      priority: 'urgent',
      submittedDate: '2024-01-03',
      expectedResponse: '2024-01-04',
      assignedTo: 'Technical Support'
    },
    {
      id: 'REQ-2024-004',
      type: 'Compliance Inquiry',
      subject: 'Regulatory Reporting Requirements Clarification',
      status: 'rejected',
      priority: 'low',
      submittedDate: '2024-01-02',
      expectedResponse: '2024-01-05',
      assignedTo: 'Compliance Team'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in-review':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'in-review': return 'bg-orange-100 text-orange-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj?.color || 'bg-gray-100 text-gray-700';
  };

  const handleSubmitRequest = () => {
    if (!formData.type || !formData.subject || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Your request has been submitted successfully and assigned ID REQ-2024-005",
      });
      
      // Reset form
      setFormData({
        type: '',
        priority: '',
        subject: '',
        description: '',
        expectedDate: ''
      });
      
      setIsCreating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Requests for Central Bank</h1>
          <p className="text-muted-foreground">Submit and track requests to the Central Bank</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">
            <Plus className="w-4 h-4 mr-2" />
            Create Request
          </TabsTrigger>
          <TabsTrigger value="track">
            <FileText className="w-4 h-4 mr-2" />
            Track Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Request
              </CardTitle>
              <CardDescription>Submit a new request to the Central Bank</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="request-type">Request Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                      <SelectContent>
                        {requestTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your request"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your request..."
                    className="min-h-32"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected-date">Expected Response Date</Label>
                  <Input
                    id="expected-date"
                    type="date"
                    value={formData.expectedDate}
                    onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button">
                    Save as Draft
                  </Button>
                  <Button onClick={handleSubmitRequest} disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Request Tracking
              </CardTitle>
              <CardDescription>Monitor the status of your submitted requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="font-medium">{request.id}</span>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(request.status)}`}>
                          {request.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">{request.subject}</h4>
                      <p className="text-sm text-muted-foreground">Type: {request.type}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Submitted: {request.submittedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expected: {request.expectedResponse}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Assigned: {request.assignedTo}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Request Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Request Templates</CardTitle>
          <CardDescription>Common request types for faster submission</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Limit Increase</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Documentation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">Technical Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantRequestsPage;