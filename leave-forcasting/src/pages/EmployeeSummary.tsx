import { Box, DataGrid } from 'components/shared-ui';
import { useEffect } from 'react';
import * as React from 'react';
import EmployeeSummaryColumnList from 'data/EmployeeSummaryColumnList';
import EmployeeSummaryService from 'service/EmployeeSummaryService';

const EmployeeSummary = () => {
	const [empList, setEmpList] = React.useState<any>('');
	const fetchEmployeeSummary = () => {
		EmployeeSummaryService.fetchForecast()
			.then((response) => {
				setEmpList(response);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchEmployeeSummary();
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
				pageSizeOptions={[5]}
			/>
		</Box>
	);
};

export default EmployeeSummary;
