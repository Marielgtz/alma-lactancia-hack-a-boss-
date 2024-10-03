import React, { useState } from "react";
import useAdminLibrary from "../../hooks/useAdminLibrary.js";
import "./AdminLibrary.css"

const AccordionSection = ({
  title,
  children,
  isOpen,
  toggleOpen,
  onSubmit,
}) => (
  <div className="admin-library-accordion-section">
    <h2 className="admin-library-accordion-title" onClick={toggleOpen}>
      {title}
    </h2>
    {isOpen && (
      <div className="admin-library-accordion-content">
        {children}
        <button
          className="admin-library-button"
          type="button"
          onClick={onSubmit}
        >
          Guardar Cambios
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
            <div>
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("lactaResources", index)}
            >
              Eliminar
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
          Agregar Recurso
        </button>
        <label>Libros:</label>
        <textarea
          className="admin-library-textarea"
          value={libraryData.lactaBooks}
          onChange={(e) => handleChange("lactaBooks", e.target.value)}
          maxLength={MAX_CHARACTERS}
        />
      </AccordionSection>

      {/* Sección de Embarazo */}
      <AccordionSection
        title="Embarazo"
        isOpen={openSection === "embarazo"}
        toggleOpen={() => toggleSection("embarazo")}
        onSubmit={(e) => handleSubmit(e)}
      >
        {libraryData.embaResources.map((resource, index) => (
          <div key={index} className="admin-library-resource-inputs" >
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
            />
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
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("embaResources", index)}
            >
              Eliminar
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
          Agregar Recurso
        </button>
        <label>Libros:</label>
        <textarea
          className="admin-library-textarea"
          value={libraryData.embaBooks}
          onChange={(e) => handleChange("embaBooks", e.target.value)}
          maxLength={MAX_CHARACTERS}
        />
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
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("crianzaResources", index)}
            >
              Eliminar
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
          Agregar Recurso
        </button>
        <label>Libros:</label>
        <textarea
          className="admin-library-textarea"
          value={libraryData.crianzaBooks}
          onChange={(e) => handleChange("crianzaBooks", e.target.value)}
          maxLength={MAX_CHARACTERS}
        />
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
            <button
              className="admin-library-button admin-library-button-delete"
              type="button"
              onClick={() => handleDeleteResource("alimentBlogs", index)}
            >
              Eliminar
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
          Agregar Recurso
        </button>
        <label>Libros:</label>
        <textarea
          className="admin-library-textarea"
          value={libraryData.alimentBooks}
          onChange={(e) => handleChange("alimentBooks", e.target.value)}
          maxLength={MAX_CHARACTERS}
        />
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
            <input
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
            <button
              type="button"
              className="admin-library-button admin-library-button-delete"
              onClick={() => handleDeleteResource("hemerBlogs", index)}
            >
              Eliminar
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
          Agregar Recurso
        </button>
      </AccordionSection>
    </form>
  );
};

export default AdminLibrary;
