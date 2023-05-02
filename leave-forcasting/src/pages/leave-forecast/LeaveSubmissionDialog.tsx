import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Typography } from "components/shared-ui";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { useState } from "react";

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
        empId: "A-101",
        fromDate: "2023-05-04",
        planningType: "ACTUAL",
        toDate: "2023-05-04"
    }
];

const LeaveSubmissionDialog = ({ isOpen, onClose, filter, onFilterChange, onFilterSubmit, leaveSummary, onLeaveSubmit }: LeaveSubmissionDialogProps) => {
    const [leaveList, setLeaveList] = useState<UpdateLeaveRequest>(DUMMY_LEAVE_LIST);

    const handleLeaveSubmit = () => (onLeaveSubmit(leaveList));

    return (
        <Dialog
            fullWidth
            maxWidth='xl'
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Leave Plans
                <IconButton onClick={onClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <LeaveSummaryFilter
                    filter={filter}
                    onChange={onFilterChange}
                    onSubmit={() => onFilterSubmit(filter)}
                />
                {
                    leaveSummary ?
                        <Grid container sx={{ minHeight: 200 }} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="caption">{JSON.stringify(leaveSummary)}</Typography>
                            </Grid>
                        </Grid> :
                        <Grid container sx={{ minHeight: 200 }} alignItems="center" textAlign="center">
                            <Grid item xs={12}>
                                <Typography variant="caption">No leaves planned.</Typography>
                            </Grid>
                        </Grid>
                }
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, justifyContent: "center" }}>
                <Button variant="contained" onClick={handleLeaveSubmit}>Submit Leaves</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LeaveSubmissionDialog;