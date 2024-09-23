import React, { useState, useEffect, useRef } from "react";
import "./AdminHome.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const MAX_CHARACTERS = 1800; // Límite máximo de caracteres

const AdminHome = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [homeData, setHomeData] = useState({
    sectionText: "",
    imageHome: "",
    titleHome: "",
    experiences: [],
  });
  const [file, setFile] = useState(null); // Para la nueva imagen del Hero
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // Mensaje de éxito o error
  const [charactersRemaining, setCharactersRemaining] =
    useState(MAX_CHARACTERS);
  const [originalTitle, setOriginalTitle] = useState(""); // Estado para almacenar el valor original de titleHome
  const [originalText, setOriginalText] = useState(""); // Estado para almacenar el valor original de sectionText
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const [newExperience, setNewExperience] = useState({
    text: "",
    image: null,
  });

  // Cargar datos desde el backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/get-home-data`)
      .then((response) => response.json())
      .then((data) => {
        const { home } = data.form;
        setHomeData(home);
        setOriginalTitle(home.titleHome); // Guardar el título original
        setOriginalText(home.sectionText); // Guardar el texto original
        setCharactersRemaining(MAX_CHARACTERS - home.sectionText.length); // Inicializar el contador con los caracteres restantes
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  // Cargar experiencias desde el backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/get-all-experiences`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Experiencias:", data);
        setHomeData((prevData) => ({
          ...prevData,
          experiences: data.experiences,
        }));
      })
      .catch((error) =>
        console.error("Error al obtener las experiencias", error)
      );
  }, []);

  // Manejar el cambio de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      validateAndUpdateField("imageHome", selectedFile); // Actualizar la imagen automáticamente después de seleccionarla
    }
  };

  // Manejar el cambio de imagen de la experiencia
  const handleExperienceFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Archivo de experiencia seleccionado:", selectedFile);
    if (selectedFile) {
      setNewExperience((prevExperience) => ({
        ...prevExperience,
        image: selectedFile,
      }));
    }
  };

  // Simular clic en el input de archivo
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abrir diálogo para seleccionar la imagen
    }
  };

  // Manejar el cambio de texto en textarea
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setHomeData((prevData) => ({
        ...prevData,
        sectionText: newText,
      }));
      setCharactersRemaining(MAX_CHARACTERS - newText.length); // Actualizar el contador de caracteres restantes
    }
  };

  // Manejar el cambio de texto para la descripción de la experiencia
  const handleExperienceTextChange = (e) => {
    const { value } = e.target;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      text: value,
    }));
  };

  // Manejar el cambio del título del Hero
  const handleTitleChange = (e) => {
    setHomeData((prevData) => ({
      ...prevData,
      titleHome: e.target.value,
    }));
  };

  // Cancelar cambios en el textarea
  const handleCancelText = () => {
    setHomeData((prevData) => ({
      ...prevData,
      sectionText: originalText, // Revertir al texto original
    }));
    setCharactersRemaining(MAX_CHARACTERS - originalText.length); // Actualizar el contador de caracteres restantes
  };

  // Cancelar cambios en el título
  const handleCancelTitle = () => {
    setHomeData((prevData) => ({
      ...prevData,
      titleHome: originalTitle, // Revertir al título original
    }));
  };

  // Validar y actualizar imagen o texto en el backend
  const validateAndUpdateField = async (fieldName, value) => {
    // Validar campos vacíos
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
        // Si es una imagen, usa FormData para enviar el archivo
        const formData = new FormData();
        formData.append("imageHome", value); // `value` es el archivo seleccionado

        await fetch(`${API_BASE_URL}/update-home-data`, {
          method: "PATCH",
          body: formData,
        });
      } else if (fieldName === "sectionText" || fieldName === "titleHome") {
        // Actualizar el texto de la sección "Nosotras" o el título del Hero
        const updateData = {
          home: {
            [fieldName]: value,
          },
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
      console.error("Error al actualizar:", error);
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

  // Guardar la nueva experiencia
  const handleAddExperience = async () => {
    console.log("Datos de nueva experiencia:", newExperience);
    if (homeData.experiences.length >= 4) {
      setMessage("No puedes agregar más de 4 experiencias.");
      setMessageType("error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", newExperience.text);
      formData.append("image", newExperience.image);

      const response = await fetch(`${API_BASE_URL}/save-experience`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newExperienceData = await response.json();
        setHomeData((prevData) => ({
          ...prevData,
          experiences: [...prevData.experiences, newExperienceData.experience],
        }));
        setMessage("Experiencia agregada correctamente");
        setMessageType("success");
      } else {
        throw new Error("Error al agregar la experiencia");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }
  };

  return (
    <main className="settings-content">
      <h1>Escoge qué sección quieres editar:</h1>
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
        <div className={`popup-message ${messageType}`}>{message}</div>
      )}

      {/* Contenido para cambiar la imagen y el título del Hero */}
      <div className={`section ${visibleSection === "image" ? "visible" : ""}`}>
        <h2>Edita la Imagen del Hero</h2>
        <div className="admin-hero-section">
          <div className="image-section">
            <label>Imagen actual del Hero:</label>
            <div
              className="image-preview"
              style={{
                backgroundImage: `url(${API_BASE_URL}/${homeData.imageHome})`,
              }}
              onClick={handleImageClick}
            ></div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
          </div>

          <div className="text-section">
            <label htmlFor="titleHome">Título del Hero:</label>
            <input
              id="titleHome"
              type="text"
              value={homeData.titleHome}
              onChange={handleTitleChange}
            />
            <button
              onClick={() =>
                validateAndUpdateField("titleHome", homeData.titleHome)
              }
            >
              Guardar cambios
            </button>
            <button onClick={handleCancelTitle}>Cancelar</button>
          </div>
        </div>
      </div>

      {/* Contenido para editar la sección "Nosotras" */}
      <div className={`section ${visibleSection === "text" ? "visible" : ""}`}>
        <h2>Edita la Sección "Nosotras"</h2>
        <label htmlFor="sectionText">Texto:</label>
        <textarea
          id="sectionText"
          value={homeData.sectionText}
          onChange={handleTextChange}
          maxLength={MAX_CHARACTERS}
        />
        <p className="characters-remaining">
          {charactersRemaining} caracteres restantes
        </p>
        <button
          onClick={() =>
            validateAndUpdateField("sectionText", homeData.sectionText)
          }
        >
          Guardar cambios
        </button>
        <button onClick={handleCancelText}>Cancelar</button>
      </div>

      {/* Contenido para agregar experiencias reales */}
      <div
        className={`section ${
          visibleSection === "experiences" ? "visible" : ""
        }`}
      >
        <h2>Editar experiencias reales</h2>

        <label htmlFor="experienceText">Descripción:</label>
        <textarea
          id="experienceText"
          name="text"
          value={newExperience.text}
          onChange={handleExperienceTextChange}
        />

        <label htmlFor="experienceImage">Imagen de la experiencia:</label>
        <input
          ref={fileInputRef}
          id="experienceImage"
          type="file"
          accept="image/*"
          onChange={handleExperienceFileChange}
          className="hidden-file-input"
        />

        <button className="admin-btn-exp" onClick={handleAddExperience}>
          Agregar experiencia
        </button>

        <h3>Experiencias Actuales:</h3>
        <ul className="list-exp">
          {homeData.experiences && homeData.experiences.length > 0 ? (
            homeData.experiences.map((experience, index) => (
              <li key={index}>
                <img
                  src={`${API_BASE_URL}/src/assets/images/${experience.image}`}
                  alt={experience.image}
                />
                <p>{experience.text}</p>
              </li>
            ))
          ) : (
            <li>No hay experiencias disponibles</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default AdminHome;
