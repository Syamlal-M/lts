import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {months} from '../App.constant';

const Report = () => {
  return(<div>
    <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, '& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
    <TextField style={{left: "25%", top: "50px"}} id="org" label="Org" variant="outlined" />
    <TextField style={{left: "25%", top: "50px"}} id="team" label="Team" variant="outlined" />
    <TextField style={{left: "25%", top: "50px"}} id="month" select label="Select" defaultValue="JAN" helperText="Please select Month">
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
    </TextField>
    <Button id="view" variant="contained" style={{left: "25%", top: "60px"}}>View</Button>
    <Button id="download" variant="contained" style={{left: "25%", top: "60px"}}>Download</Button>
    </Box>
  </div>)
  };
  
  export default Report;