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

import { EDIT_EMOJI, SINGLE_EMOJI_QUERY, GET_ASSETS } from '../../queries'

const EditEmojiButton = (props) => {
  const [modal, toggleModal] = useState(false)
  const [amount, setAmountState] = useState(props.amount)
  const [description, setDescription] = useState(props.description)
  const [cost, setCostState] = useState(props.cost)

  const [editEmoji] = useMutation(EDIT_EMOJI, {
    variables: { type: props.asset_type, amount, cost, currency: "SEK", description },
    refetchQueries: [{ query: SINGLE_EMOJI_QUERY, variables: { type: props.asset_type, customer_id: localStorage.getItem("loggedIn") } },
    { query: GET_ASSETS } ],
    onCompleted: () => {toggleModal(!modal)}
  })

  const setAmount = (amount) => {
    let tempAmount
    if(!amount) {
      tempAmount = 0
    } else {
      tempAmount = parseInt(amount)
    }
    // Sanitize input allowed are numbers and ',' and '.'
    if (/^-?\d*[.,]?(\d){0,2}$/.test(amount) && tempAmount > -1) {
      setAmountState(parseFloat(tempAmount))
    }
  }

  const setCost = (cost) => {
    let tempCost
    if(!cost) {
      tempCost = 0
    } else {
      tempCost = parseInt(cost)
    }

    // Sanitize input allowed are numbers and ',' and '.'
    if (/^-?\d*[.,]?(\d){0,2}$/.test(cost) && tempCost > -1) {
      setCostState(tempCost)
    }
  }

  const submit = (editEmoji) => {
    if(window.confirm("Edit Emoji?")) {
      editEmoji()
    }
  }

  return(
    <>
      <Button
        className="ml-2"
        size="sm"
        style={{backgroundColor:"#745A89"}}
        title="Edit Emoji"
        onClick={() => toggleModal(!modal)}
      >
        Edit Emoji
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        size="lg"
      >
        <ModalHeader>
          Edit Emoji
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Edit Amount</Label>
              <Input
                onChange={e => setAmount(e.target.value)}
                value={amount}
                id="AmountInput"
                name="text"
                placeholder="Input amount"
              />
              <Label>Edit Cost</Label>
              <Input
                onChange={e => setCost(e.target.value)}
                value={cost}
                id="CostInput"
                name="text"
                placeholder="Input cost"
              />
              <Label>Edit Description</Label>
              <Input type="textarea" value={description} placeholder={"Input description.."} onChange={e => setDescription(e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            onClick={() => submit(editEmoji)}
          >
            <strong>Edit Emoji</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default EditEmojiButton