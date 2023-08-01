import EmployeeInfo from "./EmployeeInfo";
import UploadEmployee from "./UploadEmployee";
import { PageContainer } from "components/layout";
import { Card, CardContent, CardHeader, Grid } from "components/shared-ui";

const EmployeeInfoPage = () => {
  return (
    <PageContainer title="LTS | Employee Information">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Employee Info" />
            <CardContent>
              <EmployeeInfo />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Export Employee Info" />
            <CardContent>
              <UploadEmployee />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EmployeeInfoPage;
