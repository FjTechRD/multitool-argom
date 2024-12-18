import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "../store/slices/themeSlice.slide";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const ThemeDisplay = () => {
  const { mode, currentTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const iconColor = currentTheme === "dark" ? "#fff" : "#000";

  const handleThemeChange = (newMode) => {
    dispatch(setThemeMode(newMode));
    setShowMenu(false); // Cierra el menú después de la selección
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {!showMenu ? (
        // Ícono de ajustes para abrir el menú
        <button
          style={{ color: iconColor }}
          onClick={() => setShowMenu(true)}
          className="btn__main_change"
        >
          <SettingsIcon fontSize="large" />
        </button>
      ) : (
        // Menú de selección de tema
        <div className="menu_theme ">
          <button
            style={{ color: iconColor }}
            onClick={() => handleThemeChange("light")}
            className="button__theme__change"
            title="Light Mode"
          >
            <WbSunnyIcon fontSize="large" color="white" />
          </button>
          <button
            style={{ color: iconColor }}
            onClick={() => handleThemeChange("dark")}
            className="button__theme__change"
            title="Dark Mode"
          >
            <DarkModeIcon fontSize="large" color="white" />
          </button>
          <button
            style={{ color: iconColor }}
            onClick={() => handleThemeChange("auto")}
            className="button__theme__change"
            title="Auto Mode"
          >
            <AutoAwesomeIcon fontSize="large" color="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeDisplay;
