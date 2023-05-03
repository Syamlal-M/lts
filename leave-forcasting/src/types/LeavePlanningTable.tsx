import React from "react";
import { GridColDef } from "./DataGrid";

interface LeavePlanningDataField {
    employeeId: number | string;
    name: string;
    nameInClientRecords: string;
    jobTitle: string;
    actions: React.ReactNode;
}

type LeavePlanningColumn<T extends keyof LeavePlanningDataField> = GridColDef & {
    field: T;
};

type LeavePlanningColumnList = [
    LeavePlanningColumn<"employeeId">,
    LeavePlanningColumn<"name">,
    LeavePlanningColumn<"nameInClientRecords">,
    LeavePlanningColumn<"jobTitle">,
    LeavePlanningColumn<"actions">,
];


export type { LeavePlanningDataField, LeavePlanningColumnList };