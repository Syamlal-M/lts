import { CardContent } from "@mui/material";
import { PageContainer } from "components/layout";
import { Button, Card, Grid, MenuItem, TextField } from "components/shared-ui";
import MonthList from "data/MonthList";

const PlanningPage = () => {
    return (
        <PageContainer title="LTS | Leave Forecast">
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                id="organization"
                                label="Organization"
                                variant="outlined"
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                id="team"
                                label="Team"
                                variant="outlined"
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                id="month"
                                select
                                label="Month"
                                onChange={() => { }}
                            >
                                {MonthList.map((month) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <TextField
                                fullWidth
                                id="empName"
                                label="Name"
                                variant="outlined"
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <Button
                                fullWidth
                                id="search"
                                variant="contained"
                                onClick={() => { }}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <Button
                                fullWidth
                                id="submit"
                                variant="contained"
                                onClick={() => { }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* <DataGrid rows=[] /> */}
        </PageContainer >

    );
};

export default PlanningPage;