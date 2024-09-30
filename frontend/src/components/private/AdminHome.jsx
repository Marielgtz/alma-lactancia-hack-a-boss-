import useAdminHome from '../../hooks/useAdminHome'
import './AdminHome.css'
import Experiences from './Experiences'
import Hero from './Hero'
import Nosotras from './Nosotras'

const AdminHome = () => {
    const {
        handleSectionChange,
        handleCancelTitle,
        handleCancelText,
        handleTitleChange,
        handleTextChange,
        handleImageClick,
        handleFileChange,
        visibleSection,
        charactersRemaining,
        setCharactersRemaining,
        homeData,
        setHomeData,
        fileInputRef,
        file,
        MAX_CHARACTERS,
        validateAndUpdateField,
    } = useAdminHome()

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

            <div className='contenedor-secciones-dinamicas-dashboard'>
                <Hero
                    handleCancelTitle={handleCancelTitle}
                    handleTitleChange={handleTitleChange}
                    handleImageClick={handleImageClick}
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                    file={file}
                    visibleSection={visibleSection}
                    homeData={homeData}
                    validateAndUpdateField={validateAndUpdateField}
                />
                <Nosotras
                    homeData={homeData}
                    handleTextChange={handleTextChange}
                    handleCancelText={handleCancelText}
                    MAX_CHARACTERS={MAX_CHARACTERS}
                    validateAndUpdateField={validateAndUpdateField}
                    visibleSection={visibleSection}
                    charactersRemaining={charactersRemaining}
                />

                <Experiences
                    setHomeData={setHomeData}
                    homeData={homeData}
                    setCharactersRemaining={setCharactersRemaining}
                    visibleSection={visibleSection}
                    charactersRemaining={charactersRemaining}
                    MAX_CHARACTERS={MAX_CHARACTERS}
                />
            </div>
        </main>
    )
}

export default AdminHome
