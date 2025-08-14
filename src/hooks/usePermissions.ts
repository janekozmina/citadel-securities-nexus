import { useAuth } from '@/contexts/AuthContext';
import portalConfig from '@/config/portalConfig';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user?.role) return false;

    const roleConfig = portalConfig.roles[user.role as keyof typeof portalConfig.roles];
    if (!roleConfig) return false;

    // Admin has full access
    if (roleConfig.permissions.includes('*')) return true;

    // Check if permission matches any of the user's permissions
    return roleConfig.permissions.some(userPerm => {
      // Exact match
      if (userPerm === permission) return true;
      
      // Wildcard match (e.g., 'securities.*' matches 'securities.view')
      if (userPerm.endsWith('.*')) {
        const prefix = userPerm.slice(0, -2);
        return permission.startsWith(prefix);
      }
      
      return false;
    });
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const canAccessRoute = (routePermissions?: string[]): boolean => {
    if (!routePermissions || routePermissions.length === 0) return true;
    return hasAnyPermission(routePermissions);
  };

  const getUserRole = () => {
    return user?.role;
  };

  const getRoleConfig = () => {
    if (!user?.role) return null;
    return portalConfig.roles[user.role as keyof typeof portalConfig.roles];
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessRoute,
    getUserRole,
    getRoleConfig,
    user
  };
};

export default usePermissions;