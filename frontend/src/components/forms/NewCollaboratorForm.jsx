import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./NewCollaboratorForm.css";

const NewPartnerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const processToast = toast.loading("Enviando datos...");
      const response = await axios.post("/new-partner", formData);

      if (response.status === 200) {
        const { message, id } = response.data;
        toast.dismiss(processToast);
        toast.success(`${message} ID de Socio: ${id}`);

        // Limpia el formulario
        setFormData({
          name: "",
          surname: "",
          email: "",
          phone: "",
        });
      } else {
        throw new Error("Error inesperado en la respuesta del servidor.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        `Error al añadir socio: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="name-field">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="name-field">
        <label htmlFor="surname">Apellidos:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="name-field">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="name-field">
        <label htmlFor="phone">Teléfono (opcional):</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <button class="boton-inscribirme" type="submit">
        Inscribirme
      </button>
    </form>
  );
};

export default NewPartnerForm;
