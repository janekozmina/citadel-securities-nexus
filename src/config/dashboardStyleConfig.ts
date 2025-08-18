// Central configuration for dashboard styles and layout
export const dashboardStyleConfig = {
  // Page header styles - centralized for consistency
  pageHeader: {
    title: {
      className: "text-3xl font-bold tracking-tight",
      fontSize: "1.875rem", // 30px equivalent to text-3xl
    },
    subtitle: {
      className: "text-muted-foreground",
    },
    container: {
      className: "space-y-2",
    },
    wrapper: {
      className: "space-y-6",
    }
  },
  
  // Section header styles
  sectionHeader: {
    title: {
      className: "text-xl font-semibold",
    },
    subtitle: {
      className: "text-sm text-muted-foreground",
    }
  },
  
  // Grid layouts
  grid: {
    kpiCards: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    charts: "grid grid-cols-1 lg:grid-cols-2 gap-6",
    fullWidth: "grid grid-cols-1 gap-6"
  },
  
  // Card dimensions
  card: {
    defaultHeight: 400,
    compactHeight: 320,
    largeHeight: 500
  }
};

// Helper function to get consistent page header structure
export const getPageHeaderConfig = (title: string, description: string) => ({
  title,
  description,
  styles: dashboardStyleConfig.pageHeader
});