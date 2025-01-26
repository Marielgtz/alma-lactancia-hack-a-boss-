import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import useContactInfo from "../hooks/useContactInfo.js";
import logoAlma from "../images/logo-alma.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MySubscriptionModal from "../components/forms/MySubscriptionModal"; // Asegúrate de importar el modal
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = ({ scrolled }) => {
  const { t } = useTranslation(); // t es la función que usamos para traducir

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { generalSettings } = useContactInfo();

  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para abrir el modal
  const handleUserProfileClick = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const instagramLink = generalSettings?.linkInstagram || "";
  const facebookLink = generalSettings?.linkFacebook || "";
  const logoSrc = generalSettings?.logo ? `${generalSettings.logo}` : logoAlma;

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={logoSrc} alt="Logo de Alma" className="logo" />
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
              aria-label="Ir a Instagram"
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
              aria-label="Ir a Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          )}
          {/* Icono de usuario que abre el modal */}
          <div
            className="social-media-item user-icon"
            onClick={handleUserProfileClick}
            aria-label="Tu suscripción"
            title="Tu suscripción"
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
          {/* LanguageSwitcher */}
          <LanguageSwitcher />
        </div>

        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          <li className="menu-item">
            <NavLink to="/" activeClassName="active">
              {t("homeTitle")} {/* Traducción para el título de la página */}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/quienes-somos" activeClassName="active">
              {t("aboutUs")}
            </NavLink>
          </li>
          <li className="menu-item">
            <a onClick={() => toggleSubMenu(1)}>{t("activities")}</a>
            <ul className={`submenu ${activeIndex === 1 ? "active" : ""}`}>
              <li>
                <NavLink to="/actividades" activeClassName="active">
                  {t("nextActivities")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/historico" activeClassName="active">
                  {t("history")}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <NavLink
              to="/biblioteca"
              activeClassName="active"
              onClick={toggleMenu}
            >
              {t("library")}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/colabora"
              activeClassName="active"
              onClick={toggleMenu}
            >
              {t("colab")}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/contacto"
              activeClassName="active"
              onClick={toggleMenu}
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Modal: Mostrarlo solo cuando isModalOpen es true */}
      {isModalOpen && <MySubscriptionModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
