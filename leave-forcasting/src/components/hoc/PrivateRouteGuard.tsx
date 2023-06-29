import { Navigate } from "react-router-dom";
import { getRouteUrl } from "utils/AccessPointUtils";
import { isAutheticated } from "utils/ApiUtils";
import { PrivateRouteGuardProps, PrivateRouteProps } from "types/Route";

const PrivateRoute = ({ hasAccess, redirectPath, children }: PrivateRouteProps) => {
  if (!hasAccess) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

const PrivateRouteGuard = ({ hasAccess, redirectPath, children }: PrivateRouteGuardProps) => {
  return (
    <PrivateRoute
      hasAccess={hasAccess === undefined ? isAutheticated() : hasAccess}
      redirectPath={redirectPath === undefined ? getRouteUrl("SIGN_IN") : redirectPath}>
      <>{children}</>
    </PrivateRoute>
  );
};

export default PrivateRouteGuard;
