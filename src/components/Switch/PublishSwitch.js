import React, { useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'
import { editProblem } from '../../services/problem.service'

const PublishSwitch = ({problemId,isPrivate}) => {

    const [isLoading,setisLoading] = useState(false)
    const [togglePrivate,settogglePrivate] = useState(isPrivate)

    const handleClicked = () => {
        
        const body = {
            is_private: !togglePrivate
        }

        setisLoading(true)
        editProblem(problemId,body).then(response => {
            settogglePrivate(!togglePrivate)
            setisLoading(false)
        })
        .catch(err => {})

    }

    return (
        <FormGroup switch>
        <Input
            onClick={handleClicked}
            checked={!togglePrivate}
            disabled={isLoading}
            type='switch'
            role='switch'

        />
        </FormGroup>
    )
}

export default PublishSwitch