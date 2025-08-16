import { NavigationItem, primaryNavigation, secondaryNavigation } from '@/config/navigationConfig';

// Helper function to get page title from navigation config
export function getPageTitle(pathname: string): string {
  // Check primary navigation first
  const primaryMatch = primaryNavigation.find(item => 
    pathname === item.path || pathname.startsWith(item.path + '/')
  );

  if (!primaryMatch) {
    return 'Dashboard'; // Fallback
  }

  // If exact match with primary, return primary title
  if (pathname === primaryMatch.path) {
    return primaryMatch.title;
  }

  // Check secondary navigation
  const secondaryItems = secondaryNavigation[primaryMatch.id] || [];
  const secondaryMatch = findInNavigationTree(secondaryItems, pathname);

  if (secondaryMatch) {
    // For nested pages, show "Primary — Secondary" format
    if (primaryMatch.id === 'rtgs' || primaryMatch.id === 'csd' || primaryMatch.id === 'cms') {
      return `${primaryMatch.title} — ${secondaryMatch.title}`;
    }
    return secondaryMatch.title;
  }

  return primaryMatch.title;
}

// Helper function to recursively search navigation tree
function findInNavigationTree(items: NavigationItem[], pathname: string): NavigationItem | null {
  for (const item of items) {
    // Check exact match
    if (pathname === item.path) {
      return item;
    }
    
    // Check if path starts with item path (for nested routes)
    if (pathname.startsWith(item.path + '/')) {
      // First check children for more specific match
      if (item.children) {
        const childMatch = findInNavigationTree(item.children, pathname);
        if (childMatch) {
          return childMatch;
        }
      }
      // Return this item if no more specific child found
      return item;
    }

    // Recursively check children
    if (item.children) {
      const childMatch = findInNavigationTree(item.children, pathname);
      if (childMatch) {
        return childMatch;
      }
    }
  }
  
  return null;
}

// Helper function to get page description from navigation config
export function getPageDescription(pathname: string): string | undefined {
  const primaryMatch = primaryNavigation.find(item => 
    pathname === item.path || pathname.startsWith(item.path + '/')
  );

  if (!primaryMatch) {
    return undefined;
  }

  if (pathname === primaryMatch.path) {
    return primaryMatch.description;
  }

  const secondaryItems = secondaryNavigation[primaryMatch.id] || [];
  const secondaryMatch = findInNavigationTree(secondaryItems, pathname);

  return secondaryMatch?.description || primaryMatch.description;
}