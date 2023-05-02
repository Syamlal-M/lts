import { GridColDef } from "./DataGrid";

interface UserRoleDataField {
    employeeId: string;
    employeeName: string;
    roleName: string;
    action: string;
}

type UserRoleColumn<T extends keyof UserRoleDataField> = GridColDef & {
    field: T;
};

type UserRoleColumnList = [
    UserRoleColumn<"employeeId">,
    UserRoleColumn<"employeeName">,
    UserRoleColumn<"roleName">,
    UserRoleColumn<"action">,
];


export type { UserRoleDataField, UserRoleColumnList };