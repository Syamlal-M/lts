import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton
} from "components/shared-ui";
import {
  HAVE_PLANS,
  HavePlans,
  LeaveDate,
  LeaveMonth,
  Leaves,
  Months,
  Years
} from "types/LeaveSubmissionList.types";
import {
  LEAVE_DATE_ACTION,
  LEAVE_DATE_PLANNING_TYPE,
  LEAVE_DATE_SPAN,
  LeaveDateAction
} from "types/api/employee/Leave.types";
import COLOR from "styles/Color";
import YearList from "data/YearList";
import MonthList from "data/MonthList";
import MonthlyLeaveList from "./MonthlyLeaveList";
import PlanningService from "service/PlanningService";
import LeaveSummaryFilter from "./LeaveSummaryFilter";
import { useCallback, useEffect, useState } from "react";
import { UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { EmployeeSearchItem } from "types/api/employee/EmployeeSearch.types";
import MonthlyLeaveListSkeleton from "components/common/MonthlyLeaveListSkeleton";
import { convertToDateFormat, getFirstAndLastDates, getNextMonthAndYear } from "utils/DateUtils";
import { LeaveSummaryItem, LeaveSummaryQueryParams } from "types/api/employee/LeaveSummary.types";

interface LeaveSubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employeeDetails: EmployeeSearchItem;
}

const DEFAULT_LEAVE_SUMMARY_FILTER_VALUE: LeaveSummaryQueryParams = {
  org: "",
  team: "",
  month: "",
  year: ""
};

