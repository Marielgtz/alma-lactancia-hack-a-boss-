import useInstagramForm from '../hooks/useInstagramForm'
import "./InstagramForm.css"

const InstagramForm = ({ setInstagramPost, setSelectedPostNumber }) => {
    const {
        blockquote,
        setBlockquote,
        postNumber,
        handlePostNumberChange,
        handleSubmit,
        handleDeletePost,
    } = useInstagramForm(setInstagramPost)

    const handlePostChange = (e) => {
        handlePostNumberChange(e);
        setSelectedPostNumber(e.target.value); 
    };

    return (
        <form className='instagram-form-container' onSubmit={handleSubmit}>
            <div className='instagram-form-input-select'>
            <select
                className='instagram-form-select'
                name='postNumber'
                onChange={handlePostChange}
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
            <input
                className='instagram-form-input'
                type='text'
                required
                value={blockquote}
                onChange={(e) => setBlockquote(e.target.value)}
                placeholder='Introduce el código de inserción de Instagram'
            />
            </div>
            <div className='instagram-form-buttons'>
            <button className='instagram-form-button-submit' type='submit'>Compartir publicación</button>
                <button className='instagram-form-button-delete' onClick={handleDeletePost}>X Borrar publicación</button>
                </div>
        </form>
    )
}

export default InstagramForm
