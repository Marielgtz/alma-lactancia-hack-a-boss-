import useInstagramPost from '../hooks/useInstagramPost'

const InstagramPost = ({ instagramPost, postNumber }) => {
    const { containerRef } = useInstagramPost(instagramPost, postNumber)
    return (
        <div ref={containerRef}>
            {instagramPost[Number(postNumber) - 1].code && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: instagramPost[Number(postNumber) - 1].code,
                    }}
                />
            )}
        </div>
    )
}

export default InstagramPost
