import React from "react"
import { Button } from "reactstrap"
import { useMutation } from '@apollo/react-hooks';
import { CLEAR_CART, CART_SIZE, CART } from "../../queries"

export const ClearCartButton = () => {
  
 const submit = (clearCart) => {
   clearCart()
 }

  const [clearCart] = useMutation(CLEAR_CART, {
    variables: { customer_id:localStorage.getItem("loggedIn") },
    refetchQueries: [
      { query: CART_SIZE, variables: { customer_id: localStorage.getItem("loggedIn") } },
      { query: CART, variables: { customer_id: localStorage.getItem("loggedIn") } },
    ]
  })
  return(
    <>
      {!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined" ? 
        <p>Log in to clear cart</p> : 
        <Button color="danger" style={{minWidth:"60%"}} onClick={() => submit(clearCart)}>Clear Cart</Button>
      }
    </>
  )
}

export default ClearCartButton