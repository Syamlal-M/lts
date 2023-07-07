import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography
} from "components/shared-ui";
import COLOR from "styles/Color";
import { isAutheticated } from "utils/ApiUtils";
import { PageContainer } from "components/layout";
import { useAuthContext } from "context/AuthContext";
import { getRouteUrl } from "utils/AccessPointUtils";
import { resetToken, setToken } from "utils/CookieUtils";
import AuthenticationService from "service/AuthenticationService";
import { SigninRequest } from "types/api/employee/Authentication.types";

interface UserDetails {
  employeeId: string;
  password: string;
}

const DEFAULT_USER_DETAILS: UserDetails = {
  employeeId: "",
  password: ""
};

const SignInPage = () => {
  const navigate = useNavigate();
  const { onLogin } = useAuthContext();
  const [isLoading, toggleIsLoading] = useToggle(false);
  const [showPassword, setShowPassword] = useToggle(false);
  const [userDetails, setUserDetails] = useState<UserDetails>(DEFAULT_USER_DETAILS);

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
    setUserDetails((user) => ({ ...user, [name]: value }));
  };

  const handleSignIn = (user: SigninRequest): void => {
    AuthenticationService.login(user)
      .then((response) => {
        setToken(response);
        redirectToBasePage();
      })
      .catch((error) => {
        resetToken();
        alert(`Login failed ${JSON.stringify(error)}`);
        setUserDetails(DEFAULT_USER_DETAILS);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSignIn(userDetails);
  };

  const handleSSOAuth = async () => {
    toggleIsLoading();
    await onLogin();
    AuthenticationService.getSignedInEmployeeDetails()
      .then((response) => {
        setToken(response);
        redirectToBasePage();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        toggleIsLoading();
      });
  };

  return (
    <PageContainer title="Sign-in">
      <Backdrop
        open={isLoading}
        sx={{ color: COLOR.common.white, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          textAlign: "center",
          minHeight: "max(calc(100vh - 48px), 300px)",
          minWidth: "25rem"
        }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Typography variant="h4">Sign-in page</Typography>
              <TextField
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
                      <Icon>{showPassword ? "visibility" : "visibility_off"}</Icon>
                    </IconButton>
                  )
                }}
              />
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                sx={{ marginTop: 2 }}>
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
              onClick={handleSSOAuth}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="24px"
                  height="24px"
                  fill="#fff">
                  <path d="M 5 4 C 4.448 4 4 4.447 4 5 L 4 24 L 24 24 L 24 4 L 5 4 z M 26 4 L 26 24 L 46 24 L 46 5 C 46 4.447 45.552 4 45 4 L 26 4 z M 4 26 L 4 45 C 4 45.553 4.448 46 5 46 L 24 46 L 24 26 L 4 26 z M 26 26 L 26 46 L 45 46 C 45.552 46 46 45.553 46 45 L 46 26 L 26 26 z" />
                </svg>
              }>
              Company Single Sign-in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SignInPage;
