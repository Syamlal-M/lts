import { useCallback, useEffect, useState } from "react";
import { capitalize } from "utils/StringUtils";
import RoleChangeDialog from "./RoleChangeDialog"
import { PageContainer } from "components/layout";
import UserRoleService from "service/UserRoleService";
import UserRoleColumnList from "data/UserRoleColumnList";
import { Box, Button, Card, CardContent, DataGrid, Grid, Typography } from "components/shared-ui";

const SettingsPage = () => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>({});
  const [processedLtsRoleData, setProcessedLtsRoleData] = useState<any>([]);
  const [column] = useState(UserRoleColumnList);

  const processUserRoleResponse = useCallback((response: any) => {
    let tempLeaveForcastData: Array<any> = [];
    for (const employeeInfo of response) {
      const map = {
        'employeeId': employeeInfo.employeeId,
        'employeeName': employeeInfo.employeeName,
        'roleName': capitalize(`${employeeInfo.role.roleName}`.split("_").join(" ")),
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
  }, []);

  const fetchUserRoles = useCallback(() => {
    UserRoleService.fetchUserRole()
      .then(response => {
        processUserRoleResponse(response);
      })
      .catch(error => console.log(error))
  }, [processUserRoleResponse]);

  const sendToServer = async (employeeId: string, roleName: string) => {
    UserRoleService.assignRole({ employeeId: employeeId, roleName: roleName })
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
    if (roleName) {
      sendToServer(selectedValue.employeeId, roleName);
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles])


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