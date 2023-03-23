import { PageContainer } from "components/layout";
import { Box, Link, Typography } from "components/shared-ui";

const LandingPage = () => {
    return (
        <PageContainer>
            <Box sx={{
                display: "grid",
                placeContent: "center",
                textAlign: "center",
                minHeight: "100vh"
            }}
            >
                <Typography variant="h4">Welcome to Leave Tracker System</Typography>
                <Typography variant="h4">This is the landing page</Typography>
                <Link href="/dashboard">Go to Dashboard</Link>
            </Box>
        </PageContainer>
    );
};

export default LandingPage;