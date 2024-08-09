import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo-alma.png";

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <img src={logo} alt="Logo Alma" className="logo" />
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li className="menu-item">
            <a href="#">Inicio</a>
          </li>
          <li className="menu-item">
            <a href="#">¿Quiénes somos?
            </a>
          </li>
          <li className="menu-item">
            <a href="#">Biblioteca</a>
          </li>
          <li className="menu-item">
            <a href="#" onClick={() => toggleSubMenu(1)}>
              Actividades
            </a>
            <ul className={`submenu ${activeIndex === 1 ? "active" : ""}`}>
              <li>
                <a href="#">Próximas Inscripciones</a>
              </li>
              <li>
                <a href="#">Histórico</a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/contacto" onClick={toggleMenu}>Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
