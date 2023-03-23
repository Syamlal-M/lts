import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardTemplate } from 'components/layout';
import DashboardPage from './DashboadPage';
import LandingPage from './LandingPage';
import PlanningPage from './PlanningPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import SignInPage from './SignInPage';

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route element={<DashboardTemplate />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/leave-forecast" element={<PlanningPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;