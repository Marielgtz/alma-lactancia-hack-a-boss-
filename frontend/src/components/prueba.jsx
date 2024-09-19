import { useEffect, useState } from 'react'
import InstagramForm from '../components/InstagramForm'
import InstagramPost from '../components/InstagramPost'
import FormBuilder from './FormBuilder '
import EditForm from './EditForm'
import FormDisplay from './FormDisplay'
import FormDropdown from './FormDropdown'

const Prueba = ({ instagramPost, setInstagramPost }) => {
    const formList = Array.from({ length: 4 }, () => {
        return {}
    }) //Número de formularios que se pueden crear.
    const instagramPostList = Array.from({ length: 6 }, () => {
        return {}
    }) //Número de publicaciones de Instagram que se podrán publicar.

    // const [instagramPost, setInstagramPost] = useState(instagramPostList)
    const [publishedForm, setPublishedForm] = useState(formList)
    const [forms, setForms] = useState({})
    const [editingForm, setEditingForm] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null)

    // useEffect(() => {
    //     const fetchInstagramPost = async () => {
    //         const url = `${
    //             import.meta.env.VITE_API_URL
    //         }/get-all-instagram-posts`

    //         try {
    //             const response = await fetch(url)

    //             if (response.ok) {
    //                 const res = await response.json()
    //                 console.log(res.message)
    //                 setInstagramPost(res.posts)
    //             } else {
    //                 const errorData = await response.json()
    //                 const errorMessage = errorData.error || response.statusText
    //                 throw new Error(errorMessage)
    //             }
    //         } catch (error) {
    //             console.error('Ha ocurrido un error:', error)
    //         }
    //     }
    //     fetchInstagramPost()
    // }, [])

    return (
        <div>
            <h1>Publicaciones Instagram</h1>
            <InstagramForm setInstagramPost={setInstagramPost} />
            <ul>
                {instagramPostList.map((_, index) => {
                    return (
                        <li key={index}>
                            <InstagramPost
                                instagramPost={instagramPost}
                                postNumber={index + 1}
                            />
                        </li>
                    )
                })}
            </ul>

            <h1>Formularios</h1>
            {editingForm ? (
                <EditForm
                    setEditingForm={setEditingForm}
                    selectedForm={selectedForm}
                    setForms={setForms}
                    setSelectedForm={setSelectedForm}
                    setPublishedForm={setPublishedForm}
                    publishedForm={publishedForm}
                />
            ) : (
                <FormBuilder setForms={setForms} />
            )}
            <FormDropdown
                forms={forms}
                setForms={setForms}
                setPublishedForm={setPublishedForm}
                publishedForm={publishedForm}
                setEditingForm={setEditingForm}
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
            />
            <ul>
                {formList.map((_, index) => {
                    return (
                        <li key={index}>
                            <FormDisplay
                                publishedForm={
                                    publishedForm[index] && publishedForm[index]
                                }
                                setPublishedForm={setPublishedForm}
                                jsonNumber={index + 1}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Prueba
