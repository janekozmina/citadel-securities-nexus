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
  ChevronRight
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

  // Flatten all navigation items for searching
  const flattenNavigationItems = (items: NavigationItem[], parentPath = ''): NavigationItem[] => {
    let flattened: NavigationItem[] = [];
    
    items.forEach(item => {
      flattened.push({
        ...item,
        path: parentPath ? `${parentPath}/${item.path}` : item.path
      });
      
      if (item.children) {
        flattened = flattened.concat(flattenNavigationItems(item.children, item.path));
      }
    });
    
    return flattened;
  };

  // Get all navigation items (primary + secondary flattened)
  const getAllNavigationItems = (): NavigationItem[] => {
    let allItems: NavigationItem[] = [...navigationConfig.primaryNavigation];
    
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
      if (!item.roles || item.roles.length === 0) return true;
      if (user?.role && item.roles.includes(user.role)) return true;
      return canAccessRoute(item.roles);
    });
  };

  // Filter items based on search query
  const filterItemsBySearch = (items: NavigationItem[], query: string): NavigationItem[] => {
    if (!query.trim()) return items;
    
    const searchTerm = query.toLowerCase().trim();
    
    return items.filter(item => {
      if (item.title.toLowerCase().includes(searchTerm)) return true;
      if (item.description?.toLowerCase().includes(searchTerm)) return true;
      if (item.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) return true;
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

  // Find which primary item should be selected based on current route
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
    } else {
      // Force selection based on current route for proper two-panel display
      if (currentPath.startsWith('/admin')) {
        const adminItem = primaryItems.find(item => item.id === 'admin');
        if (adminItem) setSelectedMainItem(adminItem);
      }
      else if (currentPath.startsWith('/rtgs')) {
        const rtgsItem = primaryItems.find(item => item.id === 'rtgs');
        if (rtgsItem) setSelectedMainItem(rtgsItem);
      }
      else if (currentPath.startsWith('/csd')) {
        const csdItem = primaryItems.find(item => item.id === 'csd');
        if (csdItem) setSelectedMainItem(csdItem);
      }
      else if (currentPath.startsWith('/cms')) {
        const cmsItem = primaryItems.find(item => item.id === 'cms');
        if (cmsItem) setSelectedMainItem(cmsItem);
      }
      else if (currentPath.startsWith('/reports')) {
        const reportsItem = primaryItems.find(item => item.id === 'reports');
        if (reportsItem) setSelectedMainItem(reportsItem);
      }
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
                            ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">
                          {highlightText(item.title, searchQuery)}
                        </div>
                        {item.description && (
                          <div className="text-xs text-white/60 mt-1 line-clamp-2">
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
    <div className="h-full flex flex-col p-4">
      {/* Primary Navigation - Icons Only */}
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {primaryItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (selectedMainItem?.id === item.id && !searchQuery);
            const hasSubItems = navigationConfig.secondaryNavigation[item.id]?.length > 0;
            
            return (
              <SidebarMenuItem key={item.id} className="mb-2">
                <SidebarMenuButton
                  onClick={() => {
                    if (hasSubItems) {
                      setSelectedMainItem(selectedMainItem?.id === item.id ? null : item);
                    }
                  }}
                  asChild={!hasSubItems}
                  className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 w-full ${
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
    if (!selectedMainItem || isCollapsed) return null;
    
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
              onClick={() => setSelectedMainItem(null)}
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
                
                return (
                  <div key={subItem.id} className="mb-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild={!hasSubItems}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <NavLink
                          to={subItem.path}
                          className="flex items-center gap-3 w-full"
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {/* Third Level Items - Always visible when parent is active */}
                    {hasSubItems && isActive && (
                      <div className="ml-6 mt-2 space-y-1 border-l border-white/20 pl-3">
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

        {/* Two Panel Layout */}
        <div className="flex flex-1 min-h-0">
          {/* Panel 1: Primary Navigation - Always visible (Icons) */}
          <div className="w-16 border-r border-white/20 flex-shrink-0">
            {renderMainPanel()}
          </div>
          
          {/* Panel 2: Secondary Navigation - Only when item selected */}
          {!isCollapsed && selectedMainItem && (
            <div className="w-80 flex-shrink-0">
              {renderSubPanel()}
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}