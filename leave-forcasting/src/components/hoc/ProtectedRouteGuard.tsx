import { Navigate } from "react-router-dom";
import { getRouteUrl } from "utils/AccessPointUtils";
import { hasPermission as checkPermission } from "utils/ApiUtils";
import {
  ProtectedRouteGuardPermission,
  ProtectedRouteGuardProps,
  ProtectedRouteProps
} from "types/Route";

const ProtectedRoute = ({ hasPermission, redirectPath, children }: ProtectedRouteProps) => {
  if (!hasPermission) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

const ProtectedRouteGuard = ({
  hasPermission,
  redirectPath,
  children
}: ProtectedRouteGuardProps) => {
  const validatePermission = (permission: ProtectedRouteGuardPermission): boolean => {
    switch (typeof permission) {
      case "boolean":
        return permission;
      case "string":
        return checkPermission(permission);
    }
  };

  return (
    <ProtectedRoute
      hasPermission={validatePermission(hasPermission)}
      redirectPath={redirectPath === undefined ? getRouteUrl("SIGN_IN") : redirectPath}>
      <>{children}</>
    </ProtectedRoute>
  );
};

export default ProtectedRouteGuard;
