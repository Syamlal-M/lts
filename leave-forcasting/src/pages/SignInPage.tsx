import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { IRequest } from "types/api/employee/Login.types";
import { resetToken, setToken } from "utils/CookieUtils";
import { getRouteUrl } from "utils/AccessPointUtils";
import AuthenticationService from "service/AuthenticationService";
import { PageContainer } from "components/layout";
import { Box, Button, Icon, IconButton, TextField, Typography } from "components/shared-ui";
import { isAutheticated } from "utils/ApiUtils";

interface UserDetails {
    username: string,
    password: string,
};

const DEFAULT_USER_DETAILS: UserDetails = {
    username: "",
    password: "",
}

const SignInPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useToggle(false);
    const [userDetails, setUserDetails] = useState<UserDetails>(DEFAULT_USER_DETAILS)

    useEffect(() => {
        if (isAutheticated()) {
            navigate(getRouteUrl("planning"));
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserDetails(user => ({ ...user, [name]: value }));
    };

    const handleSignIn = (user: IRequest): void => {
        AuthenticationService.login(user)
            .then((response) => {
                setToken(response);
                navigate(getRouteUrl("planning"));
            })
            .catch(error => {
                resetToken();
            })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleSignIn(userDetails);
    }

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
            </Box>
        </PageContainer>
    );
};

export default SignInPage;