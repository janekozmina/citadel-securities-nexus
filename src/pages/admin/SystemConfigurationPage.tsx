import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SystemConfigurationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'System Configuration | Unified Portal';
  }, []);

  const configurationOptions = [
    {
      id: 'rtgs-config',
      title: 'RTGS Configuration',
      description: 'Configure Real-Time Gross Settlement system parameters, limits, and operational settings',
      icon: Settings,
      path: '/admin/config/rtgs',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'csd-config',
      title: 'CSD Configuration',
      description: 'Configure Central Securities Depository parameters, instruments, and settlement settings',
      icon: Database,
      path: '/admin/config/csd',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Configuration</h1>
        <p className="text-slate-600">
          Configure system parameters and settings for RTGS and CSD systems
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {configurationOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Card key={option.id} className={`transition-colors ${option.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    <IconComponent className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate(option.path)}
                  className="w-full"
                  variant="outline"
                >
                  Configure {option.title.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}