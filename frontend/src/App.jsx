import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Activities from "./pages/Activities";
import History from "./pages/History";
import Library from "./pages/Library";
import Collaborate from "./pages/Collaborate";
import Contact from "./pages/Contact";
import Confirmation from "./pages/MsgConfirmation";
import Prueba from "./components/prueba";
import NotFoundPage from "./pages/NotFoundPage";
import AdminHome from "./components/private/AdminHome";
import AdminAbout from "./components/private/AdminAbout";
import AdminActivities from "./components/private/AdminActivities";
import AdminHistorical from "./components/private/AdminHistorical";
import AdminLibrary from "./components/private/AdminLibrary";
import Layout from "./pages/private/Layout";
import AdminGeneral from "./components/private/AdminGeneral";
//import AdminDashboard from "./pages/private/AdminDashboard";
import FormActivityPage from "./pages/FormActivityPage";
import "./App.css";

// Componente para manejar el Alert y el estilo basado en la ruta
function Alert() {
  const location = useLocation();

  // Lista de rutas donde NO se mostrará el Alert
  const excludedPaths = [
    "/dashboard",
    "/dashboard/general",
    "/dashboard/inicio",
    "/dashboard/quienes-somos",
    "/dashboard/actividades",
    "/dashboard/historico",
    "/dashboard/biblioteca",
  ];

  // Si la ruta actual está en la lista de rutas excluidas, no renderiza el Alert
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  // Cambia el color del alert según la página
  const alertStyle = {
    backgroundColor:
      location.pathname === "/homepage" ||
      location.pathname === "/" ||
      location.pathname === "/quienes-somos"
        ? "#b380b5" // Color morado para la página de inicio
        : "#e0bb8e", // Color alternativo para otras páginas,
  };

  return (
    <div className="alert-div" style={alertStyle}>
      <p id="alerttext" className="alert-text">
        <strong className="black">
          XX CONGRESO DE LACTANCIA MATERNA FEDALMA
        </strong>{" "}
        |<span className="normal">3 y 4 de Octubre de 2025</span> |
        <a
          href="https://www.fedalma.org/congreso-2025/"
          className="alert-text-link"
          target="_blank"
        >
          + INFO
        </a>
      </p>
    </div>
  );
}

function App() {
  const instagramPostList = Array.from({ length: 6 }, () => {
    return {};
  }); //Número de publicaciones de Instagram

  const formList = Array.from({ length: 4 }, () => {
    return {};
  }); //Número de formularios que se pueden publicar.

  const [instagramPost, setInstagramPost] = useState(instagramPostList);
  const [publishedForm, setPublishedForm] = useState(formList);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchInstagramPost = async () => {
      const url = `${import.meta.env.VITE_API_URL}/get-all-instagram-posts`;

      try {
        const response = await fetch(url);

        if (response.ok) {
          const res = await response.json();
          console.log(res.message);
          setInstagramPost(res.posts);
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.error || response.statusText;
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error("Ha ocurrido un error:", error);
      }
    };
    fetchInstagramPost();
  }, []);

  return (
    <Router>
      <div className="App">
        <Alert />

        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route
            path="/actividades"
            element={
              <Activities
                setActivities={setActivities}
                activities={activities}
              />
            }
          />
          <Route
            path="/historico"
            element={
              <History
                instagramPost={instagramPost}
                instagramPostList={instagramPostList}
              />
            }
          />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/colabora" element={<Collaborate />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/confirmacion" element={<Confirmation />} />
          <Route
            path="/prueba"
            element={
              <Prueba
                publishedForm={publishedForm}
                setPublishedForm={setPublishedForm}
              />
            }
          />

          <Route
            path="/formulario-inscripcion/:eventId/:activityNumber"
            element={<FormActivityPage />}
          />

          {/* Rutas del DASHBOARD */}
          <Route path="/dashboard" element={<Layout />}>
            {/* Redireccionar a 'general' cuando se accede a /dashboard */}
            <Route path="general" element={<AdminGeneral />} />
            <Route path="inicio" element={<AdminHome />} />
            <Route path="quienes-somos" element={<AdminAbout />} />
            <Route path="actividades" element={<AdminActivities />} />
            <Route
              path="historico"
              element={
                <AdminHistorical
                  instagramPost={instagramPost}
                  setInstagramPost={setInstagramPost}
                />
              }
            />
            <Route path="biblioteca" element={<AdminLibrary />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
