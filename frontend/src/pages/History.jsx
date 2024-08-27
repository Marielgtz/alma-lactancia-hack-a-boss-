import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./History.css";
import ActivityFilter from "../components/ActivityFilter";

const History = () => {
  const [openInfo, setOpenInfo] = useState(null);

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  return (
    <div className="history-page">
      <Header />
      <main className="history-main">
        <p className="history-text">Alma Lactancia</p>
        <h1 className="history-title">Histórico</h1>
    
        <button>Próximas actividades</button>

        <ActivityFilter />

        <nav className="activity-container">

            {/* 
                //TODO: AGREGAR UN MAP CON LAS DIFERENTES ACTIVIDADES TRAS HACER EL FETCH   
            */}

            <article className="activity">
                <p>imagen</p>
                <h1 className="activity-title">obradoiro: Alimentación complementaria</h1>
                {/* <p className="activity-author">Por Emma Enríquez (Nutricionista)</p> */}
                <h2 className="activity-date">Sábado 6 de xullo | 11h</h2>
                <p className="activity-location">Sala Municipal Celia e Esperanza Brañas Fernández, Culleredo</p>
                {/* <button className="activity-inscription">Inscribirse</button> */}

            </article>

        </nav>

      </main>
      <Footer />
    </div>
  );
};

export default History;
