import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { months } from './constant';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Layout from '../layout';
// import { Tooltip } from "@mui/material";
// import { useState } from "react";
// import { useAuth } from "./auth";
import { CircularProgress } from '@material-ui/core';
import Alert from '@mui/material/Alert';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LeaveForecast = () => {
	let monthArrayToMap = months.reduce(function (map, obj) {
		map[obj.key] = obj.value;
		return map;
	}, {});

	const [leaveForecast, setLeaveForecast] = React.useState([]);
	const [month, setMonth] = React.useState(
		monthArrayToMap[new Date().getMonth() + 1]
	);
	const [currentDate, setCurrentDate] = React.useState(new DateObject());
	const [year] = React.useState(new Date().getFullYear());
	const [monthYear, setMonthYear] = React.useState(month + '_' + year);
	const [processedLeaveForcastData, setProcessedLeaveForcastData] =
		React.useState([]);
	const [selectedEmpId, setSelectedEmpId] = React.useState(null);
	const [empLeaveList, setEmpLeaveList] = React.useState({});
	// const { user } = useAuth()

	console.log('month' + month);

	const requestOptions = {
		method: 'GET',
		headers: {
			role: cookies.get('role'),
		},
	};

	const fetchLeaveReport = (team, org, name) => {
		let url = 'api/employee/search?';

		console.log(name + ' ++++++++++');

		if (name != null) {
			url += 'name=' + name;
		} else {
			url += 'team=' + team + '&org=' + org + '&limit=1500';
		}

		console.log(url);
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setLeaveForecast(result.content);
			})
			.catch((error) => console.log(error));
	};

	// React.useEffect(() => {
	//   let name = null;
	//   console.log(user);
	//   if (user.role == 2) {
	//     name = user.name;
	//   }
	//   fetchLeaveReport("", "", name);
	// }, []);

	// React.useEffect(() => {
	//   if (typeof leaveForecast.length !== "undefined") {
	//     processDataForTableView();
	//   }
	// }, [leaveForecast]);

	const onMonthChange = (event) => {
		console.log(event);
		let selectedMonth = event.target.value;
		setMonth(selectedMonth);
		let selectedMonthYear = selectedMonth + '_' + year;
		setMonthYear(selectedMonthYear);
		let monthObj = months.filter((m) => m.value === selectedMonth);
		console.log(monthObj);
		let dd = currentDate;
		dd.month = monthObj[0].key;
		console.log(dd);
		setCurrentDate(dd);
	};

	const columns = [
		{
			field: 'id',
			headerName: 'No',
			sortable: false,
			renderCell: (index) => index.api.getRowIndex(index.row.empId) + 1,
		},
		{ field: 'empId', headerName: 'Emp ID', sortable: false },
		{ field: 'employeeName', flex: 0.2, headerName: 'Name', sortable: false },
		{ field: 'org', flex: 0.2, headerName: 'Org', sortable: false },
		{ field: 'team', flex: 0.2, headerName: 'Team', sortable: false },
		{
			field: 'datePicker',
			minWidth: 200,
			flex: 0.3,
			headerName: 'Select Dates',
			sortable: false,
			renderCell: ({ row }) => (
				<DatePicker
					multiple
					format="YYYY-MM-DD"
					disableYearPicker={true}
					disableMonthPicker
					currentDate={currentDate}
					buttons={false}
					zIndex={9999}
					onChange={(dates) => {
						let empData = {};
						empData[selectedEmpId] = [];

						dates.map((d) => {
							empData[selectedEmpId].push(d.toString());
						});

						setEmpLeaveList({ ...empLeaveList, ...empData });

						console.log(dates[0].getValue());
					}}
					plugins={[<DatePanel />]}
				/>
			),
		},
	];

	const submitLeaves = () => {
		console.log(empLeaveList);
		setUploadProgress(true);

		const selectedEmpIdList = Object.keys(empLeaveList);
		const validEmpls = selectedEmpIdList.filter((e) => {
			return empLeaveList[e].length > 0;
		});
		console.log(validEmpls);

		const submittedEL = leaveForecast.filter((emp) => {
			return validEmpls.includes(emp.empId);
		});
		console.log(submittedEL);
		let leveForecastObj = {
			monthYear: month + '_' + new Date().getFullYear(),
		};

		submittedEL.map((emp) => {
			leveForecastObj.leaveDateList = empLeaveList[emp.empId].join(',');
			emp.leaveForecasts = [leveForecastObj];
		});

		const putHeaders = new Headers();
		putHeaders.append('Content-Type', 'application/json');

		const requestOptions = {
			method: 'PUT',
			headers: putHeaders,
			body: JSON.stringify(submittedEL),
		};

		console.log(JSON.stringify(submittedEL));

		fetch('api/employee/leaves', requestOptions)
			.then((response) => response.text())
			.then((result) => {
				console.log(result);
				setUploadProgress(false);
				setUploadSuccess(true);
				let name = null;

				// if (user?.role == 2) {
				//   name = user.name;
				// }
				fetchLeaveReport('', '', name);
			})
			.catch((error) => {
				console.log('error', error);
				setUploadProgress(false);
				setUploadError(true);
				fetchLeaveReport();
			});

		// leaveForecast.
	};

	const [uploadProgress, setUploadProgress] = React.useState(false);
	const [uploadSuccess, setUploadSuccess] = React.useState(false);
	const [uploadError, setUploadError] = React.useState(false);
	const [team, setTeam] = React.useState('');
	const [org, setOrg] = React.useState('');

	const onOrgChange = (event) => {
		setOrg(event.target.value);
	};

	const onTeamChange = (event) => {
		setTeam(event.target.value);
	};

	const searchEmployees = (event) => {
		let name = null;

		// if (user?.role == 2) {
		//   name = user.name;
		// }
		fetchLeaveReport(team, org, name);
	};

	return (
		<Layout>
			<Container>
				<Box sx={{ flexGrow: 1, marginInline: '10%', marginBlockStart: '3%' }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={2}>
							<TextField
								style={{ minWidth: '100%' }}
								id="org"
								label="Organisation"
								variant="outlined"
								onChange={onOrgChange}
								className="textField"
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<TextField
								style={{ minWidth: '100%' }}
								id="team"
								label="Team"
								variant="outlined"
								onChange={onTeamChange}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<TextField
								style={{ minWidth: '100%' }}
								id="month"
								select
								label="Month"
								value={month}
								helperText="Please select Month"
								onChange={onMonthChange}
							>
								{months.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<Grid container spacing={12}>
								<Grid item xs={6} md={6}>
									<Button
										id="search"
										variant="contained"
										style={{ minWidth: '50%' }}
										onClick={searchEmployees}
									>
										Search
									</Button>
								</Grid>
								<Grid item xs={6} md={6}>
									<Button
										id="submit"
										variant="contained"
										disabled={Object.keys(empLeaveList).length === 0}
										style={{ minWidth: '50%', marginLeft: '10%' }}
										onClick={submitLeaves}
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>

				<Box
					sx={{ display: uploadProgress ? 'flex' : 'none' }}
					style={{ marginTop: '5%', marginLeft: '50%' }}
				>
					<CircularProgress />
				</Box>

				{uploadSuccess && (
					<Alert
						severity="success"
						style={{ marginTop: '5%', marginLeft: '50%' }}
					>
						Leaves updated successfully
					</Alert>
				)}

				{uploadError && (
					<Alert
						severity="error"
						style={{ marginTop: '5%', marginLeft: '50%' }}
					>
						Failed to update the leaves
					</Alert>
				)}

				<div style={{ height: 500, width: '90%', margin: '5%' }}>
					<DataGrid
						rows={leaveForecast}
						columns={columns}
						getRowId={(row) => row.empId}
						disableColumnMenu
						onSelectionModelChange={(id) => {
							setSelectedEmpId(id[0]);
						}}
						style={{ backgroundColor: '#fff' }}
					/>
				</div>
			</Container>
		</Layout>
	);
};

export default LeaveForecast;
