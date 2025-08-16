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
    // Return just the menu item title without system prefix
    return secondaryMatch.title;
  }

  return primaryMatch.title;
}

// Helper function to recursively search navigation tree
function findInNavigationTree(items: NavigationItem[], pathname: string): NavigationItem | null {
  let bestMatch: NavigationItem | null = null;
  
  for (const item of items) {
    // Check exact match first - this is the most specific
    if (pathname === item.path) {
      return item;
    }
    
    // Check children for exact matches first
    if (item.children) {
      const childMatch = findInNavigationTree(item.children, pathname);
      if (childMatch) {
        return childMatch; // Return the most specific child match
      }
    }
    
    // Check if path starts with item path (but prioritize exact matches)
    if (pathname.startsWith(item.path + '/')) {
      bestMatch = item; // Keep this as a fallback
    }
  }
  
  return bestMatch;
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