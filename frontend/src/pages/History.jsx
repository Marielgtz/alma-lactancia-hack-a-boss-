import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './History.css'
import ActivityFilter from '../components/filters/ActivityFilter'
import silueta from '../images/Alma_Lactancia_-_Foto_hero.jpg'
import { getPastEvents } from '../services/api'
import { createMockupData } from '../services/mockUpService'
import InstagramPost from '../components/InstagramPost'

const History = ({ instagramPost, instagramPostList }) => {
    const navigate = useNavigate()
    // const [openInfo, setOpenInfo] = useState(null);
    const [activities, setActivities] = useState([])
    const [filteredActivities, setFilteredActivites] = useState([])

    // const toggleInfo = (info) => {
    //   setOpenInfo(info === openInfo ? null : info);
    // };

    // Función que obtiene la lista de actividades
    useEffect(() => {
        async function fetchActivities(endpoint, setActivities) {
            const fetchedActivities = await getPastEvents(endpoint)
            if (fetchedActivities) {
                const mockup = createMockupData(fetchedActivities)
                setActivities(mockup)
            }
        }

        fetchActivities('/get-filtered-activities', setActivities)
    }, [])

    return (
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
    )
}

const getBackgroundColor = (index) => {
    const colors = ['#b380b5', '#e0bb8e']
    return colors[index % colors.length]
}
const getColor = (index) => {
    const colors = ['#e0bb8e', '#b380b5']
    return colors[index % colors.length]
}

export default History
