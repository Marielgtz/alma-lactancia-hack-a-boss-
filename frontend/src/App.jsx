import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Activities from './pages/Activities'
import Library from './pages/Library'
import Collaborate from './pages/Collaborate'
import Contact from './pages/Contact'
import Prueba from './components/prueba'

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/quienes-somos' element={<About />} />
                    <Route path='/actividades' element={<Activities />} />
                    <Route path='/biblioteca' element={<Library />} />
                    <Route path='/colabora' element={<Collaborate />} />
                    <Route path='/contacto' element={<Contact />} />
                    <Route path='/prueba' element={<Prueba />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
