import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardTemplate } from 'components/layout';
import DashboardPage from './DashboadPage';
import LandingPage from './LandingPage';
import PlanningPage from './PlanningPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import SignInPage from './SignInPage';
import { getRouteUrl } from 'utils/AccessPointUtils';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={getRouteUrl("root")} element={<LandingPage />} />
                <Route path={getRouteUrl("signin")} element={<SignInPage />} />
                <Route element={<DashboardTemplate />}>
                    <Route path={getRouteUrl("planning")} element={<PlanningPage />} />
                    <Route path={getRouteUrl("employeeInfo")} element={<DashboardPage />} />
                    <Route path={getRouteUrl("reports")} element={<ReportsPage />} />
                    <Route path={getRouteUrl("settings")} element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;