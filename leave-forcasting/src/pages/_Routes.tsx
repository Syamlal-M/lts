import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import SignInPage from './SignInPage';
import ReportsPage from './ReportsPage';
import PageNotFound from './PageNotFound';
import SettingsPage from './settings/page';
import PlanningPage from './leave-forecast/page';
import { getRouteUrl } from 'utils/AccessPointUtils';
import { DashboardTemplate } from 'components/layout';
import DashboardPage from './employee-info/DashboadPage';
import { SelectListProvider } from 'context/SelectListContext';
import PrivateRouteGuard from 'components/hoc/PrivateRouteGuard';
import ProtectedRouteGuard from 'components/hoc/ProtectedRouteGuard';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRouteUrl("ROOT")} element={<LandingPage />} />
                <Route path={getRouteUrl("SIGN_IN")} element={<SignInPage />} />
                <Route element={<PrivateRouteGuard
                    children={<SelectListProvider
                        children={<DashboardTemplate />} />} />}>
                    <Route
                        path={getRouteUrl("PLANNING")}
                        element={<ProtectedRouteGuard
                            hasPermission="LEAVE_FORCAST"
                            children={<PlanningPage />} />} />
                    <Route
                        path={getRouteUrl("EMPLOYEE_INFO")}
                        element={<ProtectedRouteGuard
                            hasPermission="EMPLOYEE_SUMMARY"
                            children={<DashboardPage />} />} />
                    <Route
                        path={getRouteUrl("REPORTS")}
                        element={<ProtectedRouteGuard
                            hasPermission="LEAVE_REPORT"
                            children={<ReportsPage />} />} />
                    <Route
                        path={getRouteUrl("SETTINGS")}
                        element={<ProtectedRouteGuard
                            hasPermission="EMPLOYEE_MANAGEMENT"
                            children={<SettingsPage />} />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;