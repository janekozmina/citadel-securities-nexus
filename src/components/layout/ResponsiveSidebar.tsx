import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
  Search
} from 'lucide-react';
import { primaryNavigation, secondaryNavigation, NavigationItem } from '@/config/navigationConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ResponsiveSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ResponsiveSidebar({ isOpen, onToggle }: ResponsiveSidebarProps) {
  const { user } = useAuth();
  const { canAccessRoute } = usePermissions();
  const location = useLocation();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLevel, setCurrentLevel] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(null);
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

  // Handle primary navigation click
  const handlePrimaryClick = (itemId: string) => {
    const hasChildren = secondaryNavigation[itemId]?.length > 0;
    
    if (hasChildren) {
      setSelectedPrimary(itemId);
      setCurrentLevel('secondary');
      setSelectedSecondary(null);
    }
  };

  // Handle secondary navigation click
  const handleSecondaryClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedSecondary(item.id);
      setCurrentLevel('tertiary');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentLevel === 'tertiary') {
      setCurrentLevel('secondary');
      setSelectedSecondary(null);
    } else if (currentLevel === 'secondary') {
      setCurrentLevel('primary');
      setSelectedPrimary(null);
    }
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

  // Auto-detect current navigation state based on URL
  useEffect(() => {
    const path = location.pathname;
    
    // Find primary item
    const primaryItem = primaryNavigation.find(item => 
      path.startsWith(item.path) && item.path !== '/'
    );
    
    if (primaryItem && secondaryNavigation[primaryItem.id]) {
      setSelectedPrimary(primaryItem.id);
      
      // Find secondary item
      const secondaryItems = secondaryNavigation[primaryItem.id];
      const secondaryItem = secondaryItems.find(item => 
        path.startsWith(item.path) && item.path !== primaryItem.path
      );
      
      if (secondaryItem) {
        if (secondaryItem.children?.some(child => path.startsWith(child.path))) {
          setSelectedSecondary(secondaryItem.id);
          setCurrentLevel('tertiary');
        } else {
          setCurrentLevel('secondary');
        }
      } else {
        setCurrentLevel('secondary');
      }
    } else {
      setCurrentLevel('primary');
    }
  }, [location.pathname]);

  // Filter items based on search
  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Render navigation item
  const renderNavItem = (item: NavigationItem, level: number, hasChildren: boolean = false) => {
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.has(item.id);
    
    const baseClasses = `
      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
      hover:bg-white/10 text-white/90 hover:text-white group
    `;
    
    const activeClasses = isActive ? 'bg-white/20 text-white font-medium' : '';
    const levelPadding = level === 1 ? 'pl-4' : level === 2 ? 'pl-8' : 'pl-12';
    
    return (
      <div key={item.id} className="w-full">
        <div 
          className={`${baseClasses} ${activeClasses} ${levelPadding}`}
          onClick={() => {
            if (level === 1 && hasChildren) {
              handlePrimaryClick(item.id);
            } else if (level === 2 && item.children) {
              handleSecondaryClick(item);
            } else if (hasChildren) {
              toggleExpansion(item.id);
            }
          }}
        >
          <item.icon className={`flex-shrink-0 ${level === 1 ? 'h-5 w-5' : 'h-4 w-4'}`} />
          
          {!isCollapsed && (
            <>
              <NavLink 
                to={item.path} 
                className="flex-1 text-sm font-medium truncate"
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                  } else {
                    onToggle();
                  }
                }}
              >
                {item.title}
              </NavLink>
              
              {hasChildren && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (level === 1) {
                      handlePrimaryClick(item.id);
                    } else if (level === 2 && item.children) {
                      handleSecondaryClick(item);
                    } else {
                      toggleExpansion(item.id);
                    }
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Render children if expanded and in accordion mode */}
        {hasChildren && isExpanded && item.children && currentLevel === 'primary' && (
          <div className="space-y-1 mt-1">
            {getAccessibleItems(item.children).map(child => 
              renderNavItem(child, level + 1, child.children && child.children.length > 0)
            )}
          </div>
        )}
      </div>
    );
  };

  // Primary Level Content
  const renderPrimaryLevel = () => (
    <div className="space-y-2">
      {filterItems(getAccessibleItems(primaryNavigation)).map(item => {
        const hasChildren = secondaryNavigation[item.id]?.length > 0;
        return renderNavItem(item, 1, hasChildren);
      })}
    </div>
  );

  // Secondary Level Content
  const renderSecondaryLevel = () => {
    if (!selectedPrimary || !secondaryNavigation[selectedPrimary]) return null;
    
    const items = filterItems(getAccessibleItems(secondaryNavigation[selectedPrimary]));
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/20 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-white/90">
            {primaryNavigation.find(item => item.id === selectedPrimary)?.title}
          </span>
        </div>
        
        {items.map(item => 
          renderNavItem(item, 2, item.children && item.children.length > 0)
        )}
      </div>
    );
  };

  // Tertiary Level Content
  const renderTertiaryLevel = () => {
    if (!selectedPrimary || !selectedSecondary) return null;
    
    const secondaryItem = secondaryNavigation[selectedPrimary]?.find(
      item => item.id === selectedSecondary
    );
    
    if (!secondaryItem?.children) return null;
    
    const items = filterItems(getAccessibleItems(secondaryItem.children));
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/20 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-white/90">
            {secondaryItem.title}
          </span>
        </div>
        
        {items.map(item => renderNavItem(item, 3))}
      </div>
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
          ${isOpen ? (isCollapsed ? 'w-16' : 'w-[260px]') : 'w-0'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-hidden
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CBB</span>
              </div>
              <span className="text-white font-semibold">Portal</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 hidden lg:flex"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        {!isCollapsed && (
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
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentLevel === 'primary' && renderPrimaryLevel()}
          {currentLevel === 'secondary' && renderSecondaryLevel()}
          {currentLevel === 'tertiary' && renderTertiaryLevel()}
        </div>

        {/* Footer - Debug info */}
        {!isCollapsed && (
          <div className="p-4 border-t border-white/20 text-xs text-white/60">
            <div>Level: {currentLevel}</div>
            <div>Path: {location.pathname}</div>
          </div>
        )}
      </aside>
    </>
  );
}