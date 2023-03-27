import { useState } from "react";
import { PageContainer } from "components/layout";
import { Box, Button, TextField, Typography } from "components/shared-ui";
import AutheticationService from "service/AutheticationService";

type UserDetails = {
    empId: string,
    password: string,
}

const SignInPage = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({ empId: "", password: "" })

    const handleChange = (event: any) => {
        setUserDetails(user => {
            return {
                ...user,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSignIn = () => {
        let user = { userId: userDetails?.empId, password: userDetails?.password };

        AutheticationService.login(user)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

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
                <TextField
                    margin="normal"
                    autoFocus
                    required
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    value={userDetails?.empId}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    type="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    value={userDetails?.password}
                    onChange={handleChange}
                />
                <Button fullWidth type="submit" variant="contained" onClick={handleSignIn}>Submit</Button>
            </Box>
        </PageContainer>
    );
};

export default SignInPage;