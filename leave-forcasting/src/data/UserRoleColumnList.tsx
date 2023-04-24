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
      type: 'singleSelect',
      width: 250,
      editable: true,
      valueOptions: ["ADMIN","SUPER_ADMIN","TEAM_USER","USER"]
    },
//     {
//       field: 'save',
//       headerName: 'Action',
//       description: 'Action',
// //       renderCell: (params) => (
// //         <Button id={params.row.userId} variant="contained" size="small" onClick={() => update(params.row.userId, params)}>
// //           update
// //         </Button>
// //       ),
//     }
  ]
export default UserRoleColumnList;
