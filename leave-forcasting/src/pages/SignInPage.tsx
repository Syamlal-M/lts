import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { IRequest } from "types/api/employee/Login.types";
import { resetToken, setToken } from "utils/CookieUtils";
import { getRouteUrl } from "utils/AccessPointUtils";
import { PageContainer } from "components/layout";
import { isAutheticated } from "utils/ApiUtils";
import AuthenticationService from "service/AuthenticationService";
import {
    Box, Button, Grid, Icon,
    IconButton, TextField, Typography
} from "components/shared-ui";

interface UserDetails {
    username: string,
    password: string,
};

const DEFAULT_USER_DETAILS: UserDetails = {
    username: "",
    password: "",
}

const TEST_USER: UserDetails = {
    username: "A-100",
    password: "password"
}

const SignInPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useToggle(false);
    const [userDetails, setUserDetails] = useState<UserDetails>(DEFAULT_USER_DETAILS)

    useEffect(() => {
        if (isAutheticated()) {
            redirectToBasePage();
        }
    }, []);

    const redirectToBasePage = () => {
        navigate(getRouteUrl("PLANNING"));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserDetails(user => ({ ...user, [name]: value }));
    };

    const handleSignIn = (user: IRequest): void => {
        AuthenticationService.login(user)
            .then((response) => {
                setToken(response);
                redirectToBasePage();
            })
            .catch(error => {
                resetToken();
            })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleSignIn(userDetails);
    };

    const handleTestUserAuth = (): void => {
        handleSignIn(TEST_USER);
    };

    return (
        <PageContainer title="Sign-in">
            <Box
                sx={{
                    display: "grid",
                    placeContent: "center",
                    textAlign: "center",
                    minHeight: "max(calc(100vh - 48px), 300px)",
                    minWidth: "25rem"
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h4">Sign-in page</Typography>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                id="username"
                                label="Employee ID"
                                name="username"
                                autoComplete="username"
                                margin="normal"
                                value={userDetails?.username}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                id="password"
                                name="password"
                                autoComplete="password"
                                margin="normal"
                                value={userDetails?.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={setShowPassword}>
                                            <Icon>{showPassword ? 'visibility' : 'visibility_off'}</Icon>
                                        </IconButton>
                                    )
                                }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                size="large"
                                variant="contained"
                                sx={{ marginTop: 2 }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">-- OR --</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            color="warning"
                            onClick={handleTestUserAuth}
                        >
                            Sign-in as Test User
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </PageContainer>
    );
};

export default SignInPage;