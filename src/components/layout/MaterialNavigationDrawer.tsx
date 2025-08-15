// Material Design 3 Navigation Drawer Implementation
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';
import { primaryNavigation, secondaryNavigation } from '@/config/navigationConfig';
import themeConfig from '@/config/themeConfig';
import portalConfig from '@/config/portalConfig';
import type { NavigationItem } from '@/config/navigationConfig';

interface MaterialNavigationDrawerProps {
  className?: string;
}

export const MaterialNavigationDrawer = ({ className }: MaterialNavigationDrawerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission, getUserRole } = usePermissions();
  
  // State for navigation
  const [selectedPrimary, setSelectedPrimary] = useState<string>('home');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);

  // Determine active navigation based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Find matching primary navigation
    for (const item of primaryNavigation) {
      if (path === item.path || path.startsWith(item.path + '/')) {
        setSelectedPrimary(item.id);
        setIsSecondaryVisible(secondaryNavigation[item.id] ? true : false);
        break;
      }
    }
  }, [location.pathname]);

  // Filter navigation items based on user permissions
  const filterNavigationByPermissions = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      // If no roles specified, allow all users
      if (!item.roles || item.roles.length === 0) return true;
      
      const userRole = getUserRole();
      if (!userRole) return false;
      
      // Check if user role is in allowed roles
      return item.roles.includes(userRole);
    }).map(item => ({
      ...item,
      children: item.children ? filterNavigationByPermissions(item.children) : undefined
    }));
  };

  const filteredPrimary = filterNavigationByPermissions(primaryNavigation);
  const currentSecondary = selectedPrimary ? secondaryNavigation[selectedPrimary] : [];
  const filteredSecondary = filterNavigationByPermissions(currentSecondary || []);

  const handlePrimaryClick = (item: NavigationItem) => {
    setSelectedPrimary(item.id);
    
    // Show/hide secondary navigation
    const hasSecondary = secondaryNavigation[item.id] && secondaryNavigation[item.id].length > 0;
    setIsSecondaryVisible(hasSecondary);
    
    // Navigate to the item
    navigate(item.path);
  };

  const handleSecondaryClick = (item: NavigationItem) => {
    // Handle expandable groups
    if (item.children && item.children.length > 0) {
      setExpandedGroups(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.id)) {
          newSet.delete(item.id);
        } else {
          newSet.add(item.id);
        }
        return newSet;
      });
    } else {
      navigate(item.path);
    }
  };

  const isActive = (item: NavigationItem) => {
    return location.pathname === item.path || 
           (location.pathname.startsWith(item.path + '/') && item.path !== '/');
  };

  const isExpanded = (item: NavigationItem) => {
    return expandedGroups.has(item.id);
  };

  const PrimaryNavItem = ({ item }: { item: NavigationItem }) => {
    const IconComponent = item.icon;
    const active = selectedPrimary === item.id;
    
    return (
      <Button
        variant={active ? "secondary" : "ghost"}
        size="lg"
        onClick={() => handlePrimaryClick(item)}
        className={cn(
          "w-full h-16 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200",
          "text-xs font-medium",
          active && "bg-primary/10 text-primary border border-primary/20",
          !active && "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        )}
        title={item.description}
      >
        <IconComponent className="h-6 w-6" />
        <span className="text-[10px] leading-tight text-center">{item.title}</span>
        {item.badge && (
          <Badge variant="destructive" className="h-4 px-1 text-[8px] absolute top-1 right-1">
            {item.badge}
          </Badge>
        )}
      </Button>
    );
  };

  const SecondaryNavItem = ({ item, level = 0 }: { item: NavigationItem; level?: number }) => {
    const IconComponent = item.icon;
    const active = isActive(item);
    const expanded = isExpanded(item);
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div className="w-full">
        <Button
          variant={active ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleSecondaryClick(item)}
          className={cn(
            "w-full justify-start gap-3 h-10 rounded-lg transition-all duration-200",
            level === 0 && "font-medium",
            level > 0 && "ml-4 font-normal text-sm",
            active && "bg-primary/10 text-primary border border-primary/20",
            !active && "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          )}
          title={item.description}
        >
          <IconComponent className={cn("flex-shrink-0", level === 0 ? "h-5 w-5" : "h-4 w-4")} />
          <span className="flex-1 text-left truncate">{item.title}</span>
          {hasChildren && (
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform duration-200",
              expanded && "rotate-90"
            )} />
          )}
          {item.badge && (
            <Badge variant="outline" className="h-5 px-2 text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
        
        {hasChildren && expanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <SecondaryNavItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex h-screen bg-background border-r", className)}>
      {/* Primary Navigation Rail */}
      <div 
        className="flex-shrink-0 border-r bg-muted/30"
        style={{ width: themeConfig.layout.navigation.primary.width }}
      >
        <div className="flex flex-col h-full">
          {/* App Logo/Brand */}
          <div className="h-16 flex items-center justify-center border-b">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CBB</span>
            </div>
          </div>
          
          {/* Primary Navigation Items */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {filteredPrimary.map((item) => (
                <PrimaryNavItem key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>

          {/* User Profile/Settings at bottom */}
          <div className="p-2 border-t">
            <Button variant="ghost" size="lg" className="w-full h-12 flex flex-col items-center gap-1">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs">U</span>
              </div>
              <span className="text-[10px]">Profile</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Panel */}
      <div 
        className={cn(
          "bg-background transition-all duration-300 ease-in-out overflow-hidden border-r",
          isSecondaryVisible ? "opacity-100" : "opacity-0 w-0"
        )}
        style={{ 
          width: isSecondaryVisible ? themeConfig.layout.navigation.secondary.width : '0px'
        }}
      >
        {isSecondaryVisible && filteredSecondary.length > 0 && (
          <div className="flex flex-col h-full">
            {/* Secondary Header */}
            <div className="h-16 flex items-center px-4 border-b">
              <h2 className="font-semibold text-foreground">
                {primaryNavigation.find(item => item.id === selectedPrimary)?.title}
              </h2>
            </div>
            
            {/* Secondary Navigation Items */}
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-1">
                {filteredSecondary.map((item) => (
                  <SecondaryNavItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialNavigationDrawer;