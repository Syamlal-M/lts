import { PageContainer } from "components/layout";
import { Card, CardContent, Typography } from "components/shared-ui";
import EmployeeInfo from "./EmployeeInfo";
import UploadEmployee from "./UploadEmployee";

const DashboardPage = () => {
  return (
    <PageContainer title="LTS | Employee Information">
      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            Employee Info
          </Typography>
        </CardContent>
        <CardContent>
          <EmployeeInfo />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            Import Employee Info
          </Typography>
        </CardContent>
        <CardContent>
          <UploadEmployee />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default DashboardPage;
