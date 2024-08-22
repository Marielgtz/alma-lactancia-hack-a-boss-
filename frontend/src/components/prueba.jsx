import { useState } from 'react'
import InstagramForm from '../components/InstagramForm'
import InstagramPost from '../components/InstagramPost'

const Prueba = () => {
    const [instagramPost, setInstagramPost] = useState('')

    return (
        <div>
            <h1>Publicaciones Instagram</h1>
            <InstagramForm setInstagramPost={setInstagramPost} />
            <InstagramPost instagramPost={instagramPost} />
        </div>
    )
}
export default Prueba
