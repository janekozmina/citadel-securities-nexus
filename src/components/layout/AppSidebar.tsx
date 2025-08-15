import React, { useState, useEffect } from 'react';
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
import { 
  Search,
  X,
  ChevronDown,
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['rtgs', 'financial-monitoring', 'cb-operations']));

  // Get accessible navigation items based on user role
  const getAccessibleItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      if (user?.role && item.roles.includes(user.role)) return true;
      return canAccessRoute(item.roles);
    });
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

  // Check if item is active
  const isItemActive = (item: NavigationItem): boolean => {
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  // Auto-expand based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Always expand RTGS and its children for testing
    const toExpand = new Set(['rtgs', 'financial-monitoring', 'cb-operations']);
    
    // Auto-expand based on current route
    if (currentPath.startsWith('/rtgs')) {
      toExpand.add('rtgs');
      toExpand.add('financial-monitoring');
      toExpand.add('cb-operations');
    }
    
    if (currentPath.includes('financial-monitoring')) {
      toExpand.add('financial-monitoring');
    }
    
    if (currentPath.includes('cb-operations')) {
      toExpand.add('cb-operations');
    }
    
    setExpandedItems(toExpand);
  }, [location.pathname]);

  // Get primary navigation items
  const primaryItems = getAccessibleItems(navigationConfig.primaryNavigation);

  // Render a navigation item with children
  const renderNavItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = isItemActive(item);
    const accessibleChildren = hasChildren ? getAccessibleItems(item.children!) : [];
    
    const paddingLeft = level * 16 + 16; // 16px base + 16px per level
    
    return (
      <div key={item.id} className="w-full">
        {/* Main item */}
        <div 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 ${
            isActive ? 'bg-white/20 text-white font-medium' : 'text-white/80'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpansion(item.id);
            }
          }}
        >
          <item.icon className={`flex-shrink-0 ${level === 0 ? 'h-5 w-5' : 'h-4 w-4'}`} />
          
          {!isCollapsed && (
            <>
              <NavLink 
                to={item.path} 
                className="flex-1 text-sm font-medium truncate"
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                  }
                }}
              >
                {item.title}
              </NavLink>
              
              {hasChildren && accessibleChildren.length > 0 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpansion(item.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Children - Always show if expanded, regardless of collapse state for now */}
        {hasChildren && isExpanded && accessibleChildren.length > 0 && (
          <div className="space-y-1 mt-1">
            {accessibleChildren.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sidebar className="dashboard-sidebar-bg border-r border-slate-600 w-80">
      <SidebarContent className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 border-b border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-8 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Primary Navigation */}
          {primaryItems.map(item => renderNavItem(item, 0))}
          
          {/* RTGS Secondary Navigation - ALWAYS VISIBLE FOR TESTING */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
              RTGS MENU
            </div>
            
            {/* Financial Monitoring */}
            <div className="space-y-1">
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 text-white/80"
                onClick={() => toggleExpansion('financial-monitoring')}
              >
                {navigationConfig.secondaryNavigation.rtgs?.[1]?.icon && 
                  React.createElement(navigationConfig.secondaryNavigation.rtgs[1].icon, { className: "h-5 w-5 flex-shrink-0" })}
                <span className="flex-1 text-sm font-medium">Financial Monitoring</span>
                <button className="p-1 hover:bg-white/10 rounded">
                  {expandedItems.has('financial-monitoring') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Financial Monitoring Children - ALWAYS SHOW FOR TESTING */}
              {expandedItems.has('financial-monitoring') && (
                <div className="pl-8 space-y-1">
                  <NavLink to="/rtgs/financial-monitoring/account-management" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Account Management
                  </NavLink>
                  <NavLink to="/rtgs/financial-monitoring/balances-liquidity" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Balances & Liquidity
                  </NavLink>
                  <NavLink to="/rtgs/financial-monitoring/transaction-status" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Transactions Status Amount / Volume
                  </NavLink>
                  <NavLink to="/rtgs/financial-monitoring/business-day-management" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Business Day Management
                  </NavLink>
                  <NavLink to="/rtgs/financial-monitoring/billing" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Billing
                  </NavLink>
                  <NavLink to="/rtgs/financial-monitoring/bi-reports" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    BI Reports
                  </NavLink>
                </div>
              )}
            </div>
            
            {/* CB Operations */}
            <div className="space-y-1 mt-4">
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 text-white/80"
                onClick={() => toggleExpansion('cb-operations')}
              >
                {navigationConfig.secondaryNavigation.rtgs?.[2]?.icon && 
                  React.createElement(navigationConfig.secondaryNavigation.rtgs[2].icon, { className: "h-5 w-5 flex-shrink-0" })}
                <span className="flex-1 text-sm font-medium">CB Operations</span>
                <button className="p-1 hover:bg-white/10 rounded">
                  {expandedItems.has('cb-operations') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* CB Operations Children - ALWAYS SHOW FOR TESTING */}
              {expandedItems.has('cb-operations') && (
                <div className="pl-8 space-y-1">
                  <NavLink to="/rtgs/cb-operations/cash-operations" className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm">
                    Cash Operations
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="p-4 border-t border-white/20 text-xs text-white/60">
          <div>Current: {location.pathname}</div>
          <div>Expanded: {Array.from(expandedItems).join(', ')}</div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}