//* Fetch para crear eventos
export async function createEvent() {
    const requestBodyExample = {
        summary: "Charla de Maternidad: Preparación para el Parto",
        description: "Una charla informativa organizada por nuestra ONG sobre la preparación para el parto y los cuidados postparto. Ideal para futuras madres y padres.", // Event description
        start: {
          dateTime: "2024-10-15T10:00:00+02:00", 
          timeZone: "Europe/Madrid" 
        },
        end: {
          dateTime: "2024-10-15T12:00:00+02:00", 
          timeZone: "Europe/Madrid" 
        },
        location: "Centro Cívico de Monte Alto, A Coruña, ES", 
        reminders: {
          useDefault: false, 
          overrides: [
            { method: "email", "minutes": 1440 }, 
            { method: "popup", "minutes": 30 } 
          ]
        },
        visibility: "public", 
        access: "partners" 
      }
      
    const response = await fetch(`http://localhost:3001/create-activity`,
        {
            method: 'POST',
            credentials: 'include', //! ERROR DE CORS ??
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBodyExample)
            // body: requestBodyExample
        })
    
    if (!response.ok) {
        console.warn("Error en el fetch:", response);
        return;
    }

    console.log(response);
     
    }