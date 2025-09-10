import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mfaGenerator } from '@/utils/mfaGenerator';

export type UserRole = 'Admin' | 'Issuer' | 'Custodian' | 'Broker' | 'Participant' | 'Regulator' | 'CSDParticipant';

interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  verifyMFA: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isMFAVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMFAVerified, setIsMFAVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing session on mount to ensure fresh login
    localStorage.removeItem('csd_user');
    localStorage.removeItem('csd_mfa_verified');
    
    // Check for existing session
    const savedUser = localStorage.getItem('csd_user');
    const savedMFA = localStorage.getItem('csd_mfa_verified');
    
    if (savedUser && savedMFA) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setIsMFAVerified(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Import portalConfig for proper validation
    const portalConfig = (await import('@/config/portalConfig')).default;
    
    // Find user in portalConfig
    const foundUser = portalConfig.demo.users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const mockUser: User = {
        id: '1',
        username: email,
        role: foundUser.role as UserRole,
        name: foundUser.name
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('csd_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const verifyMFA = async (code: string): Promise<boolean> => {
    // Use dynamic MFA validation
    if (mfaGenerator.validateCode(code)) {
      setIsMFAVerified(true);
      localStorage.setItem('csd_mfa_verified', 'true');
      
      // Redirect based on user role
      if (user?.role === 'CSDParticipant') {
        navigate('/participant');
      } else {
        navigate('/');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsMFAVerified(false);
    localStorage.removeItem('csd_user');
    localStorage.removeItem('csd_mfa_verified');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        verifyMFA,
        isAuthenticated,
        isMFAVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
