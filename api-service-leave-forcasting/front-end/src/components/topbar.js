import React from 'react';
import {
	Toolbar,
	CssBaseline,
	Typography,
	makeStyles,
	Hidden,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';

import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
	logo: {
		flexGrow: '1',
		cursor: 'pointer',
		color: '#0C9486',
	},
	userIcon: {
		color: '#76787A',
		background: '#e1e1e1',
		borderRadius: '200px',
		'&:hover': {
			color: '#0C9486',
			background: '#DDF5F0',
			borderBottom: '1px solid white',
			borderRadius: '200px',
		},
	},
	menuItem: {
		color: '#76787A',
		'&:hover': {
			color: '#0C9486',
			background: '#DDF5F0',
			borderBottom: '1px solid white',
			borderRadius: '8px',
		},
		'&:focus': {
			color: '#ffffff',
			background: '#0C9486',
			borderBottom: '1px solid white',
			borderRadius: '8px',
		},
	},
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	textDecoration: 'none',
	background: '#ffffff',
	fontSize: '14px',
	fontWeight: '500',
	fontFamily: 'Roboto',
	fontStyle: 'normal',
	lineHeight: '20px',
	boxShadow: 'none',
	borderBottom: '0.5px solid #76787A',
}));

export default function Topbar({ funcsetIsMobile }) {
	const classes = useStyles();
	const auth = useAuth();
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault();

		auth.logout();

		navigate('/');
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="fixed">
					<Toolbar>
						<IconButton
							color="black"
							aria-label="open drawer"
							onClick={funcsetIsMobile}
							edge="start"
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							className={classes.logo}
						>
							Leave Forcast System
						</Typography>
						{console.log('auth.user.roleId .. ' + auth.user.role)}
						{auth.user && (
							<div>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									className={classes.userIcon}
								>
									<AccountCircle />
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
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose} className={classes.menuItem}>
										My account - {auth.user ? auth.user.name : null}{' '}
									</MenuItem>
									<MenuItem onClick={handleLogout} className={classes.menuItem}>
										Logout
									</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
}
