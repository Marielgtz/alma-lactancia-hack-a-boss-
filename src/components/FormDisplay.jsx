import useFormDisplay from '../hooks/useFormDisplay.js'
import CaptchaComponent from './Captcha.jsx'
import './FormDisplay.css'

const FormDisplay = ({ jsonNumber, title }) => {
    const { sendDataHandler, formRef, formToShow } = useFormDisplay(jsonNumber)
    if (!formToShow?.fields) {
        return <div>No hay datos para mostrar.</div>
    }
    return (
        <div className='contenedor-formulario-display'>
            <p className='texto-anterior-titulo-formulario'>
                Te estás inscribiendo a la siguiente actividad:
            </p>
            <h2 className='titulo-formulario-inscripcion'>{title}</h2>
            <p className='texto-despues-titulo-formulario'>
                Rellena el formulario para formalizar la inscripción:
            </p>
            <form ref={formRef}>
                {formToShow.fields.map((field, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <label className='formulario-inscripcion-label'>
                            {field.type === 'select' ? (
                                <select
                                    name={field.label
                                        .toLowerCase()
                                        .replace(/\s+/g, '_')}
                                    required
                                    className='formulario-inscripcion-select'
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
                                        .replace(/\s+/g, '_')}
                                    placeholder={field.label}
                                    required
                                    className='formulario-inscripcion-input'
                                />
                            )}
                        </label>
                    </div>
                ))}
                <CaptchaComponent
                    handleSubmit={sendDataHandler}
                    captchaInputClassName={'captcha-input-formulario'}
                    buttonClassName={'boton-enviar-formulario-inscripcion'}
                />
            </form>
        </div>
    )
}

export default FormDisplay
