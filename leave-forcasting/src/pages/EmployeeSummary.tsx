import { Box, DataGrid } from 'components/shared-ui';
import { useEffect, useState } from 'react';
import EmployeeSummaryColumnList from 'data/EmployeeSummaryColumnList';

const EmplolyeeSummary = () => {
	const [empList, setEmpList] = useState([]);

	useEffect(() => {
		var requestOptions = {
			method: 'GET',
			// headers: {
			// 	role: cookies.get('role'),
			// },
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
		<Box sx={{ height: 400, maxWidth: 'calc(100vw - 36px)' }}>
			<DataGrid
				rows={empList}
				columns={EmployeeSummaryColumnList}
				getRowId={(row) => row.empId}
				disableColumnMenu
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
			/>
		</Box>
	);
};

export default EmplolyeeSummary;
