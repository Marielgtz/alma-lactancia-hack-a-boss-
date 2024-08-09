# Alma Lactancia Server

The project involves developing a website for "Alma Lactancia," a non-profit organization dedicated to supporting and promoting breastfeeding. The site will provide easy access to vital information, educational resources, upcoming events, and support services for mothers and families. Its goal is to enhance the association's outreach and facilitate access to valuable resources and support.

**Scripts**:
<small>npm run dev</small>, to start the project in development mode.

**Stack**: <small>"cors": "^2.8.5", "dotenv": "^16.4.5", "express": "^4.19.2", "googleapis": "^140.0.1", "jsonwebtoken": "^9.0.2", "bcrypt": "^5.1.1",</small>

### Endpoints:

**Partners**

Route to register a new member:
Method: post,
Path: `/newPartner`
Required fields (in JSON format):

-   nome
-   apelidos
-   enderezo
-   cp
-   cidade
-   provincia
-   telefono
-   correo_electronico

    _All fields are required._

Method: patch,
Path: `/update-partner`
Required fields (in JSON format):

-   nome
-   apelidos
-   enderezo
-   cp
-   cidade
-   provincia
-   telefono
-   correo_electronico

    _All fields are optional._

Method: delete,
Path: `/delete-partner`

**PartnersActivities**

Path to add a partner to an activity:
Method: post,
Path: `/join-partner-activity`
Required fields (in JSON format):

-   socio (¿Eres socia de Alma este año? Sí o No) Enviar booleano.
-   nome_nai (Nombre completo de la madre)
-   nome_bebe
-   data_nacemento (fecha de nacimiento del bebé o FPP (fecha probable del parto), formato día/mes/año)
-   centro_saude (Centro de salud del bebé)
-   telefono
-   correo_electronico
-   outros (Temas de interés que te gustaría tratar)

    _All fields are required._

Path to add a partner or a non-partner to an free activity:
Method: post,
Path: `/join-non-partner-activity`
Required fields (in JSON format):

-   asistencia ( Vendrás a la charla acompañada? Sí o no) Enviar booleano.
-   nome_nai (Nombre completo de la madre)
-   fpp (fecha probable del parto) formato: día/mes/año
-   centro_saude (Centro de salud del bebé)
-   telefono
-   correo_electronico

    _All fields are required._

**Admin**
Path to login:
Method: post,
Path: `/admin-login`
Required fields (in JSON format):

-   correo_electronico
-   contrasinal

    _All fields are required._

**Collaborators/Teams members**

Route to register a new collaborator/team member:
Method: post,
Path: `/new-collaborator`
Required fields (in JSON format):

-   nome
-   apelidos
-   descripcion
-   rol (optional)
-   imaxeColaborador (optional)
-   equipo (habrá que enviar un booleano, true para miembros del equipo y false para colaboradores externos)(required)

Method: patch,
Path: `/update-collaborator`
Required fields (in JSON format):

-   nome
-   apelidos
-   descripcion
-   rol
-   imaxeColaborador

    _All fields are optional._

Method: delete,
Path: `/delete-colaborator`

**Calendar events**

**Note: Events/activities will be automatically added to the calendar from the server once created from the web form.**
**Nota: Los eventos/actividades se añadirán automáticamente al calendario desde el servidor una vez creados desde el formulario de la web.**

Path to delete an event:
Method: delete,
Path: `/delete-calendar-event/:eventId`
Required field in params:

Path to update an event:
Method: patch,
Path: `/update-calendar-event/:eventId`
Required eventId field in params:
Required eventDetails object in JSON format

_All fields are optional._

Path to get events from calendar:
Method: post,
Path: `/list-calendar-events`

Required fields (in JSON format)

-   calendarId: (Si solo hay un calendario: 'primary')
-   maxResults: 10 (Número máximo de eventos a devolver)
-   orderBy: 'startTime' (Tambien: 'updated')
-   singleEvents: true,
-   timeMin: new Date().toISOString() (La fecha y hora mínima para filtrar los eventos. Solo se devolverán los eventos que comiencen después de esta fecha y hora. En este caso, solo se mostrarán eventos futuros)

_All fields are required._

**contact**
Path to save contact data:
Method: post,
Path: `/new-contact-message`
Required fields (in JSON format):

-   name
-   surname
-   email
-   subject
-   comments

    _All fields are required._

### Developer

[Guillermo Cerviño Porto](https://www.linkedin.com/in/guillermocporto/)

[TOC]
