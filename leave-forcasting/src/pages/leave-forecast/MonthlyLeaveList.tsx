import { Fragment, useMemo } from "react";
import COLOR from "styles/Color";
import { KeyValueList } from "types/KeyValueList";
import { Leaves } from "types/LeaveSubmissionList.types";
import {
    Accordion, AccordionDetails, AccordionSummary, Button,
    DateRangePicker, Grid, Icon, IconButton, MenuItem, TextField, Typography
} from "components/shared-ui";

interface MonthlyLeaveListProps {
    leaves: Leaves;
    handleMonthVisibilty: (month: string) => void;
    handlePlanChange: (event: any, month: string) => void;
    onChange: (month: string, value: any, index: number) => void;
    handleLeaveAddition: (month: string, index: number) => void;
    handleLeaveRemoval: (month: string, index: number) => void;
};

const HAVE_PLAN_SELECT_LIST: KeyValueList = [
    { label: "Select", value: "" },
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const MonthlyLeaveList = (props: MonthlyLeaveListProps) => {
    const { leaves, handleMonthVisibilty, handlePlanChange, onChange, handleLeaveAddition, handleLeaveRemoval } = props;

    const DATE_FORMAT = "DD-MM-YYYY";
    const havePlanList = useMemo(() => (HAVE_PLAN_SELECT_LIST), []);

    return (
        <Grid container spacing={2}>
            {
                Object.entries(leaves).map(([month, monthDetails]) => (
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
                                <Grid container spacing={2} minHeight={136}>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Have any plans?"
                                            value={monthDetails.havePlans.value}
                                            onChange={(event) => handlePlanChange(event, month)}
                                            helperText={monthDetails.havePlans.helperText}
                                            error={Boolean(monthDetails.havePlans.helperText)}
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
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={2} alignItems="center">
                                            {
                                                monthDetails.dateList.length > 0 ?
                                                    <>
                                                        {
                                                            monthDetails.dateList.map((leavesDates, index: number) => (
                                                                <Fragment key={index}>
                                                                    <Grid item xs={leavesDates.isEditable ? 9 : 12} sm={leavesDates.isEditable ? 10 : 12}>
                                                                        <DateRangePicker
                                                                            disabled={{ start: leavesDates.startDate.disabled, end: leavesDates.endDate.disabled }}
                                                                            format={DATE_FORMAT}
                                                                            label={{ start: "Start Date", end: "End Date" }}
                                                                            value={{ start: leavesDates.startDate.value, end: leavesDates.endDate.value }}
                                                                            onChange={(value: any) => onChange(month, value, index)}
                                                                            gridBreakpoints={{ xs: 12, sm: 6 }}
                                                                        />
                                                                    </Grid>
                                                                    {
                                                                        leavesDates.isEditable &&
                                                                        <Grid item xs={3} sm={2}>
                                                                            <IconButton
                                                                                title="Add leave"
                                                                                color="success"
                                                                                onClick={() => handleLeaveAddition(month, index)}
                                                                            >
                                                                                <Icon>add</Icon>
                                                                            </IconButton>
                                                                            <IconButton
                                                                                title="Remove leave"
                                                                                color="error"
                                                                                onClick={() => handleLeaveRemoval(month, index)}
                                                                            >
                                                                                <Icon>close</Icon>
                                                                            </IconButton>
                                                                        </Grid>
                                                                    }
                                                                </Fragment>
                                                            ))
                                                        }
                                                        {
                                                            !monthDetails.dateList.some(leaveDates => leaveDates.isEditable) &&
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    disabled={!(monthDetails.havePlans.value === 'yes')}
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    onClick={() => handleLeaveAddition(month, monthDetails.dateList.length)}
                                                                    sx={{ height: "120px", width: "120px", display: "flex", flexDirection: "column" }}
                                                                >
                                                                    <Icon>add</Icon>
                                                                    Add Leaves
                                                                </Button>
                                                            </Grid>
                                                        }
                                                    </> :
                                                    <>
                                                        {
                                                            monthDetails.havePlans.value === 'yes' ?
                                                                <Grid item xs={12}>
                                                                    <Button
                                                                        disabled={!(monthDetails.havePlans.value === 'yes')}
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        onClick={() => handleLeaveAddition(month, 0)}
                                                                        sx={{ height: "120px", width: "120px", display: "flex", flexDirection: "column" }}
                                                                    >
                                                                        <Icon>add</Icon>
                                                                        Add Leaves
                                                                    </Button>
                                                                </Grid> :
                                                                <Grid container sx={{ minHeight: 136 }} alignItems="center" textAlign="center">
                                                                    <Grid item xs={12}>
                                                                        <Typography variant="caption">No leaves planned.</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                        }
                                                    </>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default MonthlyLeaveList;