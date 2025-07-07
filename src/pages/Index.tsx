
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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

  return null;
};

export default Index;
