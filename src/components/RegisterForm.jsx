import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/userSlice.slide";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser({ username, password }));
      alert("Usuario registrado exitosamente.");
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
