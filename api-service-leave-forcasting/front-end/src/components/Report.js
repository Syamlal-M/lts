import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {months, leaveForecastReportColumns} from '../App.constant';
import { DataGrid } from '@mui/x-data-grid';

const Report = () => {

  let monthArrayToMap = months.reduce(function(map, obj) {
    map[obj.key] = obj.value;
    return map;
}, {});

  const [leaveForecast, setLeaveForecast] = React.useState([]);
  const [month, setMonth] = React.useState(monthArrayToMap[new Date().getMonth() + 1]);
  const [year] = React.useState(new Date().getFullYear());
  const [monthYear, setMonthYear] = React.useState(month+"_"+year);
  const [processedLeaveForcastData, setProcessedLeaveForcastData] = React.useState([]);


  const fetchLeaveForcastReport = () =>{
    fetch("api/leave-summary/"+ monthYear)
    .then( async result => {
      if(!result.ok){
        setLeaveForecast([]); 
      }else{
        setLeaveForecast(await result.json());
      }
    })
    .catch(error=>console.log(error))
  }

  React.useEffect(() =>{
    fetchLeaveForcastReport();
  },[])

  React.useEffect(() =>{
    if(typeof leaveForecast.length !=='undefined'){
      processDataForTableView();
      
    }
  },[leaveForecast])

  const onMonthChange = (event) => {
    let selectedMonth = event.target.value;
    setMonth(selectedMonth);
    let selectedMonthYear = selectedMonth+"_"+year;
    setMonthYear(selectedMonthYear);
  };

  const viewReport = ()=>{
    fetchLeaveForcastReport();
  }

  const processDataForTableView =()=>{
    let tempLeaveForcastData = [];
    if(leaveForecast != null && leaveForecast.length!=0){
      for (const lf of leaveForecast) { 
        let leaveForcastObject = {};
        leaveForcastObject['employeeId'] = lf['employeeId'];
        leaveForcastObject['employeeName'] = lf['employeeName'];
        leaveForcastObject['organizationName'] = lf['organizationName'];
        leaveForcastObject['teamName'] = lf['teamName'];
        let leaveSummaryResponse = lf['leaveSummaryResponseList']['0']['dateBasedOnWeek']['0']
        for(var key in leaveSummaryResponse){
          if(key == 1){
            leaveForcastObject['week_1'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_1_leaveDates'] = leaveSummaryResponse[key].toString();
          }else if(key == 2){
            leaveForcastObject['week_2'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_2_leaveDates'] = leaveSummaryResponse[key].toString();
          }else if(key == 3){
            leaveForcastObject['week_3'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_3_leaveDates'] = leaveSummaryResponse[key].toString();
          }else if(key == 4){
            leaveForcastObject['week_4'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_4_leaveDates'] = leaveSummaryResponse[key].toString();
          }else if(key == 5){
            leaveForcastObject['week_5'] = leaveSummaryResponse[key].length;
            leaveForcastObject['week_5_leaveDates'] =leaveSummaryResponse[key].toString();
          }else{
            leaveForcastObject['week_1'] = 0;
            leaveForcastObject['week_2'] = 0;
            leaveForcastObject['week_3'] = 0;
            leaveForcastObject['week_4'] = 0;
            leaveForcastObject['week_5'] = 0;
            leaveForcastObject['week_1_leaveDates'] = 0;
            leaveForcastObject['week_2_leaveDates'] = 0;
            leaveForcastObject['week_3_leaveDates'] = 0;
            leaveForcastObject['week_4_leaveDates'] = 0;
            leaveForcastObject['week_5_leaveDates'] = 0;
          }
        }
        tempLeaveForcastData.push(leaveForcastObject);
      }
      setProcessedLeaveForcastData(tempLeaveForcastData);
    }else{
      setProcessedLeaveForcastData(tempLeaveForcastData);
    }
  }

  return(<div>
    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
    <TextField style={{left: "25%", top: "50px"}} id="org" label="Org" variant="outlined" disabled/>
    <TextField style={{left: "25%", top: "50px"}} id="team" label="Team" variant="outlined" disabled/>
    <TextField style={{left: "25%", top: "50px"}} id="month" select label="Select" value={month} helperText="Please select Month" onChange={onMonthChange}>
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
    </TextField>
    <Button id="view" variant="contained" style={{left: "25%", top: "60px"}} onClick={viewReport}>View</Button>
    <Button id="download" variant="contained" style={{left: "25%", top: "60px"}}>Download</Button>
    </Box>

    <Box sx={{ height: 400, width: '50%' }}>
      <DataGrid style={{left: "54%", top: "75px"}}
        rows={processedLeaveForcastData}
        columns={leaveForecastReportColumns}
        getRowId={(row) => row.employeeId}
      />
    </Box>
  </div>)
  };
  
  export default Report;