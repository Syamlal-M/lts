import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  DataGrid,
  Grid
} from "components/shared-ui";
import {
  EmployeeSearchItem,
  EmployeeSearchQueryParams,
  EmployeeSearchResponse
} from "types/api/employee/EmployeeSearch.types";
import { PageContainer } from "components/layout";
import { useDebounce, useToggle } from "usehooks-ts";
import PlanningService from "service/PlanningService";
import { useCallback, useEffect, useState } from "react";
import EmployeeSearchFilter from "./EmployeeSearchFilter";
import LeaveSubmissionDialog from "./LeaveSubmissionDialog";
import { LeavePlanningDataField } from "types/LeavePlanningTable";
import LeavePlanningColumnList from "data/LeavePlanningColumnList";
import DataGridTableSkeleton from "components/common/DataGridTableSkeleton";

const DEFAULT_EMPLOYEE_SEARCH_FILTER_VALUE: EmployeeSearchQueryParams = {
  name: "",
  org: "",
  team: "",
  location: "",
  page: 0,
  limit: 50
};

const PlanningPage = () => {
  const [isPlanningDataLoading, setIsPlanningDataLoading] = useState(false);
  const [isLeaveSubmissionDialogOpen, setIsLeaveSubmissionDialogOpen] = useToggle(false);

  const [employeeSearchFilter, setEmployeeSearchFilter] = useState<EmployeeSearchQueryParams>(
    DEFAULT_EMPLOYEE_SEARCH_FILTER_VALUE
  );
  const debounceEmployeeSearchFilter = useDebounce(employeeSearchFilter);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSearchItem>(
    {} as EmployeeSearchItem
  );

  const [planningData, setPlanningData] = useState<LeavePlanningDataField[]>([]);
  const [employeeSearchError, setEmployeeSearchError] = useState("");

  const handleEdit = useCallback(
    (params: EmployeeSearchItem) => {
      setSelectedEmployee(params);
      setIsLeaveSubmissionDialogOpen();
    },
    [setIsLeaveSubmissionDialogOpen]
  );

  const processPlanningData = useCallback(
    (data: EmployeeSearchResponse): LeavePlanningDataField[] => {
      return data.map((item: EmployeeSearchItem): LeavePlanningDataField => {
        return {
          employeeId: item.employeeId,
          name: item.employeeName,
          nameInClientRecords: item.nameInClientRecords,
          jobTitle: item.jobTitle,
          actions: (
            <Button variant="contained" onClick={() => handleEdit(item)}>
              Edit leaves
            </Button>
          )
        };
      });
    },
    [handleEdit]
  );

  const getEmployees = useCallback(
    (queryParams: EmployeeSearchQueryParams = debounceEmployeeSearchFilter) => {
      setIsPlanningDataLoading(true);
      PlanningService.searchEmployees(queryParams)
        .then((response) => {
          const processedData = processPlanningData(response);
          setPlanningData(processedData);
          setEmployeeSearchError("");
        })
        .catch((error: any) => {
          console.log(error);
          setEmployeeSearchError(
            error.message || "Oops! Something went wrong while fetching employee details."
          );
        })
        .finally(() => {
          setIsPlanningDataLoading(false);
        });
    },
    [debounceEmployeeSearchFilter, processPlanningData, setIsPlanningDataLoading]
  );

  const handleEmployeeSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeSearchFilter((prevFilter) => {
      const { name, value } = event.target;
      return { ...prevFilter, [name]: value };
    });
  };

  const handleEmployeeSearchFilterSubmit = (filter: EmployeeSearchQueryParams) => {
    getEmployees(filter);
  };

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <PageContainer title="LTS | Leave Forecast">
      <Card>
        <CardHeader title="Leave Planning" />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {employeeSearchError && (
              <Grid item xs={12}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setEmployeeSearchError("");
                  }}>
                  {employeeSearchError}
                </Alert>
              </Grid>
            )}
            <EmployeeSearchFilter
              filter={employeeSearchFilter}
              onChange={handleEmployeeSearchFormChange}
              onSubmit={handleEmployeeSearchFilterSubmit}
            />
            <Grid item xs={12}>
              {isPlanningDataLoading ? (
                <DataGridTableSkeleton />
              ) : (
                <Box sx={{ height: 520, maxWidth: "calc(100vw - 80px)" }}>
                  <DataGrid
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    disableRowSelectionOnClick
                    rows={planningData}
                    getRowId={(row) => row.employeeId}
                    columns={LeavePlanningColumnList}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <LeaveSubmissionDialog
        isOpen={isLeaveSubmissionDialogOpen}
        onClose={setIsLeaveSubmissionDialogOpen}
        employeeDetails={selectedEmployee}
      />
    </PageContainer>
  );
};

export default PlanningPage;
