import AppRoutes from "./components/AppRoutes";
import Alert from "./components/Alert";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import useApp from "./hooks/useApp";
import { useEffect, useState } from "react";

function App() {
  const {
    instagramPostList,
    formList,
    instagramPost,
    setInstagramPost,
    publishedForm,
    setPublishedForm,
    activities,
    setActivities,
    checkedExperiences,
    setCheckedExperiences,
    homeData,
    setHomeData,
  } = useApp();

  const [showButton, setShowButton] = useState(false); // Estado para controlar la visibilidad del botón

  // Detectar cuando el usuario hace scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      console.log("scroll position:", scrollPosition);
      if (scrollPosition > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar inicialmente para establecer el estado

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  return (
    <Router>
      <div className="App">
        <Alert
          title={"XX CONGRESO DE LACTANCIA MATERNA FEDALMA"}
          date={"3 y 4 de Octubre de 2025"}
          link={"https://www.fedalma.org/congreso-2025/"}
        />
        <AppRoutes
          instagramPost={instagramPost}
          setInstagramPost={setInstagramPost}
          publishedForm={publishedForm}
          setPublishedForm={setPublishedForm}
          activities={activities}
          setActivities={setActivities}
          checkedExperiences={checkedExperiences}
          setCheckedExperiences={setCheckedExperiences}
          homeData={homeData}
          setHomeData={setHomeData}
          formList={formList}
          instagramPostList={instagramPostList}
        />

        {/* Botón de Scroll to Top */}
        {showButton && (
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "50px",
              right: "50px",
              padding: "10px 20px",
              backgroundColor: "#b380b5",
              color: "#000",
              fontSize: "20px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            ↑
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;
