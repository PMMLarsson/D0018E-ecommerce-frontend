import React from 'react'

import { printOutEmojis } from "../../utils"

export const OrderRow = ({ order }) => {
  const {id, metadata, date, total_cost, currency} = order
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{printOutEmojis(metadata)}</td>
      <td>{date} {currency}</td>
      <td>{total_cost} {currency}</td>
    </tr>
  )
}

export default OrderRow


