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

type Week = {
    dateList: DateList;
    leaveDates: LeaveDates;
    noOfDays: number;
    startAndEndDate: string;
    weekNumber: number;
};

type Weeks = Week[];

type LeaveSummaryItem = {
    employeeId: string;
    employeeName: string;
    noOfDays: number;
    weeks: Weeks;
};

type LeaveSummaryResponse = LeaveSummaryItem[];

type LeaveSummaryQueryParams = {
    month: string;
    org: string;
    team: string;
    year: string;
};

export type { LeaveSummaryQueryParams, LeaveSummaryResponse, LeaveSummaryItem }
