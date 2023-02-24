import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

const MyTopic = () => {
  const nevigate = useNavigate()

  return (
    <div className='pt-24'>
      <Row>
        <Col>
          <h1>My Topic</h1>
        </Col>

        <Col xs={4} className="mt-1">
          <Button onClick={() => nevigate('/topics/create')} className='text-white' color="info">
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
              Create New Topic
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default MyTopic