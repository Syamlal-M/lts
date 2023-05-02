import { DataGrid } from '@mui/x-data-grid';
import { PageContainer } from "components/layout";
import { Box, Button, Card, CardContent, Grid, Typography } from "components/shared-ui";
import UserRoleColumnList from "data/UserRoleColumnList";

import * as React from 'react';
import UserRoleService from "service/UserRoleService";

import { useCallback } from "react";
import { KeyValueObject } from "types/KeyValueList";

import RoleChangeDialog from "./RoleChangeDialog"

const SettingsPage = () => {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<any>({});
  const [processedLtsRoleData, setProcessedLtsRoleData] = React.useState<any>([]);
  const [column] = React.useState(UserRoleColumnList);

  const processUserRoleResponse = (response: any) => {
    let tempLeaveForcastData: Array<any> = [];
    for(const employeeInfo of response){
        const map = {'employeeId': employeeInfo.employeeId,
            'employeeName': employeeInfo.employeeName,
            'roleName': employeeInfo.role.roleName,
            'actions':
                <Button
                    variant="contained"
                    onClick={() => handleClickOpen(employeeInfo)}
                >
                    Change Role
                </Button>
            }
        tempLeaveForcastData.push(map)
    }
    setProcessedLtsRoleData(tempLeaveForcastData);
  }

    const fetchUserRoles = () => {
      UserRoleService.fetchUserRole()
        .then(response => {
          processUserRoleResponse(response);
        })
        .catch(error => console.log(error))
    }

    const processDataList = (dataList: string[]): KeyValueObject[] => {
        const DEFAULT_DATA: KeyValueObject = { label: "Select", value: "" };
        return [DEFAULT_DATA, ...dataList.map((listItem) => ({
            label: listItem,
            value: listItem,
        }))];
    }
    const getRoles = useCallback(() => {
        UserRoleService.getRoleList()
            .then(response => {
                const roleList = processDataList(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

      const sendToServer = async (employeeId: string, roleName: string) => {
        UserRoleService.assignRole({employeeId: employeeId, roleName:roleName})
            .then(response => {
                console.log(response);
                //update the page with new value
                fetchUserRoles()
            })
            .catch(error => {
                console.log(error)
            })
      }

  const handleClickOpen = (params: any) => {
    setSelectedValue(params);
    setOpen(true);
  };

  const handleClose = (selectedValue: any, roleName: string) => {
    if(roleName) {
        sendToServer(selectedValue.employeeId, roleName);
    }
    setOpen(false);
  };



    React.useEffect(() => {
      getRoles()
      fetchUserRoles();
    }, [])


  return (

    <PageContainer title="LTS | Roles">
      <Card>
        <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
                Roles
            </Typography>
      	</CardContent>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Box sx={{ height: 400, maxWidth: "calc(100vw - 36px)" }}>
                <DataGrid
                  rows={processedLtsRoleData}
                  columns={column}
                  getRowId={(row) => row.employeeId}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <RoleChangeDialog
            selectedValue={selectedValue}
            isOpen={open}
            onClose={handleClose}
          />

        </CardContent>
      </Card>

    </PageContainer>)
};

export default SettingsPage;