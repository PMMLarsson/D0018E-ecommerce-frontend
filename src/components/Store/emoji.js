import React, { useState } from 'react'
import { Button, Input } from "reactstrap"

import { EMOJIS } from '../enums'
import { useMutation } from "@apollo/react-hooks"
import { Link } from "gatsby"
import { UPDATE_CART, CART_SIZE, CART } from "../../queries"
import { updateCartObject } from "../../utils"

const Emoji = ({ asset, cart }) => {
  const [amountToAdd, setAmountToAdd] = useState(1)

  

  const submit = (addToCart) => {
    if(!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined") {
      alert("no valid customer id!")
      return
    }
    const {result, nr_of_items} = updateCartObject(cart.contents, asset.type, amountToAdd)
    addToCart({ variables: { customer_id: parseInt(localStorage.getItem("loggedIn")), contents: result, total_amount:nr_of_items } })
 }

 const [addToCart] = useMutation(UPDATE_CART, {
  refetchQueries: [{ query: CART_SIZE, variables: { customer_id: localStorage.getItem("loggedIn") } }, { query: CART, variables: { customer_id: localStorage.getItem("loggedIn") } }]
})

  return(
    <div style={{width:"30%", padding:"1rem"}}>
      <Link style={{textDecoration:"none"}} to={`/emoji?type=${asset.type}`} state={{type: asset.type}}>
        <p style={{fontSize:"5rem", textAlign:"center"}}>{EMOJIS[asset.type]}</p>
      </Link>
      <div style={{display:"flex"}}>
        <Input type="select" name="select" style={{minWidth:"20%"}} value={amountToAdd} onChange={(e) => setAmountToAdd(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
        <Button style={{minWidth:"80%", backgroundColor:"#745A89"}} onClick={() => {
          if(!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined") {
            alert("Log in to add item to cart!")
          }
          submit(addToCart)
        }}>Add to cart</Button>
      </div>
    </div>
  )
}

export default Emoji