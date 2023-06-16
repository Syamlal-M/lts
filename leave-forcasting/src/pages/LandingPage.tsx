import { PageContainer } from "components/layout";
import { getRouteUrl } from "utils/AccessPointUtils";
import { useThemeContext } from "context/ThemeContext";
import {
    Link, Typography, Card, CardContent, CardActions,
    AppBar, Toolbar, Grid, IconButton, Icon
} from "components/shared-ui";
import COLOR from "styles/Color";

const LandingPage = () => {
    const { isDarkMode, toggleTheme } = useThemeContext();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">Revenue Management System</Typography>
                    <IconButton onClick={toggleTheme} sx={{ ml: "auto", color: COLOR.common.white }}>
                        <Icon>{isDarkMode ? 'brightness_4' : 'brightness_7'}</Icon>
                    </IconButton>
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