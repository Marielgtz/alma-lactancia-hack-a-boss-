import { useState } from 'react'

const useInstagramForm = (setInstagramPost) => {
    try {
        const [blockquote, setBlockquote] = useState('')
        const [postNumber, setPostNumber] = useState('')

        const handlePostNumberChange = (e) => {
            setPostNumber(e.target.value)
        }
        const handleDeletePost = async (e) => {
            e.preventDefault()
            //Ver si hay un post publicado en esta ranura:
            let isPublish
            const postUrl = `${
                import.meta.env.VITE_API_URL
            }/check-instagram-post/${postNumber}`

            try {
                const response = await fetch(postUrl, {
                    method: 'GET',
                })

                if (response.ok) {
                    const res = await response.json()
                    isPublish = res.isPublished
                    console.log(res.message, isPublish)
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
            }
            if (!isPublish) {
                window.alert('No hay publicaciones en esa ranura')
                return
            }

            //Continuar con la lógica de borrar:
            const confirm = window.confirm(
                `Estás a punto de borrar la publicación ${postNumber}, ¿quieres continuar?`
            )
            if (!confirm) return
            const url = `${
                import.meta.env.VITE_API_URL
            }/unpublish-instagram-post/${postNumber}`

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    const res = await response.json()
                    console.log(res.message)
                    setInstagramPost((prevData) => {
                        const newData = [...prevData]
                        newData[Number(postNumber) - 1] = {}
                        return newData
                    })
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
            }
        }
        const handleSubmit = async (e) => {
            e.preventDefault()

            const url = `${
                import.meta.env.VITE_API_URL
            }/save-instagram-post/${postNumber}`

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: blockquote }),
                })

                if (response.ok) {
                    const res = await response.json()
                    console.log(res.message)
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
            }

            setInstagramPost((prevData) => {
                const newData = [...prevData]
                newData[Number(postNumber) - 1] = { code: blockquote }
                return newData
            })

            setBlockquote('')
        }
        return {
            blockquote,
            setBlockquote,
            postNumber,
            setPostNumber,
            handlePostNumberChange,
            handleSubmit,
            handleDeletePost,
        }
    } catch (error) {}
}
export default useInstagramForm
