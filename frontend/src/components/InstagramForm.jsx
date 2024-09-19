import useInstagramForm from '../hooks/useInstagramForm'

const InstagramForm = ({ setInstagramPost }) => {
    const {
        blockquote,
        setBlockquote,
        postNumber,
        handlePostNumberChange,
        handleSubmit,
        handleDeletePost,
    } = useInstagramForm(setInstagramPost)
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
            <button onClick={handleDeletePost}>Borrar publicación</button>
        </form>
    )
}

export default InstagramForm
