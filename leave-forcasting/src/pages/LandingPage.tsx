import { PageContainer } from "components/layout";
import { Box, Link, Typography, Card, CardContent, CardActions } from "components/shared-ui";

const LandingPage = () => {
    return (
        <PageContainer title="Revenue Management System">
                <Typography variant="h4">Revenue Management System</Typography>
                <hr/>
                <Card sx={{ maxWidth: 250 }} variant='outlined'>
                    <CardContent>
                        <Typography variant="h4">Leave Tracker System</Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/leave-forecast">Go to Leave Tracker System</Link>
                    </CardActions>
                </Card>
        </PageContainer>
    );
};

export default LandingPage;