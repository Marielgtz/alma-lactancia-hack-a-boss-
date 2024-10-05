import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import fedalma from '../images/cropped-logo_fedalma_200.png'
import fedegalma from '../images/logo-fedegalma1-300x102.jpg'
import './About.css'

const defaultCollaboratorPicture = "https://res.cloudinary.com/dqhemn1nv/image/upload/v1728065521/59e10e0a-c67b-46bc-a663-2f66f7316077.png"

const About = () => {
    const [openInfo, setOpenInfo] = useState(null)
    const [teamMembers, setTeamMembers] = useState([])
    const [externalCollaborators, setExternalCollaborators] = useState([])

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const [teamResponse, externalResponse] = await Promise.all([
                    fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/get-all-collaborators/false`
                    ),
                    fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/get-all-collaborators/true`
                    ),
                ])

                if (!teamResponse.ok || !externalResponse.ok) {
                    const errorResponse = await teamResponse.text() // Obtener texto de la respuesta
                    throw new Error(
                        `Error al obtener los colaboradores: ${errorResponse}`
                    )
                }

                const teamData = await teamResponse.json()
                const externalData = await externalResponse.json()
                setTeamMembers(teamData.data)
                setExternalCollaborators(externalData.data)

                console.log(teamMembers) //TODO - Sin imagen
                console.log(externalCollaborators) //TODO - Sin imagen
            } catch (error) {
                console.error('Error al obtener los colaboradores:', error)
            }
        }

        fetchCollaborators()
    }, [])

    const toggleInfo = (info) => {
        setOpenInfo(info === openInfo ? null : info)
    }

    return (
        <div className='about-page'>
            <Header />
            <main className='about-main'>
                <div className='img-section'>
                    <div className='background-image2'></div>
                    <h2 className='about-alma'>Alma Lactancia</h2>
                    <h1 className='about-title'>Equipo</h1>
                </div>

                {/* Sección del equipo */}
                <div className='about-people'>
                    {teamMembers.slice(0, 7).map((member) => (
                        <div key={member.id} className='person-card'>
                            <div className='person-card-inner'>
                                <div className='person-card-front'>
                                    {/* //! Estilos in-line */}
                                    <div style={{ maxHeight: '60%' }}>
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                            }}
                                            src={
                                                member.image &&
                                                member.image !== 'Sin imagen'
                                                    ? `${
                                                          import.meta.env
                                                              .VITE_API_URL
                                                      }/images/${member.image}`
                                                    : defaultCollaboratorPicture
                                            }
                                            alt={member.name}
                                            // src={test_Rosa}
                                            className='person-image'
                                        />
                                    </div>

                                    <div className='person-info'>
                                        <h3>{member.name}</h3>
                                        <p>{member.role}</p>
                                    </div>
                                </div>
                                <div className='person-card-back'>
                                    <p>{member.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sección de colaboraciones externas */}
                <h1 className='section-title1'>Colaboraciones externas</h1>
                <div className='about-collab'>
                    <div className='collab-container'>
                        {externalCollaborators
                            .slice(0, 5)
                            .map((collaborator) => (
                                <div
                                    key={collaborator.id}
                                    className='collab-card'
                                >
                                    <img
                                        src={
                                            collaborator.image &&
                                            collaborator.image !== 'Sin imagen'
                                                ? collaborator.image
                                                : defaultCollaboratorPicture
                                        }
                                        alt={collaborator.name}
                                        className='collab-image'
                                    />
                                    <h3>{collaborator.name}</h3>
                                    <p>{collaborator.role}</p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Sección de apoyo */}
                <div className='about-support'>
                    <h1 className='section-title2'>
                        Nuestro compromiso y apoyos
                    </h1>
                    <div className='collapsible-container-about'>
                        <div
                            className={`collapsible-header-about ${
                                openInfo === 'quehacemos' ? 'open' : ''
                            }`}
                            onClick={() => toggleInfo('quehacemos')}
                        >
                            <span className='collapsible-title-about'>
                                ¿Qué hacemos?
                            </span>
                            <span
                                className={`collapsible-arrow-about ${
                                    openInfo === 'quehacemos'
                                        ? 'open'
                                        : 'closed'
                                }`}
                            >
                                ᐳ
                            </span>
                        </div>
                        {openInfo === 'quehacemos' && (
                            <div className='collapsible-content-about'>
                                <ul>
                                    <li>
                                        Asesoría en lactancia en las reuniones,
                                        además de por correo electrónico y
                                        Whatsapp.
                                    </li>
                                    <li>
                                        Información puntual sobre nuestras
                                        actividades a través de Facebook e
                                        Instagram.
                                    </li>
                                    <li>
                                        Organizamos charlas y actividades para
                                        la normalización y conocimiento de las
                                        recomendaciones oficiales sobre
                                        lactancia materna, crianza en los
                                        primeros años, autocuidado materno y
                                        temas afines.
                                    </li>
                                    <li>
                                        Nos formamos e informamos
                                        constantemente: estar actualizadas es
                                        uno de nuestros principales ejercicios
                                        de responsabilidad para con las usuarias
                                        de la asociación.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='collapsible-container-about'>
                        <div
                            className={`collapsible-header-about ${
                                openInfo === 'quenohacemos' ? 'open' : ''
                            }`}
                            onClick={() => toggleInfo('quenohacemos')}
                        >
                            <span className='collapsible-title-about'>
                                ¿Qué no hacemos?
                            </span>
                            <span
                                className={`collapsible-arrow-about ${
                                    openInfo === 'quenohacemos'
                                        ? 'open'
                                        : 'closed'
                                }`}
                            >
                                ᐳ
                            </span>
                        </div>
                        {openInfo === 'quenohacemos' && (
                            <div className='collapsible-content-about'>
                                <ul>
                                    <li>
                                        No asesoramos sin datos fiables ni
                                        información actualizada.
                                    </li>
                                    <li>
                                        Tampoco alimentamos creencias infundadas
                                        ni mitos.
                                    </li>
                                    <li>
                                        No cobramos por nuestra labor, somos
                                        voluntarias.
                                    </li>
                                    <li>No visitamos a domicilio.</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='collapsible-container-about'>
                        <div
                            className={`collapsible-header-about ${
                                openInfo === 'quienapoya' ? 'open' : ''
                            }`}
                            onClick={() => toggleInfo('quienapoya')}
                        >
                            <span className='collapsible-title-about'>
                                ¿Quién nos apoya?
                            </span>
                            <span
                                className={`collapsible-arrow-about ${
                                    openInfo === 'quienapoya'
                                        ? 'open'
                                        : 'closed'
                                }`}
                            >
                                ᐳ
                            </span>
                        </div>
                        {openInfo === 'quienapoya' && (
                            <div className='collapsible-content-about'>
                                <ul>
                                    <li>
                                        Son varios los organismos locales y
                                        provinciales los que nos apoyan de
                                        distintas maneras.
                                    </li>
                                    <li>
                                        El Concello de Culleredo nos cede el
                                        local donde se celebran las reuniones de
                                        los viernes en dicho ayuntamiento y nos
                                        subvenciona el mantenimiento general de
                                        la asociación. Asimismo, nos cede
                                        espacios de uso público para realizar
                                        eventos y actividades.
                                    </li>
                                    <li>
                                        El Concello de A Coruña nos cede los
                                        espacios donde tienen lugar las
                                        reuniones de los martes en A Coruña y
                                        las charlas de embarazadas.
                                    </li>
                                    <li>
                                        La Diputación de A Coruña nos
                                        subvenciona la cartelería.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Entidades colaboradoras */}
                <h1 className='section-title3'>Entidades colaboradoras</h1>
                <div className='about-img'>
                    <img src={fedalma} className='fedalma-img' />
                    <img src={fedegalma} className='fedegalma-img' />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default About
