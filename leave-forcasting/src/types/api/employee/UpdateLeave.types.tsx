type UpdateLeaveItem = {
    empId: string;
    fromDate: string;
    planningType: "ACTUAL";
    toDate: string;
};

type UpdateLeaveRequest = UpdateLeaveItem[];

type UpdateLeaveQueryParams = {
    employeeId: string;
}

export type { UpdateLeaveQueryParams, UpdateLeaveRequest };