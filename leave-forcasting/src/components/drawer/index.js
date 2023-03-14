import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useUIContext } from '../../context/ui';
import CloseIcon from '@mui/icons-material/Close';
import { DrawerCloseButton } from '../../styles/appbar';
import { lighten } from 'polished';
import { Colors } from '../../styles/theme';

const MiddleDivider = styled((props) => (
	<Divider variant="middle" {...props} />
))``;

const menuItem = [
	{
		path: '/leave-forecast',
		name: 'Planning',
	},
	{
		path: '/home',
		name: 'Home',
	},
	{
		path: '/reports',
		name: 'Reports',
	},
	{
		path: '/settings',
		name: 'Roles',
	},
];

export default function AppDrawer() {
	const { drawerOpen, setDrawerOpen } = useUIContext();

	return (
		<>
			{drawerOpen && (
				<DrawerCloseButton onClick={() => setDrawerOpen(false)}>
					<CloseIcon
						sx={{
							fontSize: '2.5rem',
							color: lighten(0.09, Colors.secondary),
						}}
					/>
				</DrawerCloseButton>
			)}
			<Drawer open={drawerOpen}>
				<List>
					{menuItem.map((item, index) => (
						<Link to={item.path} key={index} >
							<ListItem key={item.name} sx={{ display: 'block' }}>
								<ListItemButton>
									<ListItemText primary={item.name} />
								</ListItemButton>
								<MiddleDivider />
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
		</>
	);
}
