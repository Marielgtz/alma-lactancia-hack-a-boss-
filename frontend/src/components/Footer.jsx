import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import logo from "../images/logo-alma.png";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
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
              href="https://www.instagram.com/alma_lactancia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://www.facebook.com/AlmaLactanciaMaterna/?locale=es_ES"
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
          <a href="/acceso-admin">Acceso administración</a>
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
