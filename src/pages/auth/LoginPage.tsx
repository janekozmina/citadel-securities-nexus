
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const emailParts = email.split('@');
    if (emailParts.length !== 2 || emailParts[1] !== 'demo.com') {
      toast({
        title: 'Invalid Email',
        description: 'Email must be in format <role>@demo.com',
        variant: 'destructive',
      });
      return;
    }

    const roleName = emailParts[0].toLowerCase();
    let role: UserRole;
    
    switch (roleName) {
      case 'admin':
        role = 'Admin';
        break;
      case 'issuer':
        role = 'Issuer';
        break;
      case 'custodian':
        role = 'Custodian';
        break;
      case 'broker':
        role = 'Broker';
        break;
      case 'participant':
        role = 'Participant';
        break;
      case 'regulator':
        role = 'Regulator';
        break;
      default:
        toast({
          title: 'Invalid Role',
          description: 'Valid roles: admin, issuer, custodian, broker, participant, regulator',
          variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password, role);
      if (success) {
        navigate('/mfa');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Use password: CMA!@#$',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Unified Portal</h1>
        </div>
        
        <Card style={{ backgroundColor: '#3B3B3B' }} className="border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#2d2d2d' }}
                  className="border-gray-600 text-white placeholder-gray-400"
                  placeholder="role@demo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#2d2d2d' }}
                  className="border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 rounded text-sm text-gray-300" style={{ backgroundColor: '#2d2d2d' }}>
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@demo.com, issuer@demo.com, etc.</p>
              <p>Password: CMA!@#$</p>
              <p>MFA Code: 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
