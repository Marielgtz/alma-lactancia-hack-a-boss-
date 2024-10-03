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
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Alma lactancia
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      e-lactancia: información sobre medicamentos y
                      procedimientos varios compatibles con la lactancia
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      FEDALMA: Federación Española de Asociaciones de Apoyo a la
                      Lactancia Materna
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Tenemos tetas
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Lactapp: blog y aplicación
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
                <h3>LIBROS</h3>
                <ul>
                  <li>Somos la leche. Alba Padró</li>
                  <li>Destete. El final de una etapa. Alba Padró</li>
                  <li>Un regalo para toda la vida. Carlos González</li>
                  <li>Lactivista. Ibone Olza</li>
                  <li>El libro de la lactancia. José María Paricio</li>
                </ul>
              </div>
            )}
          </div>
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
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      El parto es nuestro
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Plantilla de plan de parto del SERGAS
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Modelo de ejemplo de plan de parto de "El parto es
                      nuestro"
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Mamíferas: vídeo documental sobr el parto
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.eva-gonzalez.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Eva González: asesora lactancia
                    </a>
                  </li>
                </ul>
                <h3>LIBROS</h3>
                <ul>
                  <li>El bebé es un mamífero. Michel Odent</li>
                  <li>
                    La nueva revolución del nacimiento. Isabel Fernández del
                    Castillo
                  </li>
                </ul>
              </div>
            )}
          </div>
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
                <ul>
                  <h4>Crianza:</h4>
                  <li>El poder de las caricias. Adolfo Gómez Papí</li>
                  <li>Bésame mucho. Carlos González</li>
                  <li>
                    CRIAR: Un viaje desde el embarazo hasta la adolescencia.
                    Laura Perales Bermejo
                  </li>
                  <h4>Sueño del bebé:</h4>
                  <li>Dormir sin lágrimas. Rosa Jové</li>
                  <li>Dormir con cuentos. Rosa Jové</li>
                  <h4>Desarrollo personal</h4>
                  <li>El concepto del continuum. Jean Lledloff</li>
                </ul>
                <h3>OTROS RECURSOS</h3>
                <ul>
                  <li>
                    Evidentemente: educación sanitaria e información basada en
                    la evidencia científica, de la mano de Irene Iglesias Rubio,
                    odontopediatra. Instagram: @irene.iglesias.eboca
                  </li>
                </ul>
              </div>
            )}
          </div>
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
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      El blog de Lidia Folgar
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      AESAN: Agencia Española de Seguridad Alimentaria y
                      Nutrición
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Recetas de Juan Llorca
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Nutriciona: servicio de dietética y nutrición
                    </a>
                  </li>
                </ul>
                <h3>LIBROS</h3>
                <ul>
                  <li>El niño ya come solo. Gill Rapley</li>
                  <li>Se me hace bola. Julio Basulto</li>
                  <li>Aprender a comer solo. Lidia Folgar</li>
                  <li>Sin dientes y a bocados. Juan Llorca y Melisa Gómez</li>
                  <li>Mi niño no me come. Carlos González</li>
                </ul>
              </div>
            )}
          </div>
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
                <p>
                  <a
                    className="link-antiguo-blog-al"
                    href="https://almalactancia.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visita el antiguo blog de Alma Lactancia ➡️
                  </a>
                </p>
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
