import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import RequiredSymbol from '../components/RequiredSymbol'
import { getAllProblems } from '../services/problem.service'

const CreateTopic = () => {

    const account_id = Number(localStorage.getItem("account_id"))
    const [banner, setbanner] = useState(null)
    const [problemOptions, setproblemOptions] = useState([])
    const [selectedProblems,setselectedProblems] = useState([])

    useEffect(() => {
        getAllProblems().then((response) => {
            setproblemOptions(response.data.result.filter(
                (problem) => problem.account_id === account_id
            ).map(problem => ({
                label: problem.title,
                value: problem.problem_id
            })))
        });
    }, [account_id])

    useEffect(() => {
        console.log(problemOptions)
    }, [problemOptions])

    const setPreviewBanner = (e) => {
        if (e.target.files && e.target.files[0]) {
            setbanner(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.problems)
    }

    return (
        <div className='pt-24'>
            <h1>Create Topic</h1>
            <Form className='mt-5' onSubmit={e => handleSubmit(e)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Topic Name <RequiredSymbol /></Label>
                            <Input type='text' id='name' />
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
                                    <Input id='is_active' type='checkbox' />
                                    <Label check className='ml-2'>Active</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label>Problems</Label>
                            <Select
                                options={problemOptions}
                                onChange={e => setselectedProblems(e)}
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
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateTopic