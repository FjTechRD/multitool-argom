import { useNavigate } from "react-router-dom";
import HeaderRegisterLogin from "../components/HeaderRegisterLogin";
import NavBarHeader from "../components/NavBarHeader";
import ThemeDisplay from "../components/ThemeDisplay";
import Modal from "../components/Modal"; // Importamos el modal
import LoginForm from "../components/LoginForm"; // Componente de login
import { useState } from "react";
import "../css/App.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para el modal de login

  return (
    <header className="header__web">
      <div className="header__left">
        <NavBarHeader />
        <div className="logo-site" onClick={() => navigate("/home")}>
          <img src="mysLogo.png" alt="logo" />
          <h1>MultiTool/Strategies</h1>
        </div>
      </div>

      <div className="header__right">
        <HeaderRegisterLogin onLoginClick={() => setIsLoginModalOpen(true)} />{" "}
        {/* Pasamos la función */}
        <ThemeDisplay />
      </div>

      {/* Modal para el formulario de login */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm onClose={() => setIsLoginModalOpen(false)} />{" "}
        {/* Cierra el modal al enviar */}
      </Modal>
    </header>
  );
};

export default Header;
