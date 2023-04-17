import { Tooltip } from "components/shared-ui";
import { LeavePlanningColumnList as PlanningColumnList } from "types/LeavePlanningTable";

const LeavePlanningColumnList: PlanningColumnList = [
    {
        field: 'id',
        headerName: 'ID',
        renderCell: (params) => (
            <Tooltip title={params.row.id}>
                <span>{params.row.id}</span>
            </Tooltip>
        ),
        width: 100,
    },
    {
        field: 'name',
        headerName: 'Name',
        renderCell: (params) => (
            <Tooltip title={params.row.name}>
                <span>{params.row.name}</span>
            </Tooltip>
        ),
        width: 200,
    },
    {
        field: 'nameInClientRecords',
        headerName: 'Eg Name',
        renderCell: (params) => (
            <Tooltip title={params.row.nameInClientRecords}>
                <span>{params.row.nameInClientRecords}</span>
            </Tooltip>
        ),
        width: 200,
    },
    {
        field: 'jobTitle',
        headerName: 'Job Title',
        renderCell: (params) => (
            <Tooltip title={params.row.jobTitle}>
                <span>{params.row.jobTitle}</span>
            </Tooltip>
        ),
        width: 200,
    }
];

export default LeavePlanningColumnList;
