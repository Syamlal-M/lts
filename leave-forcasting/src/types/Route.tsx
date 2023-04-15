import PERMISSIONS from "data/Permissions";

type Permission = keyof typeof PERMISSIONS;

type ProtectedRouteGuardPermission = boolean | Permission;

type PrivateRouteProps = {
    hasAccess: true;
    redirectPath?: string;
    children?: React.ReactNode | React.FC;
} | {
    hasAccess: false;
    redirectPath: string;
    children?: React.ReactNode | React.FC;
};

type PrivateRouteGuardProps = {
    hasAccess?: boolean;
    redirectPath?: string;
    children?: React.ReactNode | React.FC;
}

type ProtectedRouteProps = {
    hasPermission: true;
    redirectPath?: string;
    children?: React.ReactNode | React.FC;
} | {
    hasPermission: false;
    redirectPath: string;
    children?: React.ReactNode | React.FC;
};

type ProtectedRouteGuardProps = {
    hasPermission: boolean | Permission;
    redirectPath?: string;
    children?: React.ReactNode | React.FC;
}

type RouteGuardProps = {
    hasAccess?: boolean;
    authRedirectPath?: string;
    hasPermission: boolean | Permission;
    permissionRedirectPath?: string;
    children: React.ReactNode | React.FC;
}


export type {
    Permission,
    ProtectedRouteGuardPermission,
    PrivateRouteProps,
    PrivateRouteGuardProps,
    ProtectedRouteProps,
    ProtectedRouteGuardProps,
    RouteGuardProps,
};