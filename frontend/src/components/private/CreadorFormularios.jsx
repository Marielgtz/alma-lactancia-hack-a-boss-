import { useState } from "react";
import FormBuilder from "../FormBuilder";
import EditForm from "../EditForm";
import "./CreadorFormularios.css";

import FormDropdown from "../FormDropdown";

const CreadorFormularios = ({ publishedForm, setPublishedForm }) => {
  const [forms, setForms] = useState({});
  const [editingForm, setEditingForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  return (
    <div className="contenedor-opciones-formularios">
      <h1>Formularios</h1>
      {editingForm ? (
        <EditForm
          setEditingForm={setEditingForm}
          selectedForm={selectedForm}
          setForms={setForms}
          setSelectedForm={setSelectedForm}
          setPublishedForm={setPublishedForm}
          publishedForm={publishedForm}
        />
      ) : (
        <>
          <p className="texto-descriptivo-accion">
            En esta sección, se puede diseñar un formulario personalizado desde
            cero.
            <br></br>Una vez que hayas creado el formulario, se añadirá
            automáticamente a la lista de formularios disponibles.
            <br></br>Desde esta lista, se puede elegir entre publicarlo para que
            los usuarios lo completen o modificarlo en caso de que necesites
            hacer ajustes adicionales.
            <br></br>Asegúrate de incluir todos los campos necesarios para
            recopilar la información relevante de los usuarios.
          </p>

          <FormBuilder setForms={setForms} />
        </>
      )}
      <p className="dropdown-explanation">
        Selecciona un formulario de la lista para editarlo, publicarlo o
        eliminarlo. Usa el buscador si tienes varios formularios.
      </p>
      <FormDropdown
        forms={forms}
        setForms={setForms}
        setPublishedForm={setPublishedForm}
        publishedForm={publishedForm}
        setEditingForm={setEditingForm}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
    </div>
  );
};
export default CreadorFormularios;
