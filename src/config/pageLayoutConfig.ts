// Standard page layout configuration for consistent structure across all pages

interface PageLayoutConfig {
  showBreadcrumbs: boolean;
  showPageHeader: boolean;
  showQuickActions: boolean;
  quickActionsPosition: 'right-sidebar' | 'inline' | 'none';
  containerClass?: string;
  quickActionsFixed?: boolean; // Whether Quick Actions should be fixed positioned to avoid overlaps
}

// Page-specific configurations
const pageLayoutConfigs: Record<string, Partial<PageLayoutConfig>> = {
  'account-management': {
    showQuickActions: true,
    quickActionsPosition: 'right-sidebar',
    quickActionsFixed: false // Use inline positioning like balances-liquidity
  },
  'balances-liquidity': {
    showQuickActions: true,
    quickActionsPosition: 'right-sidebar',
    quickActionsFixed: false // Use inline positioning
  },
  'business-day-management': {
    showQuickActions: true,
    quickActionsPosition: 'right-sidebar',
    quickActionsFixed: false // Use inline positioning like balances-liquidity
  },
  'transaction-status': {
    showQuickActions: true,
    quickActionsPosition: 'inline' // Hardcoded Quick Actions on this page
  },
  'bi-reports': {
    showQuickActions: false // No Quick Actions on BI Reports page
  }
};

export const defaultPageLayout: PageLayoutConfig = {
  showBreadcrumbs: true,
  showPageHeader: false, // Don't show separate page header when breadcrumbs handle the title
  showQuickActions: true,
  quickActionsPosition: 'right-sidebar',
  containerClass: 'space-y-6',
  quickActionsFixed: false
};

export const getPageLayout = (pageKey?: string): PageLayoutConfig => {
  const specificConfig = pageKey ? pageLayoutConfigs[pageKey] : {};
  return {
    ...defaultPageLayout,
    ...specificConfig
  };
};