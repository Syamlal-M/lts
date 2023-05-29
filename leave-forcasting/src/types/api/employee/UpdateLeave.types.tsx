import { LeaveDateAction, LeaveDatePlanningType, LeaveDateSpan } from "./Leave.types";

type UpdateLeaveItem = {
    action: LeaveDateAction;
    empId: string;
    exceptional: boolean;
    fromDate: string;
    leaveForcastId?: number;
    planningType: LeaveDatePlanningType;
    span: LeaveDateSpan;
    toDate: string;
};

type UpdateLeaveRequest = UpdateLeaveItem[];

type UpdateLeaveQueryParams = {
    employeeId: string;
}

export type { UpdateLeaveQueryParams, UpdateLeaveRequest };