import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
// import MonthList from "data/MonthList";
import { PageContainer } from "components/layout";
import { KeyValueObject } from "types/KeyValueList";
import DataStoreService from "service/DataStoreService";
import PlanningService from "service/PlanningService";
import { LeavePlanningDataField } from "types/LeavePlanningTable";
import LeavePlanningColumnList from "data/LeavePlanningColumnList";
import {
    Box, Button, Card, CardContent, CardHeader, DataGrid, Grid, MenuItem, TextField
} from "components/shared-ui";

interface Filter {
    org: string;
    team: string;
    name: string;
    // month: string;
    // location: string,
    page: number,
    limit: number
}

const DEFAULT_FILTER_VALUE: Filter = {
    org: "",
    team: "",
    name: "",
    // month: "",
    // location: "",
    page: 0,
    limit: 50
};

const PlanningPage = () => {
    const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER_VALUE);
    const debounceFilter = useDebounce(filter);

    const [orgList, setOrgList] = useState<KeyValueObject[]>([]);
    const [teamList, setTeamList] = useState<KeyValueObject[]>([]);
    // const [locationList, setLocationList] = useState<KeyValueObject[]>([]);

    // const selectableMonthList: KeyValueObject[] = [{ label: "Select", value: "" }, ...MonthList]
    // const [monthList] = useState<KeyValueObject[]>(selectableMonthList);

    const [planningData, setPlanningData] = useState<LeavePlanningDataField[]>([]);

    const getEmployees = useCallback((queryParams: Filter = debounceFilter) => {
        PlanningService.searchEmployees(queryParams)
            .then((response: any) => {
                const processedData = processPlanningData(response);
                setPlanningData(processedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getOrganizations = useCallback(() => {
        DataStoreService.getOrganizationList()
            .then(response => {
                const orgList = processDataList(response)
                setOrgList(orgList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getTeams = useCallback(() => {
        DataStoreService.getTeamList()
            .then(response => {
                const teamList = processDataList(response)
                setTeamList(teamList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // const getLocations = useCallback(() => {
    //     DataStoreService.getLocationList()
    //         .then(response => {
    //             const locationList = processDataList(response)
    //             setLocationList(locationList);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);

    useEffect(() => {
        getOrganizations();
        getTeams();
    }, [getOrganizations, getTeams]);

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    const processPlanningData = (content: any[]): LeavePlanningDataField[] => {
        return content.map((row: any, index: number): LeavePlanningDataField => {
            return {
                id: row.employeeId || index,
                name: row.employeeName,
                nameInClientRecords: row.nameInClientRecords,
                jobTitle: row.jobTitle
            }
        })
    }

    const processDataList = (dataList: string[]): KeyValueObject[] => {
        const DEFAULT_DATA: KeyValueObject = { label: "Select", value: "" };
        return [DEFAULT_DATA, ...dataList.map((listItem) => ({
            label: listItem,
            value: listItem,
        }))];
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

    const handleRowSelection = (e: any) => {
        console.log(e);
    }

    return (
        <PageContainer title="LTS | Leave Forecast">
            <Card>
                <CardHeader title="Leave Planning" />
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                select
                                fullWidth
                                name="org"
                                label="Organization"
                                variant="outlined"
                                value={filter.org}
                                onChange={handleFormChange}
                            >
                                {orgList.map((org: KeyValueObject) => (
                                    <MenuItem key={org.value} value={org.value}>
                                        {org.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                select
                                fullWidth
                                name="team"
                                label="Team"
                                variant="outlined"
                                value={filter.team}
                                onChange={handleFormChange}
                            >
                                {teamList.map((team: KeyValueObject) => (
                                    <MenuItem key={team.value} value={team.value}>
                                        {team.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                select
                                fullWidth
                                name="month"
                                label="Month"
                                value={filter.month}
                                onChange={handleFormChange}
                            >
                                {monthList.map((month: KeyValueObject) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid> 
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                select
                                fullWidth
                                name="location"
                                label="Location"
                                variant="outlined"
                                value={filter.location}
                                onChange={handleFormChange}
                            >
                                {locationList.map((role: KeyValueObject) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid> */}
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
                                    rows={planningData}
                                    columns={LeavePlanningColumnList}
                                    onRowSelectionModelChange={handleRowSelection}
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
