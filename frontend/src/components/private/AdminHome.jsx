import React, { useState, useEffect, useRef } from 'react'
import EditableExperience from './Modals/EditableExperience'
import './AdminHome.css'
import useExperiences from '../../hooks/useExperiences'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const MAX_CHARACTERS = 1800

const AdminHome = () => {
    const [visibleSection, setVisibleSection] = useState(null)
    const [homeData, setHomeData] = useState({
        sectionText: '',
        imageHome: '',
        titleHome: '',
        experiences: [],
        selectedExperiences: [],
    })
    const [file, setFile] = useState(null)
    const [charactersRemaining, setCharactersRemaining] =
        useState(MAX_CHARACTERS)
    const [originalTitle, setOriginalTitle] = useState('') // Estado para almacenar el valor original de titleHome
    const [originalText, setOriginalText] = useState('') // Estado para almacenar el valor original de sectionText
    const fileInputRef = useRef(null) // Referencia para el input de archivo

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
        setCheckedExperiences,
        setSelectedExperience,
        setModalOpen,
        handleExperienceChange,
        imageName,
    } = useExperiences(setHomeData, setCharactersRemaining)

    // Cargar datos desde el backend
    useEffect(() => {
        fetch(`${API_BASE_URL}/get-home-data`)
            .then((response) => response.json())
            .then((data) => {
                const { home } = data.form
                setHomeData(home)
                setOriginalTitle(home.titleHome)
                setOriginalText(home.sectionText)
                setCharactersRemaining(MAX_CHARACTERS - home.sectionText.length)
            })
            .catch((error) =>
                console.error('Error al obtener los datos:', error)
            )
    }, [])

    // Manejar el cambio de imagen
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            validateAndUpdateField('imageHome', selectedFile)
        }
    }

    // Simular clic en el input de archivo
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    // Manejar el cambio de texto en textarea
    const handleTextChange = (e) => {
        const newText = e.target.value
        if (newText.length <= MAX_CHARACTERS) {
            setHomeData((prevData) => ({
                ...prevData,
                sectionText: newText,
            }))
            setCharactersRemaining(MAX_CHARACTERS - newText.length)
        }
    }

    // Manejar el cambio del título del Hero
    const handleTitleChange = (e) => {
        setHomeData((prevData) => ({
            ...prevData,
            titleHome: e.target.value,
        }))
    }

    // Cancelar cambios en el textarea
    const handleCancelText = () => {
        setHomeData((prevData) => ({
            ...prevData,
            sectionText: originalText,
        }))
        setCharactersRemaining(MAX_CHARACTERS - originalText.length)
    }

    // Cancelar cambios en el título
    const handleCancelTitle = () => {
        setHomeData((prevData) => ({
            ...prevData,
            titleHome: originalTitle,
        }))
    }

    // Validar y actualizar imagen o texto en el backend
    const validateAndUpdateField = async (fieldName, value) => {
        if (fieldName !== 'imageHome' && !value) {
            // setMessage(`El campo ${fieldName} no puede estar vacío`)
            //Toast
            return
        }

        try {
            if (fieldName === 'imageHome' && file) {
                const formData = new FormData()
                formData.append('imageHome', value)

                await fetch(`${API_BASE_URL}/update-home-data`, {
                    method: 'PATCH',
                    body: formData,
                })
            } else if (
                fieldName === 'sectionText' ||
                fieldName === 'titleHome'
            ) {
                // Actualizar el texto de la sección "Nosotras" o el título del Hero
                const updateData = {
                    home: {
                        [fieldName]: value,
                    },
                }

                await fetch(`${API_BASE_URL}/update-home-data`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                })
            }
            //Toast
        } catch (error) {
            //Toast
        }
    }

    const handleSectionChange = (section) => {
        setVisibleSection(section)
    }
    const handleCheckboxChange = (experienceId) => {
        // Si la experiencia ya está seleccionada, la quitamos
        if (checkedExperiences.includes(experienceId)) {
            setCheckedExperiences(
                checkedExperiences.filter((id) => id !== experienceId)
            )
        } else {
            // Si no está seleccionada y hay menos de 4, la añadimos
            if (checkedExperiences.length < 4) {
                setCheckedExperiences([...checkedExperiences, experienceId])
            } else {
                alert('Solo puedes seleccionar hasta 4 experiencias.')
            }
        }
    }
    return (
        <main className='settings-content'>
            <div className='contenedor-secciones-dinamicas-dashboard'>
                <h1>Escoge qué sección quieres editar:</h1>
                <div className='panel-nav-btn'>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'image' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('image')}
                    >
                        Hero
                    </button>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'text' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('text')}
                    >
                        Nosotras
                    </button>
                    <button
                        className={`adminHome-btn ${
                            visibleSection === 'experiences' ? 'active' : ''
                        }`}
                        onClick={() => handleSectionChange('experiences')}
                    >
                        Experiencias Reales
                    </button>
                </div>
            </div>

            {/* Contenido para cambiar la imagen y el título del Hero */}
            <div className='contenedor-secciones-dinamicas-dashboard'>
                <div
                    className={`section ${
                        visibleSection === 'image' ? 'visible' : ''
                    }`}
                >
                    <h2>Estás editando sección hero</h2>

                    <h2 className='title-edit-home'>Imagen principal</h2>
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : `${API_BASE_URL}/images/${homeData?.imageHome}`
                        }
                        alt='Hero'
                        className='hero-image'
                    />
                    <div className='image-buttons'>
                        <button onClick={handleImageClick}>
                            Cambiar imagen
                        </button>
                        <input
                            type='file'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='title-input'>
                        <h2 className='title-edit-home'>
                            Estás editando el texto del CTA
                        </h2>
                        <input
                            className='editTitle-input'
                            type='text'
                            value={homeData.titleHome || ''}
                            onChange={handleTitleChange}
                            placeholder='Escribe el título del Home'
                        />
                        <button
                            className='boton-guardar-dashboard'
                            onClick={() =>
                                validateAndUpdateField(
                                    'titleHome',
                                    homeData.titleHome
                                )
                            }
                        >
                            <i className='fas fa-save'></i> Guardar
                        </button>
                        <button
                            className='boton-cancelar-dashboard'
                            onClick={handleCancelTitle}
                        >
                            <i className='fas fa-times'></i> Cancelar
                        </button>
                    </div>
                </div>

                {/* Contenido para editar la sección "Nosotras" */}
                <div
                    className={`section ${
                        visibleSection === 'text' ? 'visible' : ''
                    }`}
                >
                    <h2>Estás editando sección nosotras</h2>

                    <label htmlFor='sectionText'>
                        Edita el texto de la sección nosotras:
                    </label>
                    <textarea
                        id='sectionText'
                        value={homeData.sectionText}
                        onChange={handleTextChange}
                        placeholder='Escribe el texto para la sección Nosotras'
                        maxLength={MAX_CHARACTERS}
                    />
                    <p>
                        {charactersRemaining} caracteres restantes (Máximo 1800
                        caracteres)
                    </p>

                    <button
                        className='boton-guardar-dashboard'
                        onClick={() =>
                            validateAndUpdateField(
                                'sectionText',
                                homeData.sectionText
                            )
                        }
                    >
                        <i className='fas fa-save'></i> Guardar
                    </button>

                    <button
                        className='boton-cancelar-dashboard'
                        onClick={handleCancelText}
                    >
                        <i className='fas fa-times'></i> Cancelar
                    </button>
                </div>

                {/* Contenido para agregar experiencias reales */}
                <div
                    className={`section ${
                        visibleSection === 'experiences' ? 'visible' : ''
                    }`}
                >
                    <h2>Editar experiencias reales</h2>

                    <label htmlFor='experienceText'>
                        Añade una descripción:
                    </label>
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
                        <label htmlFor='experienceImage'>
                            Añade una imagen:
                        </label>
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

                    <button
                        className='admin-btn-exp'
                        onClick={handleAddExperience}
                    >
                        <i className='fas fa-plus'></i> Añadir experiencia
                    </button>
                    <div className='fondo-lista-experiencias'>
                        <h3>Listado de experiencias actualmente publicadas:</h3>
                        <ol className='list-exp'>
                            {homeData.experiences &&
                            homeData.experiences.length > 0 ? (
                                homeData.experiences.map((experience) =>
                                    experience ? (
                                        <li key={experience.id}>
                                            <img
                                                className='texto-experiencias-dashboard'
                                                src={`${API_BASE_URL}/images/${experience.image}`}
                                                alt={
                                                    experience.text ||
                                                    'Experience Image'
                                                }
                                                onClick={() => {
                                                    setSelectedExperience(
                                                        experience
                                                    )
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
                                                    handleCheckboxChange(
                                                        experience.id
                                                    )
                                                }
                                                disabled={
                                                    !checkedExperiences.includes(
                                                        experience.id
                                                    ) &&
                                                    checkedExperiences.length >=
                                                        4
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
            </div>
        </main>
    )
}

export default AdminHome
