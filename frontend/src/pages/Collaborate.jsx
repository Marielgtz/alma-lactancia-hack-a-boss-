import React, { useState } from "react";
import "./Collaborate.css";
import Header from "../components/Header";
import NewCollaboratorForm from "../components/forms/NewCollaboratorForm";
import { Link } from "react-router-dom";
import MySubscriptionModal from "../components/forms/MySubscriptionModal"; // Asegúrate de importar el modal
import Footer from "../components/Footer";

const Collaborate = () => {
  // Paso 1: Definir el estado isModalOpen para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paso 2: Función para abrir el modal
  const handleUserProfileClick = () => {
    setIsModalOpen(true);
  };

  // Paso 3: Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="collaborate-page">
      <Header className="header-collaborate" />
      <div className="collaborate-content">
        <div className="columna-1">
          <p className="alma-text-colab">Alma Lactancia</p>

          <h1 className="colabora-title">¿Quieres colaborar?</h1>
          <p className="texto-inscripcion-socios">
            Rellena el formulario y nos pondremos en contacto para formalizar la
            inscripción.
          </p>

          <NewCollaboratorForm />

          <p className="letra-pequena-inscripcion-socios">
            *La condición de socia es personal e intransferible, y es válida de
            enero a diciembre del año en que te unes.
          </p>
        </div>
        <div className="columna-2">
          <div className="info-box">
            <h2>También puedes...</h2>

            <h3>Hacer un donativo</h3>
            <p className="texto-socios">
              Tanto económico como material. Aceptamos donaciones relacionadas
              con la lactancia y la crianza.
            </p>
            <h3>Convertirte en asesora </h3>
            <p className="texto-socios">
              Todas nuestras asesoras somos madres que hemos lactado por varios
              años. Si te interesa formar parte de nuestro equipo, contáctanos
              para saber cómo nos formamos y mantenemos actualizadas.
            </p>
            <h3>Colaborar puntualmente </h3>
            <p className="texto-socios">
              Alma organiza eventos y reuniones periódicas en Culleredo y A
              Coruña. Muchas madres colaboran en estos eventos puntuales, ¡y tu
              ayuda es siempre bienvenida!
            </p>

            {/* Botón de contacto */}
            <Link to="/contacto" className="boton-escribenos">
              Escríbenos ➜
            </Link>
            {/* Nueva sección para el botón de suscripción */}
            <div className="suscripcion-info">
              <h3 className="texto-ya-socio">¿Ya eres socio?</h3>
              <button
                className="boton-suscripcion"
                onClick={handleUserProfileClick} // Cuando se hace clic, abrir el modal
              >
                Ver mi suscripción
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Paso 4: Mostrar el modal solo cuando isModalOpen sea true */}
      {isModalOpen && <MySubscriptionModal onClose={closeModal} />}

      <Footer />
    </div>
  );
};

export default Collaborate;
