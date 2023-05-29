import { Months } from "types/LeaveSubmissionList.types";
import { LeaveDatePlanningType, LeaveDateSpan } from "./Leave.types";

type DateList = string[];

type LeaveDate = {
    exceptional: boolean;
    fromDate: string;
    leaveForcastId: number;
    month: Months;
    noOfDays: number;
    planningType: string;
    spanType: LeaveDateSpan;
    toDate: string;
    year: number;
};

type LeaveDates = LeaveDate[];

type Month = {
    dateList: DateList;
    leaveDates: LeaveDates;
    noOfDays: number;
    planningType: LeaveDatePlanningType;
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
