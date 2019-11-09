import React from 'react'
import { gql } from 'graphql-tag'
import { client } from '../../apollo'


const StorePage = () => {
  client
  .query({
    query: gql`
    query ADMINS_QUERY {
      admins {
        id
        name
        }
      }
    `
  })
  .then(result => console.log(result));
  return (
    <>
      {<p></p>}
    </>
  )
}

export default StorePage