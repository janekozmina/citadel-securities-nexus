import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface PermissionGuardProps {
  permissions: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean;
  children: React.ReactNode;
}

export const PermissionGuard = ({
  permissions,
  fallback,
  requireAll = false,
  children
}: PermissionGuardProps) => {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  const hasAccess = requireAll 
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access this content. Please contact your administrator if you believe this is an error.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default PermissionGuard;