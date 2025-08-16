import { useLocation } from 'react-router-dom';
import { getPageTitle, getPageDescription } from '@/utils/pageConfig';

interface PageHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  className = "flex items-center justify-between mb-6" 
}: PageHeaderProps) => {
  const location = useLocation();
  
  // Use provided title/description or fallback to configured ones
  const pageTitle = title || getPageTitle(location.pathname);
  const pageDescription = description || getPageDescription(location.pathname);

  return (
    <div className={className}>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{pageTitle}</h1>
        {pageDescription && (
          <p className="text-slate-600">{pageDescription}</p>
        )}
      </div>
    </div>
  );
};