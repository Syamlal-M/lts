import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Home from "./components/Home";
import LeaveForecast from './components/LeaveForecast';
import Report from './components/Report';
import EmplolyeeSummary from './components/EmployeeSummary';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, LoginLayout} from './components/Layout';
import SignIn from './components/SignIn';
import { AuthProvider } from './components/auth';
import Settings from './components/settings';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {<Route path='/' element={<LoginLayout/>}>
          <Route index element={<SignIn />} />
          <Route path="login" element={<SignIn />} />
        </Route> }
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="leave-forecast" element={<LeaveForecast />} />
          <Route path="reports" element={<Report />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
