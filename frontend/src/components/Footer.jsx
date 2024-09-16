import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import useContactInfo from "../hooks/useContactInfo.js";
import logo from "../images/logo-alma.png";
import "./Footer.css";

const Footer = () => {
  const backURL = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const googleURL = import.meta.env.VITE_GOOGLE_URL;
  const contactInfo = useContactInfo();

  const handleLogin = () => {
    window.location.href = `${googleURL}?client_id=${clientId}&redirect_uri=${backURL}/auth/callback&response_type=code&scope=email%20profile`;
  };

  const instagramLink = contactInfo?.linkInstagram || '#';
  const facebookLink = contactInfo?.linkFacebok || '#';

  return (
    <footer className="App-footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo Alma Lactancia" />
      </div>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Mapa web</h3>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/quienes-somos">¿Quiénes somos?</Link>
            </li>
            <li>
              <Link to="/biblioteca">Biblioteca</Link>
            </li>
            <li>
              <Link to="/actividades">Actividades</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Actividades</h3>
          <ul>
            <li>
              <a href="/">Actividad 1</a>
            </li>
            <li>
              <a href="/">Actividad 2</a>
            </li>
            <li>
              <a href="/">Actividad 3</a>
            </li>
            <li>
              <a href="/">Actividad 4</a>
            </li>
            <li>
              <a href="/">Actividad 5</a>
            </li>
            {/* Añade más actividades según sea necesario */}
          </ul>
        </div>
        <div className="footer-column">
          <h3>Síguenos :)</h3>
          <div className="social-media">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="admin">
        <div className="admin-links">
          <a href="#" onClick={handleLogin} className="button-login">Acceso administración</a>
          <a href="/politica-de-privacidad">Política de privacidad</a>
          <a href="/politica-de-cookies">Política de cookies</a>
          <a href="/aviso-legal">Aviso legal</a>
        </div>
      </div>
      <p>Alma Lactancia © 2024. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
