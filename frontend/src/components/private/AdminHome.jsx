import React, { useState, useEffect, useRef } from "react";
import "./AdminHome.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const MAX_CHARACTERS = 1800;

const AdminHome = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [homeData, setHomeData] = useState({
    sectionText: "",
    imageHome: "",
    titleHome: ""
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [charactersRemaining, setCharactersRemaining] = useState(MAX_CHARACTERS);
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalText, setOriginalText] = useState("");
  const fileInputRef = useRef(null);

  // Cargar datos desde el backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/get-home-data`)
      .then(response => response.json())
      .then(data => {
        const { home } = data.form;
        setHomeData(home);
        setOriginalTitle(home.titleHome);
        setOriginalText(home.sectionText);
        setCharactersRemaining(MAX_CHARACTERS - home.sectionText.length);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  }, []);

  // Manejar el cambio de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      validateAndUpdateField("imageHome", selectedFile);
    }
  };

  // Simular clic en el input de archivo
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Manejar el cambio de texto en textarea
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setHomeData(prevData => ({
        ...prevData,
        sectionText: newText
      }));
      setCharactersRemaining(MAX_CHARACTERS - newText.length);
    }
  };

  // Manejar el cambio del título del Hero
  const handleTitleChange = (e) => {
    setHomeData(prevData => ({
      ...prevData,
      titleHome: e.target.value
    }));
  };

  // Cancelar cambios en el textarea
  const handleCancelText = () => {
    setHomeData(prevData => ({
      ...prevData,
      sectionText: originalText
    }));
    setCharactersRemaining(MAX_CHARACTERS - originalText.length);
  };

  // Cancelar cambios en el título
  const handleCancelTitle = () => {
    setHomeData(prevData => ({
      ...prevData,
      titleHome: originalTitle
    }));
  };

  // Validar y actualizar imagen o texto en el backend
  const validateAndUpdateField = async (fieldName, value) => {
    if (fieldName !== "imageHome" && !value) {
      setMessageType("error");
      setMessage(`El campo ${fieldName} no puede estar vacío`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      if (fieldName === "imageHome" && file) {
        const formData = new FormData();
        formData.append("imageHome", value); 

        await fetch(`${API_BASE_URL}/update-home-data`, {
          method: "PATCH",
          body: formData,
        });

      } else if (fieldName === "sectionText" || fieldName === "titleHome") {
        // Actualizar el texto de la sección "Nosotras" o el título del Hero
        const updateData = {
          home: {
            [fieldName]: value
          }
        };

        await fetch(`${API_BASE_URL}/update-home-data`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
      }

      // Mostrar mensaje de éxito
      setMessageType("success");
      setMessage(`${fieldName} actualizado correctamente`);
    } catch (error) {
      // Mostrar mensaje de error
      setMessageType("error");
      setMessage(`Error al actualizar ${fieldName}: ${error.message}`);
    }

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSectionChange = (section) => {
    setVisibleSection(section);
  };

  return (
    <main className="settings-content">
      <h1>Escoje qué sección quieres editar:</h1>
      <div className="panel-nav-btn">
        <button
          className="adminHome-btn"
          onClick={() => handleSectionChange("image")}
        >
          Hero
        </button>
        <button
          className="adminHome-btn"
          onClick={() => handleSectionChange("text")}
        >
          Nosotras
        </button>
        <button
          className="adminHome-btn"
          onClick={() => handleSectionChange("experiences")}
        >
          Experiencias Reales
        </button>
      </div>

      {message && (
        <div className={`popup-message ${messageType}`}>
          {message}
        </div>
      )}

      {/* Contenido para cambiar la imagen y el título del Hero */}
      <div className={`section ${visibleSection === "image" ? "visible" : ""}`}>
        <h2 className="titleEditHome">Imagen principal</h2>
        <img
          src={file ? URL.createObjectURL(file) : `${API_BASE_URL}/images/${homeData?.imageHome}`}
          alt="Hero"
          className="hero-image"
        />
        <div className="image-buttons">
          <button onClick={handleImageClick}>Cambiar imagen</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="title-input">
        <h2 className="titleEditHome">Estás editando el texto del CTA</h2>
          <input className="editTitle-input"
            type="text"
            value={homeData.titleHome || ""}
            onChange={handleTitleChange}
            placeholder="Escribe el título del Home"
          />
          <button className="editAdminHome-btn" onClick={() => validateAndUpdateField("titleHome", homeData.titleHome)}>
          Guardar
          </button>
          <button className="cancelAdminHome-btn" onClick={handleCancelTitle}>X Cancelar</button> 
        </div>
      </div>

      {/* Contenido para cambiar textos - Sección Nosotras */}
      <div className={`section ${visibleSection === "text" ? "visible" : ""}`}>
        <h2 className="titleEditHome">Estás editando el texto de la sección NOSOTRAS</h2>
        <textarea className="editNosotras-textarea"
          name="sectionText"
          value={homeData.sectionText || ""}
          onChange={handleTextChange}
          placeholder="Escribe el texto para la sección Nosotras"
          maxLength={MAX_CHARACTERS}
        />
        <p>{charactersRemaining} caracteres restantes (Máximo 1800 caracteres)</p> 
        <button className="editAdminHome-btn" onClick={() => validateAndUpdateField("sectionText", homeData.sectionText)}>
          Guardar
        </button>
        <button className="cancelAdminHome-btn" onClick={handleCancelText}>X Cancelar</button>
      </div>

      {/* Contenido para cambiar experiencias */}
      <div
        className={`section ${visibleSection === "experiences" ? "visible" : ""}`}
      >
        <h2>Cambiar Experiencias del Home</h2>
        {/* Contenido específico para cambiar experiencias */}
      </div>
    </main>
  );
};

export default AdminHome;
