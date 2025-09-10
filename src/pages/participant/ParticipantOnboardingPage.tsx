import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlus,
  ExternalLink,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Users,
  Award,
  BookOpen,
  Settings
} from 'lucide-react';

const ParticipantOnboardingPage = () => {
  const [completedSteps, setCompletedSteps] = useState([1, 2, 3]);

  const onboardingSteps = [
    {
      id: 1,
      title: 'Initial Setup',
      description: 'Account creation and basic configuration',
      status: 'completed',
      estimatedTime: '30 minutes'
    },
    {
      id: 2,
      title: 'Security Configuration',
      description: 'Set up security parameters and authentication',
      status: 'completed',
      estimatedTime: '45 minutes'
    },
    {
      id: 3,
      title: 'System Integration',
      description: 'Connect your systems and test connectivity',
      status: 'completed',
      estimatedTime: '2 hours'
    },
    {
      id: 4,
      title: 'Training Completion',
      description: 'Complete mandatory training modules',
      status: 'in-progress',
      estimatedTime: '4 hours'
    },
    {
      id: 5,
      title: 'Compliance Verification',
      description: 'Regulatory compliance checks and documentation',
      status: 'pending',
      estimatedTime: '1 hour'
    },
    {
      id: 6,
      title: 'Go-Live Preparation',
      description: 'Final checks and production readiness',
      status: 'pending',
      estimatedTime: '2 hours'
    }
  ];

  const trainingModules = [
    {
      title: 'CSD Operations Fundamentals',
      duration: '45 min',
      progress: 100,
      status: 'completed',
      type: 'video'
    },
    {
      title: 'RTGS Payment Processing',
      duration: '60 min',
      progress: 75,
      status: 'in-progress',
      type: 'interactive'
    },
    {
      title: 'Risk Management & Compliance',
      duration: '90 min',
      progress: 0,
      status: 'not-started',
      type: 'video'
    },
    {
      title: 'System Security Best Practices',
      duration: '30 min',
      progress: 100,
      status: 'completed',
      type: 'document'
    },
    {
      title: 'Reporting and Analytics',
      duration: '40 min',
      progress: 0,
      status: 'not-started',
      type: 'interactive'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'interactive': return <Settings className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleExternalOnboarding = () => {
    window.open('http://ddw.k8s1.cma.se/', '_blank');
  };

  const overallProgress = (completedSteps.length / onboardingSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Participant Onboarding</h1>
          <p className="text-muted-foreground">Complete your participant setup and training</p>
        </div>
        <Button onClick={handleExternalOnboarding} className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Access External Onboarding
        </Button>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Onboarding Progress
          </CardTitle>
          <CardDescription>Track your onboarding completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Completed ({completedSteps.length})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>In Progress (1)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>Pending ({onboardingSteps.length - completedSteps.length - 1})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Onboarding Access */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            External Onboarding Platform
          </CardTitle>
          <CardDescription>Access the dedicated onboarding and training platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-2">
                Complete your comprehensive onboarding process on the external platform with interactive tutorials and assessments.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">Interactive Training</Badge>
                <Badge variant="outline" className="text-xs">Progress Tracking</Badge>
                <Badge variant="outline" className="text-xs">Certification</Badge>
              </div>
            </div>
            <Button onClick={handleExternalOnboarding}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Launch Platform
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="steps">Onboarding Steps</TabsTrigger>
          <TabsTrigger value="training">Training Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Checklist</CardTitle>
              <CardDescription>Complete each step to finish your onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{step.title}</span>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(step.status)}`}>
                          {step.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                      <p className="text-xs text-muted-foreground">Estimated time: {step.estimatedTime}</p>
                    </div>
                    <div>
                      <Button 
                        variant={step.status === 'completed' ? 'outline' : 'default'} 
                        size="sm"
                        disabled={step.status === 'pending'}
                      >
                        {step.status === 'completed' ? 'Review' : step.status === 'in-progress' ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Modules</CardTitle>
              <CardDescription>Complete mandatory training to proceed with onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingModules.map((module, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(module.type)}
                        <span className="font-medium">{module.title}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(module.status)}`}>
                        {module.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Duration: {module.duration}</span>
                        <span className="text-muted-foreground">{module.progress}% Complete</span>
                      </div>
                      <Progress value={module.progress} className="w-full" />
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          variant={module.status === 'completed' ? 'outline' : 'default'}
                        >
                          {module.status === 'completed' ? 'Review' : 
                           module.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common onboarding tasks and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Documentation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">Contact Support</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Award className="w-5 h-5" />
              <span className="text-sm">Certifications</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleExternalOnboarding}>
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">External Platform</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantOnboardingPage;