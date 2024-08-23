import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Library.css";

const Library = () => {
  const [openInfo, setOpenInfo] = useState(null);

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  return (
    <div className="library-page">
      <Header />
      <main className="library-main">
        <h1 className="library-title">Biblioteca</h1>
        <p className="library-text">
          Bienvenidos a nuestra biblioteca de recursos, un espacio dedicado a
          ofrecer información confiable y actualizada sobre la lactancia materna
          y temas relacionados.
          <br />
          Aquí encontrarás una cuidada selección de recursos diseñados para
          acompañarte en cada etapa dedicado la maternidad, desde el embarazo
          hasta la crianza y la
          <br />
          alimentación complementaria.
        </p>
        <div className="collapsible-main">
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("lactancia")}
            >
              <span className="collapsible-title">Lactancia</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "lactancia" ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {openInfo === "lactancia" && (
              <div className="collapsible-content">
              <ul>
                  <li>
                    <a href="https://www.almalactancia.org" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.e-lactancia.org" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fedalma.org" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tenemostetas.org" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lactapp.es" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="https://www.eva-gonzalez.com" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("embarazo")}
            >
              <span className="collapsible-title">Embarazo</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "embarazo" ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {openInfo === "embarazo" && (
              <div className="collapsible-content">
              <ul>
                  <li>
                    <a href="https://www.almalactancia.org" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.e-lactancia.org" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fedalma.org" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tenemostetas.org" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lactapp.es" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="https://www.eva-gonzalez.com" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("crianza")}
            >
              <span className="collapsible-title">Crianza</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "crianza" ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {openInfo === "crianza" && (
              <div className="collapsible-content">
              <ul>
                  <li>
                    <a href="https://www.almalactancia.org" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.e-lactancia.org" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fedalma.org" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tenemostetas.org" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lactapp.es" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="https://www.eva-gonzalez.com" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("alimentacion")}
            >
              <span className="collapsible-title">
                Alimentación complementaria
              </span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "alimentacion" ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {openInfo === "alimentacion" && (
              <div className="collapsible-content">
              <ul>
                  <li>
                    <a href="https://www.almalactancia.org" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.e-lactancia.org" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fedalma.org" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tenemostetas.org" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lactapp.es" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="https://www.eva-gonzalez.com" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="collapsible-container">
            <div
              className="collapsible-header"
              onClick={() => toggleInfo("hemeroteca")}
            >
              <span className="collapsible-title">Hemeroteca</span>
              <span
                className={`collapsible-arrow ${
                  openInfo === "hemeroteca" ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {openInfo === "hemeroteca" && (
              <div className="collapsible-content">
              <ul>
                  <li>
                    <a href="https://www.almalactancia.org" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.e-lactancia.org" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fedalma.org" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tenemostetas.org" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lactapp.es" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="https://www.eva-gonzalez.com" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Library;
