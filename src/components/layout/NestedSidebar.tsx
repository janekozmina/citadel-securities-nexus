import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search
} from 'lucide-react';
import { primaryNavigation, secondaryNavigation, NavigationItem } from '@/config/navigationConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NestedSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function NestedSidebar({ isOpen, onToggle }: NestedSidebarProps) {
  const { user } = useAuth();
  const { canAccessRoute } = usePermissions();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter items based on user permissions
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      if (user?.role && item.roles.includes(user.role)) return true;
      return canAccessRoute(item.roles);
    });
  };

  // Check if item is active
  const isItemActive = (item: NavigationItem): boolean => {
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  // Toggle item expansion
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

  // Auto-expand based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const toExpand = new Set<string>();
    
    // Find which primary item should be expanded
    const primaryItem = primaryNavigation.find(item => 
      currentPath.startsWith(item.path) && item.path !== '/'
    );
    
    if (primaryItem && secondaryNavigation[primaryItem.id]) {
      toExpand.add(primaryItem.id);
      
      // Find which secondary item should be expanded
      const secondaryItems = secondaryNavigation[primaryItem.id];
      const secondaryItem = secondaryItems.find(item => 
        currentPath.startsWith(item.path) && item.path !== primaryItem.path
      );
      
      if (secondaryItem && secondaryItem.children) {
        toExpand.add(secondaryItem.id);
      }
    }
    
    setExpandedItems(toExpand);
  }, [location.pathname]);

  // Render a navigation item with children (recursive)
  const renderNavItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const hasSecondaryNav = level === 0 && secondaryNavigation[item.id];
    const showChildren = hasChildren || hasSecondaryNav;
    const isExpanded = expandedItems.has(item.id);
    const isActive = isItemActive(item);
    const accessibleChildren = hasChildren ? getAccessibleItems(item.children!) : [];
    const accessibleSecondary = hasSecondaryNav ? getAccessibleItems(secondaryNavigation[item.id]) : [];
    
    const paddingLeft = level === 0 ? 'pl-4' : level === 1 ? 'pl-8' : 'pl-12';
    const textSize = level === 0 ? 'text-sm font-medium' : level === 1 ? 'text-sm' : 'text-xs';
    const iconSize = level === 0 ? 'h-5 w-5' : 'h-4 w-4';
    
    return (
      <div key={item.id} className="w-full">
        {/* Main item */}
        <div 
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
            hover:bg-white/10 group ${paddingLeft}
            ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/90'}
          `}
          onClick={() => {
            if (showChildren) {
              toggleExpansion(item.id);
            }
          }}
        >
          <item.icon className={`flex-shrink-0 ${iconSize}`} />
          
          <NavLink 
            to={item.path} 
            className={`flex-1 ${textSize} truncate hover:text-white`}
            onClick={(e) => {
              if (showChildren) {
                e.preventDefault();
                toggleExpansion(item.id);
              } else {
                onToggle(); // Close sidebar on mobile when navigating
              }
            }}
          >
            {item.title}
          </NavLink>
          
          {showChildren && (accessibleChildren.length > 0 || accessibleSecondary.length > 0) && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpansion(item.id);
              }}
              className="p-1 hover:bg-white/10 rounded transition-transform duration-200"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Children */}
        {showChildren && isExpanded && (
          <div className="space-y-1 mt-1 animate-accordion-down">
            {/* Secondary navigation items */}
            {accessibleSecondary.map(child => renderNavItem(child, level + 1))}
            
            {/* Regular children */}
            {accessibleChildren.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Filter items based on search
  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 
          border-r border-slate-600 z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-[280px]' : 'w-0'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-hidden
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Central Bank Portal</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>
        </div>

        {/* Navigation Content - Now scrollable */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {filterItems(getAccessibleItems(primaryNavigation)).map(item => 
              renderNavItem(item, 0)
            )}
          </div>
        </div>

      </aside>
    </>
  );
}