import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useLibraryData from "../hooks/useLibraryData";
import "./Library.css";

const Library = () => {
  const [openInfo, setOpenInfo] = useState(null);
  const libraryData = useLibraryData();
  const renderTextWithFormatting = (text) => {
    return text.split("\n").map((item, index) => {
      if (item.trim().endsWith(":")) {
        return <h4 key={index}>{item.trim()}</h4>;
      } else {
        return <li key={index}>{item.trim()}</li>;
      }
    });
  };

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  return (
    <div className="library-page">
      <Header />
      <main className="library-main">
        <p className="alma-text">Alma Lactancia</p>

        <h1 className="library-title">Biblioteca</h1>
        <div className="contenedor-texto-biblioteca">
          <p className="library-text">
            Bienvenidos a nuestra biblioteca de recursos, un espacio dedicado a
            ofrecer información confiable y actualizada sobre la lactancia
            materna y temas relacionados.
            <br />
            Aquí encontrarás una cuidada selección de recursos diseñados para
            acompañarte en cada etapa dedicado la maternidad, desde el embarazo
            hasta la crianza y la alimentación complementaria.
          </p>
        </div>
        <div className="collapsible-main">
          <div className="collapsible-container-library">
            {/* Lactancia */}
            <div
              className={`collapsible-header-library ${
                openInfo === "lactancia" ? "open" : ""
              }`}
              onClick={() => toggleInfo("lactancia")}
            >
              <span className="collapsible-title-library">Lactancia</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === "lactancia" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "lactancia" && (
              <div className="collapsible-content-library">
                <h3>RECURSOS ONLINE</h3>
                <ul>
                  {libraryData.lactationResources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(libraryData.lactationBooks)}</ul>
              </div>
            )}
          </div>
          {/* Embarazo */}
          <div className="collapsible-container-library">
            <div
              className={`collapsible-header-library ${
                openInfo === "embarazo" ? "open" : ""
              }`}
              onClick={() => toggleInfo("embarazo")}
            >
              <span className="collapsible-title-library">Embarazo</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === "embarazo" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "embarazo" && (
              <div className="collapsible-content-library">
                <h3>RECURSOS</h3>
                <ul>
                  {libraryData.pregnancyResources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(libraryData.pregnancyBooks)}</ul>
              </div>
            )}
          </div>
          {/* Crianza */}
          <div className="collapsible-container-library">
            <div
              className={`collapsible-header-library ${
                openInfo === "crianza" ? "open" : ""
              }`}
              onClick={() => toggleInfo("crianza")}
            >
              <span className="collapsible-title-library">Crianza</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === "crianza" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "crianza" && (
              <div className="collapsible-content-library">
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(libraryData.parentingBooks)}</ul>
                <h3>OTROS RECURSOS</h3>
                <ul>
                
                {libraryData.parentingResources.map((resource, index) => (

                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Alimentación complementaria */}
          <div className="collapsible-container-library">
            <div
              className={`collapsible-header-library ${
                openInfo === "alimentacion" ? "open" : ""
              }`}
              onClick={() => toggleInfo("alimentacion")}
            >
              <span className="collapsible-title-library">
                Alimentación complementaria
              </span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === "alimentacion" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "alimentacion" && (
              <div className="collapsible-content-library">
                <h3>BLOGS</h3>
                <ul>

                {libraryData.nutritionBlogs.map((resource, index) => (

                    <li key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <h3>LIBROS</h3>
                <ul>{renderTextWithFormatting(libraryData.nutritionBooks)}</ul>
              </div>
            )}
          </div>
          {/* Hemeroteca */}
          <div className="collapsible-container-library">
            <div
              className={`collapsible-header-library ${
                openInfo === "hemeroteca" ? "open" : ""
              }`}
              onClick={() => toggleInfo("hemeroteca")}
            >
              <span className="collapsible-title-library">Hemeroteca</span>
              <span
                className={`collapsible-arrow-library ${
                  openInfo === "hemeroteca" ? "open" : ""
                }`}
              >
                ᐳ
              </span>
            </div>
            {openInfo === "hemeroteca" && (
              <div className="collapsible-content-library">
                {libraryData.archiveBlogs.map((resource, index) => (
                    <p key={index}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title}
                      </a>
                    </p>
                  ))}

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