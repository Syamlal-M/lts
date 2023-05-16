type UpdateLeaveItem = {
    empId: string;
    fromDate: string;
    planningType: "ACTUAL" | "EXPECTED_WITH_LEAVES" | "EXPECTED_NO_LEAVES";
    toDate: string;
    action: string;
};

type UpdateLeaveRequest = UpdateLeaveItem[];

type UpdateLeaveQueryParams = {
    employeeId: string;
}

export type { UpdateLeaveQueryParams, UpdateLeaveRequest };