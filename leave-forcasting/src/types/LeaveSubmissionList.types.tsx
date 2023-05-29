import { RegularBreakpoints } from "@mui/material";
import MonthList from 'data/MonthList';
import { LeaveDateSpan } from "./api/employee/Leave.types";

type Months = typeof MonthList[number]['value'];

type LeaveDateProps = {
    label?: string;
    value: string;
    helperText?: string;
    format?: string;
    disabled?: boolean;
    gridBreakpoints?: RegularBreakpoints;
    minDate?: string;
    maxDate?: string;
};

type LeaveDate = {
    startDate: LeaveDateProps;
    endDate: LeaveDateProps;
    isEditable: boolean;
    exceptional: boolean;
    leaveForcastId?: number;
    spanType: LeaveDateSpan;
};

enum HAVE_PLANS {
    EMPTY = "",
    YES = "yes",
    NO = "no"
};
type HavePlans = `${HAVE_PLANS}`;

type LeaveMonth = {
    isVisible: boolean;
    havePlans: { label?: string; value: HavePlans, helperText?: string };
    dateList: LeaveDate[];
};

type Leaves = {
    [key in Months]?: LeaveMonth
};

export { HAVE_PLANS };

export type { HavePlans, Months, LeaveDate, LeaveDateProps, LeaveMonth, Leaves };