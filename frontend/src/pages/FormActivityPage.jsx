import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormDisplay from '../components/FormDisplay'
import './FormActivityPage.css'
import { useParams } from 'react-router-dom'

const FormActivityPage = () => {
    const { activityNumber } = useParams()

    return (
        <div className='register-page'>
            <Header />
            <main className='register-main'>
                <FormDisplay jsonNumber={activityNumber} />
            </main>
            <Footer />
        </div>
    )
}

export default FormActivityPage
