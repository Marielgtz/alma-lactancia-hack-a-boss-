import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import Footer from '../components/Footer'
import silueta from '../images/IlustracionLactancia.png'
import imageHome from '../images/Alma_Lactancia_-_Foto_hero.jpg'
import ButtonUp from '../components/ButtonUp'
import useContactInfo from '../hooks/useContactInfo.js'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Home.css'

// URL de la imagen proporcionada (icono pecho)
const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png'    


const Home = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const { home } = useContactInfo()
    const [cardsToShow, setCardsToShow] = useState(2)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [experiences, setExperiences] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const imageHomeSrc = home?.imageHome
    const textsNosotras = home?.sectionText ? home.sectionText.split('\n') : []
    const titleCTA = home?.titleHome || ''

    const navigate = useNavigate()

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth < 768) {
                setCardsToShow(1)
            } else {
                setCardsToShow(2)
            }
        }

        window.addEventListener('resize', updateCardsToShow)
        updateCardsToShow()

        return () => window.removeEventListener('resize', updateCardsToShow)
    }, [])

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/get-filtered-experiences`
                )
                if (!response.ok) {
                    const data = response.json()
                    console.log(data)
                    throw new Error(data, 'Error al obtener las experiencias')
                }
                const data = await response.json()

                setExperiences(data.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchExperiences()
    }, [])

    const totalExperiences = experiences.length

    const nextSlide = () => {
        if (currentIndex < totalExperiences - cardsToShow) {
            setCurrentIndex(currentIndex + cardsToShow)
        } else {
            setCurrentIndex(0)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - cardsToShow)
        } else {
            setCurrentIndex(totalExperiences - cardsToShow)
        }
    }

    const handleActivitiesClick = () => {
        navigate('/actividades')
    }

    if (loading)
        return (
            <div className='loading-container'>
                <FontAwesomeIcon
                    icon={faSpinner}
                    className='spinner'
                    spin
                    size='2x'
                />
            </div>
        )

    if (error) return <p>Error: {error}</p>

    return (
        <div className='home-page'>
            <Header />
            <main className='main-home'>
                <ButtonUp />
                <div className='img-section'>
                    <div className='background-image'>
                        <img
                            className='imageHome-img'
                            src={imageHomeSrc}
                            alt='imagen bebe'
                        />
                    </div>
                    <div className='support-button'>
                        <p>{titleCTA}</p>
                        <button
                            className='activities-button'
                            onClick={handleActivitiesClick}
                        >
                            Nuestras actividades
                        </button>
                    </div>
                </div>
                <div className='content'>
                    <h2 className='section-title'>Nosotras</h2>
                    <div className='centered-container'>
                        {textsNosotras.map((parrafo, index) => (
                            <p key={index} className='sectionText-nosotras'>
                                {parrafo}
                            </p>
                        ))}
                    </div>
                    <img
                        src={silueta}
                        className='img-silueta'
                        alt='silueta lactancia'
                    />
                    <Calendar />
                </div>
                <div className='experience-section'>
                    <h2 className='experience-title'>Experiencias reales</h2>
                    <div className='experience-carousel'>
                        <div className='carousel-controls'>
                            <button
                                className='carousel-control prev'
                                onClick={prevSlide}
                            >
                                <i className='fas fa-chevron-left'></i>
                            </button>
                        </div>
                        <div className='experience-cards'>
                            {experiences
                            .slice(currentIndex, currentIndex + cardsToShow)
                            .map((experience) => (
                                <div
                                    key={experience.id}
                                    className='experience-card'
                                >
                                    <img
                                        src={experience.image !== 'Sin imagen'
                                            ? experience.image
                                            : DEFAULT_IMAGE_URL
                                        }
                                        alt={experience.image}
                                    />
                                    <p>{experience.text}</p>
                                </div>
                            ))}
                        </div>
                            <button
                                className='carousel-control next'
                                onClick={nextSlide}
                            >
                                <i className='fas fa-chevron-right'></i>
                            </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home
