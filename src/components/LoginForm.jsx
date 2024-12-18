import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice.slide";
import { useNavigate } from "react-router-dom";
import "../css/components_css/LoginForm.css";

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar errores

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      // Dispatch para iniciar sesión
      dispatch(loginUser({ username, password }));

      // Redirige al gestor
      navigate("/baccarat-budget");

      if (onClose) onClose(); // Cierra el modal si está presente
    } catch (err) {
      setError(err.message); // Muestra el error si las credenciales son incorrectas
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <p className="title">Iniciar Sesión</p>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginForm;
