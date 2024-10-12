import useFormDropdown from '../hooks/useFormDropdown'
import CustomDialog from '../components/customDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './FormDropdown.css'
import { useEffect } from 'react'

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
        publishedForm,
        selectedForm
    )

    useEffect(() => {
        console.log('Published activities updated:', publishedActivities)
    }, [publishedActivities])

    useEffect(() => {
        console.log('Selected form:', selectedForm)
    }, [selectedForm])

    const publishFormIndex =
        Array.isArray(publishedForm) && selectedForm
            ? publishedForm.findIndex(
                  (form) => form.formId === selectedForm.formId
              )
            : -1
    return (
        <div className='contenedor-seleccione-formulario'>
            <div className='contenedor-titulo-buscador'>
                <h2>Busca y selecciona un formulario...</h2>
                <input
                    className='buscar-formulario-input'
                    type='text'
                    placeholder='🔍 Busca un formulario...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='contenedor-listado-formularios'>
                <ul>
                    {filteredFormEntries?.map(([formId, form], index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectForm(formId)}
                        >
                            {form.formName}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedForm && (
                <div>
                    <h3>Formulario: {selectedForm?.formName}</h3>
                    <ul>
                        {selectedForm?.fields.map((field, index) => {
                            if (
                                field.label !== 'Partner' &&
                                field.label !== 'partner'
                            )
                                return <li key={index}>{field.label}</li>
                        })}
                    </ul>

                    {publishFormIndex !== -1 &&
                    publishedActivities[publishFormIndex] ? (
                        <>
                            <p>
                                {`Asociado al evento: ${
                                    publishedActivities[publishFormIndex] &&
                                    publishedActivities[publishFormIndex]
                                        ?.summary
                                }`}
                            </p>
                            <button
                                onClick={() =>
                                    unPublishHandler(
                                        publishFormIndex.toString()
                                    )
                                }
                            >
                                Despublicar
                            </button>
                        </>
                    ) : (
                        <>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    publishHandler(
                                        selectedForm?.formId,
                                        e.target.elements.activity.value
                                    )
                                }}
                            >
                                <select
                                    className='selector-evento-formularios'
                                    name='activity'
                                    id='activity'
                                >
                                    <option value=''>Seleccione evento</option>
                                    {publishedActivities.map(
                                        (activity, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={index + 1}
                                                >
                                                    {activity.summary}
                                                </option>
                                            )
                                        }
                                    )}
                                </select>
                                <button className='boton-publicar-formulario-dropdown'>
                                    Publicar formulario
                                </button>
                            </form>
                        </>
                    )}
                    <button
                        className='boton-editar-formulario-dropdown'
                        onClick={editFormHandler}
                    >
                        <i className='fas fa-edit icon'></i> Editar
                    </button>
                    <button
                        className='boton-eliminar-campo-editar-formulario'
                        onClick={openModal}
                    >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </button>
                    {isModalOpen && (
                        <CustomDialog
                            onYes={() =>
                                handleYes(
                                    selectedForm?.formId,
                                    selectedForm?.formName,
                                    publishFormIndex
                                )
                            }
                            onNo={() =>
                                handleNo(selectedForm?.formId, publishFormIndex)
                            }
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
