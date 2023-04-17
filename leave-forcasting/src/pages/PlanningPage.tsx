import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import MonthList from "data/MonthList";
import { PageContainer } from "components/layout";
import { KeyValueObject } from "types/KeyValueList";
import PlanningService from "service/PlanningService";
import LeavePlanningColumnList from "data/LeavePlanningColumnList";
import {
    Box, Button, Card, CardContent,
    DataGrid, Grid, MenuItem, TextField
} from "components/shared-ui";

interface Filter {
    org: string;
    team: string;
    month: string;
    name: string;
    location: string,
    page: number,
    limit: number
}

const DEFAULT_FILTER_VALUE: Filter = {
    org: "",
    team: "",
    month: "",
    name: "",
    location: "",
    page: 0,
    limit: 50
};

const PlanningPage = () => {
    const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER_VALUE);
    const debounceFilter = useDebounce(filter);
    const [planningData, setPlanningData] = useState<any>([]);

    const getEmployees = useCallback((queryParams: Filter = debounceFilter) => {
        PlanningService.searchEmployees(queryParams)
            .then((response: any) => {
                const processedData = processPlanningData(response);
                setPlanningData(processedData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [debounceFilter]);

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    const processPlanningData = (response: any) => {
        return response.content.map((row: any, index: any) => {
            return {
                id: index,
                empId: row.employeeId,
                name: row.employeeName,
                nameInClientRecords: row.nameInClientRecords,
                jobTitle: row.jobTitle?.jobTitle
            }
        })
    }


    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevFilter) => {
            const { name, value } = event.target;
            return { ...prevFilter, [name]: value };
        });
    };

    const handleSearch = () => {
        getEmployees(filter);
    };

    return (
        <PageContainer title="LTS | Leave Forecast">
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="org"
                                label="Organization"
                                variant="outlined"
                                value={filter.org}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="team"
                                label="Team"
                                variant="outlined"
                                value={filter.team}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="month"
                                select
                                label="Month"
                                value={filter.month}
                                onChange={handleFormChange}
                            >
                                {MonthList.map((month: KeyValueObject) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                variant="outlined"
                                value={filter.name}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <Button fullWidth variant="contained" onClick={handleSearch}>
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={() => { }}
                            >
                                Submit
                            </Button>
                        </Grid>
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
        </PageContainer>
    );
};

export default PlanningPage;
