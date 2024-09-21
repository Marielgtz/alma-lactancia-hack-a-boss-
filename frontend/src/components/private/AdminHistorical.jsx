import React from 'react'
import InstagramForm from '../InstagramForm'

const AdminHistorical = ({ instagramPost, setInstagramPost }) => {
    return (
        <InstagramForm
            setInstagramPost={setInstagramPost}
            instagramPost={instagramPost}
        />
    )
}

export default AdminHistorical
