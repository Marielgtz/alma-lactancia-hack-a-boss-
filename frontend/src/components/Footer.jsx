import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import useContactInfo from "../hooks/useContactInfo.js";
import logo from "../images/imagen-pecho.png";
import "./Footer.css";

const Footer = () => {
  const backURL = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const googleURL = import.meta.env.VITE_GOOGLE_URL;
  const { generalSettings } = useContactInfo();

  const handleLogin = () => {
    window.location.href = `${googleURL}?client_id=${clientId}&redirect_uri=${backURL}/auth/callback&response_type=code&scope=email%20profile`;
  };

  const instagramLink = generalSettings?.linkInstagram || "";
  const facebookLink = generalSettings?.linkFacebook || "";
  const email = generalSettings?.email || "";

  return (
    <div className="contenedor-principal-footer">
      <div className="fila-footer">
        <div className="columna izquierda-footer">
          <p className="pregunta-footer">¿Nos ponemos en contacto?</p>
          <p className="email-footer">
            <a href={`mailto:${email}`} className="email-footer">
              {email}
            </a>
          </p>
          <div className="social-media-footer">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href={facebookLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </div>
          <div className="footer-menu">
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
        </div>
        <div className="columna derecha-footer">
          <img src={logo} alt="Logo Alma Lactancia" className="logo-mascara" />
        </div>
      </div>
      <div className="fila-dos cien-por-cien">
        <div className="admin-links-footer">
          <a href="#" onClick={handleLogin} className="button-login">
            Acceso administración
          </a>
          <a href="/politica-de-privacidad">Política de privacidad</a>
          <a href="/politica-de-cookies">Política de cookies</a>
          <a href="/aviso-legal">Aviso legal</a>
        </div>
        <div className="copyright-footer">
          Alma Lactancia © 2024. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default Footer;
