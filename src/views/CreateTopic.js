import { faL } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import RequiredSymbol from '../components/RequiredSymbol'
import { getAllProblems } from '../services/problem.service'
import { addTopicCollection, addTopicProblem, createTopic } from '../services/topic.service'
import { getAllCollections } from '../services/collection.service'

const CreateTopic = () => {

    const account_id = Number(localStorage.getItem("account_id"))

    const [loading,setloading] = useState(false)

    const [banner, setbanner] = useState(null)
    const [collectionOptions, setcollectionOptions] = useState([])
    const [selectedCollections,setselectedCollections] = useState([])

    useEffect(() => {
        getAllCollections().then((response) => {
            setcollectionOptions(response.data.collections.filter(
                (collection) => collection.owner === account_id
            ).map(collection => ({
                label: collection.name,
                value: collection.collection_id
            })))
        });
    }, [account_id])

    useEffect(() => {
        console.log(collectionOptions)
    }, [collectionOptions])

    const setPreviewBanner = (e) => {
        if (e.target.files && e.target.files[0]) {
            setbanner(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleReset = () => {
        setbanner(null)
        setselectedCollections(null)
        document.getElementById('create-topic-form').reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        
        formData.append("name",e.target.name.value)
        formData.append("description",e.target.description.value)
        formData.append("is_active",e.target.is_active.value)
        formData.append("is_private",e.target.is_private.value)

        if(e.target.image_url.files.length !== 0){
            formData.append("image_url",e.target.image_url.files[0])
        }

        setloading(true)
        createTopic(account_id,formData)
        .then(response => {
            // console.log("DONE",response.data.topic_id,selectedProblems.map(problem => problem.value))
            console.log(selectedCollections)
            if(selectedCollections){
                const problems_id = selectedCollections.map(problem => problem.value)
                return addTopicCollection(response.data.topic_id,problems_id)
            }
        })
        .then(response => {
            setloading(false)
            Swal.fire("Success",`Topic has been created!`,"success")
            handleReset()
        })
        .catch(err => {
            console.log(err)
            setloading(false)
            Swal.fire("Error","Something went wrong, please try again!","error")
        })
    }

    return (
        <div className='pt-24'>
            <h1>Create Topic</h1>
            <Form id='create-topic-form' className='mt-5' onSubmit={e => handleSubmit(e)} onReset={handleReset}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Topic Name <RequiredSymbol /></Label>
                            <Input required type='text' id='name' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type='textarea' id='description' rows={5} />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input id='is_private' type='checkbox' />
                                    <Label check className='ml-2'>Private</Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input checked id='is_active' type='checkbox' />
                                    <Label check className='ml-2'>Active</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label>Collections</Label>
                            <Select
                                options={collectionOptions}
                                onChange={e => setselectedCollections(e)}
                                value={selectedCollections}
                                isMulti 
                            />
                        </FormGroup>

                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>
                                Topic Banner
                            </Label>
                            <Input
                                type='file'
                                id='image_url'
                                accept="image/jpg, image/jpeg, image/png"
                                onChange={e => setPreviewBanner(e)}
                            />
                            <img className='mt-2' src={banner} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    className="w-1/4"
                    type="submit"
                    size="lg"
                    color="primary"
                    disabled={loading}
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateTopic