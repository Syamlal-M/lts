import React from "react";
import { GridColDef } from "./DataGrid";

interface LeavePlanningDataField {
    id: number | string;
    name: string;
    nameInClientRecords: string;
    jobTitle: string;
    actions: React.ReactNode;
}

type LeavePlanningColumn<T extends keyof LeavePlanningDataField> = GridColDef & {
    field: T;
};

type LeavePlanningColumnList = [
    LeavePlanningColumn<"id">,
    LeavePlanningColumn<"name">,
    LeavePlanningColumn<"nameInClientRecords">,
    LeavePlanningColumn<"jobTitle">,
    LeavePlanningColumn<"actions">,
];


export type { LeavePlanningDataField, LeavePlanningColumnList };