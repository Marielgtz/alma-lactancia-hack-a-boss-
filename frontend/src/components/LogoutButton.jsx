import { useNavigate } from 'react-router-dom'
import clearSessionData from '../utils/clearSessionData'

function LogoutButton() {
    const navigate = useNavigate()
    const logout = import.meta.env.VITE_API_URL + '/logout'
    const handleLogout = async () => {
        try {
            const logoutGoogle = () => {
                const logoutURL = 'https://accounts.google.com/logout'
                window.open(logoutURL, '_blank', 'width=500,height=500')
            }

            const response = await fetch(logout, {
                method: 'POST',
                credentials: 'include',
            })

            if (response.ok) {
                logoutGoogle()
                clearSessionData()
                navigate('/')
            } else {
                console.error('Error al cerrar la sesión')
            }
        } catch (error) {
            console.error('Error al cerrar la sesión:', error)
        }
    }

    return (
        <button className='logout-btn' onClick={handleLogout}>
            Cerrar Sesión
        </button>
    )
}

export default LogoutButton
