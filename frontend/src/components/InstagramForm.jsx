// src/InstagramForm.js
import React, { useState } from 'react'

const InstagramForm = ({ setInstagramPost }) => {
    const [blockquote, setBlockquote] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setInstagramPost(blockquote) // Actualiza el estado en el componente padre
        setBlockquote('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={blockquote}
                onChange={(e) => setBlockquote(e.target.value)}
                placeholder='Introduce el código de inserción de Instagram'
            />
            <button type='submit'>Compartir publicación</button>
        </form>
    )
}

export default InstagramForm
