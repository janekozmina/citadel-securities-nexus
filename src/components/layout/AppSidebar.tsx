import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import navigationConfig, { NavigationItem } from '@/config/navigationConfig';

export function AppSidebar() {
  const { user } = useAuth();
  const { canAccessRoute } = usePermissions();
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainItem, setSelectedMainItem] = useState<NavigationItem | null>(null);
  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(new Set());

  // Flatten all navigation items for searching
  const flattenNavigationItems = (items: NavigationItem[], parentPath = ''): NavigationItem[] => {
    let flattened: NavigationItem[] = [];
    
    items.forEach(item => {
      // Add current item
      flattened.push({
        ...item,
        path: parentPath ? `${parentPath}/${item.path}` : item.path
      });
      
      // Add children recursively
      if (item.children) {
        flattened = flattened.concat(flattenNavigationItems(item.children, item.path));
      }
    });
    
    return flattened;
  };

  // Get all navigation items (primary + secondary flattened)
  const getAllNavigationItems = (): NavigationItem[] => {
    let allItems: NavigationItem[] = [...navigationConfig.primaryNavigation];
    
    // Add secondary navigation items
    Object.values(navigationConfig.secondaryNavigation).forEach(items => {
      if (Array.isArray(items)) {
        allItems = allItems.concat(flattenNavigationItems(items));
      }
    });
    
    return allItems;
  };

  // Filter items based on user role
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      // If no roles specified, accessible to all
      if (!item.roles || item.roles.length === 0) return true;
      
      // Check if user's role is in the item's roles
      if (user?.role && item.roles.includes(user.role)) return true;
      
      // Use permission system as fallback
      return canAccessRoute(item.roles);
    });
  };

  // Filter items based on search query
  const filterItemsBySearch = (items: NavigationItem[], query: string): NavigationItem[] => {
    if (!query.trim()) return items;
    
    const searchTerm = query.toLowerCase().trim();
    
    return items.filter(item => {
      // Search in title
      if (item.title.toLowerCase().includes(searchTerm)) return true;
      
      // Search in description
      if (item.description?.toLowerCase().includes(searchTerm)) return true;
      
      // Search in keywords
      if (item.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) return true;
      
      // Search in tags
      if (item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
      
      return false;
    });
  };

  // Highlight matched text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    ));
  };

  // Get filtered and accessible navigation items
  const accessibleItems = getAccessibleItems(getAllNavigationItems());
  const filteredItems = searchQuery ? filterItemsBySearch(accessibleItems, searchQuery) : [];
  
  // Get primary navigation items for normal display
  const primaryItems = getAccessibleItems(navigationConfig.primaryNavigation);

  // Auto-expand items when route changes
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which primary item contains current route
    const activeMainItem = primaryItems.find(item => {
      if (currentPath === item.path) return true;
      
      const secondaryItems = navigationConfig.secondaryNavigation[item.id] || [];
      return secondaryItems.some(secondaryItem => {
        if (currentPath === secondaryItem.path) return true;
        if (secondaryItem.children) {
          return secondaryItem.children.some(child => currentPath === child.path);
        }
        return false;
      });
    });
    
    if (activeMainItem) {
      setSelectedMainItem(activeMainItem);
      
      // Auto-expand relevant sub-items
      const secondaryItems = navigationConfig.secondaryNavigation[activeMainItem.id] || [];
      secondaryItems.forEach(item => {
        if (item.children?.some(child => currentPath === child.path)) {
          setExpandedSubItems(prev => new Set([...prev, item.id]));
        }
      });
    }
  }, [location.pathname, primaryItems]);

  // Auto-expand first result when searching
  useEffect(() => {
    if (searchQuery && filteredItems.length > 0) {
      const firstResult = filteredItems[0];
      const primaryItem = primaryItems.find(item => 
        firstResult.path.startsWith(item.path) || firstResult.id === item.id
      );
      if (primaryItem) {
        setSelectedMainItem(primaryItem);
      }
    }
  }, [searchQuery, filteredItems, primaryItems]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleSubItemExpansion = (itemId: string) => {
    setExpandedSubItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderSearchResults = () => {
    if (!searchQuery) return null;
    
    if (filteredItems.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">No results found for "{searchQuery}"</p>
          <p className="text-xs mt-1">Try different keywords or check spelling</p>
        </div>
      );
    }
    
    return (
      <div className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Search Results ({filteredItems.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">
                          {highlightText(item.title, searchQuery)}
                        </div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {highlightText(item.description, searchQuery)}
                          </div>
                        )}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    );
  };

  const renderMainPanel = () => (
    <div className="h-full flex flex-col">
      {/* Main Navigation - Icons Only */}
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarMenu>
          {primaryItems.map((item) => {
            const isActive = location.pathname === item.path || selectedMainItem?.id === item.id;
            const hasSubItems = navigationConfig.secondaryNavigation[item.id]?.length > 0;
            
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => {
                    if (hasSubItems) {
                      setSelectedMainItem(item);
                    }
                  }}
                  asChild={!hasSubItems}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  title={item.title}
                >
                  {hasSubItems ? (
                    <div className="flex items-center justify-center">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </div>
                  ) : (
                    <NavLink to={item.path} className="flex items-center justify-center w-full">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </NavLink>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>
    </div>
  );

  const renderSubPanel = () => {
    if (!selectedMainItem) return null;
    
    const secondaryItems = navigationConfig.secondaryNavigation[selectedMainItem.id] || [];
    const accessibleSecondaryItems = getAccessibleItems(secondaryItems);

    return (
      <div className="h-full flex flex-col bg-black/20">
        {/* Sub Panel Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedMainItem(null);
                setExpandedSubItems(new Set());
              }}
              className="p-1 h-auto text-white/80 hover:text-white hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <selectedMainItem.icon className="h-5 w-5 text-white" />
            <span className="font-medium text-white">{selectedMainItem.title}</span>
          </div>
        </div>

        {/* Search Results or Regular Menu */}
        {searchQuery ? (
          renderSearchResults()
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <SidebarMenu>
              {accessibleSecondaryItems.map((subItem) => {
                const isActive = location.pathname === subItem.path || 
                  (subItem.children && subItem.children.some(child => location.pathname === child.path));
                const hasSubItems = subItem.children && subItem.children.length > 0;
                const isExpanded = expandedSubItems.has(subItem.id);
                
                return (
                  <div key={subItem.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => {
                          if (hasSubItems) {
                            toggleSubItemExpansion(subItem.id);
                          }
                        }}
                        asChild={!hasSubItems}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {hasSubItems ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <subItem.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm font-medium">{subItem.title}</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        ) : (
                          <NavLink
                            to={subItem.path}
                            className="flex items-center gap-3 w-full"
                          >
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">{subItem.title}</span>
                          </NavLink>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {/* Third Level Items - Collapsible */}
                    {hasSubItems && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {subItem.children?.filter(child => getAccessibleItems([child]).length > 0).map((thirdItem) => {
                          const isThirdActive = location.pathname === thirdItem.path;
                          
                          return (
                            <SidebarMenuItem key={thirdItem.id}>
                              <SidebarMenuButton asChild>
                                <NavLink
                                  to={thirdItem.path}
                                  className={({ isActive: linkActive }) => 
                                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                      linkActive || isThirdActive
                                        ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                                    }`
                                  }
                                >
                                  <thirdItem.icon className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs font-medium">{thirdItem.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </div>
        )}
      </div>
    );
  };

  return (
    <Sidebar className="dashboard-sidebar-bg border-r border-slate-600">
      <SidebarContent>
        {/* Search Bar - Always visible at top */}
        <div className="p-4 border-b border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder={isCollapsed ? "Search..." : "Search menu items..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-8 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Main Panel */}
          <div className={`${!isCollapsed && selectedMainItem ? 'w-16' : 'flex-1'} border-r border-white/20`}>
            {renderMainPanel()}
          </div>
          
          {/* Sub Panel */}
          {!isCollapsed && selectedMainItem && (
            <div className="flex-1">
              {renderSubPanel()}
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}