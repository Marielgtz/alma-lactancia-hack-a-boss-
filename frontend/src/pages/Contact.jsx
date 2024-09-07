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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una llamada a una API
    // Si el envío es exitoso, puedes redirigir al usuario a otra página
    navigate("/confirmacion"); 
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

            <Captcha />
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
