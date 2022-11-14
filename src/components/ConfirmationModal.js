import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { acceptConfirmation, closeConfirmation } from '../redux/confirmation.reducer';

const ConfirmationModal = ({ }) => {

  const confirmation = useSelector(state => state.confirmation)
  const dispatch = useDispatch()

  return (
    <Modal isOpen={confirmation.isOpen} centered={true}>
      <ModalHeader>Confirmation</ModalHeader>
      <Form>
        <ModalBody>
          <Container>
            <h5>{confirmation.message}</h5>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => dispatch(acceptConfirmation())} className="w-1/4" color="primary">
            Confirm
          </Button>{' '}
          <Button onClick={() => dispatch(closeConfirmation())} className="w-1/4" color="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default ConfirmationModal