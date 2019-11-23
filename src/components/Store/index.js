import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSETS } from '../../queries/'
import Emoji from './emoji'

const Store = () => {
  const { data, loading, error } = useQuery(GET_ASSETS);
  if (loading) return <p>loading</p>;
  if (error) {
    return(<p>Error when fetching store items.</p>)
  }
  return(
    <div style={{display:"flex", flexWrap: "wrap"}}>
      {data.assets && data.assets.map(asset => {
        return(
          <Emoji asset={asset} key={asset.type}/>
        )
      })}
    </div>
  )
}

export default Store