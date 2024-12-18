import React, { useState, useEffect, useRef } from "react";
import "../css/components_css/HeaderRegisterLogin.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/userSlice.slide"; // Importa la acción de logout

const HeaderRegisterLogin = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state) => state.theme);
  const { loggedInUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const iconColor = currentTheme === "dark" ? "#fff" : "#000";
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
    navigate("/home");
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [menuOpen]);

  return (
    <div className="header-menu">
      <div
        className="material-icons user-icon"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Menú de usuario"
      >
        <AccountCircleIcon fontSize="large" style={{ color: iconColor }} />
      </div>

      {menuOpen && (
        <ul className="dropdown-menu" ref={menuRef}>
          {!loggedInUser ? (
            <>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Registrarse
                </Link>
              </li>
              <li>
                <button onClick={onLoginClick} className="login-btn">
                  Iniciar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Perfil
                </Link>
              </li>
              <li>
                <Link to="/baccarat-budget" onClick={() => setMenuOpen(false)}>
                  Baccarat Budget Manager
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={() => setMenuOpen(false)}>
                  Config
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default HeaderRegisterLogin;
