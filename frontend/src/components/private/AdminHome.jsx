import React, { useState, useEffect, useRef } from "react";
import EditableExperience from "./Modals/EditableExperience";
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
  const [selectedExperience, setSelectedExperience] = useState(null); // Estado para almacenar las experiencias seleccionadas
  const [newExperience, setNewExperience] = useState({
    text: "",
    image: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  //console.log("Probando homeData", homeData);

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
        //console.log("Experiencias:", data);
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
    //console.log("Archivo de experiencia seleccionado:", selectedFile);
    if (selectedFile) {
      setNewExperience((prevExperience) => ({
        ...prevExperience,
        image: selectedFile,
      }));
    }
  };

  // Simular click en el input de imagen de experiencia
  const handleExperienceImageClick = () => {
    //console.log(experienceFileInputRef.current);
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

  // Manejar la edición de la experiencia
  const handleExperienceUpdate = async (updatedExperience) => {
    try {
      const formData = new FormData();
      formData.append("text", updatedExperience.text);
      if (updatedExperience.image) {
        formData.append("image", updatedExperience.image);
      }

      const response = await fetch(
        `${API_BASE_URL}/update-experience/${updatedExperience.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Datos actualizados:", updatedData);
        setHomeData((prevData) => ({
          ...prevData,
          experiences: prevData.experiences.map((exp) =>
            exp.id === updatedData.data[0]
              ? {
                  id: updatedData.data[0],
                  text: updatedData.data[1],
                  image: updatedData.data[2],
                }
              : exp
          ),
        }));
        setMessage("Experiencia actualizada correctamente.");
        setMessageType("success");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }

    setSelectedExperience(null);
  };

  // Manejar la eliminación de la experiencia
  const handleExperienceDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-experience/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHomeData((prevData) => ({
          ...prevData,
          experiences: prevData.experiences.filter((exp) => exp.id !== id),
        }));
        setMessage("Experiencia eliminada correctamente.");
        setMessageType("success");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }

    setSelectedExperience(null);
  };

  // Guardar la nueva experiencia
  const handleAddExperience = async () => {
    if (newExperience.text.length < 50) {
      setMessage("El texto debe tener al menos 50 caracteres.");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", newExperience.text);
      if (newExperience.image) {
        formData.append("image", newExperience.image);
      }

      // Aquí es donde envías la nueva experiencia al backend
      const response = await fetch(
        `${API_BASE_URL}/save-filtered-experiences`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Si la respuesta es exitosa, agrega la nueva experiencia al estado
        const newExperienceData = await response.json();
        console.log(newExperienceData);
        setHomeData((prevData) => ({
          ...prevData,
          experiences: [
            ...prevData.experiences,
            {
              text: newExperienceData.data.text,
              image: newExperienceData.data.image,
            },
          ],
        }));
        setMessage("Experiencia agregada correctamente.");
        setMessageType("success");
        // Limpiar el formulario de nueva experiencia
        setNewExperience({ text: "", image: null });
      } else {
        throw new Error("Error al agregar la experiencia");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Manejar la selección de experiencias
  const handleExperienceSelection = (experience) => {
    if (experience) {
      setSelectedExperience(experience);
      setModalOpen(true);
    } else {
      console.error("Experiencia seleccionada es inválida:", experience);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExperience(null);
  };

  // Guardar selección de experiencias
  const handleSaveSelection = async (id) => {
    const formData = new FormData();
    formData.append("text", newExperience.text);
    if (newExperience.image) {
      formData.append("image", newExperience.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update-experience/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const updatedExperience = await response.json();
        // Actualizar la lista de experiencias en el estado
        setHomeData((prevData) => ({
          ...prevData,
          experiences: prevData.experiences.map((exp) =>
            exp.id === id ? updatedExperience.experience : exp
          ),
        }));
        setMessage("Experiencia actualizada correctamente.");
        setMessageType("success");
      } else {
        throw new Error("Error al actualizar la experiencia.");
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
      <div className="contenedor-secciones-dinamicas-dashboard">
        <h1>Escoge qué sección quieres editar:</h1>
        <div className="panel-nav-btn">
          <button
            className={`adminHome-btn ${
              visibleSection === "image" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("image")}
          >
            Hero
          </button>
          <button
            className={`adminHome-btn ${
              visibleSection === "text" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("text")}
          >
            Nosotras
          </button>
          <button
            className={`adminHome-btn ${
              visibleSection === "experiences" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("experiences")}
          >
            Experiencias Reales
          </button>
        </div>
      </div>
      {message && (
        <div className={`popup-message ${messageType}`}>{message}</div>
      )}

      {/* Contenido para cambiar la imagen y el título del Hero */}
      <div className="contenedor-secciones-dinamicas-dashboard">
        <div
          className={`section ${visibleSection === "image" ? "visible" : ""}`}
        >
          <h2>Estás editando sección hero</h2>

          <h2 className="title-edit-home">Imagen principal</h2>
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
            <h2 className="title-edit-home">Estás editando el texto del CTA</h2>
            <input
              className="editTitle-input"
              type="text"
              value={homeData.titleHome || ""}
              onChange={handleTitleChange}
              placeholder="Escribe el título del Home"
            />
            <button
              className="boton-guardar-dashboard"
              onClick={() =>
                validateAndUpdateField("titleHome", homeData.titleHome)
              }
            >
              <i className="fas fa-save"></i> Guardar
            </button>
            <button
              className="boton-cancelar-dashboard"
              onClick={handleCancelTitle}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          </div>
        </div>

        {/* Contenido para editar la sección "Nosotras" */}
        <div
          className={`section ${visibleSection === "text" ? "visible" : ""}`}
        >
          <h2>Estás editando sección nosotras</h2>

          <label htmlFor="sectionText">
            Edita el texto de la sección nosotras:
          </label>
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
            className="boton-guardar-dashboard"
            onClick={() =>
              validateAndUpdateField("sectionText", homeData.sectionText)
            }
          >
            <i className="fas fa-save"></i> Guardar
          </button>

          <button
            className="boton-cancelar-dashboard"
            onClick={handleCancelText}
          >
            <i className="fas fa-times"></i> Cancelar
          </button>
        </div>

        {/* Contenido para agregar experiencias reales */}
        <div
          className={`section ${
            visibleSection === "experiences" ? "visible" : ""
          }`}
        >
          <h2>Estás editando sección experiencias reales</h2>

          <label htmlFor="experienceText">Añade una descripción:</label>
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
            <label htmlFor="experienceImage">Añade una imagen:</label>
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
            <i className="fas fa-plus"></i> Añadir experiencia
          </button>
          <div className="fondo-lista-experiencias">
            <h3>Listado de experiencias actualmente publicadas:</h3>
            <ol className="list-exp">
              {homeData.experiences && homeData.experiences.length > 0 ? (
                homeData.experiences.map((experience) =>
                  experience ? (
                    <li key={experience.id}>
                      <img
                        className="texto-experiencias-dashboard"
                        src={`${API_BASE_URL}/images/${experience.image}`}
                        alt={experience.text || "Experience Image"}
                        onClick={() => handleExperienceSelection(experience)}
                        style={{ cursor: "pointer" }}
                      />
                      <p className="texto-experiencias-dashboard">
                        {experience.text}
                      </p>
                    </li>
                  ) : null
                )
              ) : (
                <p className="no-hay-experiencias-mensaje">
                  No hay experiencias disponibles.
                </p>
              )}
            </ol>
          </div>
          {modalOpen && selectedExperience && (
            <div className="modal-overlay">
              <div className="modal-content">
                {selectedExperience && (
                  <EditableExperience
                    experienceData={selectedExperience}
                    onUpdate={handleExperienceUpdate}
                    onDelete={handleExperienceDelete}
                    onClose={closeModal}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminHome;
