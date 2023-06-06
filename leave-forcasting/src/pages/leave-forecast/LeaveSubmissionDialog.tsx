import { useCallback, useEffect, useMemo, useState } from "react";
import MonthList from "data/MonthList";
import MonthlyLeaveList from "./MonthlyLeaveList";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { convertToDateFormat, getFirstAndLastDates } from "utils/DateUtils";
import { EmployeeSearchItem } from "types/api/employee/EmployeeSearch.types";
import { HAVE_PLANS, LeaveDate, LeaveMonth, Leaves } from "types/LeaveSubmissionList.types";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";
import {
    Alert, AlertTitle, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Grid, Icon, IconButton, Typography,
} from "components/shared-ui";
import { LEAVE_DATE_ACTION, LEAVE_DATE_PLANNING_TYPE, LEAVE_DATE_SPAN, LeaveDateAction } from "types/api/employee/Leave.types";

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
    const DEFAULT_DATE_RANGE: LeaveDate = { startDate: { value: '' }, endDate: { value: '' }, isEditable: true, exceptional: false, spanType: { value: false, disabled: false } };
    const DEFAULT_MONTHLY_LEAVE_VALUE: LeaveMonth = { isVisible: true, havePlans: { value: "" }, dateList: [] };

    const deserialiseLeaveList = useCallback((_leaveSummary: LeaveSummaryItem | undefined = leaveSummary): Leaves => {
        let _leaves: Leaves = {};
        if (!_leaveSummary) {
            return _leaves;
        }

        try {
            _leaveSummary.month.map(monthDetails => {
                const [startDate, endDate] = getFirstAndLastDates(filter.month, filter.year);
                return _leaves[monthDetails.month] = {
                    isVisible: true,
                    havePlans: { value: monthDetails.planningType === LEAVE_DATE_PLANNING_TYPE.EXPECTED_NO_LEAVES ? HAVE_PLANS.NO : HAVE_PLANS.YES },
                    dateList: monthDetails.leaveDates.map((date): LeaveDate => {
                        return {
                            isEditable: new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) > new Date(),
                            startDate: {
                                value: date.fromDate,
                                minDate: startDate,
                                maxDate: endDate,
                                disabled: new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) < new Date()
                            },
                            endDate: {
                                value: date.toDate,
                                minDate: startDate,
                                maxDate: endDate,
                                disabled: new Date(convertToDateFormat(date.toDate, "YYYY-MM-DD")) < new Date()
                            },
                            exceptional: date.exceptional,
                            leaveForcastId: date.leaveForcastId,
                            spanType: {
                                value: date.spanType === LEAVE_DATE_SPAN.HALF,
                                disabled: !(date.fromDate === date.toDate),
                            }
                        }
                    }),
                };
            });
        } catch (e) {
            _leaves = {};
        }

        return _leaves;
    }, [leaveSummary, filter.month, filter.year]);
    const [leaves, setLeaves] = useState<Leaves>({});
    const DB_LEAVES = useMemo(() => (deserialiseLeaveList(leaveSummary)), [deserialiseLeaveList, leaveSummary]);

    useEffect(() => {
        setLeaves(deserialiseLeaveList(leaveSummary));
    }, [deserialiseLeaveList, leaveSummary]);

    const handleMonthVisibilty = (month: string) => {
        setLeaves((prevLeave: any) => (
            { ...prevLeave, [month]: { ...prevLeave[month], isVisible: !prevLeave[month]?.isVisible } }
        ));
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, month: string) => {
        setLeaves((prevLeave: any) => {
            const monthDetails = prevLeave[month];
            const plan = event.target.value;
            if (!(plan === HAVE_PLANS.YES)) {
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
            monthDetails.havePlans.helperText = (monthDetails.dateList.length > 0) && (monthDetails.havePlans.value === HAVE_PLANS.NO) ?
                HAVE_PLAN_ERROR_TEXT : "";
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveDateSpanChange = (month: string, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            monthDetails.dateList[index] = {
                ...monthDetails.dateList[index],
                spanType: {
                    ...monthDetails.dateList[index].spanType,
                    value: !monthDetails.dateList[index].spanType.value
                }
            }
            return { ...prevLeave, [month]: monthDetails };
        });
    };

    const handleLeaveDateChange = (month: string, dateRange: any, index: number) => {
        setLeaves((prevLeave: any) => {
            const monthDetails: LeaveMonth = prevLeave[month];
            const startDate = { ...monthDetails.dateList[index].startDate, value: dateRange.start };
            const endDate = { ...monthDetails.dateList[index].endDate, value: dateRange.end ? dateRange.end : dateRange.start };
            monthDetails.dateList[index] = {
                ...monthDetails.dateList[index],
                startDate,
                endDate,
                spanType: {
                    value: (startDate.value === endDate.value) ? monthDetails.dateList[index].spanType.value : false,
                    disabled: !(startDate.value === endDate.value)
                }
            }
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

    const serializeLeaveList = (leaves: Leaves, action: LeaveDateAction = LEAVE_DATE_ACTION.INSERT): UpdateLeaveRequest => {
        let leaveList: UpdateLeaveRequest = [];
        Object.values(leaves).forEach(leaveMonth => {
            if (leaveMonth.havePlans.value === HAVE_PLANS.YES) {
                leaveMonth.dateList.forEach(leaveDate => {
                    leaveList.push({
                        action: action,
                        empId: employeeDetails.employeeId || "",
                        exceptional: false,
                        fromDate: leaveDate.startDate.value,
                        planningType: LEAVE_DATE_PLANNING_TYPE.EXPECTED_WITH_LEAVES,
                        span: leaveDate.spanType.value ? LEAVE_DATE_SPAN.HALF : LEAVE_DATE_SPAN.FULL,
                        toDate: leaveDate.endDate.value,

                    });
                })
            } else {
                const [firstDate, lastDate] = getFirstAndLastDates(filter.month, filter.year);
                leaveList.push({
                    action: action,
                    empId: employeeDetails.employeeId || "",
                    exceptional: false,
                    fromDate: firstDate,
                    planningType: LEAVE_DATE_PLANNING_TYPE.EXPECTED_NO_LEAVES,
                    span: LEAVE_DATE_SPAN.FULL,
                    toDate: lastDate,
                });
            }
        })
        return leaveList;
    }

    const handleLeaveSubmit = () => {
        const leaveList = serializeLeaveList(leaves);
        const dbLeaveList = serializeLeaveList(DB_LEAVES, LEAVE_DATE_ACTION.DELETE);
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
            maxWidth='lg'
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
                                    onMonthVisibiltyChange={handleMonthVisibilty}
                                    onPlanChange={handlePlanChange}
                                    onLeaveDateChange={handleLeaveDateChange}
                                    onLeaveAddition={handleLeaveAddition}
                                    onLeaveRemoval={handleLeaveRemoval}
                                    onLeaveDateSpanChange={handleLeaveDateSpanChange}
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