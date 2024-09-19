import React, { useEffect, useState } from 'react';
import { newCollaboratorService, updateCollaboratorService } from '../../services/api';

const EditCollaboratorForm = ({ collaboratorData }) => {
  const [collaborator, setCollaborator] = useState(collaboratorData);

  // Los datos previos que se mostrarán en el form (en caso de editar)
  useEffect(() => {
    setCollaborator(collaboratorData);
  }, [collaboratorData]);

  // useEffect(() => {
  //   console.log(collaborator); 
  // }, [collaborator]);

  // Gestiona cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaborator((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updated collaborator:', collaborator);

    // TODO: Función de modificar en back
    console.log(collaborator.id ? 'Modificar usuario' : 'Usuario no existente');

    if (collaborator.id) {
      const isTeam = collaborator.hierarchy === 'Miembro del equipo' ? 'true' : 'false';
      const responseMsg = await updateCollaboratorService(collaborator.id, isTeam, collaborator);
      console.log(responseMsg);
      
    } else {      
      const responseMsg = await newCollaboratorService({"name": 'Lara'});
      console.log(responseMsg);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Imagen:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={collaborator.image || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={collaborator.name || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="surname">Apellidos:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={collaborator.surname || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="role">Rol:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={collaborator.role || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={collaborator.description || ''}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditCollaboratorForm;
