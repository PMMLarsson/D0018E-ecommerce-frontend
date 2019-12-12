import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'gatsby'
import { Button } from 'reactstrap'

import headerStyles from '../header.module.scss'
import { CART_SIZE } from '../../queries'

const CartButton = ({ customer_id }) => {
  const { data, loading, error } = useQuery(CART_SIZE, { variables:{ customer_id } });
  if (loading) return <p>loading</p>;
  if (error) {
    return(<p>Error when fetching cart info.</p>)
  }

  return (
      <Link to="/checkout" className={headerStyles.sideItems}>
        <Button size="lg" style={{backgroundColor:"#745A89"}} title="Check out">
          {data.cartSize ? data.cartSize : ""} <span role="img" aria-label="Shopping Cart">🛒</span>
        </Button>
      </Link>
  )
}

export default CartButton