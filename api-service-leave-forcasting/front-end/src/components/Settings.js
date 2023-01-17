
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { roles } from '../App.constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [ltsRoles, setLtsRoles] = React.useState([]);
  const [processedLtsRoleData, setProcessedLtsRoleData] = React.useState([]);
  const [selectedRoleMap, setSelectedRoleMap] = React.useState(new Map());
  const [isRoleUpdated, setIsRoleUpdated] = React.useState(null);

  const ltsRoleRoleColumns = [
    {
      field: 'userId',
      headerName: 'Emp Id',
      description: 'Emp Id',
      width: 250,
      editable: false,
    },
    {
      field: 'username',
      headerName: 'Employee Name',
      description: 'Employee Name',
      width: 250,
      editable: false,
    },
    /*{
      field: 'roleName',
      headerName: 'Role',
      description: 'Role',
      width: 250,
      editable: true,
      renderCell: (params) => (
        <TextField  id={params.row.userId} select  style={{width: "237px"}} value={selectedRoleMap.get(params.row.userId)}  onChange={event=>onRoleChange(event,params.row.userId)}>
            {params.row.roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}  
              </MenuItem>
            ))}
      </TextField>     
      ),
    },*/
    {
      field: 'roleName',
      headerName: 'Role',
      description: 'Role',
      type: 'singleSelect',
      width: 250,
      editable: true,
      valueOptions: ['admin', 'self', 'team']
    },
    {
      field: 'save',
      headerName: 'Action',
      description: 'Action',
      renderCell: (params) => (
        <Button id={params.row.userId} variant="contained" size="small" onClick={() => update(params.row.userId, params)}>
          update
        </Button>
      ),
    }
  ]
  const fetchLtsRoles = () => {
    fetch("api/user/fetch-all-users-with-roles")
      .then(async result => {
        if (!result.ok) {
          setLtsRoles([]);
        } else {
          setLtsRoles(await result.json());
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    fetchLtsRoles();
  }, [])

  React.useEffect(() => {
    if (typeof ltsRoles.length !== 'undefined') {
      processDataForTableView();
    }
  }, [ltsRoles])

  /*const onRoleChange = (event, userId) =>{   
    console.log(event);
    setSelectedRoleEmployeeId(userId);
    let selectedRole = selectedRoleMap;
    selectedRole.set(userId, event.target.value);
    setSelectedRoleMap(selectedRole);
    setSelectedRoleMap(selectedRoleMap.set(userId, event.target.value));
  }*/

  const update = (userId, params) => {
    let roleName = selectedRoleMap.get(userId);
    var requestOptions = {
      method: 'PUT',
    };
    fetch("api/user/assign-role?userId=" + userId + "&roleName=" + roleName, requestOptions)
      .then(async result => {
        let response = await result.json()
        if (!result.ok) {
          toast.error(response.message, { hideProgressBar: true, theme: "colored", autoClose: 2000, position: "bottom-center" });
          setIsRoleUpdated(false);
        } else {
          toast.success('success', { hideProgressBar: true, theme: "colored", autoClose: 500, position: "bottom-center" });
          setIsRoleUpdated(true);
        }
      })
      .catch(error => console.log(error))
  }

  const sendToServer = async (event) => {
    for (const role in roles) {
      if (event.value.toLowerCase() == roles[role].label.toLowerCase()) {
        setSelectedRoleMap(selectedRoleMap.set(event.id, roles[role].label.toLowerCase()));
        break;
      }
    }
  }

  React.useEffect(() => {
    //alert(isRoleUpdated)
    if (typeof isRoleUpdated != null && isRoleUpdated) {

    }
  }, [isRoleUpdated])

  const processDataForTableView = () => {
    let tempLtsRoleData = [];
    if (ltsRoles != null && ltsRoles.length != 0) {
      for (const ltr of ltsRoles) {
        let ltsRoleObject = {};
        ltsRoleObject['userId'] = ltr['userId'];
        ltsRoleObject['username'] = ltr['username'];
        ltsRoleObject['userId'] = ltr['userId'];
        for (var key in ltr['role']) {
          ltsRoleObject['roleId'] = key;
          setSelectedRoleMap(selectedRoleMap.set(ltr['userId'], ltr['role'][key].toLowerCase()));
          ltsRoleObject['roleName'] = ltr['role'][key];
        }
        ltsRoleObject['roles'] = roles;
        tempLtsRoleData.push(ltsRoleObject);
      }
      setProcessedLtsRoleData(tempLtsRoleData);
    } else {
      setProcessedLtsRoleData([]);
    }
  }

  const notify = () => {
    toast("Wow so easy!");
  }

  return (
    <div>
      <Box sx={{ height: 400, width: '50%' }}>
        <DataGrid style={{ left: "54%", top: "75px" }}
          rows={processedLtsRoleData}
          columns={ltsRoleRoleColumns}
          getRowId={(row) => row.userId}
          onCellEditCommit={sendToServer}
        />
      </Box>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Settings;

