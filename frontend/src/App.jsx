import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Activities from './pages/Activities'
import History from './pages/History'
import Library from './pages/Library'
import Collaborate from './pages/Collaborate'
import Contact from './pages/Contact'
import Confirmation from './pages/MsgConfirmation'
import Prueba from './components/prueba'
import NotFoundPage from './pages/NotFoundPage'
import AdminDashboard from './pages/private/Admin'
import Layout from './pages/private/Layout'

function App() {
    const instagramPostList = Array.from({ length: 6 }, () => {
        return {}
    }) //Número de publica
    const [instagramPost, setInstagramPost] = useState(instagramPostList)
    useEffect(() => {
        const fetchInstagramPost = async () => {
            const url = `${
                import.meta.env.VITE_API_URL
            }/get-all-instagram-posts`

            try {
                const response = await fetch(url)

                if (response.ok) {
                    const res = await response.json()
                    console.log(res.message)
                    setInstagramPost(res.posts)
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
            }
        }
        fetchInstagramPost()
    }, [])

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/quienes-somos' element={<About />} />
                    <Route path='/actividades' element={<Activities />} />
                    <Route
                        path='/historico'
                        element={
                            <History
                                instagramPost={instagramPost}
                                instagramPostList={instagramPostList}
                            />
                        }
                    />
                    <Route path='/biblioteca' element={<Library />} />
                    <Route path='/colabora' element={<Collaborate />} />
                    <Route path='/contacto' element={<Contact />} />
                    <Route path='/confirmacion' element={<Confirmation />} />
                    <Route
                        path='/prueba'
                        element={
                            <Prueba
                                instagramPost={instagramPost}
                                setInstagramPost={setInstagramPost}
                            />
                        }
                    />
                    {/* Rutas del DASHBOARD */}
                    <Route path='/dashboard' element={<Layout />}>
                        {' '}
                        {/* Esto sería el layout */}
                        <Route index element={<AdminDashboard />} />{' '}
                        {/* Al escribir /dashboard se pintará el elemento INDEX */}
                        <Route path='general' element={<Prueba />} />
                        <Route path='activities' element={<AdminDashboard />} />
                        <Route path='home' element={<Prueba />} />
                        <Route path='about' element={<Prueba />} />
                        <Route path='history' element={<Prueba />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
