import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen,
  ExternalLink,
  Search,
  FileText,
  Video,
  HelpCircle,
  Globe,
  Download,
  Clock
} from 'lucide-react';

const ParticipantKnowledgeHubPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const knowledgeCategories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      articles: [
        { title: 'Participant Onboarding Guide', type: 'Guide', readTime: '10 min' },
        { title: 'System Requirements', type: 'Technical', readTime: '5 min' },
        { title: 'First Time Setup', type: 'Tutorial', readTime: '15 min' },
        { title: 'Security Best Practices', type: 'Security', readTime: '8 min' }
      ]
    },
    {
      title: 'Operations',
      icon: FileText,
      articles: [
        { title: 'Transaction Processing Guide', type: 'Operations', readTime: '12 min' },
        { title: 'Settlement Procedures', type: 'Operations', readTime: '18 min' },
        { title: 'Error Handling and Recovery', type: 'Troubleshooting', readTime: '10 min' },
        { title: 'Reporting and Analytics', type: 'Reporting', readTime: '15 min' }
      ]
    },
    {
      title: 'Compliance & Regulations',
      icon: Globe,
      articles: [
        { title: 'Regulatory Requirements Overview', type: 'Compliance', readTime: '20 min' },
        { title: 'AML/KYC Procedures', type: 'Compliance', readTime: '25 min' },
        { title: 'Audit Trail Requirements', type: 'Audit', readTime: '12 min' },
        { title: 'Risk Management Framework', type: 'Risk', readTime: '30 min' }
      ]
    },
    {
      title: 'Technical Documentation',
      icon: FileText,
      articles: [
        { title: 'API Documentation', type: 'API', readTime: '45 min' },
        { title: 'Integration Guidelines', type: 'Integration', readTime: '35 min' },
        { title: 'Message Formats and Standards', type: 'Technical', readTime: '20 min' },
        { title: 'Error Codes Reference', type: 'Reference', readTime: '10 min' }
      ]
    }
  ];

  const recentUpdates = [
    { title: 'Updated Security Guidelines', date: '2024-01-08', type: 'Update' },
    { title: 'New API Endpoints Available', date: '2024-01-05', type: 'New Feature' },
    { title: 'Settlement Process Changes', date: '2024-01-03', type: 'Process Change' },
    { title: 'System Maintenance Schedule', date: '2024-01-02', type: 'Announcement' }
  ];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'guide': return 'bg-blue-100 text-blue-700';
      case 'tutorial': return 'bg-green-100 text-green-700';
      case 'security': return 'bg-red-100 text-red-700';
      case 'operations': return 'bg-purple-100 text-purple-700';
      case 'compliance': return 'bg-orange-100 text-orange-700';
      case 'api': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExternalKnowledgeHub = () => {
    window.open('https://knowledge-hub.fly.dev/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Hub</h1>
          <p className="text-muted-foreground">Documentation, guides, and training resources</p>
        </div>
        <Button onClick={handleExternalKnowledgeHub} className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Access External Knowledge Hub
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* External Access */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            External Knowledge Hub
          </CardTitle>
          <CardDescription>Access the comprehensive online knowledge base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-2">
                Get access to the latest documentation, video tutorials, and community resources.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">24/7 Access</Badge>
                <Badge variant="outline" className="text-xs">Video Tutorials</Badge>
                <Badge variant="outline" className="text-xs">Community Support</Badge>
              </div>
            </div>
            <Button onClick={handleExternalKnowledgeHub}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Launch Knowledge Hub
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Updates
          </CardTitle>
          <CardDescription>Latest changes and announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{update.title}</p>
                  <p className="text-sm text-muted-foreground">{update.date}</p>
                </div>
                <Badge variant="outline" className="text-xs">{update.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Categories */}
      <div className="grid gap-6">
        {knowledgeCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.articles.map((article, articleIndex) => (
                  <div
                    key={articleIndex}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{article.title}</h4>
                      <Badge variant="outline" className={`text-xs ml-2 ${getTypeColor(article.type)}`}>
                        {article.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </p>
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common knowledge base tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Video className="w-5 h-5" />
              <span className="text-sm">Video Tutorials</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="w-5 h-5" />
              <span className="text-sm">Download Resources</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleExternalKnowledgeHub}>
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">External Hub</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantKnowledgeHubPage;