import { useState } from 'react'

const InstagramForm = ({ setInstagramPost }) => {
    const [blockquote, setBlockquote] = useState('')
    const [postNumber, setPostNumber] = useState('')

    const handlePostNumberChange = (e) => {
        setPostNumber(e.target.value)
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
                console.log('Mensaje del servidor:', res.message)
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                required
                value={blockquote}
                onChange={(e) => setBlockquote(e.target.value)}
                placeholder='Introduce el código de inserción de Instagram'
            />
            <select
                name='postNumber'
                onChange={handlePostNumberChange}
                value={postNumber}
                required
            >
                <option value=''>Selecciona una publicación</option>
                <option value='1'>Publicación 1</option>
                <option value='2'>Publicación 2</option>
                <option value='3'>Publicación 3</option>
                <option value='4'>Publicación 4</option>
                <option value='5'>Publicación 5</option>
                <option value='6'>Publicación 6</option>
            </select>
            <button type='submit'>Compartir publicación</button>
        </form>
    )
}

export default InstagramForm
