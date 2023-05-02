import { useCallback, useEffect, useState } from "react";
import { useDebounce, useToggle } from "usehooks-ts";
import MonthList from "data/MonthList";
import { PageContainer } from "components/layout";
import PlanningService from "service/PlanningService";
import EmployeeSearchFilter from "./EmployeeSearchFilter";
import LeaveSubmissionDialog from "./LeaveSubmissionDialog";
import { LeavePlanningDataField } from "types/LeavePlanningTable";
import LeavePlanningColumnList from "data/LeavePlanningColumnList";
import { UpdateLeaveQueryParams, UpdateLeaveRequest } from "types/api/employee/UpdateLeave.types";
import { LeaveSummaryQueryParams, LeaveSummaryResponse } from "types/api/employee/LeaveSummary.types";
import { Box, Button, Card, CardContent, CardHeader, DataGrid, Grid } from "components/shared-ui";
import { EmployeeSearchItem, EmployeeSearchQueryParams, EmployeeSearchResponse } from "types/api/employee/EmployeeSearch.types";

const DEFAULT_EMPLOYEE_SEARCH_FILTER_VALUE: EmployeeSearchQueryParams = {
    name: "",
    org: "",
    team: "",
    location: "",
    page: 0,
    limit: 50,
};

const DEFAULT_LEAVE_SUMMARY_FILTER_VALUE: LeaveSummaryQueryParams = {
    org: "",
    team: "",
    month: `${MonthList[new Date().getMonth()].value}`,
    year: `${new Date().getFullYear()}`,
};

const PlanningPage = () => {
    const [isLeaveSubmissionDialogOpen, setIsLeaveSubmissionDialogOpen] = useToggle(false);
    const [employeeSearchFilter, setEmployeeSearchFilter] = useState<EmployeeSearchQueryParams>(DEFAULT_EMPLOYEE_SEARCH_FILTER_VALUE);
    const debounceEmployeeSearchFilter = useDebounce(employeeSearchFilter);

    const [leaveSummaryFilter, setLeaveSummaryFilter] = useState<LeaveSummaryQueryParams>(DEFAULT_LEAVE_SUMMARY_FILTER_VALUE);
    const [leaveSummaryList, setLeaveSummaryList] = useState<LeaveSummaryResponse>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

    const [planningData, setPlanningData] = useState<LeavePlanningDataField[]>([]);

    const getEmployees = useCallback((queryParams: EmployeeSearchQueryParams = debounceEmployeeSearchFilter) => {
        PlanningService.searchEmployees(queryParams)
            .then((response) => {
                const processedData = processPlanningData(response);
                setPlanningData(processedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [debounceEmployeeSearchFilter]);

    const getLeaveSummary = useCallback((queryParams: LeaveSummaryQueryParams = leaveSummaryFilter) => {
        PlanningService.getLeaveSummary(queryParams)
            .then(response => {
                setLeaveSummaryList(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [leaveSummaryFilter]);

    const updateLeave = useCallback((params: UpdateLeaveQueryParams, leaveList: UpdateLeaveRequest) => {
        PlanningService.updateLeave(params, leaveList)
            .then(response => { getLeaveSummary(); })
            .catch(error => { console.log(error); })
    }, []);

    const processPlanningData = (data: EmployeeSearchResponse): LeavePlanningDataField[] => {
        return data.map((item: EmployeeSearchItem, index: number): LeavePlanningDataField => {
            return {
                id: item.employeeId || index,
                name: item.employeeName,
                nameInClientRecords: item.nameInClientRecords,
                jobTitle: item.jobTitle,
                actions:
                    <Button
                        variant="contained"
                        onClick={() => handleEdit(item)}
                    >
                        Edit leaves
                    </Button>
            }
        })
    }

    const handleEdit = (params: EmployeeSearchItem) => {
        setSelectedEmployeeId(params.employeeId);
        setIsLeaveSubmissionDialogOpen();
    }

    const handleEmployeeSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeSearchFilter((prevFilter) => {
            const { name, value } = event.target;
            return { ...prevFilter, [name]: value };
        });
    };

    const handleEmployeeSearchFilterSubmit = (filter: EmployeeSearchQueryParams) => {
        getEmployees(filter);
    };

    const handleLeaveSummaryFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeaveSummaryFilter((prevFilter) => {
            const { name, value } = event.target;
            return { ...prevFilter, [name]: value };
        });
    };

    const handleLeaveSummaryFilterSubmit = (filter: LeaveSummaryQueryParams) => {
        getLeaveSummary(filter);
    };

    const handleLeaveUpdate = (leaveList: UpdateLeaveRequest) => {
        const params = { employeeId: leaveList[0].empId };
        // updateLeave(params, leaveList);
    }

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    useEffect(() => {
        getLeaveSummary();
    }, [getLeaveSummary]);

    return (
        <PageContainer title="LTS | Leave Forecast">
            <Card>
                <CardHeader title="Leave Planning" />
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <EmployeeSearchFilter
                            filter={employeeSearchFilter}
                            onChange={handleEmployeeSearchFormChange}
                            onSubmit={handleEmployeeSearchFilterSubmit}
                        />
                        <Grid item xs={12}>
                            <Box sx={{ height: 300, maxWidth: "calc(100vw - 80px)" }}>
                                <DataGrid
                                    hideFooter
                                    disableColumnFilter
                                    disableColumnMenu
                                    disableColumnSelector
                                    disableRowSelectionOnClick
                                    rows={planningData}
                                    columns={LeavePlanningColumnList}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <LeaveSubmissionDialog
                isOpen={isLeaveSubmissionDialogOpen}
                onClose={setIsLeaveSubmissionDialogOpen}
                filter={leaveSummaryFilter}
                onFilterChange={handleLeaveSummaryFormChange}
                onFilterSubmit={handleLeaveSummaryFilterSubmit}
                leaveSummary={leaveSummaryList.find(leave => leave.employeeId === selectedEmployeeId)}
                onLeaveSubmit={handleLeaveUpdate}
            />
        </PageContainer>
    );
};

export default PlanningPage;
