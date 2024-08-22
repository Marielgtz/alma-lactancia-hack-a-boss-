const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const handleResponse = async (response) => {
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Something went wrong");
  }

  return json.data;
};

// Activities
export const createActivityService = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-activity`, {
      method: "POST",
      body: JSON.stringify(activityData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

export const joinPartnerActivityService = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-partner-activity`, {
      method: "POST",
      body: JSON.stringify(activityData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error joining partner activity:", error);
    throw error;
  }
};

export const joinFreeActivityService = async (activityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join-non-partner-activity`, {
      method: "POST",
      body: JSON.stringify(activityData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error joining free activity:", error);
    throw error;
  }
};

// Login
export const loginService = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin-login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Calendario
export const listCalendarEventsService = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list-calendar-events`, {
      method: "POST",
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error listing calendar events:", error);
    throw error;
  }
};

export const getCalendarEventService = async (eventId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get-calendar-event/${eventId}`
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error getting calendar event:", error);
    throw error;
  }
};

export const deleteCalendarEventService = async (eventId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delete-calendar-event/${eventId}`,
      {
        method: "DELETE",
      }
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    throw error;
  }
};

export const updateCalendarEventService = async (eventId, eventData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/update-calendar-event/${eventId}`,
      {
        method: "PATCH",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error updating calendar event:", error);
    throw error;
  }
};

// Colaboradores
export const newCollaboratorService = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/new-collaborator`, {
      method: "POST",
      body: formData,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating new collaborator:", error);
    throw error;
  }
};

export const deleteCollaboratorService = async (id, team) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delete-collaborator/${id}/${team}`,
      {
        method: "DELETE",
      }
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting collaborator:", error);
    throw error;
  }
};

export const updateCollaboratorService = async (id, team, formData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/update-collaborator/${id}/${team}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    return handleResponse(response);
  } catch (error) {
    console.error("Error updating collaborator:", error);
    throw error;
  }
};

// Contacto
export const saveMessageService = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/new-contact-message`, {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error saving contact message:", error);
    throw error;
  }
};

// Socios
export const newPartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newPartner`, {
      method: "POST",
      body: JSON.stringify(partnerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error creating new partner:", error);
    throw error;
  }
};

export const deletePartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-partner`, {
      method: "DELETE",
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error deleting partner:", error);
    throw error;
  }
};

export const updatePartnerService = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-partner`, {
      method: "PATCH",
      body: JSON.stringify(partnerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error updating partner:", error);
    throw error;
  }
};
