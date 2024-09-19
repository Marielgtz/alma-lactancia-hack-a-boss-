import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import useContactInfo from "../hooks/useContactInfo.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import logo from "../images/logo-alma.png";

const Header = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const contactInfo = useContactInfo();

  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const instagramLink = contactInfo?.linkInstagram || null;
  const facebookLink = contactInfo?.linkFacebok || null;

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo de Alma" className="logo" />
        </Link>
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </div>
        <div className={`social-media ${menuOpen ? "active" : ""}`}>
          {instagramLink && (
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-item"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {facebookLink && (
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-item"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          )}
        </div>
        {/* Inicio de la lista de elementos del menú */}
        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li className="menu-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="menu-item">
            <Link to="/quienes-somos">¿Quiénes somos?</Link>
          </li>
          <li className="menu-item">
            <a onClick={() => toggleSubMenu(1)}>Actividades</a>
            <ul className={`submenu ${activeIndex === 1 ? "active" : ""}`}>
              <li>
                <Link to="/actividades">Próximas actividades</Link>
              </li>
              <li>
                <Link to="/historico">Histórico</Link>
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
