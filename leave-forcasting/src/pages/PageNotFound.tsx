import { Box, Button, Typography } from "components/shared-ui"
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center", pt: "5rem" }} >
            <Typography variant="h1">404</Typography>
            <Typography variant="subtitle1">Oops! Something is wrong.</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
            <img
                style={{ width: "auto" }}
                src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                alt="page-not-found"
            />
        </Box >
    );
};

export default PageNotFound;