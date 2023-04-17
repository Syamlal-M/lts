import { GridColDef } from "./DataGrid";

interface LeavePlanningDataField {
    empId: number | string;
    name: string;
    nameInClientRecords: string;
    jobTitle: string;
}

type LeavePlanningColumn<T extends keyof LeavePlanningDataField> = GridColDef & {
    field: T;
};

type LeavePlanningColumnList = [
    LeavePlanningColumn<"empId">,
    LeavePlanningColumn<"name">,
    LeavePlanningColumn<"nameInClientRecords">,
    LeavePlanningColumn<"jobTitle">,
];


export type { LeavePlanningDataField, LeavePlanningColumnList };