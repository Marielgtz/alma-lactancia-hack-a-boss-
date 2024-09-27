import useFormDisplay from '../hooks/useFormDisplay'
import CaptchaComponent from './Captcha'

const FormDisplay = ({ jsonNumber }) => {
    const { sendDataHandler, formRef, formToShow } = useFormDisplay(jsonNumber)
    if (!formToShow?.fields) {
        return <div>No hay datos para mostrar.</div>
    }
    return (
        <div>
            <h2>{formToShow.formName}</h2>
            <form ref={formRef}>
                {formToShow.fields.map((field, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <label>
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
                <CaptchaComponent
                    handleSubmit={sendDataHandler}
                    buttonClassName={'sin_clase'}
                />
            </form>
        </div>
    )
}

export default FormDisplay
