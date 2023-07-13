import { DataGrid } from "@mui/x-data-grid";
import { PageContainer } from "components/layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "components/shared-ui";
import { KeyValueObject } from "types/KeyValueList";
import LeaveForecastReportColumnList from "data/LeaveForecastReportColumnList";

import MonthList from "data/MonthList";
import * as React from "react";
import ReportService from "service/ReportService";
import { LeaveForecastInfo } from "types/LeaveForecastInfo";
import { useSelectListContext } from "context/SelectListContext";

const ReportsPage = () => {
  const { ORGANIZATIONS: orgList, TEAMS: teamList } = useSelectListContext();
  const [leaveForecast, setLeaveForecast] = React.useState<any>();
  const [processedLeaveForcastData, setProcessedLeaveForcastData] = React.useState<any>([]);

  const [org, setOrg] = React.useState("");
  const [team, setTeam] = React.useState("");
  const [year] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(MonthList[new Date().getMonth() + 1].value);

  const getLeaveDates = (weekLeave: any) => {
    return weekLeave?.noOfDays === 1
      ? weekLeave?.leaveDates[0].fromDate
      : weekLeave?.leaveDates[0].fromDate + " to " + weekLeave?.leaveDates[0].toDate;
  };

  const processDataForTableView = React.useCallback((): any => {
    const tempLeaveForcastData: Array<any> = [];
    if (leaveForecast?.length > 0) {
      for (const lf of leaveForecast) {
        const leaveForcastObject: LeaveForecastInfo = {
          id: lf["employeeId"],
          employeeId: lf["employeeId"],
          employeeName: lf["employeeName"],
          organizationName: lf["organizationName"],
          teamName: lf["teamName"],
          week_1: lf["weeks"] ? lf["weeks"][0]?.noOfDays : undefined,
          week_1_leaveDates: lf["weeks"] ? getLeaveDates(lf["weeks"][0]) : undefined,
          week_2: lf["weeks"] ? lf["weeks"][1]?.noOfDays : undefined,
          week_2_leaveDates: lf["weeks"] ? getLeaveDates(lf["weeks"][1]) : undefined,
          week_3: lf["weeks"] ? lf["weeks"][2]?.noOfDays : undefined,
          week_3_leaveDates: lf["weeks"] ? getLeaveDates(lf["weeks"][2]) : undefined,
          week_4: lf["weeks"] ? lf["weeks"][3]?.noOfDays : undefined,
          week_4_leaveDates: lf["weeks"] ? getLeaveDates(lf["weeks"][3]) : undefined,
          week_5: lf["weeks"] ? lf["weeks"][4]?.noOfDays : undefined,
          week_5_leaveDates: lf["weeks"] ? getLeaveDates(lf["weeks"][4]) : undefined
        };
        tempLeaveForcastData.push(leaveForcastObject);
      }
      setProcessedLeaveForcastData(tempLeaveForcastData);
    }
  }, [leaveForecast]);

  const fetchLeaveForcastReport = () => {
    ReportService.fetchReport({ month: month, year: year, org: org, team: team })
      .then((response) => {
        setLeaveForecast(response);
      })
      .catch((error) => console.log(error));
  };

  const handleDownload = () => {
    ReportService.fetchDownloadReport({ org: org, team: team, month: month })
      .then((response: any) => {
        const blob = new Blob([response], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-us", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        });
        const formattedTime = now.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit"
        });

        const filename = `leave-report_${formattedDate}_${formattedTime}.xlsx`;

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
      })
      .catch((error: any) => {
        console.error("Error exporting CSV file:", error);
      });
  };

  const onMonthChange = (event: any) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
  };

  const handleOrgChange = (event: any) => {
    setOrg(event.target.value.trim());
  };
  const handleTeamChange = (event: any) => {
    setTeam(event.target.value.trim());
  };

  const viewReport = () => {
    fetchLeaveForcastReport();
  };

  React.useEffect(() => {
    if (typeof leaveForecast?.length !== "undefined") {
      processDataForTableView();
    }
  }, [leaveForecast, processDataForTableView]);

  return (
    <PageContainer title="LTS | Reports">
      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            Leave Forecast Report
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                select
                fullWidth
                name="org"
                label="Organization"
                variant="outlined"
                onChange={handleOrgChange}>
                {orgList.map((org: KeyValueObject) => (
                  <MenuItem key={org.value} value={org.value}>
                    {org.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                select
                fullWidth
                name="team"
                label="Team"
                variant="outlined"
                onChange={handleTeamChange}>
                {teamList.map((org: KeyValueObject) => (
                  <MenuItem key={org.value} value={org.value}>
                    {org.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField fullWidth id="month" select label="Month" onChange={onMonthChange}>
                {MonthList.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Button fullWidth id="view" variant="contained" onClick={viewReport}>
                View
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Button fullWidth id="download" variant="contained" onClick={handleDownload}>
                Download
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ height: 400, maxWidth: "calc(100vw - 36px)" }}>
                <DataGrid
                  rows={processedLeaveForcastData}
                  columns={LeaveForecastReportColumnList}
                  getRowId={(row) => row.employeeId}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5
                      }
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ReportsPage;
