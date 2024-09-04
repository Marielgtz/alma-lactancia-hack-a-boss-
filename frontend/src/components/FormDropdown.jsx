import useFormDropdown from '../hooks/useFormDropdown'
import CustomDialog from '../components/customDialog'

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
        setSelectedForm
    )

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
                type='text'
                placeholder='Buscar formulario...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            {selectedForm && (
                <div>
                    <h3>Formulario: {selectedForm?.formName}</h3>
                    <ul>
                        {selectedForm?.fields.map((field, index) => (
                            <li key={index}>{field.label}</li>
                        ))}
                    </ul>
                    {publishedForm?.formId === selectedForm?.formId ? (
                        <button onClick={() => unPublishHandler()}>
                            Despublicar
                        </button>
                    ) : (
                        <button
                            onClick={() => publishHandler(selectedForm?.formId)}
                        >
                            Publicar
                        </button>
                    )}
                    <button onClick={editFormHandler}>Editar</button>
                    <button onClick={openModal}>Borrar</button>
                    {isModalOpen && (
                        <CustomDialog
                            onYes={() =>
                                handleYes(
                                    selectedForm?.formId,
                                    selectedForm?.formName
                                )
                            }
                            onNo={() => handleNo(selectedForm?.formId)}
                            onCancel={handleCancel}
                            message={
                                '¿Borrar hoja de cálculo asociada? (Se perderán los datos de los asistentes)'
                            }
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default FormDropdown
