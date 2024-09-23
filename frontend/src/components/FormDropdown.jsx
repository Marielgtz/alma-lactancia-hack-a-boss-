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
    publishedActivities,
  } = useFormDropdown(
    forms,
    setForms,
    setPublishedForm,
    setEditingForm,
    setSelectedForm,
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
                {selectedForm?.fields.map((field, index) => {
                  if (field.label !== "Partner" && field.label !== "partner")
                    return <li key={index}>{field.label}</li>;
                })}
              </ul>

              {publishFormIndex !== -1 ? (
                <>
                  <p>
                    {`Asociado al evento: ${publishedActivities[publishFormIndex].summary}`}
                  </p>
                  <button
                    onClick={() =>
                      unPublishHandler(publishFormIndex.toString())
                    }
                  >
                    Despublicar
                  </button>
                </>
              ) : (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      publishHandler(
                        selectedForm?.formId,
                        e.target.elements.activity.value
                      );
                    }}
                  >
                    <select name="activity" id="activity">
                      <option value="">Seleccione evento</option>
                      {publishedActivities.map((activity, index) => {
                        return (
                          <option key={index} value={index + 1}>
                            {activity.summary}
                          </option>
                        );
                      })}
                    </select>
                    <button>Publicar formulario</button>
                  </form>
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
      )}
    </div>
  );
};

export default FormDropdown;
