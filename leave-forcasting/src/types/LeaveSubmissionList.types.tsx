import { RegularBreakpoints } from "@mui/material";
import MonthList from 'data/MonthList'

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
};

type HavePlans = "" | "yes" | "no";

type LeaveMonth = {
    isVisible: boolean;
    isEditable: boolean;
    havePlans: { label?: string; value: HavePlans };
    dateList: LeaveDate[];
};

type Leaves = {
    [key in Months]?: LeaveMonth
};

export type { HavePlans, Months, LeaveDate, LeaveDateProps, LeaveMonth, Leaves }

export const DUMMY_LEAVES: Leaves = {
    APRIL: {
        isVisible: false,
        isEditable: false,
        havePlans: { value: "" },
        dateList: [],
    },
    MAY: {
        isVisible: true,
        isEditable: false,
        havePlans: { value: "yes" },
        dateList: [
            {
                startDate: { value: '10-05-2023' },
                endDate: { value: '10-05-2023' },
            },
            {
                startDate: { value: '15-05-2023' },
                endDate: { value: '19-05-2023' },
            },
        ],
    },
    JUNE: {
        isVisible: false,
        isEditable: false,
        havePlans: { value: "no" },
        dateList: [],
    },
}; 