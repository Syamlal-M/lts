import {
  Box,
  DataGrid,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert
} from "components/shared-ui";
import { useState } from "react";
import { KeyValueObject } from "types/KeyValueList";
import EmployeeService from "service/EmployeeInfoService";
import { useSelectListContext } from "context/SelectListContext";
import EmployeeSummaryColumnList from "data/EmployeeSummaryColumnList";
import DataGridTableSkeleton from "components/common/DataGridTableSkeleton";

const EmployeeSummary = () => {
  const [org, setOrg] = useState("");
  const [team, setTeam] = useState("");
  const [empList, setEmpList] = useState<any[]>([]);
  const { ORGANIZATIONS: orgList, TEAMS: teamList } = useSelectListContext();

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingError, setDownloadingError] = useState("");
  const [isEmployeeDetailsLoading, setEmployeeDetailsLoading] = useState(false);
  const [employeeDetailsError, setEmployeeDetailsError] = useState("");

  const fetchEmployeeSummary = () => {
    setEmployeeDetailsLoading(true);
    EmployeeService.fetchEmployeeSummary({ org: org, team: team })
      .then((response: any) => {
        setEmpList(response);
      })
      .catch((error: any) => {
        setEmployeeDetailsError(
          error.message || "Oops! Something went wrong while fetching employee details."
        );
        console.log(error);
      })
      .finally(() => {
        setEmployeeDetailsLoading(false);
      });
  };

  const handleOrgChange = (event: any) => {
    setOrg(event.target.value.trim());
  };
  const handleTeamChange = (event: any) => {
    setTeam(event.target.value.trim());
  };

  const handleDownload = () => {
    setIsDownloading(true);
    EmployeeService.fetchEmployeeDownload({ org: org, team: team })
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

        const filename = `employees_${formattedDate}_${formattedTime}.xlsx`;

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
        setDownloadingError("");
      })
      .catch((error: any) => {
        setDownloadingError("Oops! Something went wrong while downloading the file.");
        console.error("Error exporting CSV file:", error);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {employeeDetailsError && (
        <Grid item xs={12}>
          <Alert
            severity="error"
            onClose={() => {
              setEmployeeDetailsError("");
            }}>
            {employeeDetailsError}
          </Alert>
        </Grid>
      )}
      {downloadingError && (
        <Grid item xs={12}>
          <Alert
            severity="error"
            onClose={() => {
              setDownloadingError("");
            }}>
            {downloadingError}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12} sm={4} md={4} lg={2}>
        <TextField
          select
          fullWidth
          name="org"
          label="Organization"
          variant="outlined"
          value={org}
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
          value={team}
          onChange={handleTeamChange}>
          {teamList.map((org: KeyValueObject) => (
            <MenuItem key={org.value} value={org.value}>
              {org.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={2}>
        <Button fullWidth id="view" variant="contained" onClick={fetchEmployeeSummary}>
          View
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={2}>
        <Button
          fullWidth
          id="download"
          variant="contained"
          onClick={handleDownload}
          disabled={isDownloading}
          startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : null}>
          Download
        </Button>
      </Grid>
      <Grid item xs={12}>
        {isEmployeeDetailsLoading ? (
          <DataGridTableSkeleton noOfRows={6} />
        ) : (
          <Box sx={{ height: 371, maxWidth: "calc(100vw - 36px)" }}>
            <DataGrid
              rows={empList}
              columns={EmployeeSummaryColumnList}
              getRowId={(row) => row.employeeId}
              disableColumnMenu
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default EmployeeSummary;
