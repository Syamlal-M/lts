import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link , Outlet} from "react-router-dom";

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

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Leave Forecast System
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/lms" className={classes.link}>
              Home
            </Link>
            <Link to="/lms/leave-forecast" className={classes.link}>
              Planning
            </Link>
            <Link to="/lms/report" className={classes.link}>
              Reports
            </Link>
            <Link to="/lms/employee-summary" className={classes.link}>
              Summary
            </Link>
          </div>
      </Toolbar>

    </AppBar>
    
  );
}
export default Navbar;