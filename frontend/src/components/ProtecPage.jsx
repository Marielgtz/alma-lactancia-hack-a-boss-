import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectPage({ children }) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const checkSession = import.meta.env.VITE_API_URL + '/check-session'

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(checkSession, {
                    credentials: 'include',
                })

                if (response.ok) {
                    const data = await response.json()
                    setUser(data.user) // Si la respuesta es ok se guardan los datos del usuario en el estado, si esto fuera necesario.
                } else {
                    // Si no está autorizado, se redirige a otra parte.
                    navigate('/')
                }
            } catch (error) {
                console.error('Error checking session:', error)
                navigate('/') // En caso de error, también se redirige al usuario a otra parte.
            }
        }

        checkSession()
    }, [navigate, checkSession])

    if (!user) {
        return <div>Loading...</div>
    }

    return children
}

export default ProtectPage

//Para proteger una página, envolver el componente en el componente protector:
/* <Route
path='/pruebas'
element={
    <ProtectPage>
        <Prueba />
    </ProtectPage>
}
/> */
