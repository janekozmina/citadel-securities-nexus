import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import navigationConfig, { NavigationItem } from '@/config/navigationConfig';
import { cn } from '@/lib/utils';

export function PrimaryNavigation() {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter items based on search query
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

  const filteredItems = filterItemsBySearch(accessibleItems);

  const getHighlightedText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="bg-white/20 rounded px-1">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-3 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-[15px] md:text-[16px] bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.url || 
              (item.children && item.children.some(child => location.pathname === child.url));
            
            return (
              <div key={item.id}>
                {item.children ? (
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}>
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className="font-medium text-[15px] md:text-[16px] leading-tight">
                      {getHighlightedText(item.title, searchQuery)}
                    </span>
                  </div>
                ) : (
                  <NavLink
                    to={item.url}
                    className={({ isActive: linkActive }) => cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                      linkActive || isActive
                        ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className="font-medium text-[15px] md:text-[16px] leading-tight">
                      {getHighlightedText(item.title, searchQuery)}
                    </span>
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}