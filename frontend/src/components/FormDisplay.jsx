import useFormDisplay from '../hooks/useFormDisplay'

const FormDisplay = ({ publishedForm, setPublishedForm, jsonNumber }) => {
    const { sendDataHandler, formRef } = useFormDisplay(
        publishedForm,
        setPublishedForm,
        jsonNumber
    )
    if (!publishedForm?.fields) {
        return <div>{`Publica un formulario en la ranura: ${jsonNumber}`}</div>
    }

    return (
        <div>
            <h2>{publishedForm.formName}</h2>
            <form ref={formRef} onSubmit={sendDataHandler}>
                {publishedForm.fields.map((field, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <label>
                            {field.label}:
                            {field.type === 'select' ? (
                                <select
                                    name={field.label
                                        .toLowerCase()
                                        .replace(/\s+/g, '_')}
                                    required
                                >
                                    <option value=''>¿Eres socio/a?</option>
                                    <option value='sí'>Sí</option>
                                    <option value='no'>No</option>
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.label
                                        .toLowerCase()
                                        .replace(/\s+/g, '_')} // Para sustituir espacios en blanco por guiones bajos
                                    placeholder={field.label}
                                    required
                                />
                            )}
                        </label>
                    </div>
                ))}
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default FormDisplay
