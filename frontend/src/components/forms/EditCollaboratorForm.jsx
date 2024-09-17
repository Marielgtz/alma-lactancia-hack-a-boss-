import React, { useEffect, useState } from 'react';

const EditCollaboratorForm = ({ collaboratorData }) => {
  // Initialize state with the collaboratorData
  const [collaborator, setCollaborator] = useState(collaboratorData);

  // Update the collaborator state if collaboratorData prop changes
  useEffect(() => {
    setCollaborator(collaboratorData);
  }, [collaboratorData]);

  useEffect(() => {
    console.log(collaborator);  // To check the updated collaborator state
  }, [collaborator]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaborator((prevState) => ({
      ...prevState,
      [name]: value,  // Dynamically update the value of the corresponding field
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated collaborator:', collaborator);

    // TODO: Add logic to submit the updated collaborator data to an API
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
