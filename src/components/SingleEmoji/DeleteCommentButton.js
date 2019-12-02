import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { useMutation } from "@apollo/react-hooks"

import { DELETE_COMMENT, SINGLE_EMOJI_QUERY } from '../../queries'

const DeleteCommentButton = ({ asset_type, id }) => {
  const [modal, toggleModal] = useState(false)
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { id },
    refetchQueries: [{ query: SINGLE_EMOJI_QUERY, variables: { type: asset_type, customer_id: localStorage.getItem("loggedIn") } }],
    onCompleted: () => {toggleModal(!modal)}
  })

  const submit = (deleteComment) => {
    if(window.confirm("Delete comment?")) {
      deleteComment()
    }
  }

  return(
    <>
      <Button
        className="ml-2"
        size="sm"
        color="danger"
        title="Delete Comment"
        onClick={() => submit(deleteComment)}
      >
        Delete Comment
      </Button>
    </>
  )
}

export default DeleteCommentButton