import React, { useEffect, useState } from 'react';
import { getAllCollaboratorsService } from '../../services/api';
import EditCollaboratorForm from '../forms/EditCollaboratorForm';
import {toast} from 'react-toastify'

const AdminAbout = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toEdit, setToEdit] = useState({});  // Initialize toEdit as an empty object
  // const [formAction, setFormAction] = useState("")

  async function fetchCollaborators() {
    console.log("Cargando colaboradores...");
    
    const [fetchedCollaborators, fetchedTeamMembers] = await Promise.all([
      getAllCollaboratorsService(true),
      getAllCollaboratorsService(false)
    ]);
  
    setCollaborators(fetchedCollaborators);    
    setTeamMembers(fetchedTeamMembers);
    console.log("Colaboradores cargados");
  }
  
  function refreshCollaboratorsList() {
    toggleEditMode({});
    toast.promise(
      fetchCollaborators(),  
      {
        pending: 'Cargando datos...',
        error: 'Error de conexión'
      }
    );
  }
  
  useEffect(() => {
    toast.promise(
      fetchCollaborators(),  
      {
        pending: 'Cargando datos...',
        error: 'Error de conexión'
      }
    );
  }, []); // Al cargar la página, traer la lista de colaboradores
  

  // useEffect(() => {
  //   console.log(collaborators, teamMembers);
  // }, [collaborators, teamMembers]);

  // useEffect(() => {
  //   console.log(isEditMode);
  // }, [isEditMode]);

  // useEffect(() => {
  //   if (toEdit.id) {
  //     console.log('Colaborador previo cargado');
  //   } else {
  //     console.log('Sin datos previos');
  //   }

  // }, [toEdit]);

  function toggleEditMode(collaboratorData, isMember) {
    setIsEditMode((prevValue) => !prevValue);
    collaboratorData.hierarchy = isMember
    ? 'Miembro del equipo'
    : 'Colaboración externa';
    setToEdit(collaboratorData); 
    
  }

  return (
    <main className='settings-content collaborators-admin'>
      <div className={isEditMode ? 'hidden' : ''}>
        <h1>Gestión de miembros</h1>

        <div id='team'>
          <p>Elige qué miembro quieres editar</p>
          <ol>
            {teamMembers.map((member) => (
              <li key={member.id}>
                <button
                  className='list-btn'
                  onClick={() => toggleEditMode(member, false)}  
                >
                  {`${member.name} ${member.surname}`}
                </button>
              </li>
            ))}
            <li>
              <button
                className='confirm-btn'
                onClick={() => toggleEditMode({}, false)}
              >Añadir miembro del equipo</button>
            </li>
          </ol>
        </div>
        
        <div id='external'>
          <p>Elige qué colaborador quieres editar</p>
          <ol>
            {collaborators.map((collaborator) => (
              <li key={collaborator.id}>
                <button
                  className='list-btn'
                  onClick={() => toggleEditMode(collaborator, true)}  
                >
                  {`${collaborator.name} ${collaborator.surname}`}
                </button>
              </li>
            ))}
            <li>
              <button
                className='confirm-btn'
                onClick={() => toggleEditMode({}, true)}
              >Añadir colaboradores</button>
            </li>
          </ol>
        </div>
      </div>

      <div id='edit-collaborator-div' className={!isEditMode ? 'hidden' : ''}>
        <button 
          onClick={() => toggleEditMode({})}
          className='confirm-btn'
        >Volver atrás</button>
        <p>Editando: {`${toEdit.name || 'Nueva'} ${toEdit.surname || 'colaboradora'}`}</p>
        <p>Rango: {toEdit.hierarchy}</p>
        <p></p>
        <EditCollaboratorForm 
          collaboratorData={toEdit} 
          onSuccess={refreshCollaboratorsList}
        />
      </div>
    </main>
  );
};

export default AdminAbout;
