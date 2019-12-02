import React from 'react'
import { Table } from "reactstrap"

import OrderRow from "./OrderRow"

export const Orders = ({ orders }) => {
  return(
    <>
      <Table borderless size="sm" className="mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Contents</th>
            <th>Date</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
      {orders.map(order => {
        return(
          <OrderRow key={order.id} order={order}/>
        )
      })}
      </tbody>
      </Table>
    </>
  )
}



export default Orders