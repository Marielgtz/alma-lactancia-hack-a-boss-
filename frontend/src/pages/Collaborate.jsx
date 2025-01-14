import React from "react";
import "./Collaborate.css";
import Header from "../components/Header";
import NewCollaboratorForm from "../components/forms/NewCollaboratorForm";
import Footer from "../components/Footer";

const Collaborate = () => {
  return (
    <div className="collaborate-page">
      <Header className="header-collaborate" />
      <div className="collaborate-content">
        <div className="columna-1">
          <h1 className="colabora-title">¿Quieres colaborar?</h1>
          <p class="texto-inscripcion-socios">
            Rellena el formulario a la izquierda y nos pondremos en contacto
            para formalizar la inscripción. La cuota anual es de 20€, y se paga
            una vez nos pongamos en contacto contigo. La condición de socia es
            personal e intransferible, y es válida de enero a diciembre del año
            en que te unes.
          </p>

          <NewCollaboratorForm />
        </div>
        <div className="columna-2">
          <div className="info-box">
            <h2>También puedes...</h2>

            <h3>Hacer un donativo</h3>
            <p class="texto-socios">
              Tanto económico como material. Aceptamos donaciones relacionadas
              con la lactancia y la crianza.
            </p>
            <h3>Convertirte en asesora </h3>
            <p class="texto-socios">
              Todas nuestras asesoras somos madres que hemos lactado por varios
              años. Si te interesa formar parte de nuestro equipo, contáctanos
              para saber cómo nos formamos y mantenemos actualizadas.
            </p>
            <h3>Colaborar puntualmente </h3>
            <p class="texto-socios">
              Alma organiza eventos y reuniones periódicas en Culleredo y A
              Coruña. Muchas madres colaboran en estos eventos puntuales, ¡y tu
              ayuda es siempre bienvenida!
            </p>
            <h3 class="cta-colaboraciones">
              Únete a nuestra comunidad y ayuda a promover nuestras causas.
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collaborate;
