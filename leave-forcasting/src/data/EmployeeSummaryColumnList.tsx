import { GridColDef } from "types/DataGrid";

const EmployeeSummaryColumnList: Array<GridColDef> = [
        { field: 'employeeInfoId', headerName: 'ID', sortable: false },
        { field: 'employeeName', headerName: 'Name', sortable: false },
        { field: 'nameInClientRecords', headerName: 'Eg Name', sortable: false },
        { field: 'vendorName', headerName: 'Vendor', sortable: false },
        { field: 'jobTitle', headerName: 'Job Title', sortable: false },
        { field: 'org', headerName: 'Org', sortable: false },
        { field: 'team', headerName: 'team', sortable: false },
        { field: 'hm', headerName: 'HM', sortable: false },
        {
            field: 'billRate',
            headerName: 'Bill Rate',
            //hide: cookies.get('role') == 1 ? false : true,
            sortable: false,
        },
        { field: 'country', headerName: 'Country', sortable: false },
        { field: 'city', headerName: 'City', sortable: false },
        { field: 'sow', headerName: 'SOW', sortable: false },
        { field: 'billability', headerName: 'Billability', sortable: false },
        { field: 'remarks', headerName: 'Remarks', sortable: false },
    ];

export default EmployeeSummaryColumnList;
