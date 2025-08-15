import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Sidebar,
  SidebarContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  X,
  ChevronRight,
  Menu
} from 'lucide-react';
import navigationConfig, { NavigationItem } from '@/config/navigationConfig';

export function AppSidebar() {
  const { user } = useAuth();
  const { canAccessRoute } = usePermissions();
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Get accessible navigation items based on user role
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      if (user?.role && item.roles.includes(user.role)) return true;
      return canAccessRoute(item.roles);
    });
  };

  // Filter items based on search query
  const filterItemsBySearch = (items: NavigationItem[], query: string): NavigationItem[] => {
    if (!query.trim()) return items;
    
    const searchTerm = query.toLowerCase().trim();
    
    const filterRecursive = (item: NavigationItem): NavigationItem | null => {
      const titleMatches = item.title.toLowerCase().includes(searchTerm);
      const descMatches = item.description?.toLowerCase().includes(searchTerm);
      const keywordMatches = item.keywords?.some(k => k.toLowerCase().includes(searchTerm));
      
      let filteredChildren: NavigationItem[] = [];
      if (item.children) {
        filteredChildren = item.children
          .map(child => filterRecursive(child))
          .filter((child): child is NavigationItem => child !== null);
      }
      
      if (titleMatches || descMatches || keywordMatches || filteredChildren.length > 0) {
        return { ...item, children: filteredChildren };
      }
      
      return null;
    };

    return items
      .map(item => filterRecursive(item))
      .filter((item): item is NavigationItem => item !== null);
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Auto-expand sections based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find and expand sections containing current route
    const findAndExpandPath = (items: NavigationItem[], parentId = '') => {
      items.forEach(item => {
        const fullId = parentId ? `${parentId}-${item.id}` : item.id;
        
        if (currentPath === item.path || currentPath.startsWith(item.path + '/')) {
          setExpandedSections(prev => new Set([...prev, fullId]));
        }
        
        if (item.children) {
          findAndExpandPath(item.children, fullId);
        }
      });
    };

    // Check primary navigation
    findAndExpandPath(navigationConfig.primaryNavigation);
    
    // Check secondary navigation
    Object.entries(navigationConfig.secondaryNavigation).forEach(([key, items]) => {
      if (currentPath.startsWith(`/${key}`)) {
        setExpandedSections(prev => new Set([...prev, key]));
        findAndExpandPath(items, key);
      }
    });
  }, [location.pathname]);

  // Highlight matched text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-primary/20 text-primary rounded px-1">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    ));
  };

  // Check if item is active
  const isItemActive = (item: NavigationItem): boolean => {
    if (location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }
    return false;
  };

  // Render navigation item
  const renderNavigationItem = (item: NavigationItem, level = 0, parentId = '') => {
    const fullId = parentId ? `${parentId}-${item.id}` : item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(fullId);
    const isActive = isItemActive(item);
    const accessibleChildren = hasChildren ? getAccessibleItems(item.children!) : [];

    // Calculate indentation based on level
    const indentClass = level === 0 ? 'pl-4' : level === 1 ? 'pl-8' : 'pl-12';
    
    return (
      <div key={fullId} className="mb-1">
        {/* Navigation Item */}
        <div className={`group relative ${indentClass}`}>
          <NavLink
            to={item.path}
            className={({ isActive: linkActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-accent/50 ${
                linkActive || isActive
                  ? 'bg-accent text-accent-foreground font-medium shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              } ${level === 0 ? 'font-medium' : level === 1 ? 'font-normal' : 'font-light text-xs'}`
            }
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleSection(fullId);
              }
            }}
          >
            {/* Icon */}
            <item.icon className={`flex-shrink-0 ${
              level === 0 ? 'h-5 w-5' : level === 1 ? 'h-4 w-4' : 'h-3 w-3'
            }`} />
            
            {/* Title */}
            {!isCollapsed && (
              <>
                <span className="flex-1 truncate">
                  {highlightText(item.title, searchQuery)}
                </span>
                
                {/* Badge for children count */}
                {hasChildren && accessibleChildren.length > 0 && (
                  <Badge variant="secondary" className="text-xs h-5 px-1.5">
                    {accessibleChildren.length}
                  </Badge>
                )}
                
                {/* Expand/Collapse indicator */}
                {hasChildren && (
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`} 
                  />
                )}
              </>
            )}
          </NavLink>
        </div>

        {/* Children - Only show when expanded and not collapsed */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {accessibleChildren.map(child => 
              renderNavigationItem(child, level + 1, fullId)
            )}
          </div>
        )}
      </div>
    );
  };

  // Get filtered navigation items
  const primaryItems = getAccessibleItems(navigationConfig.primaryNavigation);
  const filteredPrimaryItems = searchQuery ? filterItemsBySearch(primaryItems, searchQuery) : primaryItems;

  // Get all secondary items when searching
  const getAllSecondaryItems = () => {
    let allItems: NavigationItem[] = [];
    Object.values(navigationConfig.secondaryNavigation).forEach(items => {
      if (Array.isArray(items)) {
        allItems = allItems.concat(getAccessibleItems(items));
      }
    });
    return allItems;
  };

  const secondaryItems = getAllSecondaryItems();
  const filteredSecondaryItems = searchQuery ? filterItemsBySearch(secondaryItems, searchQuery) : [];

  return (
    <Sidebar className="dashboard-sidebar-bg border-r border-border/40">
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground hover:bg-accent/50"
          >
            <Menu className="h-4 w-4" />
          </Button>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 h-9 bg-background/50 border-border/60 focus:border-primary/60"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {searchQuery ? (
            /* Search Results */
            <div className="space-y-4">
              {filteredPrimaryItems.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Primary Navigation
                  </div>
                  <div className="space-y-1">
                    {filteredPrimaryItems.map(item => renderNavigationItem(item, 0))}
                  </div>
                </div>
              )}
              
              {filteredSecondaryItems.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Secondary Navigation
                  </div>
                  <div className="space-y-1">
                    {filteredSecondaryItems.map(item => renderNavigationItem(item, 0))}
                  </div>
                </div>
              )}
              
              {filteredPrimaryItems.length === 0 && filteredSecondaryItems.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No results found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          ) : (
            /* Regular Navigation */
            <div className="space-y-6">
              {/* Primary Navigation */}
              <div>
                {!isCollapsed && (
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Main
                  </div>
                )}
                <div className="space-y-1">
                  {primaryItems.map(item => renderNavigationItem(item, 0))}
                </div>
              </div>

              {/* Secondary Navigation for current section */}
              {!isCollapsed && Object.entries(navigationConfig.secondaryNavigation).map(([key, items]) => {
                const accessibleItems = getAccessibleItems(items);
                const shouldShow = location.pathname.startsWith(`/${key}`) && accessibleItems.length > 0;
                
                if (!shouldShow) return null;
                
                return (
                  <div key={key}>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {key.toUpperCase()} Menu
                    </div>
                    <div className="space-y-1">
                      {accessibleItems.map(item => renderNavigationItem(item, 0, key))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border/40">
            <div className="text-xs text-muted-foreground">
              CBB Portal v1.0
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}