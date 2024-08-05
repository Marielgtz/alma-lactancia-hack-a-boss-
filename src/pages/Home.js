import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-home">
        <div className="img-section">
          <div className="background-image"></div>
        </div>
        <div className="content">
          {/* Aquí puedes agregar tu contenido */}
          <p>Contenido adicional aquí...</p>
          <p>Más contenido...</p>
          <p>Aún más contenido...</p>
          <p>Asegúrate de tener suficiente contenido para hacer scroll.</p>
          <p>Contenido adicional aquí...</p>
          <p>Más contenido...</p>
          <p>Aún más contenido...</p>
          <p>Asegúrate de tener suficiente contenido para hacer scroll.</p>
          <p>Contenido adicional aquí...</p>
          <p>Más contenido...</p>
          <p>Aún más contenido...</p>
          <p>Asegúrate de tener suficiente contenido para hacer scroll.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
