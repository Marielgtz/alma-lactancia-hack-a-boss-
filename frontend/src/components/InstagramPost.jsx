import React, { useEffect, useRef } from 'react'

const InstagramPost = ({ instagramPost }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        // Cargo el script solo una vez en el DOM
        if (!window.instgrm) {
            const script = document.createElement('script')
            script.src = 'https://www.instagram.com/embed.js'
            script.async = true
            script.onload = () => {
                window.instgrm.Embeds.process()
            }
            containerRef.current.appendChild(script)
        } else {
            window.instgrm.Embeds.process()
        }
    }, [instagramPost])

    return (
        <div ref={containerRef}>
            <ul>
                {instagramPost.map((post, index) => (
                    <li key={index}>
                        <div dangerouslySetInnerHTML={{ __html: post.code }} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InstagramPost
