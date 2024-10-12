import AppRoutes from './components/AppRoutes'
import Alert from './components/Alert'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import useApp from './hooks/useApp'

function App() {
    const {
        instagramPostList,
        formList,
        instagramPost,
        setInstagramPost,
        publishedForm,
        setPublishedForm,
        activities,
        setActivities,
        checkedExperiences,
        setCheckedExperiences,
        homeData,
        setHomeData,
    } = useApp()

    return (
        <Router>
            <div className='App'>
                <Alert
                    title={'XX CONGRESO DE LACTANCIA MATERNA FEDALMA'}
                    date={'3 y 4 de Octubre de 2025'}
                    link={'https://www.fedalma.org/congreso-2025/'}
                />
                <AppRoutes
                    instagramPost={instagramPost}
                    setInstagramPost={setInstagramPost}
                    publishedForm={publishedForm}
                    setPublishedForm={setPublishedForm}
                    activities={activities}
                    setActivities={setActivities}
                    checkedExperiences={checkedExperiences}
                    setCheckedExperiences={setCheckedExperiences}
                    homeData={homeData}
                    setHomeData={setHomeData}
                    formList={formList}
                    instagramPostList={instagramPostList}
                />
            </div>
        </Router>
    )
}

export default App
