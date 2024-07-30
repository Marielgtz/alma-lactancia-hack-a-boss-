import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main className='main-home'>
        <h1>Bienvenido a Alma</h1>
        <p>Contenido de la página principal</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
