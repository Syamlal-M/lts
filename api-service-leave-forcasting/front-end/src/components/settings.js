import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { AgGridReact } from 'ag-grid-react';

//dropdownlist = ("Self", "Team", "All");

const datafetch = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
const [columnDefs, setColumnDefs] = useState([
    { field: 'empId', headerName: 'ID' },
    { field: 'employeeName', headerName: 'Name' },
    { field: 'roles', headerName: 'roles',type: 'editableColumn' },
    //{ field: 'access', headerName: 'access', cellRenderer: 'accessRenderer', cellRendererParams: { onAccessChange: this.onAccessChange} },
    
]);
//gb.configure_column('access', editable='True', cellEditor='agSelectCellEditor', cellEditorParams={'values': dropdownlist })
const columnTypes = useMemo(() => {
  return {
    editableColumn: {
      editable: (params) => {
        return isCellEditable(params);
      },
      cellStyle: (params) => {
        if (isCellEditable(params)) {
          return { backgroundColor: 'lightBlue' };
        }
      },
    },
  };
}, []);

const onGridReady = useCallback((params) => {
  fetch('http://localhost:8080/api/user/fetch-all-users-with-roles')
    .then((resp) => resp.json())
    .then((data) => setRowData(data));
}, []);

const setEditableRole = useCallback((role) => {
  editableRole = user;
  
  gridRef.current.api.redrawRows();
}, []);
}
 const settings = () => {
  return(<div>
    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
    <TextField style={{left: "25%", top: "50px"}} id="empId" label="Employee ID" variant="outlined" />
    <TextField style={{left: "25%", top: "50px"}} id="empName" label="Employee Name" variant="outlined" />
    
          
    <Button id="search" variant="contained" style={{left: "25%", top: "60px"}}>Search</Button>
    <Button id="search" onClick={() => setEditableRole(user)}/>
    <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            columnTypes={columnTypes}
            onGridReady={onGridReady}
          ></AgGridReact>
    </div>
    <Button id="update" variant="contained" style={{left: "25%", top: "60px"}}>Add</Button>
    </Box>
  </div>)
  };
  
export default settings;
