import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/userSlice.slide";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.users.users);

  // Encuentra al usuario actual basado en el estado global
  const currentUser = user ? users.find((u) => u.username === user) : null;

  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    if (currentUser) {
      const updatedUsers = users.map((u) =>
        u.username === user ? { ...u, password: newPassword } : u
      );

      // Actualiza los usuarios en localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Contraseña actualizada exitosamente");
      setNewPassword("");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/home");
  };

  if (!currentUser) {
    return (
      <div>
        <h2>Perfil de Usuario</h2>
        <p>No hay usuario logueado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <p>
          <strong>Nombre de usuario:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Fecha de registro:</strong>{" "}
          {currentUser.registrationDate || "No disponible"}
        </p>
      </div>

      <div>
        <h3>Actualizar Contraseña</h3>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Actualizar Contraseña</button>
      </div>

      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default ProfilePage;
