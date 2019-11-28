import React from 'react'
import { Button } from 'reactstrap'

import { EMOJIS } from '../enums'
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_CART, CART_SIZE, CART } from "../../queries"
import { updateCartObject } from "../../utils"


export const CheckoutRow = ({content, cost, total_cost, currency, contents}) => {

  const submit = (updateCart, amount) => {
    if(!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined") {
      alert("no valid customer id!")
      return
    }
    const {result, nr_of_items} = updateCartObject(contents, content.asset_type, amount)
    updateCart({ variables: { customer_id: parseInt(localStorage.getItem("loggedIn")), contents: result, total_amount:nr_of_items } })
 }

  const [updateCart] = useMutation(UPDATE_CART, {
    refetchQueries: [{ query: CART_SIZE, variables: { customer_id: localStorage.getItem("loggedIn") } }, { query: CART, variables: { customer_id: localStorage.getItem("loggedIn") } }]
  })

  return(
    <tr>
      <th scope="row">{EMOJIS[content.asset_type]}</th>
      <td>{content.amount}</td>
      <td>{cost} {currency}</td>
      <td>{total_cost} {currency}</td>
      <td><Button style={{backgroundColor:"#745A89"}} onClick={() => {submit(updateCart, 1)}}>Add</Button></td>
      <td><Button color="danger" onClick={() => {submit(updateCart, -1)}}>Remove</Button></td>
    </tr>
  )
}

export default CheckoutRow


