import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ForgetPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";
import ContactUsForm from "./components/ContactUsForm/ContactUsForm";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordForm />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/contact-us" element={<ContactUsForm />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;