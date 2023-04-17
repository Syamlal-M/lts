import { RouteGuardProps } from "types/Route";
import PrivateRouteGuard from "./PrivateRouteGuard";
import ProtectedRouteGuard from "./ProtectedRouteGuard";

const RouteGuard = ({
    hasAccess,
    authRedirectPath,
    hasPermission,
    permissionRedirectPath,
    children
}: RouteGuardProps) => {

    return (
        <PrivateRouteGuard
            hasAccess={hasAccess}
            redirectPath={authRedirectPath}
        >
            <ProtectedRouteGuard
                hasPermission={hasPermission}
                redirectPath={permissionRedirectPath}
            >
                {children}
            </ProtectedRouteGuard>
        </PrivateRouteGuard>
    );
}

export default RouteGuard;