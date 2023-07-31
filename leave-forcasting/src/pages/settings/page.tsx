import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  DataGrid,
  Grid,
  Typography
} from "components/shared-ui";
import { useToggle } from "usehooks-ts";
import { capitalize } from "utils/StringUtils";
import RoleChangeDialog from "./RoleChangeDialog";
import { PageContainer } from "components/layout";
import UserRoleService from "service/UserRoleService";
import UserRoleColumnList from "data/UserRoleColumnList";
import { useCallback, useEffect, useState } from "react";
import DataGridTableSkeleton from "components/common/DataGridTableSkeleton";

const SettingsPage = () => {
  const [isDialogOpen, toggleIsDialogOpen, setIsDialogOpen] = useToggle(false);
  const [selectedValue, setSelectedValue] = useState<any>({});
  const [processedLtsRoleData, setProcessedLtsRoleData] = useState<any>([]);
  const [column] = useState(UserRoleColumnList);

  const [isUserRoleDataLoading, setIsUserRoleDataLoading] = useState(false);
  const [userRoleFetchError, setUserRoleFetchError] = useState("");
  const [isUserRoleUpdateLoading, setIsUserRoleUpdateLoading] = useState(false);
  const [userRoleUpdateError, setUserRoleUpdateError] = useState("");

  const handleClickOpen = useCallback(
    (params: any) => {
      setSelectedValue(params);
      setIsDialogOpen(true);
      setUserRoleUpdateError("");
    },
    [setIsDialogOpen]
  );

  const processUserRoleResponse = useCallback(
    (response: any) => {
      const tempLeaveForcastData: Array<any> = [];
      for (const employeeInfo of response) {
        const map = {
          employeeId: employeeInfo.employeeId,
          employeeName: employeeInfo.employeeName,
          roleName: capitalize(`${employeeInfo.role.roleName}`.split("_").join(" ")),
          actions: (
            <Button variant="contained" onClick={() => handleClickOpen(employeeInfo)}>
              Change Role
            </Button>
          )
        };
        tempLeaveForcastData.push(map);
      }
      setProcessedLtsRoleData(tempLeaveForcastData);
    },
    [handleClickOpen]
  );

  const fetchUserRoles = useCallback(() => {
    setIsUserRoleDataLoading(true);
    UserRoleService.fetchUserRole()
      .then((response) => {
        processUserRoleResponse(response);
      })
      .catch((error) => {
        setUserRoleFetchError(
          error.message || "Oops! Something went wrong while fetching user role details."
        );
        console.log(error);
      })
      .finally(() => {
        setIsUserRoleDataLoading(false);
      });
  }, [processUserRoleResponse]);

  const updateUserRoles = (employeeId: string, roleName: string) => {
    setIsUserRoleUpdateLoading(true);
    UserRoleService.assignRole({ employeeId, roleName })
      .then(() => {
        //update the page with new value
        fetchUserRoles();
        setIsDialogOpen(false);
      })
      .catch((error) => {
        setUserRoleUpdateError(
          error.message || "Oops! Something went wrong while updating user role details."
        );
        console.log(error);
      })
      .finally(() => {
        setIsUserRoleUpdateLoading(false);
      });
  };

  const handleSubmit = (selectedValue: any, roleName: string) => {
    updateUserRoles(selectedValue.employeeId, roleName);
  };

  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles]);

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
            {userRoleFetchError && (
              <Grid item xs={12}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setUserRoleFetchError("");
                  }}>
                  {userRoleFetchError}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              {isUserRoleDataLoading ? (
                <DataGridTableSkeleton noOfRows={6} />
              ) : (
                <Box sx={{ height: 371, maxWidth: "calc(100vw - 64px)" }}>
                  <DataGrid
                    rows={processedLtsRoleData}
                    columns={column}
                    getRowId={(row) => row.employeeId}
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          <RoleChangeDialog
            isOpen={isDialogOpen}
            onClose={toggleIsDialogOpen}
            onSubmit={handleSubmit}
            selectedValue={selectedValue}
            isLoading={isUserRoleUpdateLoading}
            errorMessage={userRoleUpdateError}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default SettingsPage;
