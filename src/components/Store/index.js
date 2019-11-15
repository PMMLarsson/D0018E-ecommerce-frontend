import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSETS } from '../../queries/'

const Store = () => {
  const { data, loading, error } = useQuery(GET_ASSETS);
  if (loading) return <p>loading</p>;
  if (error) {
    return(<p>Error when fetching store items.</p>)
  }
  return(
    <>
      <h1>Available Emojis.</h1>
        <table>
          <tr>
            <th>Emoji</th>
            <th>Cost</th>
            <th>Description</th>
          </tr>
        {data.assets && data.assets.map((asset) => 
          <tr>
            <td>{asset.type}</td>
            <td>{asset.cost} {asset.currency}</td>
            <td>{asset.description}</td>
          </tr>
        )}
     </table> 
    </>
  )
}

export default Store