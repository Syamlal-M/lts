import { PageContainer } from "components/layout";
import { Box, Button, DataGrid, Grid, MenuItem, TextField } from "components/shared-ui";
import LeaveForecastReportColumnList from "data/LeaveForecastReportColumnList";
import MonthList from "data/MonthList";
import * as React from 'react';
import { LeaveForecastInfo } from "types/LeaveForecastInfo";

const ReportsPage = () => {

  const [leaveForecast, setLeaveForecast] = React.useState([]);
  const [processedLeaveForcastData, setProcessedLeaveForcastData] = React.useState<Array<LeaveForecastInfo>>([]);
  const [month, setMonth] = React.useState(MonthList[new Date().getMonth() + 1].value);
  const [year] = React.useState(new Date().getFullYear());
  const [org, setOrg] = React.useState("");
  const [team, setTeam] = React.useState("");
  const [monthYear, setMonthYear] = React.useState(month + "_" + year);

// eslint-disable-next-line react-hooks/exhaustive-deps
const processDataForTableView = (): any => {
  let tempLeaveForcastData: Array<LeaveForecastInfo> = [];
  if (leaveForecast != null && leaveForecast.length != 0) {
    for (const lf of leaveForecast) {
      let leaveForcastObject: LeaveForecastInfo = {
        employeeId: lf['employeeId'],
        employeeName: lf['employeeName'],
        organizationName: lf['organizationName'],
        teamName: lf['teamName'],
        week_1: "",
        week_1_leaveDates: "",
        week_2: "",
        week_2_leaveDates: "",
        week_3: "",
        week_3_leaveDates: "",
        week_4: "",
        week_4_leaveDates: "",
        week_5: "",
        week_5_leaveDates: ""
      };
      // let leaveSummaryResponse = lf['leaveSummaryResponseList']['0']['dateBasedOnWeek']['0']
      // for (var key in leaveSummaryResponse) {
      //   if (key == 1) {
      //     leaveForcastObject.week_1 = leaveSummaryResponse[key]?.length;
      //     leaveForcastObject['week_1_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
      //   } else if (key == 2) {
      //     leaveForcastObject['week_2'] = leaveSummaryResponse[key].length;
      //     leaveForcastObject['week_2_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
      //   } else if (key == 3) {
      //     leaveForcastObject['week_3'] = leaveSummaryResponse[key].length;
      //     leaveForcastObject['week_3_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
      //   } else if (key == 4) {
      //     leaveForcastObject['week_4'] = leaveSummaryResponse[key].length;
      //     leaveForcastObject['week_4_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
      //   } else if (key == 5) {
      //     leaveForcastObject['week_5'] = leaveSummaryResponse[key].length;
      //     leaveForcastObject['week_5_leaveDates'] = leaveSummaryResponse[key].toString().replace(",", "\n");
      //   } else {
      //     leaveForcastObject['week_1'] = 0;
      //     leaveForcastObject['week_2'] = 0;
      //     leaveForcastObject['week_3'] = 0;
      //     leaveForcastObject['week_4'] = 0;
      //     leaveForcastObject['week_5'] = 0;
      //     leaveForcastObject['week_1_leaveDates'] = 0;
      //     leaveForcastObject['week_2_leaveDates'] = 0;
      //     leaveForcastObject['week_3_leaveDates'] = 0;
      //     leaveForcastObject['week_4_leaveDates'] = 0;
      //     leaveForcastObject['week_5_leaveDates'] = 0;
      //   }
      // }
      tempLeaveForcastData.push(leaveForcastObject);
    }
    setProcessedLeaveForcastData(tempLeaveForcastData);
  
  }
}

const fetchLeaveForcastReport = () => {
  var requestOptions = {
    method: 'GET',
  };
  fetch("api/leave-summary?duration=" + monthYear + "&org=" + org + "&team=" + team)
    .then(async result => {
      if (!result.ok) {
        setLeaveForecast([]);
      } else {
        setLeaveForecast(await result.json());
      }
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
  fetchLeaveForcastReport();
}, [])

React.useEffect(() => {
  if (typeof leaveForecast.length !== 'undefined') {
    processDataForTableView();

  }
}, [leaveForecast, processDataForTableView])


  return (

    <PageContainer title="LTS | Reports">
      <Grid container spacing={1} >
        <Grid item>
          <TextField id="org" label="Org" variant="outlined" onChange={handleOrgChange} />
        </Grid>
        <Grid item>
        <TextField id="team" label="Team" variant="outlined" onChange={handleTeamChange} />
        </Grid>
        <Grid item>
          <TextField id="month" select label="Select" value={month} helperText="Please select Month" onChange={onMonthChange}>
            {MonthList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button id="view" variant="contained" onClick={viewReport}>View</Button>
        </Grid>
        <Grid item>
          <Button id="download" variant="contained" disabled>Download</Button>
        </Grid>
      </Grid>

      <Box >
        <DataGrid autoHeight autoPageSize
          rows={processedLeaveForcastData}
          columns={LeaveForecastReportColumnList}
          getRowId={(row) => row.employeeId}
        />
      </Box>
    </PageContainer>)
};

export default ReportsPage;