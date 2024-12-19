import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaccaratBudgetManager from "../components/gestor/BaccaratBudgetManager";
import "../css/gestor/BaccaratBudgetManager.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Recuperar el usuario autenticado desde Redux
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login"); // Redirige si no hay usuario
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="budget__maneger__home-page">
      {loggedInUser && (
        <>
          <h2>Bienvenido, {loggedInUser}</h2>
          <BaccaratBudgetManager />
        </>
      )}
    </div>
  );
};

export default HomePage;
