import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';
import navigationConfig, { NavigationItem } from '@/config/navigationConfig';
import portalConfig from '@/config/portalConfig';
import themeConfig from '@/config/themeConfig';
import { cn } from '@/lib/utils';

export function ModularSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainItem, setSelectedMainItem] = useState<NavigationItem | null>(null);
  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(new Set());

  // Filter navigation items based on user role
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    if (!user?.role) return [];
    
    const userRole = user.role;
    const hasPermission = (item: NavigationItem) => {
      // Admin has access to everything
      if (userRole === 'Admin') return true;
      
      // Check if user role is in item's roles array
      return item.roles.includes(userRole);
    };

    return items.filter(item => {
      if (!hasPermission(item)) return false;
      
      // Filter children recursively
      if (item.children) {
        item.children = getAccessibleItems(item.children);
      }
      
      return true;
    });
  };

  const accessibleItems = getAccessibleItems(navigationConfig);

  // Find active main item based on current route
  const findActiveMainItem = () => {
    return accessibleItems.find(item => {
      if (location.pathname === item.url) return true;
      if (item.children) {
        return item.children.some(subItem => {
          if (location.pathname === subItem.url) return true;
          if (subItem.children) {
            return subItem.children.some(nestedItem => location.pathname === nestedItem.url);
          }
          return false;
        });
      }
      return false;
    });
  };

  // Find active sub item based on current route
  const findActiveSubItem = (mainItem: NavigationItem) => {
    return mainItem.children?.find(subItem => {
      if (location.pathname === subItem.url) return true;
      if (subItem.children) {
        return subItem.children.some(nestedItem => location.pathname === nestedItem.url);
      }
      return false;
    });
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

  useEffect(() => {
    const activeItem = findActiveMainItem();
    if (activeItem && activeItem.children) {
      setSelectedMainItem(activeItem);
      const activeSubItem = findActiveSubItem(activeItem);
      if (activeSubItem && activeSubItem.children) {
        // Auto-expand the sub-item that contains the active route
        setExpandedSubItems(prev => new Set([...prev, activeSubItem.id]));
      }
    }
  }, [location.pathname]);

  // Auto-expand first matched branch on search
  useEffect(() => {
    if (searchQuery) {
      const first = filterItemsBySearch(accessibleItems)[0];
      if (first) setSelectedMainItem(first);
    }
  }, [searchQuery, accessibleItems]);

  // Highlight helper
  const getHighlightedText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="bg-white/20 rounded px-1">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  // Filter items based on search query (recursive, trims branches)
  const filterItemsBySearch = (items: NavigationItem[]): NavigationItem[] => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();

    const filterRecursive = (item: NavigationItem): NavigationItem | null => {
      const titleMatches = item.title.toLowerCase().includes(q);
      const filteredChildren = item.children
        ?.map((child) => filterRecursive(child))
        .filter((v): v is NavigationItem => Boolean(v)) ?? [];

      if (titleMatches || filteredChildren.length > 0) {
        return { ...item, children: filteredChildren };
      }
      return null;
    };

    return items.map(filterRecursive).filter((v): v is NavigationItem => Boolean(v));
  };

  const filteredSearchItems = filterItemsBySearch(accessibleItems);

  const renderMainPanel = () => (
    <div className="h-full flex flex-col">
      {/* Search bar - only show when not collapsed */}
      {!isCollapsed && (
        <div className="px-3 py-2 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/60" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>
        </div>
      )}

      {/* Main Navigation - Material Design 3 compact style */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarMenu className="space-y-1">
          {(searchQuery ? filteredSearchItems : accessibleItems).map((item) => {
            const isActive = findActiveMainItem()?.id === item.id;
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => {
                    if (hasChildren) {
                      setSelectedMainItem(item);
                    }
                  }}
                  asChild={!hasChildren}
                  className={cn(
                    "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-full transition-all duration-200 min-h-[48px]",
                    isActive 
                      ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                  title={item.title}
                >
                  {hasChildren ? (
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium text-sm truncate">{getHighlightedText(item.title, searchQuery)}</span>
                      )}
                    </div>
                  ) : (
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium text-sm truncate">{getHighlightedText(item.title, searchQuery)}</span>
                      )}
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
    if (!selectedMainItem?.children || isCollapsed) return null;

    return (
      <div className="h-full flex flex-col bg-black/20">
        {/* Sub Panel Header - Compact */}
        <div className="px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedMainItem(null);
                setExpandedSubItems(new Set());
              }}
              className="p-1.5 h-auto text-white/80 hover:text-white hover:bg-white/10 rounded-full"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <selectedMainItem.icon className="h-4 w-4 text-white" />
            <span className="font-medium text-sm text-white truncate">{selectedMainItem.title}</span>
          </div>
        </div>

        {/* Optimized second panel for maximum text visibility */}
        <div className="flex-1 overflow-y-auto py-2">
          <SidebarMenu className="space-y-1 px-2">
            {selectedMainItem.children?.map((subItem) => {
              const isActive = location.pathname === subItem.url || 
                (subItem.children && subItem.children.some(nested => location.pathname === nested.url));
              const hasChildren = subItem.children && subItem.children.length > 0;
              const isExpanded = expandedSubItems.has(subItem.id);
              
              return (
                <div key={subItem.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        if (hasChildren) {
                          toggleSubItemExpansion(subItem.id);
                        }
                      }}
                      asChild={!hasChildren}
                      className={cn(
                        "flex items-center justify-between gap-2 px-2 py-2 rounded-lg transition-all duration-200 min-h-[40px] w-full",
                        isActive 
                          ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {hasChildren ? (
                        <div className="flex items-center justify-between w-full min-w-0">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{getHighlightedText(subItem.title, searchQuery)}</span>
                          </div>
                          <ChevronRight className={cn(
                            "h-3 w-3 transition-transform duration-200 flex-shrink-0",
                            isExpanded ? 'rotate-90' : ''
                          )} />
                        </div>
                      ) : (
                        <NavLink
                          to={subItem.url}
                          className="flex items-center gap-2 w-full min-w-0"
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{getHighlightedText(subItem.title, searchQuery)}</span>
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Third Level Items - Optimized spacing */}
                  {hasChildren && isExpanded && (
                    <div className="ml-3 mt-1 space-y-1">
                      {subItem.children?.map((thirdItem) => {
                        const isThirdActive = location.pathname === thirdItem.url;
                        
                        return (
                          <SidebarMenuItem key={thirdItem.id}>
                            <SidebarMenuButton asChild>
                              <NavLink
                                to={thirdItem.url}
                                className={({ isActive: linkActive }) => 
                                  cn(
                                    "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 min-h-[36px] w-full",
                                    linkActive || isThirdActive
                                      ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                                  )
                                }
                              >
                                <thirdItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="text-xs font-medium truncate">{thirdItem.title}</span>
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
      </div>
    );
  };

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-16" : selectedMainItem?.children ? "w-[360px]" : "w-52"
      )}
      style={{
        background: themeConfig.colors.gradients.sidebar
      }}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex h-full">
              {/* Main navigation panel - Compact Material Design 3 style */}
              <div className={cn(
                "flex-shrink-0",
                isCollapsed ? "w-16" : "w-52"
              )}>
                {renderMainPanel()}
              </div>
              
              {/* Sub navigation panel - Optimized for maximum text visibility */}
              {selectedMainItem?.children && !isCollapsed && (
                <div className="w-72 border-l border-white/10">
                  {renderSubPanel()}
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default ModularSidebar;