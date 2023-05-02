import { UserRoleColumnList as RoleColumnList } from "types/UserRoleTable";

const UserRoleColumnList: RoleColumnList = [
    {
      field: 'employeeId',
      headerName: 'Employee Id',
      description: 'Employee Id',
      width: 250,
      editable: false,
    },
    {
      field: 'employeeName',
      headerName: 'Employee Name',
      description: 'Employee Name',
      width: 250,
      editable: false,
    },
    {
      field: 'roleName',
      headerName: 'Role',
      description: 'Role',
      width: 250,
      editable: false,
    },
    {
        field: 'action',
        headerName: 'Actions',
        renderCell: (params: any) => (params.row.actions),
        width: 200,
        sortable: false,
    },
  ]
export default UserRoleColumnList;
