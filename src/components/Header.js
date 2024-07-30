import React, { useState } from 'react';
import './Header.css';
import logo from '../images/logo-alma.png';
import './Header.css';

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <header>
      <nav className="navbar">
        <img src={logo} alt="Logo Alma" className="logo" />
        <ul className="menu">
          <li className="menu-item">
            <a href="#" onClick={() => toggleSubMenu(0)}>Sobre Alma</a>
            <ul className={`submenu ${activeIndex === 0 ? 'active' : ''}`}>
              <li><a href="#">¿Quienes somos?</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">¿Quieres colaborar?</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="#" onClick={() => toggleSubMenu(2)}>Actividades</a>
            <ul className={`submenu ${activeIndex === 2 ? 'active' : ''}`}>
              <li><a href="#">Inscripciones</a></li>
              <li><a href="#">Reuniones de lactancia</a></li>
              <li><a href="#">Charlas para embarazadas</a></li>
              <li><a href="#">Calendario</a></li>
              <li className="menu-item">
                <a href="#" onClick={() => toggleSubMenu(3)}>Actividades por años</a>
                <ul className={`submenu ${activeIndex === 3 ? 'active' : ''}`}>
                  <li><a href="#">2020</a></li>
                  <li><a href="#">2021</a></li>
                  <li><a href="#">2022</a></li>
                  <li><a href="#">2023</a></li>
                  <li><a href="#">2024</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="#" onClick={() => toggleSubMenu(1)}>Biblioteca</a>
            <ul className={`submenu ${activeIndex === 1 ? 'active' : ''}`}>
              <li><a href="#">Lactancia</a></li>
              <li><a href="#">Embarazo</a></li>
              <li><a href="#">Crianza</a></li>
              <li><a href="#">Alimentación complementaria</a></li>
              <li><a href="#">Hemeroteca/Como éramos/Nuestros comienzos/Nuestro origen/La semilla</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
