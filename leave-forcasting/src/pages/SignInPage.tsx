import { PageContainer } from "components/layout";
import { Box, Typography } from "components/shared-ui";

const SignInPage = () => {
    return (
        <PageContainer title="Sign-in">
            <Box sx={{
                display: "grid",
                placeContent: "center",
                textAlign: "center",
                minHeight: "100vh"
            }}
            >
                <Typography variant="h4">Sign-in page</Typography>
            </Box>
        </PageContainer>
    );
};

export default SignInPage;