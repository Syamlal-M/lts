import { Months, Years } from "types/LeaveSubmissionList.types";
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
  year: Years;
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

type Year = {
  year: Years;
  noOfDays: number;
  month: Month[];
};

type LeaveSummaryItem = {
  emailId: string;
  employeeId: string;
  employeeName: string;
  noOfDays: number;
  year: Year[];
};

type LeaveSummaryResponse = LeaveSummaryItem[];

type LeaveSummaryQueryParams = {
  month: `${Months}` | "";
  org: string;
  team: string;
  year: `${Years}` | "";
};

export type { LeaveSummaryQueryParams, LeaveSummaryResponse, LeaveSummaryItem };
