import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate()
    const logout = import.meta.env.VITE_API_URL + '/logout'
    const handleLogout = async () => {
        try {
            const response = await fetch(logout, {
                method: 'POST',
                credentials: 'include',
            })

            if (response.ok) {
                navigate('/')
            } else {
                console.error('Error al cerrar la sesión')
            }
        } catch (error) {
            console.error('Error al cerrar la sesión:', error)
        }
    }

    return <button onClick={handleLogout}>Cerrar Sesión</button>
}

export default LogoutButton
