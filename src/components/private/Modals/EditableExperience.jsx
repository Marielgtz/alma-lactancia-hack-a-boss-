import React, { useState } from 'react'
import './EditableExperience.css'

const EditableExperience = ({
    experienceData,
    onClose,
    onUpdate,
    onDelete,
}) => {
    if (!experienceData) {
        return null
    }

    const [text, setText] = useState(experienceData.text)
    const [image, setImage] = useState(experienceData.image)

    const handleUpdate = () => {
        const updatedExperience = {
            ...experienceData,
            text,
        }
        if (image) {
            updatedExperience.image = image
        }
        onUpdate(updatedExperience)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className='close-modal'>
                    &times;
                </button>
                <li style={{ listStyle: 'none' }}>
                    <div className='experienceData-text'>
                        {experienceData.text}
                    </div>
                    <input type='file' onChange={handleImageChange} />
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Modificar</button>
                    <button onClick={() => onDelete(experienceData.id)}>
                        Borrar
                    </button>
                    <button onClick={onClose}>Cerrar</button>
                </li>
            </div>
        </div>
    )
}

export default EditableExperience
