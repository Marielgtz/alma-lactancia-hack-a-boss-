import { useEffect, useRef } from 'react'

const useFormDisplay = (publishedForm, setPublishedForm, jsonNumber) => {
    //Para obtener el formulario publicado:
    useEffect(() => {
        const getPublishedForm = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL +
                        `/get-published-form/${jsonNumber}`
                )

                if (response.ok) {
                    const data = await response.json()
                    setPublishedForm((prevData) => {
                        const newData = [...prevData]
                        newData.splice(Number(jsonNumber) - 1, 1, data.form)
                        return newData
                    })
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
                    body: JSON.stringify({
                        ...formValues,
                        formName: publishedForm.formName,
                    }),
                }
            )

            if (response.ok) {
                console.log('Datos enviados exitosamente', formValues)
                formRef.current.reset()
            } else {
                const errorData = await response.json()
                const errorMessage = errorData.error || response.statusText
                throw new Error(errorMessage)
            }
        } catch (error) {
            console.error('Ha ocurrido un error:', error)
        }
    }
    return { sendDataHandler, formRef }
}
export default useFormDisplay