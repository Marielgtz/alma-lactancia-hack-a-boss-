import { useEffect, useRef } from 'react'

const useFormDisplay = (publishedForm, setPublishedForm) => {
    //Para obtener el formulario publicado:
    useEffect(() => {
        const getPublishedForm = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + '/get-published-form'
                )

                if (response.ok) {
                    const data = await response.json()
                    setPublishedForm(data.form)
                } else {
                    console.error('Error al enviar los datos')
                }
            } catch (error) {
                console.log('No hay datos que mostrar:', error)
            }
        }
        getPublishedForm()
    }, [])

    // Ref para el formulario
    const formRef = useRef(null)

    //Para enviar los resultados del formulario:
    const sendDataHandler = async (event) => {
        event.preventDefault()

        if (!formRef.current) return

        const formElements = formRef.current.elements
        const formValues = Array.from(formElements).reduce((acc, element) => {
            if (element.name) {
                acc[element.name] = element.value
            }
            return acc
        }, {})

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    '/submit-form/' +
                    publishedForm.formName,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                }
            )

            if (response.ok) {
                console.log('Datos enviados exitosamente', formValues)
                formRef.current.reset()
            } else {
                console.error('Error al enviar los datos')
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        }
    }
    return { sendDataHandler, formRef }
}
export default useFormDisplay
