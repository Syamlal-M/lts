import { Tooltip } from "components/shared-ui";
import { GridColDef } from "types/DataGrid";

const LeavePlanningColumnList: Array<GridColDef> = [
    {
        field: 'empId',
        headerName: 'ID',
        renderCell: (params) => (
            <Tooltip title={params.row.empId}>
                <span>{params.row.empId}</span>
            </Tooltip>
        ),
    },
    {
        field: 'employeeName',
        headerName: 'Name',
        renderCell: (params) => (
            <Tooltip title={params.row.employeeName}>
                <span>{params.row.employeeName}</span>
            </Tooltip>
        ),
    },
    {
        field: 'expediaFgName',
        headerName: 'Eg Name',
        renderCell: (params) => (
            <Tooltip title={params.row.expediaFgName}>
                <span>{params.row.expediaFgName}</span>
            </Tooltip>
        ),
    },
    {
        field: 'vendorName',
        headerName: 'Vendor',
        renderCell: (params) => (
            <Tooltip title={params.row.vendorName}>
                <span>{params.row.vendorName}</span>
            </Tooltip>
        ),
    },
    {
        field: 'jobTitle',
        headerName: 'Job Title',
        renderCell: (params) => (
            <Tooltip title={params.row.jobTitle}>
                <span>{params.row.jobTitle}</span>
            </Tooltip>
        ),
    },
    {
        field: 'org',
        headerName: 'Org',
        renderCell: (params) => (
            <Tooltip title={params.row.org}>
                <span>{params.row.org}</span>
            </Tooltip>
        ),
    },
    {
        field: 'team',
        headerName: 'Team',
        renderCell: (params) => (
            <Tooltip title={params.row.team}>
                <span>{params.row.team}</span>
            </Tooltip>
        ),
    },
    {
        field: 'hm',
        headerName: 'HM',
        renderCell: (params) => (
            <Tooltip title={params.row.hm}>
                <span>{params.row.hm}</span>
            </Tooltip>
        ),
    },
    {
        field: 'billRate',
        headerName: 'Bill Rate',
        renderCell: (params) => (
            <Tooltip title={params.row.billRate}>
                <span>{params.row.billRate}</span>
            </Tooltip>
        ),
    },
    {
        field: 'country',
        headerName: 'Country',
        renderCell: (params) => (
            <Tooltip title={params.row.country}>
                <span>{params.row.country}</span>
            </Tooltip>
        ),
    },
    {
        field: 'city',
        headerName: 'City',
        renderCell: (params) => (
            <Tooltip title={params.row.city}>
                <span>{params.row.city}</span>
            </Tooltip>
        ),
    },
    {
        field: 'sow',
        headerName: 'SOW',
        renderCell: (params) => (
            <Tooltip title={params.row.sow}>
                <span>{params.row.sow}</span>
            </Tooltip>
        ),
    },
    {
        field: 'billability',
        headerName: 'Billability',
        renderCell: (params) => (
            <Tooltip title={params.row.billability}>
                <span>{params.row.billability}</span>
            </Tooltip>
        ),
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        renderCell: (params) => (
            <Tooltip title={params.row.remarks}>
                <span>{params.row.remarks}</span>
            </Tooltip>
        ),
    },
];

export default LeavePlanningColumnList;
