
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

    // Extract role from email
    const emailParts = email.split('@');
    if (emailParts.length !== 2 || emailParts[1] !== 'test.com') {
      toast({
        title: 'Invalid Email',
        description: 'Email must be in format <role>@test.com',
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
      case 'regulator':
        role = 'Regulator';
        break;
      default:
        toast({
          title: 'Invalid Role',
          description: 'Valid roles: admin, issuer, custodian, broker, regulator',
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">CSD Portal</h1>
          <p className="text-slate-400">Central Securities Depository & Registry</p>
        </div>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="role@test.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-slate-700 rounded text-sm text-slate-300">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@test.com, issuer@test.com, etc.</p>
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
