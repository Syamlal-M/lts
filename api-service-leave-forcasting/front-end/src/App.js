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

function App() {

  const [dummy, setDummy] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    fetch('api/helloWorld')
      .then(response => 
        {
          response.text().then( data =>{
            console.log(data);
        setDummy(data);
        setLoading(false);
          })

        })
     
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        {<Route path='/' element={<LoginLayout/>}>
          <Route index element={<SignIn />} />
          <Route path="login" element={<SignIn />} />


        </Route> }
        <Route path="/lms" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leave-forecast" element={<LeaveForecast />} />
          <Route path="report" element={<Report />} />
          <Route path="*" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
