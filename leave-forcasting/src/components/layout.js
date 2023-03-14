import { Button, Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/system';
import theme from '../styles/theme';
import Appbar from './appBar';
import AppDrawer from './drawer';
import { UIProvider } from '../context/ui';

function Layout() {
	useEffect(() => {
		document.title = 'Leave Tracker System';
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Container
					maxWidth="xl"
					sx={{
						background: '#fff',
					}}
				>
					<Stack>
						<UIProvider>
							<Appbar />
							<AppDrawer />
							<Button variant="contained"> Test </Button>
						</UIProvider>
					</Stack>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default Layout;
