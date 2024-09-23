import React, { useState } from 'react'
import InstagramForm from '../InstagramForm'
import InstagramPost from '../InstagramPost'
import './AdminHistorical.css'

const AdminHistorical = ({ instagramPost, setInstagramPost }) => {
    const [selectedPostNumber, setSelectedPostNumber] = useState(null)

    return (
        <main className='settings-content'>
            <h1>
                Introduce el código de inserción de instagram para publicar en
                la sección "Histórico"
            </h1>
            <InstagramForm
                setInstagramPost={setInstagramPost}
                setSelectedPostNumber={setSelectedPostNumber}
            />
            <div className='instagram-post-container'>
                {selectedPostNumber && (
                    <InstagramPost
                        instagramPost={instagramPost}
                        postNumber={selectedPostNumber}
                    />
                )}
            </div>
        </main>
    )
}

export default AdminHistorical
