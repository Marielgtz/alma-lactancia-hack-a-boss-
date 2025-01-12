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
          <p>Rellena el formulario para inscribirte como socio.</p>

          <NewCollaboratorForm />
        </div>
        <div className="columna-2">
          <div className="info-box">
            <h2>Maneras de colaborar</h2>
            <h3>Puedes hacerte socia… </h3>
            <p class="texto-socios">
              Simplemente con rellenar la ficha de inscripción y hacer un
              ingreso en nuestra cuenta de la cuota anual (20€), indicando tu
              nombre y apellidos y NUEVA SOCIA o RENOVACIÓN según sea tu caso.
              <p class="texto-letra-pequeña">
                LA CONDICIÓN DE SOCIA/O ES PERSONAL E INTRANSFERIBLE, Y ESTÁ EN
                VIGOR DE ENERO A DICIEMBRE DEL AÑO EN QUE LA PERSONA SE ASOCIA A
                ALMA.
              </p>
              <p class="texto-socios">
                El IBAN es el siguiente: ES31 2095 5587 4091 1403 9324
                (Kutxabank)
              </p>
              <h3>Puedes hacer un donativo…</h3>
              <p class="texto-socios">
                Tanto económico como material. Estamos abiertas a todo tipo de
                donaciones relacionadas con el mundo de la lactancia y la
                crianza.
              </p>
              <h3>Puedes hacerte asesora… </h3>
              <p class="texto-socios">
                Todas las que asesoramos actualmente en Alma somos madres que
                hemos lactado durante varios años. Nuestra plantilla de asesoras
                está viva y siempre nos alegramos cuando una madre se decide a
                formar parte de una manera más activa de la asociación. Contacta
                con nosotras si quieres saber cómo nos formamos y mantenemos
                actualizadas. Colaboraciones puntuales… Alma realiza eventos
                puntuales además de las reuniones periódicas de Culleredo y A
                Coruña. Hay madres que nos ayudan en estos eventos puntuales y
                son también muy necesarias.
              </p>
            </p>
            <h3>
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
