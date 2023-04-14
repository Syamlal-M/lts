import { useEffect, useState } from "react";
import MonthList from "data/MonthList";
import { PageContainer } from "components/layout";
import { KeyValueObject } from "types/KeyValueList";
import {
    Box, Button, Card, CardContent,
    DataGrid, Grid, MenuItem, TextField
} from "components/shared-ui";
import PlanningService from "service/PlanningService";
import LeavePlanningColumnList from "data/LeavePlanningColumnList";

interface IFormData {
    org: string;
    team: string;
    month: string;
    name: string;
    location: string,
    page: number,
    limit: number
}

const defaultFormData: IFormData = {
    org: "",
    team: "",
    month: "",
    name: "",
    location: "",
    page: 0,
    limit: 50
};

const PlanningPage = () => {
    const [formData, setFormData] = useState<IFormData>(defaultFormData);
    const [planningData, setPlanningData] = useState<any>([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const processPlanningData = (response: any) => {
        return response.content.map((row: any, index: any) => {
            return { id: index, ...row }
        })
    }

    const getEmployees = (queryParams: IFormData = formData) => {
        PlanningService.searchEmployees(queryParams)
            .then((response: any) => {
                let data = processPlanningData(response);
                setPlanningData(data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [event.target.name]: event.target.value };
        });
    };

    const handleSearch = () => {
        getEmployees(formData);
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
                                value={formData.org}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="team"
                                label="Team"
                                variant="outlined"
                                value={formData.team}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                name="month"
                                select
                                label="Month"
                                value={formData.month}
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
                                value={formData.name}
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
