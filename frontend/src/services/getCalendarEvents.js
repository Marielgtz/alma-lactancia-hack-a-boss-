const API_BASE_URL = process.env.REACT_APP_BACKEND || 'http://localhost:4000';

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

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Response text: ${errorText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.log('Fetching calendar events from:', `${API_BASE_URL}/api/list-calendar-events`);
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};
