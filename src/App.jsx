import React from "react";
import { Route, Routes } from "react-router-dom";
import "./css/App.css";

import Home from "./pages/Home";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Tools from "./pages/Tools";
import Estrategias from "./pages/Estrategias";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useSelector } from "react-redux";
import BaccaratBudgetHomePage from "./pages/BaccaratBudgetHomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { currentTheme } = useSelector((state) => state.theme);
  React.useEffect(() => {
    document.body.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/herramientas" element={<Tools />} />
        <Route path="/estrategias" element={<Estrategias />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/baccarat-budget" element={<BaccaratBudgetHomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
