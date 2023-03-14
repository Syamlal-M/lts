import { ListItemButton, ListItemText, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppbarContainer, AppbarHeader, MyList } from '../../styles/appbar';
import Actions from './actions';

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

export default function AppbarDesktop({ matches }) {
	return (
		<AppbarContainer>
			<AppbarHeader variant="h4">Leave Forcast System</AppbarHeader>
			<MyList type="row">
				{menuItem.map((item, index) => (
					<Link to={item.path} key={index}>
						<ListItem key={item.name} sx={{ display: 'flex' }}>
							<ListItemButton>
								<ListItemText primary={item.name} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</MyList>
			<Actions matches={matches} />
		</AppbarContainer>
	);
}
