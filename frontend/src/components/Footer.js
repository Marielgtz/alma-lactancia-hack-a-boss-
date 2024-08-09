import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="App-footer">
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
      <p>Tema: Illdy. © Copyright 2017. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
