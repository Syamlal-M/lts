type EmployeeSearchQueryParams = {
    name: string;
    org: string;
    team: string;
    location: string;
    limit: number;
    page: number;
}

type PermissionListItem = {
    permissionName: string;
    read: boolean;
    write: boolean;
};

type PermissionList = PermissionListItem[];

type RoleItem = {
    permissionsList: PermissionList;
    roleName: string;
};

type Roles = RoleItem[];

type EmployeeSearchItem = {
    billRate: number;
    billability: string;
    city: string;
    country: string;
    currency: string;
    emailId: string;
    employeeId: string;
    employeeInfoId: number;
    employeeName: string;
    hm: string;
    jobTitle: string;
    nameInClientRecords: string;
    org: string;
    remarks: string;
    roles: Roles;
    sow: string;
    team: string;
    vendorName: string;
}

type EmployeeSearchResponse = EmployeeSearchItem[];

export type { EmployeeSearchQueryParams, EmployeeSearchResponse, EmployeeSearchItem };