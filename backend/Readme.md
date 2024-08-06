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
Path: `/partner-activity`
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
Path: `/non-partner-activity`
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

### Developer

[Guillermo Cerviño Porto](https://www.linkedin.com/in/guillermocporto/)

[TOC]
