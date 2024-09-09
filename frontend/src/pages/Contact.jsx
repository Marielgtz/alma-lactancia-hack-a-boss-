import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Captcha from "../components/Captcha";
import silueta from "../images/IlustracionLactancia.png";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captchaValid, setCaptchaValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValid) {
      // Mostrar un mensaje si el captcha no es válido
      alert("Por favor, valida el CAPTCHA antes de enviar el formulario.");
      return;
    }

    try {
      // Realizar la solicitud POST al backend
      const response = await fetch(import.meta.env.VITE_API_URL + "/new-contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          surname: formData.lastName,
          email: formData.email,
          subject: formData.subject,
          comments: formData.message,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const data = await response.json();
      console.log(data.message);

      // Redirigir a la página de confirmación
      navigate("/confirmacion");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="contact-page">
      <Header />
      <main className="contact-main">
        <h1 className="contact-title">Contacto</h1>
        <div className="contact-content">
          <form id="contact" onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="name-field">
                <label htmlFor="firstName">
                  Nombre completo<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="name-field">
                <label htmlFor="lastName">
                  Apellido completo<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="email">
              Correo electrónico<span className="required">*</span>
            </label>
            <input
              type="email"
              className="email-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject">
              Asunto<span className="required">*</span>
            </label>
            <input
              type="text"
              className="subject-input"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <Captcha onCaptchaValidation={setCaptchaValid} />
            <button className="contact-button" type="submit">
              Enviar
            </button>
          </form>

          <div className="contact-info">
            <p>También podéis contactar con la Asociación</p>
            <p>ALMA a través de cualquiera de los</p>
            <p>siguientes medios:</p>
            <p>
              <i className="fas fa-envelope"></i> almalactancia@gmail.com
            </p>
            <p>
              <i className="fab fa-instagram"></i> alma_lactancia
            </p>
            <p>
              <i className="fab fa-facebook"></i> /AlmaLactanciaMaterna
            </p>
            <img src={silueta} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Contact;
