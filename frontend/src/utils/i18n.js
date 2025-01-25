import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      welcomeMessage: "Bienvenido a Alma Lactancia",
      homeTitle: "Inicio",
      aboutUs: "¿Quiénes somos?",
      activities: "Actividades",
      nextActivities: "Próximas actividades",
      history: "Histórico",
      library: "Biblioteca",
      colab: "Colabora",
      contact: "Contacto",
    },
  },
  gl: {
    translation: {
      welcomeMessage: "Benvido á Alma Lactancia",
      homeTitle: "Comeza",
      aboutUs: "Quen somos?",
      activities: "Actividades",
      nextActivities: "Próximas actividades",
      history: "Histórico",
      library: "Biblioteca",
      colab: "Colaborar",
      contact: "Contacto",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "es",
  fallbackLng: "es", // Idioma en caso de que no exista la traducción
  interpolation: {
    escapeValue: false, // React ya escapa valores automáticamente
  },
});

export default i18n;
