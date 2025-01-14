import React, { useState } from "react";
import { toast } from "react-toastify";
import useSubmitPartnerForm from "../../hooks/useSubmitPartnerForm";
import "./NewCollaboratorForm.css";

const NewPartnerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const { submitForm, isLoading, error } = useSubmitPartnerForm();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es 'phone', solo permitimos números
    const newValue = name === "phone" ? value.replace(/\D/g, "") : value;

    // Si el campo es 'phone' y está vacío, asignamos null
    if (name === "phone" && newValue === "") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: null, // Si está vacío, guardamos null
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue, // Si no está vacío, guardamos el valor numérico
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let phone = formData.phone.trim();
    phone = phone === "" ? null : Number(phone); // Si está vacío, asignamos null; si no, convertimos a número

    // Verificar si el teléfono es válido (si no es null, debe ser un número)
    if (phone !== null && isNaN(phone)) {
      toast.error("El teléfono debe ser un número válido.");
      return;
    }

    try {
      const data = await submitForm({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: phone, // Enviar null si no hay teléfono
      });

      if (data.error && data.error.includes("Ya existe un email")) {
        toast.error("El correo electrónico ya está registrado.");
      } else {
        toast.success("Socio añadido correctamente");
      }
    } catch (error) {
      toast.error(`Error al añadir socio: ${error.message || "Desconocido"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="contenedor-formulario">
        <div className="contenedor-campos-form">
          <label htmlFor="name" className="etiquetas-form-inscripcion">
            Nombre:
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="inputs-form-inscripcion"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="surname" className="etiquetas-form-inscripcion">
            Apellidos:
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="inputs-form-inscripcion"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="email" className="etiquetas-form-inscripcion">
            Correo electrónico:
            <span className="required">*</span>
          </label>

          <input
            type="email"
            id="collaborator-email"
            name="email"
            className="inputs-form-inscripcion"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="contenedor-campos-form">
          <label htmlFor="phone" className="etiquetas-form-inscripcion">
            Teléfono (opcional):
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="inputs-form-inscripcion"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d*"
            placeholder="Introduce solo números"
          />
        </div>
      </div>
      <button className="boton-inscribirme" type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Inscribirme"}
      </button>
    </form>
  );
};

export default NewPartnerForm;
