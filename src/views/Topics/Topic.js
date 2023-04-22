import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTopic } from '../../services/topic.service'

const Topic = () => {

    const { topic_id } = useParams()
    const [topic,settopic] = useState({})
    const [problems,setproblems] = useState([])

    useEffect(() => {
        getTopic(topic_id).then(response => {
            settopic(response.data.topic)
            setproblems(response.data.problem)
        })
    })

    return (
        <div className="pt-10 md:pt-24">
            Topic {topic.name}
        </div>
    )
}

export default Topic