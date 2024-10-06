import useExperiences from "../../hooks/useExperiences";
import EditableExperience from "./Modals/EditableExperience";
import "./AdminHome.css";
import { useEffect } from "react";

// URL de la imagen proporcionada (icono pecho)
const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'    


const Experiences = ({
  homeData,
  setHomeData,
  setCharactersRemaining,
  visibleSection,
  charactersRemaining,
  MAX_CHARACTERS,
}) => {
  const {
    handleExperienceDelete,
    selectedExperience,
    experienceFileInputRef,
    newExperience,
    handleExperienceUpdate,
    handleSaveSelection,
    handleAddExperience,
    closeModal,
    modalOpen,
    checkedExperiences,
    setSelectedExperience,
    setModalOpen,
    handleExperienceChange,
    imageName,
    handleCheckboxChange,
  } = useExperiences(setHomeData, setCharactersRemaining, MAX_CHARACTERS);

  useEffect(() => {
    console.log(selectedExperience);
    
  },[selectedExperience])

  return (
    <div
      className={`section ${visibleSection === "experiences" ? "visible" : ""}`}
    >
      <h2>Editar experiencias reales</h2>

      <label htmlFor="experienceText">Añade una descripción:</label>
      <textarea
        id="experienceText"
        name="text"
        value={newExperience.text}
        onChange={handleExperienceChange}
        maxLength={MAX_CHARACTERS}
      />
      <p className="charactersRemaining">
        {charactersRemaining} caracteres restantes (Máximo 1800 caracteres)
      </p>

      <div>
        <label htmlFor="experienceImage">Añade una imagen:</label>
        <button
          className="experience-buttons"
          onClick={() => {
            experienceFileInputRef.current.click();
          }}
        >
          Seleccionar imagen
        </button>
        <input
          ref={experienceFileInputRef}
          id="experienceImage"
          type="file"
          accept="image/*"
          onChange={handleExperienceChange}
          style={{ display: "none" }}
          value={""}
        />
        {imageName && <p>Imagen seleccionada: {imageName}</p>}
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
                    src={experience.image !== 'Sin imagen'
                      ? experience.image
                      : DEFAULT_IMAGE_URL
                    }
                    alt={experience.text || "Experience Image"}
                    onClick={() => {                      
                      setSelectedExperience(experience);
                      setModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="texto-experiencias-dashboard">
                    {experience.text}
                  </p>
                  {/* Checkbox para seleccionar la experiencia */}
                  <input
                    type="checkbox"
                    checked={checkedExperiences.includes(experience.id)}
                    onChange={() => handleCheckboxChange(experience.id)}
                    disabled={
                      !checkedExperiences.includes(experience.id) &&
                      checkedExperiences.length >= 4
                    }
                  />
                </li>
              ) : null
            )
          ) : (
            <p className="no-hay-experiencias-mensaje">
              No hay experiencias disponibles.
            </p>
          )}
        </ol>
        <button onClick={handleSaveSelection}>
          Publicar experiencias seleccionadas
        </button>
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
  );
};
export default Experiences;
