import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const MFAPage = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifyMFA, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter a 6-digit code',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await verifyMFA(code);
      if (!success) {
        toast({
          title: 'Verification Failed',
          description: 'Invalid MFA code. Use: 123456',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during verification',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-page-bg">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Multi-Factor Authentication</h1>
          <p className="text-gray-400">Welcome, {user?.name}</p>
        </div>
        
        <Card className="auth-card-bg border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-center">Enter Verification Code</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-gray-200">6-Digit Code</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="bg-gray-700 border-gray-600 text-white text-center text-lg tracking-widest placeholder-gray-400"
                  placeholder="000000"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-gray-700 rounded text-sm text-gray-300 text-center">
              <p><strong>Demo MFA Code:</strong> 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MFAPage;