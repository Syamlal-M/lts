import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./SignInPage";
import LandingPage from "./LandingPage";
import ReportsPage from "./reports/page";
import PageNotFound from "./PageNotFound";
import SettingsPage from "./settings/page";
import PlanningPage from "./leave-forecast/page";
import EmployeeInfoPage from "./employee-info/page";
import { getRouteUrl } from "utils/AccessPointUtils";
import { DashboardTemplate } from "components/layout";
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
