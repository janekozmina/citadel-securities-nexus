// Standard page layout configuration for consistent structure across all RTGS pages

interface PageLayoutConfig {
  showBreadcrumbs: boolean;
  showPageHeader: boolean;
  showQuickActions: boolean;
  quickActionsPosition: 'right-sidebar' | 'inline' | 'none';
  containerClass?: string;
}

export const defaultPageLayout: PageLayoutConfig = {
  showBreadcrumbs: true,
  showPageHeader: false, // Don't show separate page header when breadcrumbs handle the title
  showQuickActions: true,
  quickActionsPosition: 'right-sidebar',
  containerClass: 'space-y-6'
};

export const getPageLayout = (pageKey?: string): PageLayoutConfig => {
  // All RTGS pages use the same layout pattern
  return defaultPageLayout;
};