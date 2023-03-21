import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// cookies.set('role', '1');  //temporarily hard coding....once the authentication flow get completed, this code will be removed

const columns = [
	{ field: 'empId', headerName: 'ID', sortable: false },
	{ field: 'employeeName', headerName: 'Name', sortable: false },
	{ field: 'expediaFgName', headerName: 'Eg Name', sortable: false },
	{ field: 'vendorName', headerName: 'Vendor', sortable: false },
	{ field: 'jobTitle', headerName: 'Job Title', sortable: false },
	{ field: 'org', headerName: 'Org', sortable: false },
	{ field: 'team', headerName: 'team', sortable: false },
	{ field: 'hm', headerName: 'HM', sortable: false },
	{
		field: 'billRate',
		headerName: 'Bill Rate',
		hide: cookies.get('role') == 1 ? false : true,
		sortable: false,
	},
	{ field: 'country', headerName: 'Country', sortable: false },
	{ field: 'city', headerName: 'City', sortable: false },
	{ field: 'sow', headerName: 'SOW', sortable: false },
	{ field: 'billability', headerName: 'Billability', sortable: false },
	{ field: 'remarks', headerName: 'Remarks', sortable: false },
];

const EmplolyeeSummary = () => {
	const [empList, setEmpList] = React.useState([]);

	React.useEffect(() => {
		var requestOptions = {
			method: 'GET',
			headers: {
				role: cookies.get('role'),
			},
		};

		fetch('api/employee/search?limit=1500', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setEmpList(result.content);
			})
			.catch((error) => console.log('error', error));
	}, []);
	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={empList}
				columns={columns}
				getRowId={(row) => row.empId}
				disableColumnMenu
			/>
		</div>
	);
};

export default EmplolyeeSummary;
