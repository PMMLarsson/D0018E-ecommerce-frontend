import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSETS , CART} from '../../queries/'
import Emoji from './emoji'

export const Contents = () => {
  const assets = useQuery(GET_ASSETS)
  const cart = useQuery(CART, { variables:{ customer_id:localStorage.getItem("loggedIn") } });
  
  return(
    <div style={{display:"flex", flexWrap: "wrap"}}>
      {assets.data && cart.data && assets.data.assets && cart.data.cart && assets.data.assets.map(asset => {
        return(
          <Emoji asset={asset} key={asset.type} cart={cart.data.cart}/>
        )
      })}
    </div>
  )
}



export default Contents