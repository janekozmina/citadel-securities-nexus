
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HomePage from './dashboard/HomePage';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isMFAVerified } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isMFAVerified) {
      navigate('/mfa');
    }
  }, [isAuthenticated, isMFAVerified, navigate]);

  // If user is authenticated and MFA verified, show the home page
  if (isAuthenticated && isMFAVerified) {
    return <HomePage />;
  }

  return null;
};

export default Index;
