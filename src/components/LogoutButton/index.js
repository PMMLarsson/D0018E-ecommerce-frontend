import React from 'react'
import { Button } from 'reactstrap'

const LogoutButton = (props) => {
  const logout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.clear()
      props.setLoggedIn(undefined)
      window.location.reload()
    }
  }

  return(
      <Button
        className="ml-2"
        size="lg"
        style={{backgroundColor:"#745A89"}}
        title="Logout"
        onClick={() => logout()}
      >
        Logout
      </Button>
  )
}

export default LogoutButton