import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isEmail from 'validator/lib/isEmail';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.ibsplc.com">
                IBS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme1 = createTheme();

export default function SignUp() {


    const empIdRef = useRef(null);
    const empNmRef = useRef(null);
    const emailIdRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (isEmail(data.get("emailid")) && data.get("password").length >= 7) {

            var formData = new FormData();


            formData.append('userid', data.get("empId"));
            formData.append('username', data.get("empNm"));
            formData.append('password', data.get("password"));
            formData.append('emailId', data.get("emailid"));



            var requestOptions = {
                method: 'POST',
                body: formData
            };




            fetch("api/user/register-user", requestOptions)
                .then(async result => {

                    console.log(result.ok);
                    let response = await result.json()
                    if (!result.ok) {
                        console.log("Login failure");
                        toast.error(response.message, { hideProgressBar: true, theme: "colored", autoClose: 2000, position: "bottom-center" });


                    } else {
                        toast.success('User registered, please proceed to login page', { hideProgressBar: true, theme: "colored", autoClose: 500, position: "bottom-center" });
                        event.target.reset();
                        //navigate("/home");


                    }


                })

                .catch(error => console.log('error', error));

        } else {
            if (!isEmail(data.get("emailid")))

                toast.error('Please provide a valid email', { hideProgressBar: true, theme: "colored", autoClose: 2000, position: "bottom-center" });

            if (data.get("password").length < 7)

                toast.error('Password must have atleast 7 characters', { hideProgressBar: true, theme: "colored", autoClose: 2000, position: "bottom-center" });

        }




    };

    return (
        <ThemeProvider theme={theme1}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register User
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="empId"
                            label="Employee ID"
                            name="empId"
                            autoFocus
                            ref={empIdRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="empNm"
                            label="Employee Name"
                            name="empNm"
                            autoFocus
                            ref={empNmRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="emailid"
                            label="E-mail Id"
                            id="emailid"
                            ref={emailIdRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            ref={passwordRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>

                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Login Page"}
                                </Link>
                            </Grid>
                            <div>
                                <ToastContainer />
                            </div>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}