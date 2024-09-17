import React from "react";
import useFormDisplay from "../hooks/useFormDisplay";

const FormDisplay = ({ publishedForm, setPublishedForm, jsonNumber }) => {
  const { sendDataHandler, formRef } = useFormDisplay(
    publishedForm,
    setPublishedForm,
    jsonNumber
  );

  // Comprobar el contenido de publishedForm
  console.log("Contenido de publishedForm:", publishedForm);

  // Asegúrate de acceder al primer elemento del array
  const formToDisplay = publishedForm[0]; // Accede al primer formulario en el array

  // Verificación del formulario
  if (
    !formToDisplay ||
    !formToDisplay.fields ||
    formToDisplay.fields.length === 0
  ) {
    return <div>{`Publica un formulario en la ranura: ${jsonNumber}`}</div>;
  }

  return (
    <div>
      <h2>{formToDisplay.formName}</h2>
      <form ref={formRef} onSubmit={sendDataHandler}>
        {formToDisplay.fields.map((field, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <label>
              {field.label}:
              {field.type === "select" ? (
                <select
                  name={field.label.toLowerCase().replace(/\s+/g, "_")}
                  required
                >
                  <option value="">¿Eres socio/a?</option>
                  <option value="sí">Sí</option>
                  <option value="no">No</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.label.toLowerCase().replace(/\s+/g, "_")}
                  placeholder={field.label}
                  required
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormDisplay;
