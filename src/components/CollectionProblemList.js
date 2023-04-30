import React from 'react'
import { Accordion, UncontrolledAccordion } from 'reactstrap'

const CollectionProblemList = ({children}) => {
  return (
    <UncontrolledAccordion stayOpen flush>
        { children }
    </UncontrolledAccordion>
  )
}

export default CollectionProblemList