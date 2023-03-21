import { useEffect } from 'react';
import Home from './components/home/home';
import './App.css';
import LeaveForecast from './components/leaveForcast/leaveForcast';
import Report from './components/report/report';
import Roles from './components/roles/roles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

function App() {
	useEffect(() => {
		document.title = 'Leave Tracker System';
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="home" element={<Home />} />
					<Route path="leave-forecast" element={<LeaveForecast />} />
					<Route path="reports" element={<Report />} />
					<Route path="settings" element={<Roles />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
