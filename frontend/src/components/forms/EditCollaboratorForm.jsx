import React, { useEffect, useState } from 'react';
import { deleteCollaboratorService, newCollaboratorService, updateCollaboratorService } from '../../services/api';

const EditCollaboratorForm = ({ collaboratorData, onSuccess }) => {
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

  // Gestionar eliminación de colaboradores
  const handleDelete = async (e) => {
    e.preventDefault();

    const isTeam = collaborator.hierarchy === 'Miembro del equipo' ? 'false' : 'true';
    const responseMsg = await deleteCollaboratorService(collaborator.id, isTeam);
    // console.log(responseMsg);

    if (responseMsg.error) {
      console.error('NO SE HA ELIMINADO:', responseMsg.error);
      // TODO - Lógica error
    }
    else { //TODO - Crear requisito de "éxito"
      console.log('ÉXITO');
      onSuccess();
    }
  }

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Updated collaborator:', collaborator);

    if (collaborator.id) {  // Servicio de editar colaborador (si existe un id previo)
      const isTeam = collaborator.hierarchy === 'Miembro del equipo' ? 'false' : 'true';
      const responseMsg = await updateCollaboratorService(collaborator.id, isTeam, collaborator);

      // Actualizar lista (con respuesta del back)
      if (responseMsg.error) {
        console.error('NO SE HA ACTUALIZADO:', responseMsg.error)
        //TODO Lógica error
      }
      else { //TODO - Crear requisito de "éxito"
        console.log('ÉXITO');
        onSuccess();
      }
    } else {  // Servicio de crear colaborador (si no existe id previo)
      const responseMsg = await newCollaboratorService(collaborator); 
      console.log(responseMsg);

      // Actualizar lista (con respuesta del back)
      onSuccess(); //! Solo debería activarse si fue bien
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

      <button type="submit" className='confirm-btn'>Guardar Cambios</button>
      <button onClick={handleDelete} className='cancel-btn'>Eliminar colaborador</button>
    </form>
  );
};

export default EditCollaboratorForm;
