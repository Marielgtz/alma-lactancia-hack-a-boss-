import useEditForm from '../hooks/useEditForm'

const EditForm = ({
    setEditingForm,
    selectedForm,
    setForms,
    setSelectedForm,
    setPublishedForm,
    publishedForm,
}) => {
    const { register, handleSubmit, onSubmit, fields, append, remove } =
        useEditForm(
            setEditingForm,
            selectedForm,
            setForms,
            setSelectedForm,
            setPublishedForm
        )
    const publishFormIndex = publishedForm.findIndex(
        (form) => form.formId === selectedForm?.formId
    )
    const handleFormSubmit = (data) => {
        onSubmit(data, publishFormIndex)
    }
    return (
        <div>
            <h2>Editor de Formularios</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor='formName' style={{ marginRight: '10px' }}>
                        Nombre del Formulario:
                    </label>
                    <span style={{ marginRight: '10px' }}>
                        {selectedForm?.formName}
                    </span>
                    <input
                        type='hidden'
                        {...register('formName', { required: true })}
                    />
                </div>

                <div>
                    {fields?.map((field, index) => (
                        <div key={field.id} style={{ marginBottom: '20px' }}>
                            <input
                                {...register(`fields[${index}].label`)}
                                placeholder='Etiqueta del Campo'
                                style={{ marginRight: '10px' }}
                            />
                            <select {...register(`fields[${index}].type`)}>
                                <option value='text'>Texto</option>
                                <option value='number'>Número</option>
                                <option value='email'>Email</option>
                                <option value='password'>Contraseña</option>
                            </select>
                            <button
                                type='button'
                                onClick={() => remove(index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type='button'
                    onClick={() => append({ label: '', type: 'text' })}
                    style={{ marginRight: '10px' }}
                >
                    Añadir Campo
                </button>

                <button onClick={() => setEditingForm(false)}>
                    Cerrar editor
                </button>
                <button type='submit'>Actualizar formulario</button>
            </form>
        </div>
    )
}

export default EditForm
