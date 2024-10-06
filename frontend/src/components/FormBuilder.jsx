import useFormBuilder from "../hooks/useFormBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./FormBuilder.css";

const FormBuilder = ({ setForms }) => {
  const { onSubmit, register, handleSubmit, fields, append, remove } =
    useFormBuilder(setForms);

  return (
    <div className="contenedor-creador-formularios">
      <h2>Creador de Formularios</h2>
      <h3>1. Escribe el nombre de la nueva actividad</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contenedor-input-creador-formularios">
          <input
            className="input-creador-formularios"
            {...register("formName", { required: true })}
            placeholder="Nombre del Formulario"
          />
        </div>

        <div>
          {fields.map((item, index) => (
            <div
              className="contenedor-añadir-campo"
              key={index}
              style={{ marginBottom: "20px" }}
            >
              <h3>Selecciona el tipo de campo:</h3>

              <select
                className="select-creador-formularios"
                {...register(`fields.${index}.type`)}
              >
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="email">Email</option>
                <option value="password">Contraseña</option>
              </select>
              <h3>Escribe el contenido del campo</h3>

              <input
                className="input-creador-formularios"
                {...register(`fields.${index}.label`)}
                placeholder="Etiqueta del Campo"
                style={{ marginRight: "10px" }}
              />

              <button
                className="boton-eliminar-campo-formulario "
                type="button"
                onClick={() => remove(index)}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar campo
              </button>
            </div>
          ))}
        </div>
        <div className="contenedor-botones-añadir-generar-form">
          <button
            className="boton-añadir-campo-formulario"
            type="button"
            onClick={() => append({ label: "", type: "text" })}
          >
            <FontAwesomeIcon icon={faPlus} /> Añadir otro campo
          </button>
        </div>
        <div className="contenedor-botones-añadir-generar-form">
          <button type="submit" className="boton-generar-formulario">
            <FontAwesomeIcon icon={faCheck} /> Generar formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
