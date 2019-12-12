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

  import { CREATE_CUSTOMER } from "../../queries"

const SignUpButton = (props) => {
 const [modal, toggleModal] = useState(false)
 const [fname, setFname] = useState("")
 const [lname, setLname] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const submit = (createCustomer) => {
    if(!fname || fname.length === 0) {
      alert("Customer needs a first name!")
    }
    if(!lname || lname.length === 0) {
      alert("Customer needs a last name!")
    }
    if(!email || email.length === 0) {
      alert("Customer needs an email!")
    }
    if(!password || password.length === 0) {
      alert("Customer needs a password!")
    }
    createCustomer()
 }

 const [createCustomer] = useMutation(CREATE_CUSTOMER, {
  variables: { fname, lname, email, password },
  onCompleted: result => {
    alert(result.createCustomer.message)
    props.handleChange(result.createCustomer.id)
    toggleModal(!modal)
  },
})
  return(
    <>
      <Button
        className="ml-2"
        size="lg"
        style={{backgroundColor:"#745A89"}}
        title="SignUp"
        onClick={() => toggleModal(!modal)}
      >
        Sign Up
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        size="lg"
      >
        <ModalHeader>
          Sign Up
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>First Name</Label>
              <Input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First name.."/>
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last name.."/>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email.."/>
            </FormGroup>
            <FormGroup>
              <Label>Password {password && (password.length < 7 || password.length > 255) && <span style={{fontSize: "0.8rem"}}> must be between 7 and 255 characters long.</span>}</Label>
              <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password.."/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            onClick={() => submit(createCustomer)}
            disabled={!fname || !lname || !email || !password || fname.length === 0 || lname.length === 0 || email.length === 0 || password.length < 7 || password.legnth > 255}
          >
            <strong>Sign Up</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SignUpButton