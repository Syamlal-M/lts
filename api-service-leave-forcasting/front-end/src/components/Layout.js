import { Outlet } from 'react-router-dom';
import Navbar from './sidebar';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Topbar from './topbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

export const Layout = () => {
	const { user } = useAuth();
	const [isMobile, setIsMobile] = useState(false);
	const funcsetIsMobile = () => {
		setIsMobile(!isMobile);
	};

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			<Navbar isMobile={isMobile} funcsetIsMobile={funcsetIsMobile} />
			<Topbar funcsetIsMobile={funcsetIsMobile} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
			</Box>

			<Outlet />
		</>
	);
};

export const LoginLayout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
export default Layout;
