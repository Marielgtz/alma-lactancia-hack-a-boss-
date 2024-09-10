import { useState } from 'react'
import InstagramForm from '../components/InstagramForm'
import InstagramPost from '../components/InstagramPost'
import FormBuilder from './FormBuilder '
import EditForm from './EditForm'
import FormDisplay from './FormDisplay'
import FormDropdown from './FormDropdown'

const Prueba = () => {
    const [instagramPost, setInstagramPost] = useState('')
    const [publishedForm, setPublishedForm] = useState([{}, {}, {}])
    const [forms, setForms] = useState({})
    const [editingForm, setEditingForm] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null)

    return (
        <div>
            <h1>Publicaciones Instagram</h1>
            {/* <InstagramForm setInstagramPost={setInstagramPost} />
            <InstagramPost instagramPost={instagramPost} /> */}
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
            <FormDisplay
                publishedForm={publishedForm[0] && publishedForm[0]}
                setPublishedForm={setPublishedForm}
                jsonNumber='1'
            />
            <FormDisplay
                publishedForm={publishedForm[1] && publishedForm[1]}
                setPublishedForm={setPublishedForm}
                jsonNumber='2'
            />
            <FormDisplay
                publishedForm={publishedForm[2] && publishedForm[2]}
                setPublishedForm={setPublishedForm}
                jsonNumber='3'
            />
            <FormDisplay
                publishedForm={publishedForm[3] && publishedForm[3]}
                setPublishedForm={setPublishedForm}
                jsonNumber='4'
            />
        </div>
    )
}
export default Prueba
