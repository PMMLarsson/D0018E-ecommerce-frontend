import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Table, Alert } from "reactstrap"

import { GET_ASSETS , CART} from '../../queries'
import CheckoutRow from "./checkoutRow"
import ClearCartButton from "./clearCartButton"
import PlaceOrderButton from "./placeOrderButton"
import { validInventory } from "../../utils"
import { EMOJIS } from "../enums"


export const CheckoutContent = () => {
  let order_cost = 0
  const order_currency = "SEK"

  const assets = useQuery(GET_ASSETS)
  const cart = useQuery(CART, { variables:{ customer_id:localStorage.getItem("loggedIn") } })

  let validOrder = false
  let invalidEmoji = ""
  if(cart && assets && cart.data && assets.data && cart.data.cart && assets.data.assets) {
    [ validOrder, invalidEmoji ] = validInventory(cart.data.cart.contents, assets.data.assets)
  }

  return(
    <div>
      {assets && cart && assets.data && cart.data && assets.data.assets && cart.data.cart ?
      <>
        <Table borderless size="sm" className="mt-4">
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Amount</th>
              <th>Cost / Emoji</th>
              <th>Total Cost</th>
              <th>Add</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
        {cart.data.cart.contents[0] && cart.data.cart.contents[0].asset_type && cart.data.cart.contents.map(content => {
          const total_cost = content.cost * content.amount
          order_cost = order_cost + total_cost
          return(
            <CheckoutRow
              assets={assets.data.assets}
              key={content.asset_type} 
              content={content} 
              cost={content.cost} 
              total_cost={total_cost} 
              currency='SEK' 
              contents={cart.data.cart.contents}/>
          )
        })}
        </tbody>
        </Table>
        <p>Cost for all items in cart: {order_cost} {order_currency}</p>
        <div className="center-center" style={{padding:"5px 0"}}>
          <ClearCartButton/>
        </div>
        <div className="center-center" style={{padding:"5px 0"}}>
          {validOrder ?
          <PlaceOrderButton validOrder={validOrder} contents={cart.data.cart.contents} total_cost={order_cost} currency={order_currency}/>
          :
          <>
            <Alert color="danger">
              Order is not valid. Decrease the amount of {EMOJIS[invalidEmoji]}
            </Alert>
            <PlaceOrderButton validOrder={validOrder} contents={cart.data.cart.contents} total_cost={order_cost} currency={order_currency}/>
          </> 
          }
        </div>
      </>
      : <p>ERROR</p>}
    </div>
  )
}



export default CheckoutContent