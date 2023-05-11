import { useState } from "react";
import MonthlyLeaveList from "./MonthlyLeaveList";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { DUMMY_LEAVES, LeaveDate, LeaveMonth, Leaves } from "types/LeaveSubmissionList.types";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Typography,
} from "components/shared-ui";

interface LeaveSubmissionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    filter: LeaveSummaryQueryParams;
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterSubmit: (filter: LeaveSummaryQueryParams) => void;
    leaveSummary?: LeaveSummaryItem;
    onLeaveSubmit: (leaveList: UpdateLeaveRequest) => void;
}

const DUMMY_LEAVE_LIST: UpdateLeaveRequest = [
    {
        empId: "A-100",
        fromDate: "2023-05-10",
        planningType: "ACTUAL",
        toDate: "2023-05-10"
    }
];

const LeaveSubmissionDialog = ({ isOpen, onClose, filter, onFilterChange, onFilterSubmit, leaveSummary, onLeaveSubmit }: LeaveSubmissionDialogProps) => {
    const [leaves, setLeaves] = useState<Leaves>(DUMMY_LEAVES);

    const DEFAULT_DATE_RANGE: LeaveDate = { startDate: { value: '' }, endDate: { value: '' }, isEditable: true };
    const HAVE_PLAN_ERROR_TEXT = "Error! There are leaves already planned."

    const handleMonthVisibilty = (month: string) => {
        setLeaves((prevLeave: any) => (
            { ...prevLeave, [month]: { ...prevLeave[month], isVisible: !prevLeave[month]?.isVisible } }
        ));
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, month: string) => {
        setLeaves((prevLeave: any) => {
            const monthDetails = prevLeave[month];
            const plan = event.target.value;
            if (plan === "" || plan === "no") {
                monthDetails.havePlans.helperText = (monthDetails.dateList.length > 0) ?
                    HAVE_PLAN_ERROR_TEXT : "";
            } else {
                monthDetails.havePlans.helperText = "";
            }
            monthDetails.havePlans.value = event.target.value;
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveAddition = (month: string, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.dateList.splice(index + 1, 0, DEFAULT_DATE_RANGE);
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveRemoval = (month: string, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.dateList.splice(index, 1);
            monthDetails.havePlans.helperText = (monthDetails.dateList.length > 0) && (monthDetails.havePlans.value === 'no') ?
                HAVE_PLAN_ERROR_TEXT : "";
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const onChange = (month: string, dateRange: any, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.dateList[index] = { ...monthDetails.dateList[index], startDate: { value: dateRange.start }, endDate: { value: dateRange.end } }
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveSubmit = () => {
        console.log(leaves);
        onLeaveSubmit(DUMMY_LEAVE_LIST);
    };

    return (
        <Dialog
            scroll="body"
            fullWidth
            maxWidth='md'
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Leave Plans
                <IconButton onClick={onClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LeaveSummaryFilter
                            filter={filter}
                            onChange={onFilterChange}
                            onSubmit={() => onFilterSubmit(filter)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            Object.keys(leaves).length > 0 ?
                                <MonthlyLeaveList
                                    leaves={leaves}
                                    handleMonthVisibilty={handleMonthVisibilty}
                                    handlePlanChange={handlePlanChange}
                                    onChange={onChange}
                                    handleLeaveAddition={handleLeaveAddition}
                                    handleLeaveRemoval={handleLeaveRemoval}
                                /> :
                                <Grid container sx={{ minHeight: 300 }} alignItems="center" textAlign="center">
                                    <Grid item xs={12}>
                                        <Typography variant="caption">No leaves planned.</Typography>
                                    </Grid>
                                </Grid>
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, justifyContent: "center" }}>
                <Button variant="contained" onClick={handleLeaveSubmit}>Submit Leaves</Button>
            </DialogActions>
        </Dialog >
    );
};

export default LeaveSubmissionDialog;