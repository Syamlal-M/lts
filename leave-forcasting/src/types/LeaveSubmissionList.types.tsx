import { RegularBreakpoints } from "@mui/material";
import MonthList from 'data/MonthList';

type Months = typeof MonthList[number]['value'];

type LeaveDateProps = {
    label?: string;
    value: string;
    helperText?: string;
    format?: string;
    disabled?: boolean;
    gridBreakpoints?: RegularBreakpoints;
};

type LeaveDate = {
    startDate: LeaveDateProps;
    endDate: LeaveDateProps;
    isEditable: boolean;
};

type HavePlans = "" | "yes" | "no";

type LeaveMonth = {
    isVisible: boolean;
    havePlans: { label?: string; value: HavePlans, helperText?: string };
    dateList: LeaveDate[];
};

type Leaves = {
    [key in Months]?: LeaveMonth
};

export type { HavePlans, Months, LeaveDate, LeaveDateProps, LeaveMonth, Leaves }