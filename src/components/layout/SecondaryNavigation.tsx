import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import navigationConfig, { NavigationItem } from '@/config/navigationConfig';
import { cn } from '@/lib/utils';

export function SecondaryNavigation() {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter navigation items based on user role
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    if (!user?.role) return [];
    
    const userRole = user.role;
    const hasPermission = (item: NavigationItem) => {
      if (userRole === 'Admin') return true;
      return item.roles.includes(userRole);
    };

    return items.filter(item => {
      if (!hasPermission(item)) return false;
      if (item.children) {
        item.children = getAccessibleItems(item.children);
      }
      return true;
    });
  };

  const accessibleItems = getAccessibleItems(navigationConfig);

  // Find active main item
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

  const activeMainItem = findActiveMainItem();

  const toggleExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Auto-expand active sections
  React.useEffect(() => {
    if (activeMainItem && activeMainItem.children) {
      const activeSubItem = activeMainItem.children.find(subItem => {
        if (location.pathname === subItem.url) return true;
        if (subItem.children) {
          return subItem.children.some(nestedItem => location.pathname === nestedItem.url);
        }
        return false;
      });
      
      if (activeSubItem && activeSubItem.children) {
        setExpandedItems(prev => new Set([...prev, activeSubItem.id]));
      }
    }
  }, [location.pathname, activeMainItem]);

  if (!activeMainItem?.children) {
    return (
      <div className="flex items-center justify-center h-full text-white/60 text-sm">
        <span className="hidden md:block">Select a section</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with active main item */}
      <div className="p-3 border-b border-white/10 hidden md:block">
        <div className="flex items-center gap-2">
          <activeMainItem.icon className="h-5 w-5 text-white flex-shrink-0" />
          <span className="font-medium text-[13px] md:text-[14px] text-white leading-tight">
            {activeMainItem.title}
          </span>
        </div>
      </div>

      {/* Secondary Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <div className="space-y-1">
          {activeMainItem.children.map((subItem) => {
            const isActive = location.pathname === subItem.url || 
              (subItem.children && subItem.children.some(nested => location.pathname === nested.url));
            const hasChildren = subItem.children && subItem.children.length > 0;
            const isExpanded = expandedItems.has(subItem.id);
            
            return (
              <div key={subItem.id}>
                {/* Sub Item */}
                <div className={cn(
                  "flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive 
                    ? 'bg-white/15 text-white shadow-md backdrop-blur-sm' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
                onClick={() => {
                  if (hasChildren) {
                    toggleExpansion(subItem.id);
                  }
                }}
                >
                  {hasChildren ? (
                    <>
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <subItem.icon className="h-5 w-5 md:h-5 md:w-5 flex-shrink-0" />
                        <span className="font-medium text-[13px] md:text-[14px] leading-tight hidden md:block">
                          {subItem.title}
                        </span>
                      </div>
                      <ChevronRight className={cn(
                        "h-3 w-3 transition-transform duration-200 flex-shrink-0 hidden md:block",
                        isExpanded ? 'rotate-90' : ''
                      )} />
                    </>
                  ) : (
                    <NavLink
                      to={subItem.url}
                      className="flex items-center gap-2 w-full min-w-0"
                    >
                      <subItem.icon className="h-5 w-5 md:h-5 md:w-5 flex-shrink-0" />
                      <span className="font-medium text-[13px] md:text-[14px] leading-tight hidden md:block">
                        {subItem.title}
                      </span>
                    </NavLink>
                  )}
                </div>
                
                {/* Third Level Items */}
                {hasChildren && isExpanded && (
                  <div className="ml-3 mt-1 space-y-1 hidden md:block">
                    {subItem.children?.map((thirdItem) => {
                      const isThirdActive = location.pathname === thirdItem.url;
                      
                      return (
                        <NavLink
                          key={thirdItem.id}
                          to={thirdItem.url}
                          className={({ isActive: linkActive }) => 
                            cn(
                              "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200",
                              linkActive || isThirdActive
                                ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                                : 'text-white/60 hover:bg-white/10 hover:text-white'
                            )
                          }
                        >
                          <thirdItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium text-[12px] md:text-[13px] leading-tight">
                            {thirdItem.title}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}