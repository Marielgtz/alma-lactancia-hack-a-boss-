import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminGeneral.css'

const API_BASE_URL = import.meta.env.VITE_API_URL
const AdminGeneral = () => {
    const [settings, setSettings] = useState({
        logo: '',
        linkInstagram: '',
        linkFacebok: '',
        email: '',
    })
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('success')

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/get-home-data`)
            .then((response) => {
                const { generalSettings } = response.data.form
                setSettings(generalSettings)
            })
            .catch((error) =>
                console.error('Error al obtener los datos:', error)
            )
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }))
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const validateAndUpdateField = async (fieldName, value) => {
        // Validar campos vacíos
        if (fieldName !== 'logo' && !value) {
            setMessageType('error')
            setMessage(`El campo de ${fieldName} no puede estar vacío`)
            setTimeout(() => {
                setMessage('')
            }, 3000)
            return
        }

        try {
            if (fieldName === 'logo' && file) {
                // Si es un archivo, usa FormData
                const formData = new FormData()
                formData.append('logo', file)

                await axios
                    .patch(`${API_BASE_URL}/update-home-data`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        const { generalSettings } = response.data.data
                        setSettings(generalSettings)
                    })
                    .catch((error) =>
                        console.error('Error al obtener los datos:', error)
                    )
            } else {
                // Si es texto (como Instagram, Facebook, Email), envía JSON
                const updateData = {
                    generalSettings: {
                        [fieldName]: value,
                    },
                }

                await axios.patch(
                    `${API_BASE_URL}/update-home-data`,
                    updateData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
            }

            // Mostrar mensaje de éxito
            setMessageType('success')
            setMessage(`${fieldName} actualizado correctamente`)
        } catch (error) {
            // Mostrar mensaje de error
            setMessageType('error')
            setMessage(`Error al actualizar ${fieldName}: ${error.message}`)
        }

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    return (
        <main className='settings-content-general'>
            {message && (
                <div className={`popup-message ${messageType}`}>{message}</div>
            )}
            <div className='logo-section'>
                <h3>Logotipo</h3>
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : API_BASE_URL + '/images/' + settings?.logo
                    }
                    alt='Logo'
                    className='logo-image'
                />
                <div className='logo-buttons'>
                    <input type='file' onChange={handleFileChange} />
                </div>
                <div className='actualizar-logo-boton'>
                    <button
                        onClick={() => validateAndUpdateField('logo', file)}
                    >
                        Actualizar Logotipo
                    </button>
                </div>
            </div>

            <form className='social-links-form'>
                <label>
                    Link de Instagram
                    <input
                        type='text'
                        name='linkInstagram'
                        placeholder='Nueva dirección de Instagram'
                        value={settings.linkInstagram || ''}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        onClick={() =>
                            validateAndUpdateField(
                                'linkInstagram',
                                settings.linkInstagram
                            )
                        }
                    >
                        <i className='fab fa-instagram'></i> Actualizar
                        Instagram
                    </button>
                </label>

                <label>
                    Link de Facebook
                    <input
                        type='text'
                        name='linkFacebok'
                        placeholder='Nueva dirección de Facebook'
                        value={settings.linkFacebok || ''}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        onClick={() =>
                            validateAndUpdateField(
                                'linkFacebok',
                                settings.linkFacebok
                            )
                        }
                    >
                        <i className='fab fa-facebook'></i> Actualizar Facebook
                    </button>
                </label>

                <label>
                    Correo Electrónico
                    <input
                        type='email'
                        name='email'
                        placeholder='Nueva dirección de correo electrónico'
                        value={settings.email || ''}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        onClick={() =>
                            validateAndUpdateField('email', settings.email)
                        }
                    >
                        <i className='fas fa-envelope'></i> Actualizar Correo
                    </button>
                </label>
            </form>
        </main>
    )
}

export default AdminGeneral
