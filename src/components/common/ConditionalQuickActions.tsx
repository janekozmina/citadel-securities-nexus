import React from 'react';
import { QuickActionsManager } from './QuickActionsManager';
import { getPageLayout } from '@/config/pageLayoutConfig';

interface ConditionalQuickActionsProps {
  pageKey: string;
  systemType: 'rtgs' | 'csd' | 'cms' | 'common' | 'participants';
  onActionClick?: (actionId: string) => void;
  className?: string;
}

export const ConditionalQuickActions: React.FC<ConditionalQuickActionsProps> = ({
  pageKey,
  systemType,
  onActionClick,
  className
}) => {
  const layout = getPageLayout(pageKey);

  if (!layout.showQuickActions || layout.quickActionsPosition === 'none') {
    return null;
  }

  if (layout.quickActionsPosition === 'inline') {
    // For inline Quick Actions, they should be rendered within the page content
    return null; // The page itself handles inline Quick Actions
  }

  if (layout.quickActionsPosition === 'right-sidebar') {
    const baseClasses = layout.quickActionsFixed 
      ? "fixed right-20 top-32 w-64 h-[calc(100vh-12rem)] z-20"
      : "w-64 space-y-4";
    
    const containerClasses = layout.quickActionsFixed
      ? "space-y-4 h-full overflow-y-auto"
      : "";

    return (
      <div className={`${baseClasses} ${className || ''}`}>
        {layout.quickActionsFixed ? (
          <div className={containerClasses}>
            <QuickActionsManager 
              pageKey={pageKey}
              systemType={systemType}
              onActionClick={onActionClick}
            />
          </div>
        ) : (
          <QuickActionsManager 
            pageKey={pageKey}
            systemType={systemType}
            onActionClick={onActionClick}
          />
        )}
      </div>
    );
  }

  return null;
};