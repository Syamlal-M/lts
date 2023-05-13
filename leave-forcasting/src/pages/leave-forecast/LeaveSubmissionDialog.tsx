import { useEffect, useState } from "react";
import MonthList from "data/MonthList";
import MonthlyLeaveList from "./MonthlyLeaveList";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { EmployeeSearchItem } from "types/api/employee/EmployeeSearch.types";
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
    employeeDetails: EmployeeSearchItem;
    leaveSummary?: LeaveSummaryItem;
    onLeaveSubmit: (leaveList: UpdateLeaveRequest) => void;
};

const LeaveSubmissionDialog = (props: LeaveSubmissionDialogProps) => {
    const {
        isOpen, onClose, filter, onFilterChange, onFilterSubmit,
        employeeDetails, leaveSummary, onLeaveSubmit
    } = props;

    const convertToDateFormat = (date: string, format: 'DD-MM-YYYY' | 'YYYY-MM-DD'): string => {
        if (format == "YYYY-MM-DD") {
            const [day, month, year] = date.split("-");
            return `${year}-${month}-${day}`;
        }
        else {
            const [year, month, day] = date.split("-");
            return `${day}-${month}-${year}`;
        }
    };

    const normalizeLeave = (_leaveSummary: LeaveSummaryItem | undefined): Leaves => {
        let _leaves: Leaves = {};
        if (!_leaveSummary) {
            return _leaves;
        }

        try {
            const month: keyof Leaves = _leaveSummary.weeks.map(week => {
                return week.leaveDates.map(date => (date.month))
            })[0][0];

            _leaves[month] = {
                isVisible: true,
                havePlans: { value: "yes" },
                dateList: _leaveSummary.weeks.flatMap(week => {
                    return week.leaveDates.map(date => {
                        return {
                            isEditable: new Date(date.fromDate) > new Date(),
                            startDate: { value: convertToDateFormat(date.fromDate, "DD-MM-YYYY") },
                            endDate: { value: convertToDateFormat(date.toDate, "DD-MM-YYYY") }
                        }
                    })
                }),
            }
        } catch (e) {
            _leaves = {};
        }

        return _leaves;
    };
    const [leaves, setLeaves] = useState<Leaves>(normalizeLeave(leaveSummary));
    useEffect(() => { setLeaves(normalizeLeave(leaveSummary)) }, [leaveSummary])

    const HAVE_PLAN_ERROR_TEXT = "Error! There are leaves already planned."
    const DEFAULT_DATE_RANGE: LeaveDate = { startDate: { value: '' }, endDate: { value: '' }, isEditable: true };
    const DEFAULT_MONTHLY_LEAVE_VALUE: LeaveMonth = {
        isVisible: true,
        havePlans: { value: "" },
        dateList: [],
    };

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

    const handleMonthlyLeaveAddition = () => {
        const month = filter.month || MonthList[new Date().getMonth()].value;
        setLeaves(prevLeave => {
            return { ...prevLeave, [month]: DEFAULT_MONTHLY_LEAVE_VALUE };
        });
        onFilterChange({ target: { name: "month", value: month } } as React.ChangeEvent<HTMLInputElement>)
    };

    const serializeLeaveList = (leaves: Leaves): UpdateLeaveRequest => {
        let leaveList: UpdateLeaveRequest = [];
        Object.values(leaves).map(leaveMonth => {
            leaveMonth.dateList.map(leaveDate => {
                leaveList.push({
                    empId: employeeDetails.employeeId || "",
                    fromDate: convertToDateFormat(leaveDate.startDate.value, "YYYY-MM-DD"),
                    planningType: "ACTUAL",
                    toDate: convertToDateFormat(leaveDate.endDate.value, "YYYY-MM-DD"),
                });
            })
        })
        return leaveList;
    }

    const handleLeaveSubmit = () => {
        const leaveList = serializeLeaveList(leaves);
        onLeaveSubmit(leaveList);
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
                                <Grid container sx={{ minHeight: 300 }} justifyContent="center" alignItems="center" textAlign="center">
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={handleMonthlyLeaveAddition}
                                            sx={{ height: "120px", width: "120px", display: "flex", flexDirection: "column" }}
                                        >
                                            <Icon>add</Icon>
                                            Add Leaves
                                        </Button>
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