import React, { useEffect } from "react";
import Login from "./components/Landing/Login";
import './components/Layout/Styles.css';
import Header from "./components/HeaderFooter/Header";
import './app.css';
import './components/Layout/Styles.css'
import LandingMain from "./components/Landing/LandingMain";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Departments from "./components/Departments/Departments";
import AppointmentHistory from "./components/AppointmentHistory/AppointmentHistory";
import RescheduleAppointment from "./components/AppointmentHistory/RescheduleAppointment";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

function App() {

  return (
    <div className="bg-Gradient" style={{minHeight: 'calc(100vh - 5rem)', marginTop: '5rem'}}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route exace path="/" element={<Login />} />
          <Route exact path="/home" element={<LandingMain />} />
          <Route path="/department" element={<Departments />} />
          <Route path="/services/appointments" element={<AppointmentHistory />} />
          <Route path="/reschedule" element={<RescheduleAppointment />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
