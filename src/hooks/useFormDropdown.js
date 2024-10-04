import { useState, useEffect } from 'react'
import { getCalendarEvents } from '../services/api'

const useFormDropdown = (
    forms,
    setForms,
    setPublishedForm,
    setEditingForm,
    setSelectedForm
) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [publishedActivities, setPublishedActivities] = useState('')

    //Obtener los formularios creados:
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/get-all-forms')
            .then((response) => response.json())
            .then((data) => {
                setForms(data.forms || {})
            })
            .catch((error) => {
                console.error('Error al obtener los formularios:', error)
            })

        const getPublishedForm = async (jsonNumber) => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL +
                        `/get-published-form/${jsonNumber}`
                )
                if (response.ok) {
                    const data = await response.json()

                    if (Object.keys(data.form).length === 0) {
                        setPublishedForm((prevData) => {
                            const newData = [...prevData]
                            newData.splice(Number(jsonNumber) - 1, 1, {})
                            return newData
                        })
                    } else {
                        setPublishedForm((prevData) => {
                            const newData = [...prevData]
                            newData.splice(Number(jsonNumber) - 1, 1, data.form)
                            return newData
                        })
                    }
                } else {
                    const data = await response.json()
                    throw new Error(data.error)
                }
            } catch (error) {
                console.log('No hay datos que mostrar')
            }
        }

        //Máximo de formularios publicados al mismo tiempo. Cambiar length si se requieren más.
        Array.from({ length: 10 }, (_, index) => {
            getPublishedForm(index + 1)
        })
    }, [])

    //Los eventos publicados (para asociarlos a las hojas al publicar)
    useEffect(() => {
        async function fetchCalendar() {
            const calendarEvents = await getCalendarEvents()
            if (calendarEvents) {
                setPublishedActivities(calendarEvents)
            }
        }

        fetchCalendar()
    }, [])

    //Seleccionar un formulario de la lista:
    const handleSelectForm = (formId) => {
        const data = forms[formId]
        const newData = { ...data, formId: formId }
        setSelectedForm(newData)
    }

    //Convierto el objeto de formularios a una matriz y omito el primer objeto(que son las cabeceras):
    let formEntries = {}
    if (forms) {
        formEntries = Object.entries(forms)
    }

    //Filtro los datos por el buscador:
    const filteredFormEntries = formEntries
        .slice(1)
        .filter(([_, form]) =>
            form.formName
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim())
        )

    //Publicar formulario:
    const publishHandler = async (formId, jsonNumber) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/get-form/${formId}/publish/${jsonNumber}` //Este último parámetro es opcional, si se envía (un valor truthy), se guardarán los datos en el servidor y estarán disponibles para el endpoint de formulario publicado.
            )

            if (response.ok) {
                console.log('Formulario publicado exitosamente')
                const data = await response.json()
                setPublishedForm((prevData) => {
                    const newData = [...prevData]
                    newData.splice(Number(jsonNumber) - 1, 1, data.form)
                    return newData
                })
            } else {
                console.error('Error al publicar el formulario')
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        }
    }

    //Despublicar formulario:
    const unPublishHandler = async (jsonNumber) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/unpublish-form/${
                    Number(jsonNumber) + 1
                }`
            )

            if (response.ok) {
                const data = await response.json()
                setPublishedForm((prevData) => {
                    const newData = [...prevData]
                    newData[jsonNumber] = {}
                    return newData
                })
                console.log(data.message)
            } else {
                console.error('Error al despublicar el formulario')
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        }
    }

    const checkIsPublishHandler = async (id, jsonNumber) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/check-is-published/${id}/${
                Number(jsonNumber) + 1
            }`
        )
        if (response.ok) {
            const data = await response.json()
            if (data.isPublished) {
                const unPublish = window.confirm(
                    'El formulario está publicado, ¿quiere despublicarlo?'
                )
                if (unPublish) {
                    unPublishHandler(jsonNumber)
                }
            }
        } else {
            console.error('Ha habido un error')
        }
    }

    //Handlers del modal customDialog:
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleYes = async (id, sheetName, jsonNumber) => {
        //Compruebo si el formulario que se quiere borrar está publicado:
        checkIsPublishHandler(id, jsonNumber)

        //Sigo con la lógica de borrado:
        const url = `${
            import.meta.env.VITE_API_URL
        }/delete-form/${id}/deleteSheet/${sheetName}`
        deleteForm(id, url)
        closeModal()
    }

    const handleNo = (id, jsonNumber) => {
        checkIsPublishHandler(id, jsonNumber)
        const url = `${import.meta.env.VITE_API_URL}/delete-form/${id}`
        deleteForm(id, url)
        closeModal()
    }

    const handleCancel = () => {
        console.log('Acción cancelada')
        closeModal()
    }

    //Borrar un formulario:
    const deleteForm = async (formId, url) => {
        try {
            const response = await fetch(url, { method: 'DELETE' })
            if (response.ok) {
                console.log('Formulario borrado')
                const data = await response.json()
                setSelectedForm(null)

                //Actualizo el estado para que se reflejen los cambios inmediatamante:
                const filteredForms = formEntries.filter(
                    ([key]) => key !== formId
                )
                if (filteredForms.length > 0) {
                    // Reconstruyo el nuevo objeto de formularios con los valores filtrados:
                    const newList = Object.fromEntries(filteredForms)
                    setForms(newList)
                }
            } else {
                console.error('Error al borrar el formulario')
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        }
    }
    const editFormHandler = () => {
        setEditingForm(true)
    }

    return {
        handleSelectForm,
        formEntries,
        publishHandler,
        unPublishHandler,
        isModalOpen,
        openModal,
        closeModal,
        handleYes,
        handleNo,
        handleCancel,
        searchTerm,
        setSearchTerm,
        filteredFormEntries,
        editFormHandler,
        publishedActivities,
    }
}
export default useFormDropdown
