import { Months } from "types/LeaveSubmissionList.types";

type DateList = string[];

type LeaveDate = {
    fromDate: string;
    month: Months;
    noOfDays: number;
    planningType: string;
    toDate: string;
    year: number;
};

type LeaveDates = LeaveDate[];

type Month = {
    dateList: DateList;
    leaveDates: LeaveDates;
    noOfDays: number;
    planningType: "ACTUAL" | "EXPECTED_WITH_LEAVES" | "EXPECTED_NO_LEAVES";
    startAndEndDate: string;
    month: Months;
};

type LeaveSummaryItem = {
    employeeId: string;
    employeeName: string;
    noOfDays: number;
    month: Month[];
};

type LeaveSummaryResponse = LeaveSummaryItem[];

type LeaveSummaryQueryParams = {
    month: string;
    org: string;
    team: string;
    year: string;
};

export type { LeaveSummaryQueryParams, LeaveSummaryResponse, LeaveSummaryItem }
