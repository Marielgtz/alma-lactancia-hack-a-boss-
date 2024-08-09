const API_BASE_URL = process.env.REACT_APP_BACKEND;

export const getCalendarEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/list-calendar-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calendarId: 'primary',
        maxResults: 10,
        orderBy: 'startTime',
        singleEvents: true,
        timeMin: new Date().toISOString(),
      }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};
