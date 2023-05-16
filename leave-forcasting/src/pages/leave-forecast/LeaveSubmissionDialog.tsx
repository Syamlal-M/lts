import { useCallback, useEffect, useMemo, useState } from "react";
import MonthList from "data/MonthList";
import MonthlyLeaveList from "./MonthlyLeaveList";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { EmployeeSearchItem } from "types/api/employee/EmployeeSearch.types";
import { LeaveDate, LeaveMonth, Leaves } from "types/LeaveSubmissionList.types";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";
import {
    Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Typography,
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
    error: string;
};

const LeaveSubmissionDialog = (props: LeaveSubmissionDialogProps) => {
    const {
        isOpen, onClose, filter, onFilterChange, onFilterSubmit,
        employeeDetails, leaveSummary, onLeaveSubmit, error,
    } = props;

    const HAVE_PLAN_ERROR_TEXT = "Error! There are leaves already planned."
    const DEFAULT_DATE_RANGE: LeaveDate = { startDate: { value: '' }, endDate: { value: '' }, isEditable: true };
    const DEFAULT_MONTHLY_LEAVE_VALUE: LeaveMonth = { isVisible: true, havePlans: { value: "" }, dateList: [] };

    const convertToDateFormat = (date: string, format: 'DD-MM-YYYY' | 'YYYY-MM-DD'): string => {
        if (format === "YYYY-MM-DD") {
            const [day, month, year] = date.split("-");
            return `${year}-${month}-${day}`;
        }
        else {
            const [year, month, day] = date.split("-");
            return `${day}-${month}-${year}`;
        }
    };

    const normalizeLeave = useCallback((_leaveSummary: LeaveSummaryItem | undefined = leaveSummary): Leaves => {
        let _leaves: Leaves = {};
        if (!_leaveSummary) {
            return _leaves;
        }

        try {
            _leaveSummary.month.map(monthDetails => {
                return _leaves[monthDetails.month] = {
                    isVisible: true,
                    havePlans: { value: monthDetails.planningType === "EXPECTED_NO_LEAVES" ? "no" : "yes" },
                    dateList: monthDetails.leaveDates.map(date => {
                        return {
                            isEditable: new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) > new Date(),
                            startDate: {
                                value: date.fromDate,
                                disabled: new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) < new Date()
                            },
                            endDate: {
                                value: date.toDate,
                                disabled: new Date(date.toDate) > new Date()
                            },
                        }
                    }),
                };
            });
        } catch (e) {
            _leaves = {};
        }

        return _leaves;
    }, [leaveSummary]);
    const [leaves, setLeaves] = useState<Leaves>(normalizeLeave(leaveSummary));
    const [dbLeaves, setDBLeaves] = useState<Leaves>(normalizeLeave(leaveSummary));

    useEffect(() => {
        setLeaves(normalizeLeave(leaveSummary));
        setDBLeaves(normalizeLeave(leaveSummary));
    }, [normalizeLeave, leaveSummary]);

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
        const year = filter.year || new Date().getFullYear();
        setLeaves(prevLeave => {
            return { ...prevLeave, [month]: DEFAULT_MONTHLY_LEAVE_VALUE };
        });
        onFilterChange({ target: { name: "month", value: month } } as React.ChangeEvent<HTMLInputElement>);
        onFilterChange({ target: { name: "year", value: year } } as React.ChangeEvent<HTMLInputElement>);
    };

    const serializeLeaveList = (leaves: Leaves, action: 'INSERT' | 'DELETE' = 'INSERT'): UpdateLeaveRequest => {
        let leaveList: UpdateLeaveRequest = [];
        Object.values(leaves).map(leaveMonth => {
            return leaveMonth.dateList.map(leaveDate => {
                return leaveList.push({
                    action: action,
                    empId: employeeDetails.employeeId || "",
                    fromDate: leaveDate.startDate.value,
                    planningType: leaveMonth.havePlans.value === 'yes' ? "EXPECTED_WITH_LEAVES" : "EXPECTED_NO_LEAVES",
                    toDate: leaveDate.endDate.value,
                });
            })
        })
        return leaveList;
    }

    const handleLeaveSubmit = () => {
        const leaveList = serializeLeaveList(leaves);
        const dbLeaveList = serializeLeaveList(dbLeaves, "DELETE");
        onLeaveSubmit([...dbLeaveList, ...leaveList]);
    };

    const checkIsDisabled = useMemo((): boolean => {
        const { month, year } = filter;
        const monthIndex = MonthList.findIndex(mon => mon.value === month);
        return new Date(`${year}-${monthIndex + 1}-01`) > new Date() || month === '' ? false : true;
    }, [filter]);

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
                                            disabled={checkIsDisabled}
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
                    {
                        error &&
                        <Grid item xs={12}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        </Grid>
                    }
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, justifyContent: "center" }}>
                <Button variant="contained" onClick={handleLeaveSubmit}>Submit Leaves</Button>
            </DialogActions>
        </Dialog >
    );
};

export default LeaveSubmissionDialog;