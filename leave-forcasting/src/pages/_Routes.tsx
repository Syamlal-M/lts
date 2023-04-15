import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardTemplate } from 'components/layout';
import DashboardPage from './DashboadPage';
import LandingPage from './LandingPage';
import PlanningPage from './PlanningPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import SignInPage from './SignInPage';
import { getRouteUrl } from 'utils/AccessPointUtils';
import PrivateRouteGuard from 'components/hoc/PrivateRouteGuard';
import ProtectedRouteGuard from 'components/hoc/ProtectedRouteGuard';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRouteUrl("root")} element={<LandingPage />} />
                <Route path={getRouteUrl("signin")} element={<SignInPage />} />
                <Route element={<PrivateRouteGuard children={<DashboardTemplate />} />}>
                    <Route
                        path={getRouteUrl("planning")}
                        element={<ProtectedRouteGuard
                            hasPermission="LEAVE_FORCAST"
                            children={<PlanningPage />} />} />
                    <Route
                        path={getRouteUrl("employeeInfo")}
                        element={<ProtectedRouteGuard
                            hasPermission="EMPLOYEE_SUMMARY"
                            children={<DashboardPage />} />} />
                    <Route
                        path={getRouteUrl("reports")}
                        element={<ProtectedRouteGuard
                            hasPermission="LEAVE_REPORT"
                            children={<ReportsPage />} />} />
                    <Route
                        path={getRouteUrl("settings")}
                        element={<ProtectedRouteGuard
                            hasPermission="EMPLOYEE_MANAGEMENT"
                            children={<SettingsPage />} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;