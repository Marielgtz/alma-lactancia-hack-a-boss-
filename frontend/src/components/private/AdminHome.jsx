import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import useContactInfo from '../../hooks/useContactInfo.js';
/* sectionText */

const AdminHome = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [editMode, setEditMode] = useState(false); // Estado para controlar si estamos editando
  const [textValue, setTextValue] = useState(''); // Estado para el textarea
  const contactInfo = useContactInfo(); // Traer los datos del hook
  const nosotras = contactInfo?.sectionText || '';
  console.log("nosotras:  ",nosotras );
  // Cuando los datos están disponibles, establecemos el valor del textarea
  useEffect(() => {
    if (contactInfo && contactInfo?.sectionText) {
      setTextValue(contactInfo?.sectionText); // Suponiendo que 'textAboutUs' contiene el texto de "Nosotras"
    }
  }, [contactInfo]);

  const handleSectionChange = (section) => {
    setVisibleSection(section);
  };

  // Función para manejar la edición
  const handleEdit = () => {
    setEditMode(true);
  };

  // Función para manejar el guardado de los cambios
  const handleSave = () => {
    setEditMode(false);
    // Aquí puedes hacer una llamada al backend para guardar los cambios
    console.log("Texto guardado:", textValue);
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setEditMode(false);
    setTextValue(contactInfo.textAboutUs); // Restablecer el valor original
  };

  return (
    <main className="settings-content">
      <h1>Escoje que sección quieres editar:</h1>
      <div className='panel-nav-btn'>
        <button className='adminHome-btn' onClick={() => handleSectionChange('image')}>Hero</button>
        <button className='adminHome-btn' onClick={() => handleSectionChange('text')}>Nosotras</button>
        <button className='adminHome-btn' onClick={() => handleSectionChange('experiences')}>Experiencias Reales</button>
      </div>

      {/* Contenido para cambiar la imagen */}
      <div className={`section ${visibleSection === 'image' ? 'visible' : ''}`}>
        <h2>Cambiar Imagen del Home</h2>
        {/* Contenido específico para cambiar la imagen */}
      </div>

      {/* Contenido para cambiar textos - Sección Nosotras */}
      <div className={`section ${visibleSection === 'text' ? 'visible' : ''}`}>
        <h2>Cambiar Campos de Textos del Home - Nosotras</h2>
        
        {/* Textarea para editar el texto */}
        {editMode ? (
          <>
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={contactInfo ? contactInfo?.sectionText : 'Cargando...'}
              rows="10"
              cols="50"
            />
            <div className="btn-container">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <p>{textValue || 'Cargando...'}</p>
            <button onClick={handleEdit}>Editar</button>
          </>
        )}
      </div>

      {/* Contenido para cambiar experiencias */}
      <div className={`section ${visibleSection === 'experiences' ? 'visible' : ''}`}>
        <h2>Cambiar Experiencias del Home</h2>
        {/* Contenido específico para cambiar experiencias */}
      </div>
    </main>
  );
};

export default AdminHome;
