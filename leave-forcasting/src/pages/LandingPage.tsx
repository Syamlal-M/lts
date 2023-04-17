import { PageContainer } from "components/layout";
import { Link, Typography, Card, CardContent, CardActions, AppBar, Toolbar, Grid } from "components/shared-ui";
import { getRouteUrl } from "utils/AccessPointUtils";

const LandingPage = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">Revenue Management System</Typography>
                </Toolbar>
            </AppBar>
            <PageContainer title="Revenue Management System">
                <Grid container>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4">Leave Tracker System</Typography>
                            </CardContent>
                            <CardActions sx={{ p: 2 }}>
                                <Link href={getRouteUrl("PLANNING")}>Go to Leave Tracker System</Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </PageContainer>
        </>
    );
};

export default LandingPage;