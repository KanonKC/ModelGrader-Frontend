import React, { useEffect, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import ProblemsTable from './ProblemsTable';

const CollectionProblems = ({collectionName,problems,submissions,accordianClassName}) => {

    const [open, setOpen] = useState(null);
    const [completed,setcompleted] = useState(false)

    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }

    useEffect(() => {
        let problem_ids = problems.map(problem => problem.problem_id)
        let passedSubmissions = submissions.filter(submission => submission.is_passed && problem_ids.includes(submission.problem_id))
    
        setcompleted(passedSubmissions.length > 0)
        console.log(passedSubmissions)
    }, [problems,submissions])

    useEffect(() => {
        setOpen(completed ? null : "1")
    },[completed])

    return (
        <div>
            <Accordion className={accordianClassName} open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        
                        {completed && <img className='inline pb-[1px] mr-1' src={require("../imgs/passed_icon.png")} />}
                        { collectionName } 
                        {completed && <i className='ml-1'>(Completed)</i>}
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <ProblemsTable
                            problems={problems}
                            submissions={submissions}
                            noPagination
                        />
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default CollectionProblems