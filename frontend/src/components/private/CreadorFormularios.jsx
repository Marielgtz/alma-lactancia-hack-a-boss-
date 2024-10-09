import { useEffect, useState } from "react";
import FormBuilder from "../FormBuilder";
import EditForm from "../EditForm";
import "./CreadorFormularios.css";

import FormDropdown from "../FormDropdown";

const CreadorFormularios = ({ publishedForm, setPublishedForm }) => {
  const [forms, setForms] = useState({});
  const [editingForm, setEditingForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  useEffect(()=>{
    console.log("Editing form?:",editingForm);
    
  },[editingForm])
  return (
    <div className="contenedor-opciones-formularios">
      <h1>Formularios</h1>
      { editingForm ? (
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
          <div>
            <div className="contenedor-pasos">
              <i className="fas fa-exclamation-triangle"></i>
              <p className="texto-descriptivo-accion">
                - En esta sección, se puede diseñar un formulario personalizado.
                <br></br>- Una vez que hayas creado el formulario, se añadirá
                automáticamente a la lista de formularios disponibles.
                <br></br>- Desde la lista, se puede elegir entre publicarlo o
                modificarlo en caso de necesitarlo.
              </p>
            </div>
            <h3 className="titulo-descriptivo-accion">
              PASO 1: Crea un formulario <i class="fas fa-arrow-down"></i>
            </h3>
            <FormBuilder setForms={setForms} />
          </div>
          <FormDropdown
            forms={forms}
            setForms={setForms}
            setPublishedForm={setPublishedForm}
            publishedForm={publishedForm}
            setEditingForm={setEditingForm}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
        </>
      )}

    </div>
  );
};
export default CreadorFormularios;
