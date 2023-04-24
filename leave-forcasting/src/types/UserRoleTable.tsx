import { GridColDef } from "./DataGrid";

interface UserRoleDataField {
    employeeId: string;
    employeeName: string;
    roleName: string;
}

type UserRoleColumn<T extends keyof UserRoleDataField> = GridColDef & {
    field: T;
};

type UserRoleColumnList = [
    UserRoleColumn<"employeeId">,
    UserRoleColumn<"employeeName">,
    UserRoleColumn<"roleName">,
];


export type { UserRoleDataField, UserRoleColumnList };