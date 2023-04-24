import { DataGrid } from '@mui/x-data-grid';
import { PageContainer } from "components/layout";
import { Box, Button, Card, CardContent, Grid, MenuItem, TextField,
	Typography } from "components/shared-ui";
import LeaveForecastReportColumnList from "data/LeaveForecastReportColumnList";

import MonthList from "data/MonthList";
import * as React from 'react';
import ReportService from "service/ReportService";
import { LeaveForecastInfo } from "types/LeaveForecastInfo";

const ReportsPage = () => {

  const [leaveForecast, setLeaveForecast] = React.useState<any>();
  const [processedLeaveForcastData, setProcessedLeaveForcastData] = React.useState<any>([]);
  const [month, setMonth] = React.useState(MonthList[new Date().getMonth() + 1].value);
  const [year] = React.useState(new Date().getFullYear());
  const [org, setOrg] = React.useState("");
  const [team, setTeam] = React.useState("");
  const [monthYear, setMonthYear] = React.useState(month + "_" + year);

  const processDataForTableView = (): any => {
    let tempLeaveForcastData: Array<any> = [];
    if (leaveForecast?.length !== 0) {
      for (const lf of leaveForecast) {
        let leaveForcastObject: LeaveForecastInfo = {
          id: lf['employeeId'],
          employeeId: lf['employeeId'],
          employeeName: lf['employeeName'],
          organizationName: lf['organizationName'],
          teamName: lf['teamName'],
          week_1: 0,
          week_2: 0,
          week_3: 0,
          week_4: 0,
          week_5: 0,
        };
        let leaveSummaryResponse = lf['leaveSummaryResponseList']['0']['dateBasedOnWeek']['0']
        for (var key in leaveSummaryResponse) {
          if (key.toString() === "1") {
            leaveForcastObject.week_1 = leaveSummaryResponse[key]?.length;
            leaveForcastObject['week_1_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
          } else if (key.toString() === "2") {
            leaveForcastObject['week_2'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_2_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
          } else if (key.toString() === "3") {
            leaveForcastObject['week_3'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_3_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
          } else if (key.toString() === "4") {
            leaveForcastObject['week_4'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_4_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
          } else if (key.toString() === "5") {
            leaveForcastObject['week_5'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_5_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
          }
        }
        tempLeaveForcastData.push(leaveForcastObject);
      }
      setProcessedLeaveForcastData(tempLeaveForcastData);

    }
  }

  const fetchLeaveForcastReport = () => {
    ReportService.fetchForecast({ 'duration': monthYear, 'org': org, 'team': team })
      .then(response => {
        setLeaveForecast(response);
        console.log(response);
      })
      .catch(error => console.log(error))
  }

  const onMonthChange = (event: any) => {
    let selectedMonth = event.target.value
    setMonth(selectedMonth);
    let selectedMonthYear = selectedMonth + "_" + year;
    setMonthYear(selectedMonthYear);
  };

  const handleOrgChange = (event: any) => {
    setOrg(event.target.value.trim());
  }
  const handleTeamChange = (event: any) => {
    setTeam(event.target.value.trim());
  }


  const viewReport = () => {
    fetchLeaveForcastReport();
  }

  React.useEffect(() => {
    if (typeof leaveForecast?.length !== 'undefined') {
      processDataForTableView();

    }
  }, [leaveForecast])


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
                fullWidth
                id="organization"
                label="Organization"
                variant="outlined"
                onChange={handleOrgChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                fullWidth
                id="team"
                label="Team"
                variant="outlined"
                onChange={handleTeamChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                fullWidth
                id="month"
                select
                label="Month"
                onChange={onMonthChange}
              >
                {MonthList.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Button
                fullWidth
                id="view"
                variant="contained"
                onClick={viewReport}
              >
                View
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Button
                fullWidth
                id="download"
                variant="contained"
                onClick={viewReport}
                disabled
              >
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
                        pageSize: 5,
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>)
};

export default ReportsPage;