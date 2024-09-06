import { useState } from 'react'
import InstagramForm from '../components/InstagramForm'
import InstagramPost from '../components/InstagramPost'
import FormBuilder from './FormBuilder '
import EditForm from './EditForm'
import FormDisplay from './FormDisplay'
import FormDropdown from './FormDropdown'

const Prueba = () => {
    const [instagramPost, setInstagramPost] = useState('')
    const [publishedForm, setPublishedForm] = useState(null)
    const [forms, setForms] = useState({})
    const [editingForm, setEditingForm] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null)

    return (
        <div>
            <h1>Publicaciones Instagram</h1>
            <InstagramForm setInstagramPost={setInstagramPost} />
            <InstagramPost instagramPost={instagramPost} />
            <h1>Formularios</h1>
            {editingForm ? (
                <EditForm
                    setEditingForm={setEditingForm}
                    selectedForm={selectedForm}
                    setForms={setForms}
                    setSelectedForm={setSelectedForm}
                    setPublishedForm={setPublishedForm}
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
                publishedForm={publishedForm}
                setPublishedForm={setPublishedForm}
            />
        </div>
    )
}
export default Prueba
