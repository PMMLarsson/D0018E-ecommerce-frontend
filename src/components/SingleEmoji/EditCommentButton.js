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

import { EDIT_COMMENT, SINGLE_EMOJI_QUERY } from '../../queries'

const EditCommentButton = ({ asset_type, id }) => {
  const [modal, toggleModal] = useState(false)
  const [comment, setComment] = useState("")
  const [editComment] = useMutation(EDIT_COMMENT, {
    variables: { id, contents: comment },
    refetchQueries: [{ query: SINGLE_EMOJI_QUERY, variables: { type: asset_type, customer_id: localStorage.getItem("loggedIn") } }],
    onCompleted: () => {toggleModal(!modal)}
  })

  const submit = (editComment) => {
    if(window.confirm("Edit comment?")) {
      editComment()
    }
  }

  return(
    <>
      <Button
        className="ml-2"
        size="sm"
        style={{backgroundColor:"#745A89"}}
        title="Edit Comment"
        onClick={() => toggleModal(!modal)}
      >
        Edit Comment
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        size="lg"
      >
        <ModalHeader>
          Edit Comment
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Edit Comment</Label>
              <Input type="textarea" value={comment} placeholder={"Input comment.."} onChange={e => setComment(e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            onClick={() => submit(editComment)}
            disabled={comment.length === 0}
          >
            <strong>Edit Comment</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default EditCommentButton