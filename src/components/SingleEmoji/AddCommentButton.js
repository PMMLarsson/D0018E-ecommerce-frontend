import React, { useState } from 'react'
import { Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup, 
  Input,
  Label } from 'reactstrap'
import { useMutation } from "@apollo/react-hooks"

import { ADD_COMMENT, SINGLE_EMOJI_QUERY } from '../../queries'

const AddCommentButton = ({asset_type, by_name}) => {
  const [modal, toggleModal] = useState(false)
  const [comment, setComment] = useState("")
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { asset_type, customer_id:localStorage.getItem("loggedIn"), contents: comment, by_name},
    refetchQueries: [{ query: SINGLE_EMOJI_QUERY, variables: { type: asset_type, customer_id: localStorage.getItem("loggedIn") } }],
    onCompleted: () => {toggleModal(!modal)}
  })

  const submit = (addComment) => {
    if(window.confirm("Add comment?")) {
      addComment()
    }
  }

  return(
    <>
      <Button
        className="ml-2"
        size="sm"
        style={{backgroundColor:"#745A89"}}
        title="Add Comment"
        onClick={() => toggleModal(!modal)}
      >
        Add Comment
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        size="lg"
      >
        <ModalHeader>
          Add Comment
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Add Comment</Label>
              <Input type="textarea" value={comment} placeholder={"Input comment.."} onChange={e => setComment(e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            onClick={() => submit(addComment)}
            disabled={comment.length === 0}
          >
            <strong>Add Comment</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddCommentButton