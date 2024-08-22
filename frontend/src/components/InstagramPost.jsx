import React, { useEffect } from 'react'

const InstagramPost = ({ instagramPost }) => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://www.instagram.com/embed.js'
        script.async = true
        script.onload = () => {
            window.instgrm.Embeds.process()
        }
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [instagramPost])

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: instagramPost }} />
        </div>
    )
}

export default InstagramPost

//He creado un objeto en el DOM para insertar el código. En este caso lo he metido directamente en el body (líneas 11 y 14) pero para el diseño podéis utilizar cualquier etiqueta. Por ejemplo, en un div con estilos podría ser algo así:
// const container = document.getElementById('instagram-container');
// container.appendChild(script);
// return (
//     <div id="instagram-container">
//         <div dangerouslySetInnerHTML={{ __html: instagramPost }} />
//     </div>
// );
