import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { SigninRequest } from "types/api/employee/Authentication.types";
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
    employeeId: string,
    password: string,
};

const DEFAULT_USER_DETAILS: UserDetails = {
    employeeId: "",
    password: "",
}

const SUPER_ADMIN: UserDetails = {
    employeeId: "A-100",
    password: "password"
}

const ADMIN: UserDetails = {
    employeeId: "A-101",
    password: "password"
}

const TEAM_USER: UserDetails = {
    employeeId: "A-102",
    password: "password"
}

const USER: UserDetails = {
    employeeId: "A-103",
    password: "password"
}

const SignInPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useToggle(false);
    const [userDetails, setUserDetails] = useState<UserDetails>(DEFAULT_USER_DETAILS)

    const redirectToBasePage = useCallback(() => {
        navigate(getRouteUrl("PLANNING"));
    }, [navigate]);

    useEffect(() => {
        if (isAutheticated()) {
            redirectToBasePage();
        }
    }, [redirectToBasePage]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserDetails(user => ({ ...user, [name]: value }));
    };

    const handleSignIn = (user: SigninRequest): void => {
        AuthenticationService.login(user)
            .then((response) => {
                setToken(response);
                redirectToBasePage();
            })
            .catch(error => {
                resetToken();
                alert(`Login failed ${JSON.stringify(error)}`);
                setUserDetails(DEFAULT_USER_DETAILS);
            })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleSignIn(userDetails);
    };

    const handleTestUserAuth = (user: UserDetails): void => {
        handleSignIn(user);
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
                                id="employeeId"
                                label="Employee ID"
                                name="employeeId"
                                autoComplete="employeeId"
                                margin="normal"
                                value={userDetails?.employeeId}
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
                            onClick={() => handleTestUserAuth(USER)}
                        >
                            Sign-in as User
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            color="warning"
                            onClick={() => handleTestUserAuth(TEAM_USER)}
                        >
                            Sign-in as Team User
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            color="warning"
                            onClick={() => handleTestUserAuth(ADMIN)}
                        >
                            Sign-in as Admin
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            color="warning"
                            onClick={() => handleTestUserAuth(SUPER_ADMIN)}
                        >
                            Sign-in as Super Admin
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </PageContainer>
    );
};

export default SignInPage;