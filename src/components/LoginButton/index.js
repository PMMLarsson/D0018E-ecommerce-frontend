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
  import { ApolloConsumer } from "@apollo/react-hooks"

  import { LOGIN } from '../../queries'

const LoginButton = (props) => {
  const [modal, toggleModal] = useState(false)
  const [email, setEmail] = useState("")

  const login = async (client, email) => {
    await client
    .query({
      query: LOGIN,
      variables: { email },
    })
    .then(({data}) => {
      alert(data.login.message)
      localStorage.setItem("loggedIn", data.login.id)
      props.setLoggedIn(data.login.id)
      toggleModal(!modal)
    })
    .catch(error => {
      alert(error)
    })
  }


  return(
    <ApolloConsumer>
      {client => (
        <>
      <Button
        className="ml-2"
        size="lg"
        style={{backgroundColor:"#745A89"}}
        title="Login"
        onClick={() => toggleModal(!modal)}
      >
        Login
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        size="lg"
      >
        <ModalHeader>
          Login
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input type="text" value={email} placeholder={"Input email.."} onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            onClick={() => login(client, email)}
          >
            <strong>Login</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </>
      )}
    </ApolloConsumer>
  )
}

export default LoginButton