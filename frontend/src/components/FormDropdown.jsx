import useFormDropdown from "../hooks/useFormDropdown";
import CustomDialog from "../components/customDialog";

const FormDropdown = ({
  forms,
  setForms,
  setPublishedForm,
  publishedForm,
  setEditingForm,
  setSelectedForm,
  selectedForm,
}) => {
  const {
    handleSelectForm,
    formEntries,
    publishHandler,
    unPublishHandler,
    handleYes,
    handleNo,
    handleCancel,
    isModalOpen,
    openModal,
    searchTerm,
    setSearchTerm,
    filteredFormEntries,
    editFormHandler,
  } = useFormDropdown(
    forms,
    setForms,
    setPublishedForm,
    setEditingForm,
    setSelectedForm,
    publishedForm,
    selectedForm
  );

  const publishFormIndex = publishedForm.findIndex(
    (form) => form.formId === selectedForm?.formId
  );
  return (
    <div>
      <h2>Seleccione un formulario:</h2>
      <ul>
        {filteredFormEntries?.map(([formId, form], index) => (
          <li key={index} onClick={() => handleSelectForm(formId)}>
            {form.formName}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Buscar formulario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      {selectedForm && (
        <div>
          <h3>Formulario: {selectedForm?.formName}</h3>
          <ul>
            {selectedForm?.fields.map((field, index) => (
              <li key={index}>{field.label}</li>
            ))}
          </ul>

          {publishFormIndex !== -1 ? (
            <button
              onClick={() => unPublishHandler(publishFormIndex.toString())}
            >
              Despublicar
            </button>
          ) : (
            <>
              <button onClick={() => publishHandler(selectedForm?.formId, 1)}>
                Publicar Evento 1
              </button>
              <button onClick={() => publishHandler(selectedForm?.formId, 2)}>
                Publicar Evento 2
              </button>
              <button onClick={() => publishHandler(selectedForm?.formId, 3)}>
                Publicar Evento 3
              </button>
              <button onClick={() => publishHandler(selectedForm?.formId, 4)}>
                Publicar Evento 4
              </button>
            </>
          )}
          <button onClick={editFormHandler}>Editar</button>
          <button onClick={openModal}>Borrar</button>
          {isModalOpen && (
            <CustomDialog
              onYes={() =>
                handleYes(
                  selectedForm?.formId,
                  selectedForm?.formName,
                  publishFormIndex
                )
              }
              onNo={() => handleNo(selectedForm?.formId, publishFormIndex)}
              onCancel={handleCancel}
              message={
                "¿Borrar hoja de cálculo asociada? (Se perderán los datos de los asistentes)"
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
