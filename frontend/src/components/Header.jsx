import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo-alma.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

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
        <div className={`social-media ${menuOpen ? "active" : ""}`}>
          <a
            href="https://www.instagram.com/alma_lactancia/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-media-item"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/AlmaLactanciaMaterna/?locale=es_ES"
            target="_blank"
            rel="noopener noreferrer"
            className="social-media-item"
          >
            <FontAwesomeIcon icon={faFacebookF} size="2x" />
          </a>
        </div>
        {/* Inicio de la lista de elementos del menú */}
        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li className="menu-item">
            <a href="/">Inicio</a>
          </li>
          <li className="menu-item">
            <a href="/">¿Quiénes somos?</a>
          </li>
          <li className="menu-item">
            <a href="/">Biblioteca</a>
          </li>
          <li className="menu-item">
            <a href="/" onClick={() => toggleSubMenu(1)}>
              Actividades
            </a>
            <ul className={`submenu ${activeIndex === 1 ? "active" : ""}`}>
              <li>
                <a href="/">Próximas Inscripciones</a>
              </li>
              <li>
                <a href="/">Histórico</a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/contacto" onClick={toggleMenu}>
              Contacto
            </Link>
          </li>
        </ul>
        {/* Fin de la lista de elementos del menú */}
      </nav>
    </header>
  );
};

export default Header;
