import React, { useState } from "react";
import useAdminLibrary from "../../hooks/useAdminLibrary.js";
import "./AdminLibrary.css";

const AccordionSection = ({
  title,
  children,
  isOpen,
  toggleOpen,
  onSubmit,
}) => (
  <div className="admin-library-accordion-section">
    <h2 className="admin-library-accordion-title" onClick={toggleOpen}>
      {title} <i class="fas fa-arrow-down"></i>
    </h2>
    {isOpen && (
      <div className="admin-library-accordion-content">
        {children}
        <button
          className="admin-library-button"
          type="button"
          onClick={onSubmit}
        >
          <i className="fas fa-save"></i> Guardar Cambios
        </button>
      </div>
    )}
  </div>
);

const AdminLibrary = () => {
  const {
    libraryData,
    handleChange,
    handleSubmit,
    setLibraryData,
    MAX_CHARACTERS,
  } = useAdminLibrary();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleDeleteResource = (type, index) => {
    setLibraryData((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="admin-library-form">
      <h1>Libreria</h1>

      {/* // Sección de Lactancia */}
      <AccordionSection
        title="Lactancia"
        isOpen={openSection === "lactancia"}
        toggleOpen={() => toggleSection("lactancia")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.lactaResources.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs">
            <div className="contenedor-titulo-library">
              <p>Título:</p>

              <input
                type="text"
                className="admin-library-input"
                placeholder="Título"
                value={resource.titulo}
                onChange={(e) =>
                  handleChange(
                    "lactaResources",
                    libraryData.lactaResources.map((r, i) =>
                      i === index ? { ...r, titulo: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className="contenedor-enlace-library">
              <p>Enlace:</p>

              <input
                type="text"
                className="admin-library-input"
                placeholder="Enlace"
                value={resource.enlace}
                onChange={(e) =>
                  handleChange(
                    "lactaResources",
                    libraryData.lactaResources.map((r, i) =>
                      i === index ? { ...r, enlace: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div>
              <button
                className="admin-library-button admin-library-button-delete"
                type="button"
                onClick={() => handleDeleteResource("lactaResources", index)}
              >
                <i className="fas fa-trash-alt"></i> Eliminar
              </button>
            </div>
          </div>
        ))}
        <button
          className="admin-library-button"
          type="button"
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              lactaResources: [
                ...prevState.lactaResources,
                { titulo: "", enlace: "" },
              ],
            }))
          }
        >
          <i className="fas fa-plus"></i> Agregar Recurso
        </button>
        <div className="contenedor-seccion-libros">
          <label>Libros:</label>
          <textarea
            className="admin-library-textarea"
            value={libraryData.lactaBooks}
            onChange={(e) => handleChange("lactaBooks", e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Embarazo */}
      <AccordionSection
        title="Embarazo"
        isOpen={openSection === "embarazo"}
        toggleOpen={() => toggleSection("embarazo")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.embaResources.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs">
            <div className="contenedor-titulo-library">
              <p>Título:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Título"
                value={resource.titulo}
                onChange={(e) =>
                  handleChange(
                    "embaResources",
                    libraryData.embaResources.map((r, i) =>
                      i === index ? { ...r, titulo: e.target.value } : r
                    )
                  )
                }
              />{" "}
            </div>
            <div className="contenedor-enlace-library">
              <p>Enlace:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Enlace"
                value={resource.enlace}
                onChange={(e) =>
                  handleChange(
                    "embaResources",
                    libraryData.embaResources.map((r, i) =>
                      i === index ? { ...r, enlace: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("embaResources", index)}
            >
              <i className="fas fa-trash-alt"></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className="admin-library-button"
          type="button"
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              embaResources: [
                ...prevState.embaResources,
                { titulo: "", enlace: "" },
              ],
            }))
          }
        >
          <i className="fas fa-plus"></i> Agregar Recurso
        </button>
        <div className="contenedor-seccion-libros">
          <label>Libros:</label>
          <textarea
            className="admin-library-textarea"
            value={libraryData.embaBooks}
            onChange={(e) => handleChange("embaBooks", e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Crianza */}
      <AccordionSection
        title="Crianza"
        isOpen={openSection === "crianza"}
        toggleOpen={() => toggleSection("crianza")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.crianzaResources.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs">
            <div className="contenedor-titulo-library">
              <p>Título:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Título"
                value={resource.titulo}
                onChange={(e) =>
                  handleChange(
                    "crianzaResources",
                    libraryData.crianzaResources.map((r, i) =>
                      i === index ? { ...r, titulo: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className="contenedor-enlace-library">
              <p>Enlace:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Enlace"
                value={resource.enlace}
                onChange={(e) =>
                  handleChange(
                    "crianzaResources",
                    libraryData.crianzaResources.map((r, i) =>
                      i === index ? { ...r, enlace: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("crianzaResources", index)}
            >
              <i className="fas fa-trash-alt"></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className="admin-library-button"
          type="button"
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              crianzaResources: [
                ...prevState.crianzaResources,
                { titulo: "", enlace: "" },
              ],
            }))
          }
        >
          <i className="fas fa-plus"></i> Agregar Recurso
        </button>
        <div className="contenedor-seccion-libros">
          <label>Libros:</label>
          <textarea
            className="admin-library-textarea"
            value={libraryData.crianzaBooks}
            onChange={(e) => handleChange("crianzaBooks", e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Alimentación Complementaria */}
      <AccordionSection
        title="Alimentación Complementaria"
        isOpen={openSection === "alimentacion"}
        toggleOpen={() => toggleSection("alimentacion")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.alimentBlogs.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs">
            <div className="contenedor-titulo-library">
              <p>Título:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Título"
                value={resource.titulo}
                onChange={(e) =>
                  handleChange(
                    "alimentBlogs",
                    libraryData.alimentBlogs.map((r, i) =>
                      i === index ? { ...r, titulo: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className="contenedor-enlace-library">
              <p>Enlace:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Enlace"
                value={resource.enlace}
                onChange={(e) =>
                  handleChange(
                    "alimentBlogs",
                    libraryData.alimentBlogs.map((r, i) =>
                      i === index ? { ...r, enlace: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("alimentBlogs", index)}
            >
              <i className="fas fa-trash-alt"></i> Eliminar
            </button>
          </div>
        ))}
        <button
          className="admin-library-button"
          type="button"
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              alimentBlogs: [
                ...prevState.alimentBlogs,
                { titulo: "", enlace: "" },
              ],
            }))
          }
        >
          <i className="fas fa-plus"></i> Agregar Recurso
        </button>
        <div className="contenedor-seccion-libros">
          <label>Libros:</label>
          <textarea
            className="admin-library-textarea"
            value={libraryData.alimentBooks}
            onChange={(e) => handleChange("alimentBooks", e.target.value)}
            maxLength={MAX_CHARACTERS}
          />
        </div>
      </AccordionSection>

      {/* Sección de Hemeroteca */}
      <AccordionSection
        title="Hemeroteca"
        isOpen={openSection === "hemeroteca"}
        toggleOpen={() => toggleSection("hemeroteca")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.hemerBlogs.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs">
            <div className="contenedor-titulo-library">
              <p>Título:</p>
              <input
                className="admin-library-input"
                type="text"
                placeholder="Título"
                value={resource.titulo}
                onChange={(e) =>
                  handleChange(
                    "hemerBlogs",
                    libraryData.hemerBlogs.map((r, i) =>
                      i === index ? { ...r, titulo: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <div className="contenedor-enlace-library">
              <p>Enlace:</p>
              <input
                type="text"
                className="admin-library-input"
                placeholder="Enlace"
                value={resource.enlace}
                onChange={(e) =>
                  handleChange(
                    "hemerBlogs",
                    libraryData.hemerBlogs.map((r, i) =>
                      i === index ? { ...r, enlace: e.target.value } : r
                    )
                  )
                }
              />
            </div>
            <button
              type="button"
              className="admin-library-button admin-library-button-delete"
              onClick={() => handleDeleteResource("hemerBlogs", index)}
            >
              <i className="fas fa-trash-alt"></i> Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-library-button"
          onClick={() =>
            setLibraryData((prevState) => ({
              ...prevState,
              hemerBlogs: [...prevState.hemerBlogs, { titulo: "", enlace: "" }],
            }))
          }
        >
          <i className="fas fa-plus"></i> Agregar Recurso
        </button>
      </AccordionSection>
    </form>
  );
};

export default AdminLibrary;
