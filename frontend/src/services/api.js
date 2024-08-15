const API_BASE_URL = process.env.REACT_APP_BACKEND || 'http://localhost:4000';

const handleResponse = async (response) => {
  const json = await response.json();

  if(!response.ok) {
    throw new Error(json.message || 'Something went wrong');
  }

  return json.data;
};

// Activities
export const createActivityService = async (activityData) => {
  const response = await fetch(`${API_BASE_URL}/create-activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

export const joinPartnerActivityService = async (activityData) => {
  const response = await fetch(`${API_BASE_URL}/join-partner-activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

export const joinFreeActivityService = async (activityData) => {
  const response = await fetch(`${API_BASE_URL}/join-non-partner-activity`, {
    method: 'POST',
    body: JSON.stringify(activityData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Login
export const loginService = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/admin-login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Calendario
export const listCalendarEventsService = async () => {
  const response = await fetch(`${API_BASE_URL}/list-calendar-events`, {
    method: 'POST',
  });

  return handleResponse(response);
};

export const getCalendarEventService = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/get-calendar-event/${eventId}`);

  return handleResponse(response);
};

export const deleteCalendarEventService = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/delete-calendar-event/${eventId}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
};

export const updateCalendarEventService = async (eventId, eventData) => {
  const response = await fetch(`${API_BASE_URL}/update-calendar-event/${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Colaboradores
export const newCollaboratorService = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/new-collaborator`, {
    method: 'POST',
    body: formData, // formData para enviar archivos
  });

  return handleResponse(response);
};

export const deleteCollaboratorService = async (id, team) => {
  const response = await fetch(`${API_BASE_URL}/delete-collaborator/${id}/${team}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
};

export const updateCollaboratorService = async (id, team, formData) => {
  const response = await fetch(`${API_BASE_URL}/update-collaborator/${id}/${team}`, {
    method: 'PATCH',
    body: formData, // formData para enviar archivos
  });

  return handleResponse(response);
};

// Contacto
export const saveMessageService = async (messageData) => {
  const response = await fetch(`${API_BASE_URL}/new-contact-message`, {
    method: 'POST',
    body: JSON.stringify(messageData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Socios
export const newPartnerService = async (partnerData) => {
  const response = await fetch(`${API_BASE_URL}/newPartner`, {
    method: 'POST',
    body: JSON.stringify(partnerData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

export const deletePartnerService = async (partnerData) => {
  const response = await fetch(`${API_BASE_URL}/delete-partner`, {
    method: 'DELETE',
    body: JSON.stringify(partnerData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

export const updatePartnerService = async (partnerData) => {
  const response = await fetch(`${API_BASE_URL}/update-partner`, {
    method: 'PATCH',
    body: JSON.stringify(partnerData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};