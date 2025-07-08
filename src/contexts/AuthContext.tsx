import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'Admin' | 'Issuer' | 'Custodian' | 'Broker' | 'Participant' | 'Regulator';

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
    // Mock authentication - in real app, this would call an API
    if (password === 'CMA!@#$') {
      const mockUser: User = {
        id: '1',
        username: email,
        role,
        name: role
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('csd_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const verifyMFA = async (code: string): Promise<boolean> => {
    // Mock MFA verification
    if (code === '123456') {
      setIsMFAVerified(true);
      localStorage.setItem('csd_mfa_verified', 'true');
      navigate('/');
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
