import { Fragment, useMemo, useState } from "react";
import COLOR from "styles/Color";
import { KeyValueList } from "types/KeyValueList";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { DUMMY_LEAVES, LeaveDate, LeaveMonth, Leaves } from "types/LeaveSubmissionList.types";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";
import {
    Accordion, AccordionDetails, AccordionSummary, Button, DateRangePicker, Dialog, DialogActions,
    DialogContent, DialogTitle, Grid, Icon, IconButton, MenuItem, TextField, ToggleButton, Typography
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
        fromDate: "2023-05-05",
        planningType: "ACTUAL",
        toDate: "2023-05-05"
    }
];

const HAVE_PLAN_SELECT_LIST: KeyValueList = [
    { label: "Select", value: "" },
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const LeaveSubmissionDialog = ({ isOpen, onClose, filter, onFilterChange, onFilterSubmit, leaveSummary, onLeaveSubmit }: LeaveSubmissionDialogProps) => {
    const [leaves, setLeaves] = useState<Leaves>(DUMMY_LEAVES);

    const havePlanList = useMemo(() => (HAVE_PLAN_SELECT_LIST), []);

    // const TODAY = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const DATE_FORMAT = "DD-MM-YYYY";
    const DEFAULT_DATE_RANGE: LeaveDate = { startDate: { value: '' }, endDate: { value: '' } };

    const handleMonthVisibilty = (month: string) => {
        setLeaves((prevLeave: any) => (
            { ...prevLeave, [month]: { ...prevLeave[month], isVisible: !prevLeave[month]?.isVisible } }
        ));
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, month: string) => {
        setLeaves((prevLeave: any) => {
            const monthDetails = prevLeave[month];
            monthDetails.havePlans.value = event.target.value;
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleEditChange = (month: string) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.isEditable = !monthDetails.isEditable;
            return { ...prevLeave, [month]: monthDetails };
        });
    }

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
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const onChange = (month: string, dateRange: any, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.dateList[index] = { startDate: { value: dateRange.start }, endDate: { value: dateRange.end } }
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveSubmit = () => {
        console.log(leaves);
        // onLeaveSubmit(DUMMY_LEAVE_LIST);
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
                    {
                        Object.entries(leaves).map(([month, monthDetails], i) => (
                            <Grid item xs={12} key={month}>
                                <Accordion
                                    expanded={monthDetails?.isVisible}
                                    onChange={() => handleMonthVisibilty(month)}
                                >
                                    <AccordionSummary
                                        expandIcon={<IconButton><Icon>expand_more</Icon></IconButton>}
                                        sx={{
                                            backgroundColor: COLOR.primary.main,
                                            color: COLOR.common.white,
                                            ".MuiAccordionSummary-expandIconWrapper": {
                                                ".MuiIconButton-root": {
                                                    color: COLOR.common.white
                                                }
                                            }
                                        }}
                                    >
                                        <Typography>{month}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 2 }}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                            <Grid item xs={9} sm={6}>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    label="Have any plans?"
                                                    value={monthDetails.havePlans.value}
                                                    onChange={(event) => handlePlanChange(event, month)}
                                                >
                                                    {
                                                        havePlanList.map(item => (
                                                            <MenuItem key={item.value} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </TextField>
                                            </Grid>
                                            {
                                                monthDetails.havePlans.value === 'yes' ?
                                                    <>
                                                        <Grid item xs={3} sm="auto">
                                                            <ToggleButton
                                                                color="primary"
                                                                selected={monthDetails.isEditable}
                                                                value={monthDetails.isEditable}
                                                                onClick={() => handleEditChange(month)}
                                                                sx={{ borderColor: "inherit" }}
                                                            >
                                                                <Icon>edit</Icon>
                                                            </ToggleButton>
                                                        </Grid>
                                                        {
                                                            monthDetails.dateList.length > 0 ?
                                                                monthDetails.dateList.map((leavesDates, index: number) => (
                                                                    <Fragment key={index}>
                                                                        <Grid item xs={monthDetails.isEditable ? 9 : 12} sm={monthDetails.isEditable ? 10 : 12}>
                                                                            <DateRangePicker
                                                                                disabled={!monthDetails.isEditable}
                                                                                format={DATE_FORMAT}
                                                                                label={{ start: "Start Date", end: "End Date" }}
                                                                                value={{ start: leavesDates.startDate.value, end: leavesDates.endDate.value }}
                                                                                onChange={(value: any) => onChange(month, value, index)}
                                                                                gridBreakpoints={{ xs: 12, sm: 6 }}
                                                                            />
                                                                        </Grid>
                                                                        {
                                                                            monthDetails.isEditable &&
                                                                            <Grid item xs={3} sm={2}>
                                                                                <IconButton
                                                                                    title="Add leave"
                                                                                    color="success"
                                                                                    onClick={() => handleLeaveAddition(month, index)}
                                                                                >
                                                                                    <Icon>add</Icon>
                                                                                </IconButton>
                                                                                {
                                                                                    monthDetails.dateList.length > 1 &&
                                                                                    <IconButton
                                                                                        title="Remove leave"
                                                                                        color="error"
                                                                                        onClick={() => handleLeaveRemoval(month, index)}
                                                                                    >
                                                                                        <Icon>close</Icon>
                                                                                    </IconButton>
                                                                                }
                                                                            </Grid>
                                                                        }
                                                                    </Fragment>
                                                                )) :
                                                                <Grid item xs={12}>
                                                                    <Button
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        onClick={() => handleLeaveAddition(month, 0)}
                                                                        sx={{ height: "125px", width: "125px", display: "flex", flexDirection: "column" }}
                                                                    >
                                                                        <Icon>add</Icon>
                                                                        Add Leaves
                                                                    </Button>
                                                                </Grid>
                                                        }
                                                    </> :
                                                    <Grid container sx={{ minHeight: 200 }} alignItems="center" textAlign="center">
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption">No leaves planned.</Typography>
                                                        </Grid>
                                                    </Grid>
                                            }
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, justifyContent: "center" }}>
                <Button variant="contained" onClick={handleLeaveSubmit}>Submit Leaves</Button>
            </DialogActions>
        </Dialog >
    );
}

export default LeaveSubmissionDialog;