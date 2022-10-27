import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: white;
    }
`

const LinkButton = (props) => {
  return (
    <div>
        <Button {...props}><StyledLink {...props}>{props.label}</StyledLink></Button>
    </div>
  )
}

export default LinkButton