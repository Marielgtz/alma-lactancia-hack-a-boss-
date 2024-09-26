import React, { useState, useEffect, useRef } from "react";
import "./AdminHome.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const MAX_CHARACTERS = 1800;

const AdminHome = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [homeData, setHomeData] = useState({
    sectionText: "",
    imageHome: "",
    titleHome: "",
    experiences: [],
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // Mensaje de éxito o error
  const [charactersRemaining, setCharactersRemaining] =
    useState(MAX_CHARACTERS);
  const [originalTitle, setOriginalTitle] = useState(""); // Estado para almacenar el valor original de titleHome
  const [originalText, setOriginalText] = useState(""); // Estado para almacenar el valor original de sectionText
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const experienceFileInputRef = useRef(null); // Referencia para el input de imagen de experiencia
  const [selectedExperiences, setSelectedExperiences] = useState([]); // Estado para almacenar las experiencias seleccionadas
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
        setOriginalTitle(home.titleHome);
        setOriginalText(home.sectionText);
        setCharactersRemaining(MAX_CHARACTERS - home.sectionText.length);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
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
      setHomeData((prevData) => ({
        ...prevData,
        sectionText: newText,
      }));
      setCharactersRemaining(MAX_CHARACTERS - newText.length);
    }
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
      sectionText: originalText,
    }));
    setCharactersRemaining(MAX_CHARACTERS - originalText.length);
  };

  // Cancelar cambios en el título
  const handleCancelTitle = () => {
    setHomeData((prevData) => ({
      ...prevData,
      titleHome: originalTitle,
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
        setCharactersRemaining(MAX_CHARACTERS - newExperience.text.length);
      })
      .catch((error) =>
        console.error("Error al obtener las experiencias", error)
      );
  }, []);

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

  // Simular click en el input de imagen de experiencia
  const handleExperienceImageClick = () => {
    console.log(experienceFileInputRef.current);
    if (experienceFileInputRef.current) {
      experienceFileInputRef.current.click();
    }
  };

  // Manejar el cambio de texto para la descripción de la experiencia
  const handleExperienceTextChange = (e) => {
    const { value } = e.target;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      text: value,
    }));
    setCharactersRemaining(MAX_CHARACTERS - value.length);
  };

  // Guardar la nueva experiencia
  const handleAddExperience = async () => {
    console.log("Datos de nueva experiencia:", newExperience);

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

  // Manejar la selección de experiencias
  const handleExperienceSelection = (experienceId) => {
    setSelectedExperiences((prevSelected) => {
      if (prevSelected.includes(experienceId)) {
        return prevSelected.filter((id) => id !== experienceId);
      }
      if (prevSelected.length < 4) {
        return [...prevSelected, experienceId];
      }
      return prevSelected;
    });
  };

  // Guardar selección de experiencias
  const handleSaveSelection = async () => {
    if (selectedExperiences.length === 0) {
      setMessage("No has seleccionado ninguna experiencia.");
      setMessageType("error");
      return;
    }

    try {
      //Enviar experiencias seleccionadas al backend
      const response = await fetch(`${API_BASE_URL}/update-experience/${experienceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedExperiences,
        }),
      });

      if (response.ok) {
        setMessage("Selección guardada correctamente.");
        setMessageType("success");
      } else {
        throw new Error("Error al guardar la selección.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }

    //Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMessage("");
    }, 3000);
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
        <h2 className="titleEditHome">Imagen principal</h2>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : `${API_BASE_URL}/images/${homeData?.imageHome}`
          }
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
          <input
            className="editTitle-input"
            type="text"
            value={homeData.titleHome || ""}
            onChange={handleTitleChange}
            placeholder="Escribe el título del Home"
          />
          <button
            className="editAdminHome-btn"
            onClick={() =>
              validateAndUpdateField("titleHome", homeData.titleHome)
            }
          >
            Guardar
          </button>
          <button className="cancelAdminHome-btn" onClick={handleCancelTitle}>
            X Cancelar
          </button>
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
          placeholder="Escribe el texto para la sección Nosotras"
          maxLength={MAX_CHARACTERS}
        />
        <p>
          {charactersRemaining} caracteres restantes (Máximo 1800 caracteres)
        </p>
        <button
          className="editAdminHome-btn"
          onClick={() =>
            validateAndUpdateField("sectionText", homeData.sectionText)
          }
        >
          Guardar
        </button>
        <button className="cancelAdminHome-btn" onClick={handleCancelText}>
          X Cancelar
        </button>
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
          maxLength={MAX_CHARACTERS}
        />
        <p className="charactersRemaining">
          {charactersRemaining} caracteres restantes (Máximo 1800 caracteres)
        </p>

        <div>
          <label htmlFor="experienceImage">Imagen de la experiencia:</label>
          <button
            className="experience-buttons"
            onClick={handleExperienceImageClick}
          >
            Cambiar imagen
          </button>
          <input
            ref={experienceFileInputRef}
            id="experienceImage"
            type="file"
            accept="image/*"
            onChange={handleExperienceFileChange}
            style={{ display: "none" }}
          />
        </div>

        <button className="admin-btn-exp" onClick={handleAddExperience}>
          Añadir experiencia
        </button>

        <h3>Experiencias:</h3>
        <ul className="list-exp">
          {homeData.experiences && homeData.experiences.length > 0 ? (
            homeData.experiences.map((experience) => (
              <li key={experience.id}>
                <img
                  src={`${API_BASE_URL}/images/${experience.image}`}
                  alt={experience.image}
                />
                <p>{experience.text}</p>
                <input
                  type="checkbox"
                  checked={selectedExperiences.includes(experience.id)}
                  onChange={() => handleExperienceSelection(experience.id)}
                  disabled={
                    !selectedExperiences.includes(experience.id) &&
                    selectedExperiences.length >= 4
                  }
                />
              </li>
            ))
          ) : (
            <li>No hay experiencias disponibles</li>
          )}
        </ul>
        <button className="save-selection-btn" onClick={handleSaveSelection}>
          Guardar selección
        </button>
      </div>
    </main>
  );
};

export default AdminHome;
