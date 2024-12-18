import React, { useState, useRef, useEffect } from "react";
import "../css/components_css/NavBarHeader.css"; // Asegúrate de incluir los estilos
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBarHeader = () => {
  const { currentTheme } = useSelector((state) => state.theme);
  const changeGrlColor = currentTheme === "dark" ? "#fff" : "#000";
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar nav-${currentTheme}`} ref={menuRef}>
      <div className="hamburger" onClick={toggleMenu}>
        <div
          style={{ background: changeGrlColor }}
          className={`${isOpen ? "line open" : "line"}`}
        ></div>
        <div
          style={{ background: changeGrlColor }}
          className={`${isOpen ? "line open" : "line"}`}
        ></div>
        <div
          style={{ background: changeGrlColor }}
          className={`${isOpen ? "line open" : "line"}`}
        ></div>
      </div>
      <ul
        className={`${isOpen ? "menu open" : "menu"} ${
          currentTheme === "dark" ? "bg-dark" : "bg-light"
        }`}
      >
        <li>
          <Link to="/home" className="nav-link" onClick={closeMenu}>
            inicio
          </Link>
        </li>
        <li>
          <Link to="/herramientas" className="nav-link" onClick={closeMenu}>
            herramientas
          </Link>
        </li>
        <li>
          <Link to="/estrategias" className="nav-link" onClick={closeMenu}>
            estrategias
          </Link>
        </li>
        <li>
          <Link></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarHeader;
