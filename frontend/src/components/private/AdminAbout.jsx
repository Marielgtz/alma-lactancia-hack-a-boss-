import React, { useEffect, useState } from 'react';
import { getAllCollaboratorsService } from '../../services/api';
import EditCollaboratorForm from '../forms/EditCollaboratorForm';

const AdminAbout = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toEdit, setToEdit] = useState({});  // Initialize toEdit as an empty object

  async function fetchCollaborators() {
    const fetchedCollaborators = await getAllCollaboratorsService(false);
    const fetchedTeamMembers = await getAllCollaboratorsService(true);
    setCollaborators(fetchedCollaborators);    
    setTeamMembers(fetchedTeamMembers);
  }

  useEffect(() => {
    fetchCollaborators();
  }, []);

  // useEffect(() => {
  //   console.log(collaborators, teamMembers);
  // }, [collaborators, teamMembers]);

  // useEffect(() => {
  //   console.log(isEditMode);
  // }, [isEditMode]);

  useEffect(() => {
    console.log(toEdit);
  }, [toEdit]);

  function toggleEditMode(collaboratorData, isMember) {
    setIsEditMode((prevValue) => !prevValue);
    collaboratorData.hierarchy = isMember
    ? 'Equipo'
    : 'Colaboración';
    setToEdit(collaboratorData); 
    
  }

  return (
    <main className='settings-content'>
      <div className={isEditMode ? 'hidden' : ''}>
        <h1>Gestión de miembros</h1>

        <p>Elige qué persona quieres editar</p>
        <ol>
          {teamMembers.map((member) => (
            <li key={member.id}>
              <button
                onClick={() => toggleEditMode(member, true)}  
              >
                {`${member.name} ${member.surname}`}
              </button>
            </li>
          ))}
        </ol>

        <p>Elige qué colaboradora quieres editar</p>
        <ol>
          {collaborators.map((collaborator) => (
            <li key={collaborator.id}>
              <button
                onClick={() => toggleEditMode(collaborator, false)}  
              >
                {`${collaborator.name} ${collaborator.surname}`}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className={!isEditMode ? 'hidden' : ''}>
        <button onClick={() => toggleEditMode({})}>Volver atrás</button>
        <p>Estás editando a {`${toEdit.name || ''} ${toEdit.surname || ''}`}</p>
        <p>Rol: {toEdit.hierarchy}</p>
        <EditCollaboratorForm collaboratorData={toEdit} />
      </div>
    </main>
  );
};

export default AdminAbout;
