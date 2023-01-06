import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(10),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = (event) => {

        event.preventDefault();

        auth.logout();

        navigate("/")
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        //setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Leave Forecast System
                </Typography>
                <div className={classes.navlinks}>
                    <Link to="/home" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/leave-forecast" className={classes.link}>
                        Planning
                    </Link>
                    <Link to="/reports" className={classes.link}>
                        Reports
                    </Link>
                    {console.log("auth.user.roleId .. "+auth.user.role)}
                    {auth.user.role == 1 &&
                        <Link to="/settings" className={classes.link}>
                            Roles
                        </Link>
                    }


                    <div>
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />{auth.user.name}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={console.log("my")}
                        >
                            <MenuItem onClick={console.log("my")}>My Account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </Toolbar>

        </AppBar>

    );
}
export default Navbar;