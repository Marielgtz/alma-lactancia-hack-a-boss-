import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Home.css";

const Home = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="home-page">
      <Header />
      <main className="main-home">
        <div className="img-section">
          <div className="background-image"></div>
        </div>
        <div className="content">
          <h2 className="section-title">NOSOTRAS</h2>
          <div className="centered-container">
            <p className="section-text">
              Somos un grupo de madres y asesoras de lactancia voluntarias que
              tenemos en común nuestra experiencia y formación en lactancia
              materna. Fundamos la asociación en mayo de 2009 y realizamos
              nuestra labor desde A Coruña y Culleredo. ALMA es una entidad que
              se dedica al apoyo a la lactancia materna a través,
              principalmente, de los grupos de apoyo a la lactancia, que se
              reúnen en Culleredo, Coruña. En ellos se apoya y asesora a las
              familias, y además sirven de punto de encuentro donde compartir
              sus dudas, experiencias, etc. sobre otros temas relacionados con
              la lactancia (sueño, alimentación, porteo, crianza, parto…). No
              obstante, la labor de ALMA va más allá de los grupos. Colaboramos
              y organizamos actividades de difusión y apoyo a la lactancia
              materna, así como actividades familiares de carácter más lúdico.
              Ofrecemos información y noticias a través de nuestra web, y de
              nuestras redes sociales, y también realizamos charlas sobre
              lactancia materna para mujeres embarazadas. Puedes contactarnos, y
              acudir a nuestras reuniones si necesitas ayuda, asesoramiento o
              simplemente sentirte apoyada en tu lactancia. También si estás
              embarazada y quieres informarte. La información veraz previa puede
              facilitar un mejor comienzo en tu lactancia. ALMA está constituida
              como asociación sin ánimo de lucro, motivo por el cual queremos
              dejar claro que no está vinculada a ninguna iniciativa de interés
              lucrativo ni comercial. No es necesario ser socia de Alma para
              recibir ayuda. Todas las asesoras y madres que colaboran en ALMA
              lo hacen de forma totalmente altruista y voluntaria. Del mismo
              modo, todas las actividades de apoyo a la lactancia que realiza la
              asociación son de carácter gratuito para las madres, financiadas
              por las cuotas anuales de las socias.
            </p>
          </div>
          <h2 className="section-title">PRÓXIMAS ACTIVIDADES</h2>
          <div className="activities">
            <div className="activity">ACTIVIDAD 1</div>
            <div className="activity">ACTIVIDAD 2</div>
          </div>
          <button className="activities-button">VER MÁS ACTIVIDADES</button>
          <div className="calendar-section">
            <h2 className="section-title">CALENDARIO DE EVENTOS</h2>
            <div className="calendar-content">
              <p className="calendar-text">
                Consulta todos nuestros eventos y actividades ¡te esperamos!
              </p>
              <div className="calendar-container">
                <Calendar onChange={onChange} value={date} />
              </div>
            </div>
          </div>
          <h2 className="section-title">EXPERIENCIAS</h2>
          <p>Nombre - Experiencia</p>
          <h2 className="section-title">ENTIDADES COLABORADORAS</h2>
          <p>FEDALMA / FEDEGALMA</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
