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
  
  // Debug logging
  console.log('ConditionalQuickActions Debug:', {
    pageKey,
    systemType,
    layout,
    showQuickActions: layout.showQuickActions,
    quickActionsPosition: layout.quickActionsPosition,
    quickActionsFixed: layout.quickActionsFixed
  });

  if (!layout.showQuickActions || layout.quickActionsPosition === 'none') {
    console.log('Quick Actions hidden by configuration');
    return null;
  }

  if (layout.quickActionsPosition === 'inline') {
    // For inline Quick Actions, they should be rendered within the page content
    console.log('Quick Actions should be inline - returning null');
    return null; // The page itself handles inline Quick Actions
  }

  if (layout.quickActionsPosition === 'right-sidebar') {
    console.log('Rendering right-sidebar Quick Actions, fixed:', layout.quickActionsFixed);
    
    if (layout.quickActionsFixed) {
      const baseClasses = "fixed right-20 top-32 w-64 h-[calc(100vh-12rem)] z-20 bg-background border rounded-lg shadow-lg";
      const containerClasses = "space-y-4 h-full overflow-y-auto p-4";

      return (
        <div className={`${baseClasses} ${className || ''}`}>
          <div className={containerClasses}>
            <QuickActionsManager 
              pageKey={pageKey}
              systemType={systemType}
              onActionClick={onActionClick}
            />
          </div>
        </div>
      );
    } else {
      // Inline positioning - same as BalancesLiquidityPage approach
      return (
        <div className={`w-80 bg-background border rounded-lg shadow-lg p-4 ${className || ''}`}>
          <QuickActionsManager 
            pageKey={pageKey}
            systemType={systemType}
            onActionClick={onActionClick}
          />
        </div>
      );
    }
  }

  console.log('No matching configuration - returning null');
  return null;
};