const LeaveSubmissionDialog = ({
  isOpen,
  onClose,
  employeeDetails
}: LeaveSubmissionDialogProps) => {
  const [isLeaveSummaryLoading, setIsLeaveSummaryLoading] = useState(false);
  const [leaveSummaryError, setLeaveSummaryError] = useState("");
  const [isLeaveSubmissionLoading, setIsLeaveSubmissionLoading] = useState(false);
  const [leaveSubmissionError, setLeaveSubmissionError] = useState("");
  const [leaveSummaryFilter, setLeaveSummaryFilter] = useState<LeaveSummaryQueryParams>(
    DEFAULT_LEAVE_SUMMARY_FILTER_VALUE
  );
  const [leaveSummary, setLeaveSummary] = useState<LeaveSummaryItem>({} as LeaveSummaryItem);
  const [leaves, setLeaves] = useState<Leaves>({});

  const deserialiseLeaveList = useCallback(
    (_leaveSummary: LeaveSummaryItem = leaveSummary): Leaves => {
      let _leaves: Leaves = {};
      if (!Object.keys(_leaveSummary).length) {
        return _leaves;
      }

      try {
        _leaveSummary.year.map((yearDetails) => {
          yearDetails.month.map((monthDetails) => {
            const [startDate, endDate] = getFirstAndLastDates(
              leaveSummaryFilter.month,
              leaveSummaryFilter.year
            );
            const key: `${Months} ${Years}` = `${monthDetails.month} ${yearDetails.year}`;
            return (_leaves[key] = {
              isDirty: false,
              year: yearDetails.year,
              month: monthDetails.month,
              isVisible: true,
              havePlans: {
                value:
                  monthDetails.planningType === LEAVE_DATE_PLANNING_TYPE.EXPECTED_NO_LEAVES
                    ? HAVE_PLANS.NO
                    : HAVE_PLANS.YES
              },
              dateList: monthDetails.leaveDates.map((date): LeaveDate => {
                return {
                  isDirty: false,
                  isEditable:
                    new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) > new Date(),
                  startDate: {
                    value: date.fromDate,
                    minDate: startDate,
                    maxDate: endDate,
                    disabled:
                      new Date(convertToDateFormat(date.fromDate, "YYYY-MM-DD")) < new Date()
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
                    disabled: !(date.fromDate === date.toDate)
                  }
                };
              })
            });
          });
        });
      } catch (e) {
        _leaves = {};
      }

      return _leaves;
    },
    [leaveSummary, leaveSummaryFilter.month, leaveSummaryFilter.year]
  );

  const serializeLeaveList = (
    leaves: Leaves,
    action: LeaveDateAction = LEAVE_DATE_ACTION.INSERT
  ): UpdateLeaveRequest => {
    const leaveList: UpdateLeaveRequest = [];
    Object.values(leaves).forEach((leaveMonth) => {
      if (leaveMonth?.havePlans.value === HAVE_PLANS.YES) {
        leaveMonth.dateList.forEach((leaveDate) => {
          if (leaveDate.isDirty) {
            leaveList.push({
              action: action,
              empId: employeeDetails.employeeId || "",
              exceptional: false,
              fromDate: leaveDate.startDate.value,
              planningType: LEAVE_DATE_PLANNING_TYPE.EXPECTED_WITH_LEAVES,
              span: leaveDate.spanType.value ? LEAVE_DATE_SPAN.HALF : LEAVE_DATE_SPAN.FULL,
              toDate: leaveDate.endDate.value
            });
          }
        });
      } else {
        if (leaveMonth?.isDirty) {
          const [firstDate, lastDate] = getFirstAndLastDates(leaveMonth.month, leaveMonth.year);
          leaveList.push({
            action: action,
            empId: employeeDetails.employeeId || "",
            exceptional: false,
            fromDate: firstDate,
            planningType: LEAVE_DATE_PLANNING_TYPE.EXPECTED_NO_LEAVES,
            span: LEAVE_DATE_SPAN.FULL,
            toDate: lastDate
          });
        }
      }
    });
    return leaveList;
  };

  useEffect(() => {
    setLeaves(deserialiseLeaveList());
  }, [deserialiseLeaveList]);

  const getLeaveSummary = useCallback(
    (queryParams: LeaveSummaryQueryParams = leaveSummaryFilter) => {
      setIsLeaveSummaryLoading(true);
      PlanningService.getLeaveSummary(queryParams)
        .then((response) => {
          const leaveSummary = response.find(
            (leave) => leave.employeeId === employeeDetails.employeeId
          );
          setLeaveSummary(leaveSummary || ({} as LeaveSummaryItem));
          setLeaveSummaryError("");
          setLeaveSubmissionError("");
        })
        .catch((error) => {
          console.log(error);
          setLeaveSummaryError(
            error.message || "Oops! Something went wrong while fetching leave summary."
          );
        })
        .finally(() => {
          setIsLeaveSummaryLoading(false);
        });
    },
    [leaveSummaryFilter, employeeDetails.employeeId]
  );

  const handleLeaveSummaryFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveSummaryFilter((prevFilter) => {
      const { name, value } = event.target;
      return { ...prevFilter, [name]: value };
    });
  };

  const handleLeaveSummaryFilterSubmit = (filter: LeaveSummaryQueryParams) => {
    getLeaveSummary(filter);
  };

  const resetDialog = () => {
    setLeaveSummaryError("");
    setLeaveSubmissionError("");
    setLeaveSummary({} as LeaveSummaryItem);
    setLeaveSummaryFilter(DEFAULT_LEAVE_SUMMARY_FILTER_VALUE);
  };

  useEffect(() => {
    if (isOpen) {
      getLeaveSummary();
    } else {
      resetDialog();
    }
  }, [getLeaveSummary, isOpen]);

  const HAVE_PLAN_ERROR_TEXT = "Error! There are leaves already planned.";
  const DEFAULT_DATE_RANGE: LeaveDate = {
    isDirty: false,
    startDate: { value: "" },
    endDate: { value: "" },
    isEditable: true,
    exceptional: false,
    spanType: { value: false, disabled: false }
  };
  const DEFAULT_MONTHLY_LEAVE_VALUE: LeaveMonth = {
    isDirty: false,
    year:
      YearList.find((year) => year.value === `${new Date().getFullYear()}`)?.value ||
      YearList[0].value,
    month:
      MonthList.find(
        (month) =>
          month.value === new Date().toLocaleString("en-US", { month: "long" }).toUpperCase()
      )?.value || MonthList[0].value,
    isVisible: true,
    havePlans: { value: "" },
    dateList: []
  };

  const handleMonthVisibilty = (month: string) => {
    setLeaves((prevLeave: any) => ({
      ...prevLeave,
      [month]: { ...prevLeave[month], isVisible: !prevLeave[month]?.isVisible }
    }));
  };

  const handlePlanChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    month: string
  ) => {
    setLeaves((prevLeave) => {
      const monthDetails: LeaveMonth =
        prevLeave[month as `${Months} ${Years}`] || ({} as LeaveMonth);
      const plan = event.target.value;
      if (!(plan === HAVE_PLANS.YES)) {
        monthDetails.havePlans.helperText =
          monthDetails.dateList.length > 0 ? HAVE_PLAN_ERROR_TEXT : "";
      } else {
        monthDetails.havePlans.helperText = "";
      }
      monthDetails.havePlans.value = event.target.value as HavePlans;
      monthDetails.isDirty = true;
      return { ...prevLeave, [month]: monthDetails };
    });
  };

  const handleLeaveDateChange = (month: string, dateRange: any, index: number) => {
    setLeaves((prevLeave: any) => {
      const monthDetails: LeaveMonth = prevLeave[month];
      const startDate = { ...monthDetails.dateList[index].startDate, value: dateRange.start };
      const endDate = {
        ...monthDetails.dateList[index].endDate,
        value: dateRange.end ? dateRange.end : dateRange.start
      };
      monthDetails.dateList[index] = {
        ...monthDetails.dateList[index],
        isDirty: true,
        startDate,
        endDate,
        spanType: {
          value:
            startDate.value === endDate.value ? monthDetails.dateList[index].spanType.value : false,
          disabled: !(startDate.value === endDate.value)
        }
      };
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
      monthDetails.havePlans.helperText =
        monthDetails.dateList.length > 0 && monthDetails.havePlans.value === HAVE_PLANS.NO
          ? HAVE_PLAN_ERROR_TEXT
          : "";
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
      };
      return { ...prevLeave, [month]: monthDetails };
    });
  };

  const handleMonthAddition = () => {
    let { month, year } = DEFAULT_MONTHLY_LEAVE_VALUE;
    const defaultMonthlyLeaveValue = { ...DEFAULT_MONTHLY_LEAVE_VALUE };

    if (Object.keys(leaves).length) {
      [month, year] = getNextMonthAndYear(
        Object.keys(leaves)[Object.keys(leaves).length - 1]
      ).split(" ") as [Months, Years];
    } else {
      month = leaveSummaryFilter.month || month;
      year = leaveSummaryFilter.year || year;
    }

    defaultMonthlyLeaveValue.month =
      MonthList.find((m) => m.value === month)?.value || MonthList[0].value;
    defaultMonthlyLeaveValue.year =
      YearList.find((y) => y.value === year)?.value || YearList[0].value;
    const monthAndYear = `${month} ${year}`;
    setLeaves((prevLeaves) => ({ ...prevLeaves, [monthAndYear]: defaultMonthlyLeaveValue }));
  };

  const submitLeaves = (employeeId: string, leaveList: UpdateLeaveRequest) => {
    setIsLeaveSubmissionLoading(true);
    PlanningService.updateLeave({ employeeId }, leaveList)
      .then((response) => {
        console.log({ response });
        setLeaveSubmissionError("");
      })
      .catch((error) => {
        console.log({ error });
        setLeaveSubmissionError(
          error.message || "Oops! Something went wrong while submitting leaves."
        );
      })
      .finally(() => {
        setIsLeaveSubmissionLoading(false);
      });
  };

  const handleLeaveSubmit = () => {
    const leaveList = serializeLeaveList(leaves);
    submitLeaves(leaveSummary.employeeId, leaveList);
    console.log({ leaveList });
  };

  return (
    <Dialog scroll="body" fullWidth maxWidth="lg" open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Leave Plans
        <IconButton onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Backdrop
          open={isLeaveSubmissionLoading}
          sx={{ color: COLOR.common.white, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={2}>
          {(leaveSummaryError || leaveSubmissionError) && (
            <Grid item xs={12}>
              <Alert
                severity="error"
                onClose={() => {
                  setLeaveSummaryError("");
                  setLeaveSubmissionError("");
                }}>
                {leaveSummaryError}
                {leaveSubmissionError}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <LeaveSummaryFilter
              filter={leaveSummaryFilter}
              onChange={handleLeaveSummaryFormChange}
              onSubmit={handleLeaveSummaryFilterSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            {isLeaveSummaryLoading ? (
              <MonthlyLeaveListSkeleton />
            ) : (
              <MonthlyLeaveList
                leaves={leaves}
                onMonthVisibiltyChange={handleMonthVisibilty}
                onPlanChange={handlePlanChange}
                onLeaveDateChange={handleLeaveDateChange}
                onLeaveAddition={handleLeaveAddition}
                onLeaveRemoval={handleLeaveRemoval}
                onLeaveDateSpanChange={handleLeaveDateSpanChange}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleMonthAddition}
              sx={{
                height: "120px",
                width: "120px",
                display: "flex",
                flexDirection: "column",
                margin: "auto"
              }}>
              <Icon>add</Icon>
              Add Month
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={handleLeaveSubmit} disabled={isLeaveSubmissionLoading}>
          Submit Leaves
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveSubmissionDialog;
