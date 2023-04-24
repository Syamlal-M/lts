import { DataGrid } from '@mui/x-data-grid';
import { PageContainer } from "components/layout";
import { Box, Button, Card, CardContent, Grid, MenuItem, TextField,
	Typography } from "components/shared-ui";
import UserRoleColumnList from "data/UserRoleColumnList";

import MonthList from "data/MonthList";
import * as React from 'react';
import UserRoleService from "service/UserRoleService";
import { LeaveForecastInfo } from "types/LeaveForecastInfo";

import { KeyValueObject } from "types/KeyValueList";
import { useCallback, useEffect, useState } from "react";


const ReportsPage = () => {

  const [userRole, setUserRole] = React.useState<any>();
  const [processedLtsRoleData, setProcessedLtsRoleData] = React.useState<any>([]);
  const [column, setColumn] = React.useState(UserRoleColumnList);

    const processUserRoleResponse = (response: any) => {
        let tempLeaveForcastData: Array<any> = [];
        for(const employeeInfo of response.content){
            const map = {'employeeId': employeeInfo.employeeId,
                'employeeName': employeeInfo.employeeName,
                'roleName': employeeInfo.roles[0].roleName
                }
            tempLeaveForcastData.push(map)
        }
        setProcessedLtsRoleData(tempLeaveForcastData);
    }

    const fetchUserRoles = () => {
      UserRoleService.fetchUserRole()
        .then(response => {
          processUserRoleResponse(response);
          console.log(response);
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
                 console.log(roleList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
        </CardContent>
      </Card>
    </PageContainer>)
};

export default ReportsPage;