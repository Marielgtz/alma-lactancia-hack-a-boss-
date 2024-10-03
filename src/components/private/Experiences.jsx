import useExperiences from '../../hooks/useExperiences'
import EditableExperience from './Modals/EditableExperience'
import './AdminHome.css'

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
    } = useExperiences(setHomeData, setCharactersRemaining, MAX_CHARACTERS)
    return (
        <div
            className={`section ${
                visibleSection === 'experiences' ? 'visible' : ''
            }`}
        >
            <h2>Editar experiencias reales</h2>

            <label htmlFor='experienceText'>Añade una descripción:</label>
            <textarea
                id='experienceText'
                name='text'
                value={newExperience.text}
                onChange={handleExperienceChange}
                maxLength={MAX_CHARACTERS}
            />
            <p className='charactersRemaining'>
                {charactersRemaining} caracteres restantes (Máximo 1800
                caracteres)
            </p>

            <div>
                <label htmlFor='experienceImage'>Añade una imagen:</label>
                <button
                    className='experience-buttons'
                    onClick={() => {
                        experienceFileInputRef.current.click()
                    }}
                >
                    Seleccionar imagen
                </button>
                <input
                    ref={experienceFileInputRef}
                    id='experienceImage'
                    type='file'
                    accept='image/*'
                    onChange={handleExperienceChange}
                    style={{ display: 'none' }}
                    value={''}
                />
                {imageName && <p>Imagen seleccionada: {imageName}</p>}
            </div>

            <button className='admin-btn-exp' onClick={handleAddExperience}>
                <i className='fas fa-plus'></i> Añadir experiencia
            </button>
            <div className='fondo-lista-experiencias'>
                <h3>Listado de experiencias actualmente publicadas:</h3>
                <ol className='list-exp'>
                    {homeData.experiences && homeData.experiences.length > 0 ? (
                        homeData.experiences.map((experience) =>
                            experience ? (
                                <li key={experience.id}>
                                    <img
                                        className='texto-experiencias-dashboard'
                                        src={`${
                                            import.meta.env.VITE_API_URL
                                        }/images/${experience.image}`}
                                        alt={
                                            experience.text ||
                                            'Experience Image'
                                        }
                                        onClick={() => {
                                            setSelectedExperience(experience)
                                            setModalOpen(true)
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <p className='texto-experiencias-dashboard'>
                                        {experience.text}
                                    </p>
                                    {/* Checkbox para seleccionar la experiencia */}
                                    <input
                                        type='checkbox'
                                        checked={checkedExperiences.includes(
                                            experience.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(experience.id)
                                        }
                                        disabled={
                                            !checkedExperiences.includes(
                                                experience.id
                                            ) && checkedExperiences.length >= 4
                                        }
                                    />
                                </li>
                            ) : null
                        )
                    ) : (
                        <p className='no-hay-experiencias-mensaje'>
                            No hay experiencias disponibles.
                        </p>
                    )}
                </ol>
                <button onClick={handleSaveSelection}>
                    Publicar experiencias seleccionadas
                </button>
            </div>
            {modalOpen && selectedExperience && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
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
    )
}
export default Experiences
