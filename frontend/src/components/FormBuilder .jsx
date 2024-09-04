import useFormBuilder from '../hooks/useFormBuilder'

const FormBuilder = ({ setForms }) => {
    const { onSubmit, register, handleSubmit, fields, append, remove } =
        useFormBuilder(setForms)

    return (
        <div>
            <h2>Creador de Formularios</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        {...register('formName', { required: true })}
                        placeholder='Nombre del Formulario'
                        style={{ marginRight: '10px' }}
                    />
                </div>

                <div>
                    {fields.map((item, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <input
                                {...register(`fields.${index}.label`)}
                                placeholder='Etiqueta del Campo'
                                style={{ marginRight: '10px' }}
                            />
                            <select {...register(`fields.${index}.type`)}>
                                <option value='text'>Texto</option>
                                <option value='number'>Número</option>
                                <option value='email'>Email</option>
                                <option value='password'>Contraseña</option>
                            </select>
                            <button type='button' onClick={() => remove(index)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type='button'
                    onClick={() => append({ label: '', type: 'text' })}
                >
                    Añadir Campo
                </button>

                <button type='submit'>Generar Formulario</button>
            </form>
        </div>
    )
}

export default FormBuilder
