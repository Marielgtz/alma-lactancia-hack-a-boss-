import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Asegúrate de importar Navigate
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

function App() {
  const [publishedForm, setPublishedForm] = useState({ fields: [] });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/actividades" element={<Activities />} />
          <Route path="/historico" element={<History />} />
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

          {/* Pasar el estado publishedForm a FormActivityPage */}
          <Route
            path="/formulario-inscripcion"
            element={
              <FormActivityPage
                publishedForm={publishedForm}
                setPublishedForm={setPublishedForm}
              />
            }
          />

          {/* Rutas del DASHBOARD */}
          <Route path="/dashboard" element={<Layout />}>
            {/* Redireccionar a 'general' cuando se accede a /dashboard */}
            <Route path="general" element={<AdminGeneral />} />
            <Route path="inicio" element={<AdminHome />} />
            <Route path="quienes-somos" element={<AdminAbout />} />
            <Route path="actividades" element={<AdminActivities />} />
            <Route path="historico" element={<AdminHistorical />} />
            <Route path="biblioteca" element={<AdminLibrary />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
