import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'empId', headerName: 'ID' },
    { field: 'employeeName', headerName: 'Name' },
    { field: 'roles', headerName: 'roles',editable: true },
    { field: 'access', headerName: 'access', editable: true },
    
];

const Settings = () =>  {
  return(<div>
    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
    <TextField style={{left: "25%", top: "50px"}} id="empId" label="Employee ID" variant="outlined" />
    <TextField style={{left: "25%", top: "50px"}} id="empName" label="Employee Name" variant="outlined" />
    
          
    <Button id="search" variant="contained" style={{left: "25%", top: "60px"}}>Search</Button>
    <Button id="update" variant="contained" style={{left: "25%", top: "60px"}}>Add</Button>
    </Box>
  </div>)
  };
  
  
  export default Settings;
