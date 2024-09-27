import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Captcha from '../components/Captcha'
import silueta from '../images/IlustracionLactancia.png'
import { useNavigate } from 'react-router-dom'
import useContactInfo from '../hooks/useContactInfo.js'
import './Contact.css'

const Contact = () => {
    const { generalSettings } = useContactInfo()
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        subject: '',
        comments: '',
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async () => {
        try {
            // Realizar la solicitud POST al backend
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/new-contact-message',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje')
            }

            const data = await response.json()
            console.log(data.comments)

            // Redirigir a la página de confirmación
            navigate('/confirmacion')
        } catch (error) {
            console.error('Error al enviar el mensaje:', error)
            alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.')
        }
    }

    const instagramLink = generalSettings?.linkInstagram || ''
    const facebookLink = generalSettings?.linkFacebok || ''
    const email = generalSettings?.email || ''

    return (
        <div className='contact-page'>
            <Header />
            <main className='contact-main'>
                <h1 className='contact-title'>Contacto</h1>
                <div className='contact-content'>
                    <form id='contact'>
                        <div className='name-fields'>
                            <div className='name-field'>
                                <label htmlFor='name'>
                                    Nombre completo
                                    <span className='required'>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='name-field'>
                                <label htmlFor='surname'>
                                    Apellido completo
                                    <span className='required'>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='surname'
                                    name='surname'
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <label htmlFor='email'>
                            Correo electrónico
                            <span className='required'>*</span>
                        </label>
                        <input
                            type='email'
                            className='email-input'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='subject'>
                            Asunto<span className='required'>*</span>
                        </label>
                        <input
                            type='text'
                            className='subject-input'
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='comments'>Mensaje</label>
                        <textarea
                            id='comments'
                            name='comments'
                            value={formData.comments}
                            onChange={handleChange}
                        ></textarea>

                        <Captcha handleSubmit={handleSubmit} />
                        {/* <button className="contact-button" type="submit">
              Enviar
            </button> */}
                    </form>

                    <div className='contact-info'>
                        <p>
                            También podéis contactar con la Asociación ALMA a
                            través de cualquiera de los siguientes medios:
                        </p>
                        <p>
                            <a href={email} className='contact-info-icon'>
                                <i className='fas fa-envelope'></i> {email}
                            </a>
                        </p>
                        <p>
                            <a
                                href={instagramLink}
                                className='contact-info-icon'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <i className='fab fa-instagram'></i>{' '}
                                {instagramLink}
                            </a>
                        </p>
                        <p>
                            <a
                                href={facebookLink}
                                className='contact-info-icon'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <i className='fab fa-facebook'></i>{' '}
                                {facebookLink}
                            </a>
                        </p>
                        <img src={silueta} />
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default Contact
