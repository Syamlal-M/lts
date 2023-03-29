import Tooltip from "components/shared-ui/Tooltip";
import { GridColDef } from "types/DataGrid";

const LeaveForecastReportColumnList: Array<GridColDef> = [
    {
        field: 'id',
        headerName: "ID",
        description: 'ID',
        renderCell: (params) =>  (
            <Tooltip title={params.row.id} >
              <span className="table-cell-trucate">{params.row.id}</span>
              </Tooltip>
           ),
    },
    { field: 'employeeId', 
      headerName: 'Emp Id',
      description: 'Emp Id',
      renderCell: (params) =>  (
        <Tooltip title={params.row.employeeId} >
          <span className="table-cell-trucate">{params.row.employeeId}</span>
          </Tooltip>
       ),
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      description: 'Employee Name',
      renderCell: (params) =>  (
        <Tooltip title={params.row.employeeName} >
          <span className="table-cell-trucate">{params.row.employeeName}</span>
          </Tooltip>
       ),
    },
    {
      field: 'organizationName',
      headerName: 'Org',
      description: 'Org',
      renderCell: (params) =>  (
        <Tooltip title={params.row.organizationName} >
          <span className="table-cell-trucate">{params.row.organizationName}</span>
          </Tooltip>
       ),
    },
    {
      field: 'teamName',
      headerName: 'Team',
      description: 'Team',
      renderCell: (params) =>  (
        <Tooltip title={params.row.teamName} >
          <span className="table-cell-trucate">{params.row.teamName}</span>
          </Tooltip>
       ),
    },
    {
      field: 'week_1',
      headerName: 'Week 1',
      description: 'Week 1',
      renderCell: (params) =>  (
        <Tooltip title={params.row.week_1 != null ? <span style={{ whiteSpace: 'pre-line' }}>{params.row.week_1_leaveDates}</span> : 0} >
          <span className="table-cell-trucate">{params.row.week_1 != null ? params.row.week_1 : 0}</span>
          </Tooltip>
       ),
    },
    {
      field: 'week_2',
      headerName: 'Week 2',
      description: 'Week 2',
      renderCell: (params) =>  (
        <Tooltip title={params.row.week_2 != null ? <span style={{ whiteSpace: 'pre-line' }}>{params.row.week_2_leaveDates}</span> : 0} >
          <span className="table-cell-trucate">{params.row.week_2 != null ? params.row.week_2 : 0}</span>
          </Tooltip>
       ),
    },
    {
      field: 'week_3',
      headerName: 'Week 3',
      description: 'Week 3',
      renderCell: (params) =>  (
        <Tooltip title={params.row.week_3 != null ? <span style={{ whiteSpace: 'pre-line' }}>{params.row.week_3_leaveDates}</span> : 0} >
          <span className="table-cell-trucate">{params.row.week_3 != null ? params.row.week_3 : 0}</span>
          </Tooltip>
       ),
    },
    {
      field: 'week_4',
      headerName: 'Week 4',
      description: 'Week 4',
      renderCell: (params) =>  (
        <Tooltip title={params.row.week_4 != null ? <span style={{ whiteSpace: 'pre-line' }}>{params.row.week_4_leaveDates}</span> : 0} >
          <span className="table-cell-trucate">{params.row.week_4 != null ? params.row.week_4 : 0}</span>
          </Tooltip>
       ),
    },
    {
      field: 'week_5',
      headerName: 'Week 5',
      description: 'Week 5',
      renderCell: (params) =>  (
        
        <Tooltip title={params.row.week_5 != null ? <span style={{ whiteSpace: 'pre-line' }}>{params.row.week_5_leaveDates}</span> : 0} >
          <span className="table-cell-trucate">{params.row.week_5 != null ? params.row.week_5 : 0}</span>
          </Tooltip>
       ),
    }
];

export default LeaveForecastReportColumnList;
