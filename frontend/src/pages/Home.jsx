import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Footer from "../components/Footer";
import silueta from "../images/IlustracionLactancia.png";
import ButtonUp from "../components/ButtonUp";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [cardsToShow, setCardsToShow] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(2);
      }
    };

    window.addEventListener("resize", updateCardsToShow);
    updateCardsToShow();

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3001/get-all-experiences"
        );
        if (!response.ok) {
          throw new Error("Error al obtener las experiencias");
        }
        const data = await response.json();
        setExperiences(data.experiences);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const totalExperiences = experiences.length;

  const nextSlide = () => {
    if (currentIndex < totalExperiences - cardsToShow) {
      setCurrentIndex(currentIndex + cardsToShow);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsToShow);
    } else {
      setCurrentIndex(totalExperiences - cardsToShow);
    }
  };

  const handleActivitiesClick = () => {
    navigate("/actividades");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page">
      <Header />
      <main className="main-home">
        <ButtonUp />
        <div className="img-section">
          <div className="background-image"></div>
          <div className="support-button">
            <p>
              Apoyando la lactancia, <br /> fortaleciendo familias
            </p>
            <button className="activities-button" onClick={handleActivitiesClick}>Nuestras actividades</button>
          </div>
        </div>
        <div className="content">
          <h2 className="section-title">Nosotras</h2>
          <div className="centered-container">
            <p className="section-text0">
              Somos un grupo de madres y asesoras de lactancia voluntarias que
              tenemos en común nuestra experiencia y formación en lactancia
              materna. Fundamos la asociación en mayo de 2009 y realizamos
              nuestra labor desde A Coruña y Culleredo.
            </p>
            <br />
            <br />
            <p className="section-text1">
              ALMA es una entidad que se dedica al apoyo a la lactancia materna
              a través, principalmente, de los grupos de apoyo a la lactancia,
              que se reúnen en Culleredo, Coruña. En ellos se apoya y asesora a
              las familias, y además sirven de punto de encuentro donde
              compartir sus dudas, experiencias, etc. sobre otros temas
              relacionados con la lactancia (sueño, alimentación, porteo,
              crianza, parto…). No obstante, la labor de ALMA va más allá de los
              grupos.
            </p>
            <br />
            <br />
            <p className="section-text2">
              Colaboramos y organizamos actividades de difusión y apoyo a la
              lactancia materna, así como actividades familiares de carácter más
              lúdico. Ofrecemos información y noticias a través de nuestra web,
              y de nuestras redes sociales, y también realizamos charlas sobre
              lactancia materna para mujeres embarazadas.
            </p>
            <br />
            <br />
            <p className="section-text3">
              Puedes contactarnos, y acudir a nuestras reuniones si necesitas
              ayuda, asesoramiento o simplemente sentirte apoyada en tu
              lactancia. También si estás embarazada y quieres informarte. La
              información veraz previa puede facilitar un mejor comienzo en tu
              lactancia.
            </p>
            <br />
            <br />
            <p className="section-text4">
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
          <img src={silueta} className="img-silueta" />
          <Calendar />
        </div>
        <div className="experience-section">
          <h2 className="experience-title">Experiencias reales</h2>
          <div className="experience-carousel">
            <button className="carousel-control prev" onClick={prevSlide}>
              &#10094; {/* Left Arrow */}
            </button>
            <div className="experience-cards">
              {experiences
                .slice(currentIndex, currentIndex + cardsToShow)
                .map((experience) => (
                  <div key={experience.id} className="experience-card">
                    <img
                      src={`http://localhost:3001/images/${experience.image}`}
                      alt={experience.name}
                    />
                    <h3>{experience.name}</h3>
                    <p>{experience.text}</p>
                  </div>
                ))}
            </div>
            <button className="carousel-control next" onClick={nextSlide}>
              &#10095; {/* Right Arrow */}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
