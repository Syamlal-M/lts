import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// cookies.set('role', '1');  //temporarily hard coding....once the authentication flow get completed, this code will be removed

const columns = [
    { field: 'empId', headerName: 'ID' },
    { field: 'employeeName', headerName: 'Name' },
    { field: 'expediaFgName', headerName: 'Eg Name' },
    { field: 'vendorName', headerName: 'Vendor' },
    { field: 'jobTitle', headerName: 'Job Title' },
    { field: 'org', headerName: 'Org' },
    { field: 'team', headerName: 'team' },
    { field: 'hm', headerName: 'HM' },
    { field: 'billRate', headerName: 'Bill Rate', hide: cookies.get('role')==1 ? false : true},
    { field: 'country', headerName: 'Country' },
    { field: 'city', headerName: 'City' },
    { field: 'sow', headerName: 'SOW' },
    { field: 'billability', headerName: 'Billability' },
    { field: 'remarks', headerName: 'Remarks' },
];

const EmplolyeeSummary = () => {

    const [empList, setEmpList] = React.useState([]);

    React.useEffect(() => {
        var requestOptions = {
            method: 'GET',
            headers: {
                'role': cookies.get('role')
            },
        };

        fetch("api/employee/search?limit=1500", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setEmpList(result.content);
            })
            .catch(error => console.log('error', error));

    }, [])
    return (<div style={{ height: 500, width: '100%' }}>

        <DataGrid
            rows={empList}
            columns={columns}
            getRowId={(row) => row.empId}

        />

    </div>);
};

export default EmplolyeeSummary;