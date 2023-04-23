import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'
import TopicsGrid from '../../components/TopicsGrid'
import { getAllTopics } from '../../services/topic.service'
import TopicCard from '../../components/Card/TopicCard'

const MyTopic = () => {

    const account_id = Number(localStorage.getItem('account_id'))
    const nevigate = useNavigate()

    const [topics,settopics] = useState([])

    useEffect(() => {
        getAllTopics(account_id).then(response => {
          settopics(response.data.topics)
        })
    },[])

    return (
      <div className='pt-24'>
        <Row>
          <Col>
            <h1>My Topic</h1>
          </Col>

          <Col xs={4} className="mt-1">
            <Button onClick={() => nevigate('./create')} className='text-white' color="info">
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
                Create New Topic
            </Button>
          </Col>
        </Row>

        <TopicsGrid>
          {topics.reverse().map(topic => (<TopicCard title={topic.name} description={topic.description} image={topic.image_url} onClick={() => nevigate(`/topics/${topic.topic_id}`)} />))}
        </TopicsGrid>
      </div>
    )
}

export default MyTopic