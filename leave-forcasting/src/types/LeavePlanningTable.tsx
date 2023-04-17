import { GridColDef } from "./DataGrid";

interface LeavePlanningDataField {
    id: number | string;
    name: string;
    nameInClientRecords: string;
    jobTitle: string;
}

type LeavePlanningColumn<T extends keyof LeavePlanningDataField> = GridColDef & {
    field: T;
};

type LeavePlanningColumnList = [
    LeavePlanningColumn<"id">,
    LeavePlanningColumn<"name">,
    LeavePlanningColumn<"nameInClientRecords">,
    LeavePlanningColumn<"jobTitle">,
];


export type { LeavePlanningDataField, LeavePlanningColumnList };