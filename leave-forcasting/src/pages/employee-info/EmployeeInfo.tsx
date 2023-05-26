import { Box, DataGrid, Grid, TextField, MenuItem, Button } from 'components/shared-ui';
import * as React from 'react';
import EmployeeSummaryColumnList from 'data/EmployeeSummaryColumnList';
import EmployeeService from 'service/EmployeeInfoService';
import { useSelectListContext } from 'context/SelectListContext';
import { KeyValueObject } from "types/KeyValueList";

const EmployeeSummary = () => {
    const [org, setOrg] = React.useState("");
    const [team, setTeam] = React.useState("");
	const [empList, setEmpList] = React.useState<any[]>([]);
	const { ORGANIZATIONS: orgList, TEAMS: teamList } = useSelectListContext();

	const fetchEmployeeSummary = () => {
		EmployeeService.fetchEmployeeSummary({'org': org, 'team': team })
			.then((response: any) => {
				setEmpList(response);
			})
			.catch((error: any) => console.log(error));
	};

    const handleOrgChange = (event: any) => {
      setOrg(event.target.value.trim());
    }
    const handleTeamChange = (event: any) => {
      setTeam(event.target.value.trim());
    }

    const handleDownload = () => {
      EmployeeService.fetchEmployeeDownload({'org': org, 'team': team })
      .then((response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'employees.csv';
        link.click();

        URL.revokeObjectURL(url);
      })
      .catch((error: any) => {
        console.error('Error exporting CSV file:', error);
      });
    };

	return (
	 <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <TextField
            select
            fullWidth
            name="org"
            label="Organization"
            variant="outlined"
            value={org}
            onChange={handleOrgChange}
          >
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
            value={team}
            onChange={handleTeamChange}
          >
            {teamList.map((org: KeyValueObject) => (
              <MenuItem key={org.value} value={org.value}>
                {org.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <Button
            fullWidth
            id="view"
            variant="contained"
            onClick={fetchEmployeeSummary}
          >
            View
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <Button
            fullWidth
            id="download"
            variant="contained"
            onClick={handleDownload}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={12}>
            <Box sx={{ height: 400, maxWidth: 'calc(100vw - 36px)' }}>
                <DataGrid
                    rows={empList}
                    columns={EmployeeSummaryColumnList}
                    getRowId={(row) => row.employeeId}
                    disableColumnMenu
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </Grid>
     </Grid>
	);
};

export default EmployeeSummary;
