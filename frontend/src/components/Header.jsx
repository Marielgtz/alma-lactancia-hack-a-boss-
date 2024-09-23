import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import useContactInfo from "../hooks/useContactInfo.js";
import logoAlma from "../images/logo-alma.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const { generalSettings } = useContactInfo();

  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const instagramLink = generalSettings?.linkInstagram || "";
  const facebookLink = generalSettings?.linkFacebok || "";
  const logoSrc = generalSettings?.logo
    ? `${API_BASE_URL}/images/${generalSettings.logo}`
    : logoAlma;

  return (
    <header>
      <nav className="navbar">
        <img src={logoSrc} alt="Logo Alma" className="logo" />
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </div>
        <div className={`social-media ${menuOpen ? "active" : ""}`}>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-media-item"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href={facebookLink}
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
            <Link to="/quienes-somos">¿Quiénes somos?</Link>
          </li>
          <li className="menu-item">
            <a onClick={() => toggleSubMenu(1)}>Actividades</a>
            <ul className={`submenu ${activeIndex === 1 ? "active" : ""}`}>
              <li>
                <a href="/actividades">Próximas Inscripciones</a>
              </li>
              <li>
                <a href="/historico">Histórico</a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/biblioteca" onClick={toggleMenu}>
              Biblioteca
            </Link>
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
