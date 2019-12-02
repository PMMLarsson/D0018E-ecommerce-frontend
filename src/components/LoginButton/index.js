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


  import { LOGIN } from '../../queries'

const LoginButton = (props) => {
  const [modal, toggleModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (client, email, password) => {
    if(!password || !email) {
      alert("Need to input both email and password to login.")
    }
    await client
    .query({
      query: LOGIN,
      variables: { email, password },
    })
    .then(({data}) => {
      alert(data.login.message)

      if(data.login.success) {
        localStorage.setItem("loggedIn", data.login.id)
        props.handleChange(data.login.id)
        toggleModal(!modal)
        window.location.reload()
      }
    })
    .catch(error => {
      alert(error)
    })
  }


  return(
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
              <Label>Password</Label>
              <Input type="text" value={password} placeholder={"Input password.."} onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor:"#745A89"}}
            disabled={!email || !password || email.length === 0 || password.length === 0}
            onClick={() => login(props.client, email, password)}
          >
            <strong>Login</strong>
          </Button>
          <Button color="secondary" onClick={() => toggleModal(!modal)}>
            <span role="img" aria-label="stop sign">🚫</span> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default LoginButton