import { useMemo } from "react";
import COLOR from "styles/Color";
import { KeyValueList } from "types/KeyValueList";
import { HAVE_PLANS, Leaves } from "types/LeaveSubmissionList.types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  DateRangePicker,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Typography
} from "components/shared-ui";

interface MonthlyLeaveListProps {
  leaves: Leaves;
  onMonthVisibiltyChange: (month: string) => void;
  onPlanChange: (event: any, month: string) => void;
  onLeaveDateChange: (month: string, value: any, index: number) => void;
  onLeaveAddition: (month: string, index: number) => void;
  onLeaveRemoval: (month: string, index: number) => void;
  onLeaveDateSpanChange: (month: string, index: number) => void;
}

const HAVE_PLAN_SELECT_LIST: KeyValueList = [
  { label: "Select", value: HAVE_PLANS.EMPTY },
  { label: "Yes", value: HAVE_PLANS.YES },
  { label: "No", value: HAVE_PLANS.NO }
];

const MonthlyLeaveList = (props: MonthlyLeaveListProps) => {
  const {
    leaves,
    onMonthVisibiltyChange,
    onPlanChange,
    onLeaveDateChange,
    onLeaveAddition,
    onLeaveRemoval,
    onLeaveDateSpanChange
  } = props;

  const DATE_FORMAT = "DD-MM-YYYY";
  const havePlanList = useMemo(() => HAVE_PLAN_SELECT_LIST, []);

  return (
    <Grid container spacing={2}>
      {Object.entries(leaves).map(([month, monthDetails]) => (
        <Grid item xs={12} key={month}>
          <Accordion
            disableGutters
            expanded={monthDetails?.isVisible}
            onChange={() => onMonthVisibiltyChange(month)}>
            <AccordionSummary
              expandIcon={
                <IconButton>
                  <Icon>expand_more</Icon>
                </IconButton>
              }
              sx={{
                backgroundColor: COLOR.primary.main,
                color: COLOR.common.white,
                ".MuiAccordionSummary-expandIconWrapper": {
                  ".MuiIconButton-root": {
                    color: COLOR.common.white
                  }
                }
              }}>
              <Typography>{month}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Grid container spacing={2} minHeight={136}>
                <Grid item xs={12} md={2}>
                  <TextField
                    size="small"
                    select
                    fullWidth
                    label="Have any plans?"
                    value={monthDetails.havePlans.value}
                    onChange={(event) => onPlanChange(event, month)}
                    helperText={monthDetails.havePlans.helperText}
                    error={Boolean(monthDetails.havePlans.helperText)}>
                    {havePlanList.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Grid container spacing={2} alignItems="center">
                    {monthDetails.dateList.length > 0 ? (
                      <>
                        {monthDetails.dateList.map((leavesDates, index: number) => (
                          <Grid item xs={12} key={index}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid
                                item
                                xs={leavesDates.isEditable ? 9 : 12}
                                sm={leavesDates.isEditable ? 10 : 12}
                                md={6}>
                                <DateRangePicker
                                  size="small"
                                  disabled={{
                                    start: leavesDates.startDate.disabled,
                                    end: leavesDates.endDate.disabled
                                  }}
                                  format={DATE_FORMAT}
                                  minDate={leavesDates.startDate.minDate}
                                  maxDate={leavesDates.endDate.maxDate}
                                  label={{ start: "Start Date", end: "End Date" }}
                                  value={{
                                    start: leavesDates.startDate.value,
                                    end: leavesDates.endDate.value
                                  }}
                                  onChange={(value: any) => onLeaveDateChange(month, value, index)}
                                  gridBreakpoints={{ xs: 12, sm: 6 }}
                                />
                              </Grid>
                              {leavesDates.isEditable && (
                                <Grid item xs={3} sm={2} lg="auto" sx={{ order: { md: 4 } }}>
                                  <IconButton
                                    title="Add leave"
                                    color="success"
                                    onClick={() => onLeaveAddition(month, index)}>
                                    <Icon>add</Icon>
                                  </IconButton>
                                  <IconButton
                                    title="Remove leave"
                                    color="error"
                                    onClick={() => onLeaveRemoval(month, index)}>
                                    <Icon>close</Icon>
                                  </IconButton>
                                </Grid>
                              )}
                              <Grid item xs={6} md={2} lg="auto">
                                <FormControlLabel
                                  label="Half Day"
                                  control={
                                    <Checkbox
                                      checked={leavesDates.spanType.value}
                                      disabled={leavesDates.spanType.disabled}
                                      onChange={() => onLeaveDateSpanChange(month, index)}
                                    />
                                  }
                                />
                              </Grid>
                              <Grid item xs={6} md={2} lg="auto">
                                <FormControlLabel
                                  label="Company Training?"
                                  control={<Checkbox checked={false} disabled={false} />}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                        {!monthDetails.dateList.some((leaveDates) => leaveDates.isEditable) && (
                          <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12}>
                                <Button
                                  disabled={!(monthDetails.havePlans.value === "yes")}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() =>
                                    onLeaveAddition(month, monthDetails.dateList.length)
                                  }
                                  sx={{
                                    height: "120px",
                                    width: "120px",
                                    display: "flex",
                                    flexDirection: "column"
                                  }}>
                                  <Icon>add</Icon>
                                  Add Leaves
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </>
                    ) : (
                      <>
                        {monthDetails.havePlans.value === "yes" ? (
                          <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12}>
                                <Button
                                  disabled={!(monthDetails.havePlans.value === "yes")}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() => onLeaveAddition(month, 0)}
                                  sx={{
                                    height: "120px",
                                    width: "120px",
                                    display: "flex",
                                    flexDirection: "column"
                                  }}>
                                  <Icon>add</Icon>
                                  Add Leaves
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <Grid
                              container
                              sx={{ minHeight: 136 }}
                              alignItems="center"
                              textAlign="center">
                              <Grid item xs={12}>
                                <Typography variant="caption">No leaves planned.</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default MonthlyLeaveList;
