import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import ReportsPage from "./ReportsPage";
import PageNotFound from "./PageNotFound";
import SettingsPage from "./settings/page";
import PlanningPage from "./leave-forecast/page";
import { getRouteUrl } from "utils/AccessPointUtils";
import { DashboardTemplate } from "components/layout";
import EmployeeInfoPage from "./employee-info/page";
import { SelectListProvider } from "context/SelectListContext";
import PrivateRouteGuard from "components/hoc/PrivateRouteGuard";
import ProtectedRouteGuard from "components/hoc/ProtectedRouteGuard";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={getRouteUrl("ROOT")} element={<LandingPage />} />
        <Route path={getRouteUrl("SIGN_IN")} element={<SignInPage />} />
        <Route
          element={
            <PrivateRouteGuard>
              <SelectListProvider>
                <DashboardTemplate />
              </SelectListProvider>
            </PrivateRouteGuard>
          }>
          <Route
            path={getRouteUrl("PLANNING")}
            element={
              <ProtectedRouteGuard hasPermission="LEAVE_FORCAST">
                <PlanningPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path={getRouteUrl("EMPLOYEE_INFO")}
            element={
              <ProtectedRouteGuard hasPermission="EMPLOYEE_SUMMARY">
                <EmployeeInfoPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path={getRouteUrl("REPORTS")}
            element={
              <ProtectedRouteGuard hasPermission="LEAVE_REPORT">
                <ReportsPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path={getRouteUrl("SETTINGS")}
            element={
              <ProtectedRouteGuard hasPermission="EMPLOYEE_MANAGEMENT">
                <SettingsPage />
              </ProtectedRouteGuard>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
