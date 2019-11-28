import React from "react"
import { Button } from "reactstrap"
import { useMutation } from '@apollo/react-hooks';

import { CREATE_ORDER, CART, CART_SIZE } from "../../queries"
import { printOutEmojis } from "../../utils"
export const PlaceOrderButton = ({ validOrder, contents, total_cost, currency }) => {
  
  const submit = (placeOrder) => {
    placeOrder()
  }

 /*  console.log(localStorage.getItem("loggedIn"))
  console.log(total_cost)
  console.log(currency) */

  // Create a cart object
  const metadata = contents.map(content => {
    return { asset_type: content.asset_type, amount: content.amount}
  })

  const [placeOrder] = useMutation(CREATE_ORDER, {
    variables: { customer_id:localStorage.getItem("loggedIn"), metadata, total_cost, currency },
    onCompleted: (result) => {alert("Thank you for your order:\n" + printOutEmojis(metadata) + `\n Your total was: ${total_cost} ${currency}` )},
    onError: (error) => {alert(error)},
    refetchQueries: [{ query: CART_SIZE, variables: { customer_id: localStorage.getItem("loggedIn") } }, { query: CART, variables: { customer_id: localStorage.getItem("loggedIn") } }]
  })

  if(!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined") {
    return <p>Need to log in to place order.</p>
  }
  return(
    <Button style={{backgroundColor:"#745A89", minWidth:"60%"}} disabled={!validOrder} onClick={() => submit(placeOrder)}>Place Order</Button>
  )
}

export default PlaceOrderButton