import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaccaratBudgetManager from "../components/gestor/BaccaratBudgetManager";

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
    <div>
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
