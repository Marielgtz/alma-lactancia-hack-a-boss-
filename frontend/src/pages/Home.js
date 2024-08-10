import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";
import { getCalendarEvents } from "../services/apigoogle";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getCalendarEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main className="main-home">
        <div className="img-section">
          <div className="background-image"></div>
          <button className="activities-button">
            Conoce nuestras actividades
          </button>
        </div>
        <div className="content">
          <h2 className="section-title">Nosotras</h2>
          <div className="centered-container">
            <p className="section-text">
              Somos un grupo de madres y asesoras de lactancia voluntarias que
              tenemos en común nuestra experiencia y formación en lactancia
              materna. Fundamos la asociación en mayo de 2009 y realizamos
              nuestra labor desde A Coruña y Culleredo.
              <br />
              <br />
              ALMA es una entidad que se dedica al apoyo a la lactancia materna
              a través, principalmente, de los grupos de apoyo a la lactancia,
              que se reúnen en Culleredo, Coruña. En ellos se apoya y asesora a
              las familias, y además sirven de punto de encuentro donde
              compartir sus dudas, experiencias, etc. sobre otros temas
              relacionados con la lactancia (sueño, alimentación, porteo,
              crianza, parto…). No obstante, la labor de ALMA va más allá de los
              grupos.
              <br />
              <br />
              Colaboramos y organizamos actividades de difusión y apoyo a la
              lactancia materna, así como actividades familiares de carácter más
              lúdico. Ofrecemos información y noticias a través de nuestra web,
              y de nuestras redes sociales, y también realizamos charlas sobre
              lactancia materna para mujeres embarazadas.
              <br />
              <br />
              Puedes contactarnos, y acudir a nuestras reuniones si necesitas
              ayuda, asesoramiento o simplemente sentirte apoyada en tu
              lactancia. También si estás embarazada y quieres informarte. La
              información veraz previa puede facilitar un mejor comienzo en tu
              lactancia.
              <br />
              <br />
              ALMA está constituida como asociación sin ánimo de lucro, motivo
              por el cual queremos dejar claro que no está vinculada a ninguna
              iniciativa de interés lucrativo ni comercial. No es necesario ser
              socia de Alma para recibir ayuda. Todas las asesoras y madres que
              colaboran en ALMA lo hacen de forma totalmente altruista y
              voluntaria. Del mismo modo, todas las actividades de apoyo a la
              lactancia que realiza la asociación son de carácter gratuito para
              las madres, financiadas por las cuotas anuales de las socias.
            </p>
          </div>
          <h2 className="section-title">Próximas actividades</h2>
          <div className="activities">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="activity" key={event.id}>
                  {event.summary} -{" "}
                  {new Date(event.start.dateTime).toLocaleString()}
                </div>
              ))
            ) : (
              <div>No hay actividades programadas</div>
            )}
          </div>
          <div className="calendar-section">
            <h2 className="section-title-calendar">Calendario</h2>
            <div className="calendar-content">
              <div className="calendar-container">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=adm.almalactancia%40gmail.com&ctz=UTC"
                  title="Google Calendar"
                ></iframe>
              </div>
            </div>
          </div>
          <h2 className="section-title">Experiencias reales</h2>
          <p className="experience">Nombre - Experiencia</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
