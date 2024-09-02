import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fedalma from "../images/cropped-logo_fedalma_200.png";
import fedegalma from "../images/logo-fedegalma1-300x102.jpg";
import "./About.css";

const About = () => {
  const [openInfo, setOpenInfo] = useState(null);

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        <div className="img-section">
          <div className="background-image2"></div>
          <h1 className="about-title">Equipo</h1>
        </div>
        <div className="about-people">
          <div className="person-card">
            <div className="person-card-inner">
              <div className="person-card-front">
                <img src="ruta-a-la-imagen" className="person-image" />
                <div className="person-info">
                  <h3>Eva González Souto</h3>
                  <p>Asesora de Lactancia, Gestora de Redes y Asesora Online</p>
                </div>
              </div>
              <div className="person-card-back">
                <p>
                  Asesora de Lactancia, Gestora de Redes y Asesora Online.
                  Participé en la fundación de ALMA con otras 11 mujeres en mayo
                  de 2009...
                </p>
              </div>
            </div>
          </div>
          <div className="person-card">
            <div className="person-card-inner">
              <div className="person-card-front">
                <img src="ruta-a-la-imagen" className="person-image" />
                <div className="person-info">
                  <h3>Eva González Souto</h3>
                  <p>Asesora de Lactancia, Gestora de Redes y Asesora Online</p>
                </div>
              </div>
              <div className="person-card-back">
                <p>
                  Asesora de Lactancia, Gestora de Redes y Asesora Online.
                  Participé en la fundación de ALMA con otras 11 mujeres en mayo
                  de 2009...
                </p>
              </div>
            </div>
          </div>
          <div className="person-card">
            <div className="person-card-inner">
              <div className="person-card-front">
                <img src="ruta-a-la-imagen" className="person-image" />
                <div className="person-info">
                  <h3>Eva González Souto</h3>
                  <p>Asesora de Lactancia, Gestora de Redes y Asesora Online</p>
                </div>
              </div>
              <div className="person-card-back">
                <p>
                  Asesora de Lactancia, Gestora de Redes y Asesora Online.
                  Participé en la fundación de ALMA con otras 11 mujeres en mayo
                  de 2009...
                </p>
              </div>
            </div>
          </div>
          <div className="person-card">
            <div className="person-card-inner">
              <div className="person-card-front">
                <img src="ruta-a-la-imagen" className="person-image" />
                <div className="person-info">
                  <h3>Eva González Souto</h3>
                  <p>Asesora de Lactancia, Gestora de Redes y Asesora Online</p>
                </div>
              </div>
              <div className="person-card-back">
                <p>
                  Asesora de Lactancia, Gestora de Redes y Asesora Online.
                  Participé en la fundación de ALMA con otras 11 mujeres en mayo
                  de 2009...
                </p>
              </div>
            </div>
          </div>
          <div className="person-card">
            <div className="person-card-inner">
              <div className="person-card-front">
                <img src="ruta-a-la-imagen" className="person-image" />
                <div className="person-info">
                  <h3>Eva González Souto</h3>
                  <p>Asesora de Lactancia, Gestora de Redes y Asesora Online</p>
                </div>
              </div>
              <div className="person-card-back">
                <p>
                  Asesora de Lactancia, Gestora de Redes y Asesora Online.
                  Participé en la fundación de ALMA con otras 11 mujeres en mayo
                  de 2009...
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="section-title1">Colaboraciones externas</h1>
        <div className="about-collab">
          <div className="collab-container">
            <div className="collab-card">
              <img src="ruta-a-la-imagen" className="collab-image" />
              <h3>Alba Sánchez Ansede</h3>
              <p>Madre Colaboradora</p>
            </div>
            <div className="collab-card">
              <img src="ruta-a-la-imagen" className="collab-image" />
              <h3>Alba Sánchez Ansede</h3>
              <p>Madre Colaboradora</p>
            </div>
            <div className="collab-card">
              <img src="ruta-a-la-imagen" className="collab-image" />
              <h3>Alba Sánchez Ansede</h3>
              <p>Madre Colaboradora</p>
            </div>
            <div className="collab-card">
              <img src="ruta-a-la-imagen" className="collab-image" />
              <h3>Alba Sánchez Ansede</h3>
              <p>Madre Colaboradora</p>
            </div>
          </div>
        </div>
        <div className="about-support">
          <h1 className="section-title2">Nuestro compromiso y apoyos</h1>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("quehacemos")}
            >
              <span className="collapsible-title-about">¿Qué hacemos?</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "quehacemos" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "quehacemos" && (
              <div className="collapsible-content">
                <ul>
                  <li>
                    Asesoría en lactancia en las reuniones, además de por correo
                    electrónico y Whatsapp.
                  </li>
                  <li>
                    Información puntual sobre nuestras actividades a través de
                    Facebook e Instagram.
                  </li>
                  <li>
                    Organizamos charlas y actividades para la normalización y
                    conocimiento de las recomendaciones oficiales sobre
                    lactancia materna, crianza en los primeros años, autocuidado
                    materno y temas afines.
                  </li>
                  <li>
                    Nos formamos e informamos constantemente: estar actualizadas
                    es uno de nuestros principales ejercicios de responsabilidad
                    para con las usuarias de la asociación.
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("quenohacemos")}
            >
              <span className="collapsible-title-about">¿Qué no hacemos?</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "quenohacemos" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "quenohacemos" && (
              <div className="collapsible-content">
                <ul>
                  <li>
                    No asesoramos sin datos fiables ni información actualizada.
                  </li>
                  <li>Tampoco alimentamos creencias infundadas ni mitos.</li>
                  <li>No cobramos por nuestra labor, somos voluntarias.</li>
                  <li>No visitamos a domicilio.</li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("quienapoya")}
            >
              <span className="collapsible-title-about">¿Quién nos apoya?</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "quienapoya" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "quienapoya" && (
              <div className="collapsible-content">
                <ul>
                  <li>
                    Son varios los organismos locales y provinciales los que nos
                    apoyan de distintas maneras.
                  </li>
                  <li>
                    El Concello de Culleredo nos cede el local donde se celebran
                    las reuniones de los viernes en dicho ayuntamiento y nos
                    subvenciona el mantenimiento general de la asociación.
                    Asimismo, nos cede espacios de uso público para realizar
                    eventos y actividades.
                  </li>
                  <li>
                    El Concello de A Coruña nos cede los espacios donde tienen
                    lugar las reuniones de los martes en A Coruña y las charlas
                    de embarazadas.
                  </li>
                  <li>
                    La Diputación de A Coruña nos subvenciona la cartelería.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <h1 className="section-title3">Entidades colaboradoras</h1>
        <div className="about-img">
          <img src={fedalma} className="fedalma-img" />
          <img src={fedegalma} className="fedegalma-img" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
