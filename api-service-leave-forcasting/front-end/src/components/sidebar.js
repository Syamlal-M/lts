import React from 'react';
import { Toolbar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Hidden } from '@mui/material';
import { is } from 'date-fns/locale';
const cookies = new Cookies();

const menuItem = [
	{
		path: '/home',
		name: 'Home',
		icon: <HomeIcon />,
	},
	{
		path: '/leave-forecast',
		name: 'Planning',
		icon: <DateRangeIcon />,
	},
	{
		path: '/reports',
		name: 'Reports',
		icon: <AssignmentIcon />,
	},
	{
		path: '/settings',
		name: 'Roles',
		icon: <AccountCircle />,
	},
];

const useStyles = makeStyles((theme) => ({
	list: {
		textDecoration: 'none',
		color: '#76787A',
		fontSize: '14px',
		fontWeight: '500',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		lineHeight: '20px',
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
	link: {
		textDecoration: 'none',
		cursor: 'pointer',
		'&:focus': {
			color: '#ffffff',
			background: '#0C9486',
			borderBottom: '1px solid white',
			borderRadius: '8px',
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: '280px',
		},
	},
}));

const drawerWidth = 240;

const Drawer = styled(
	MuiDrawer,
	{}
)(() => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	boxShadow: 'none',
}));

export default function Navbar({ isMobile, funcsetIsMobile }) {
	const classes = useStyles();

	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<Hidden xsDown implementation="css">
					<Drawer
						variant="permanent"
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							[`& .MuiDrawer-paper`]: {
								width: drawerWidth,
								boxSizing: 'border-box',
								borderInlineEndColor: '#FFFFFF',
							},
						}}
						open
						anchor="left"
					>
						<Toolbar />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								overflow: 'auto',
							}}
						>
							<List>
								{menuItem.map((item, index) => (
									<Link to={item.path} key={index} className={classes.link}>
										<ListItem key={item.name} sx={{ display: 'block' }}>
											<ListItemButton
												sx={{
													minHeight: 48,
													justifyContent: open ? 'initial' : 'center',
													px: 2.5,
												}}
												className={classes.list}
											>
												{item.icon}
												<ListItemText
													primary={item.name}
													sx={{
														opacity: open ? 1 : 0,
														paddingInlineStart: '12px',
													}}
												/>
											</ListItemButton>
										</ListItem>
									</Link>
								))}
							</List>
						</Box>
					</Drawer>
				</Hidden>
				<Drawer
					variant="temporary"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
							boxSizing: 'border-box',
							borderInlineEndColor: '#FFFFFF',
						},
					}}
					open={isMobile}
					anchor="left"
					onClick={funcsetIsMobile}
				>
					<Toolbar />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							overflow: 'auto',
						}}
					>
						<List>
							{menuItem.map((item, index) => (
								<Link to={item.path} key={index} className={classes.link}>
									<ListItem key={item.name} sx={{ display: 'block' }}>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 2.5,
											}}
											className={classes.list}
										>
											{item.icon}
											<ListItemText
												primary={item.name}
												sx={{
													opacity: open ? 1 : 0,
													paddingInlineStart: '12px',
												}}
											/>
										</ListItemButton>
									</ListItem>
								</Link>
							))}
						</List>
					</Box>
				</Drawer>
			</Box>
		</div>
	);
}
