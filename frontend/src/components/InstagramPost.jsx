import React, { useEffect, useRef } from 'react'

const InstagramPost = ({ instagramPost, postNumber }) => {
    const containerRef = useRef(null)
    const scriptRef = useRef(null)

    useEffect(() => {
        // Función para limpiar el script de Instagram
        const cleanupScript = () => {
            if (scriptRef.current && containerRef.current) {
                containerRef.current.removeChild(scriptRef.current)
                scriptRef.current = null
            }
        }

        if (!window.instgrm) {
            const script = document.createElement('script')
            script.src = 'https://www.instagram.com/embed.js'
            script.async = true
            script.onload = () => {
                window.instgrm.Embeds.process()
            }
            containerRef.current.appendChild(script)
            scriptRef.current = script
        } else {
            window.instgrm.Embeds.process()
        }

        return () => {
            cleanupScript()
        }
    }, [instagramPost, postNumber])

    return (
        <div ref={containerRef}>
            {instagramPost[Number(postNumber) - 1].code ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: instagramPost[Number(postNumber) - 1].code,
                    }}
                />
            ) : (
                <p>No se encontró el post.</p>
            )}
        </div>
    )
}

export default InstagramPost
