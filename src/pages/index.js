import React from 'react';
import Layout from '../components/layout'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ADMINS = gql`
  query getAdmins {
    admins {
      id
      name
    }
  }
`


export const IndexPage = () => {
  const { data, loading, error } = useQuery(GET_ADMINS);
  if (loading) return <p>loading</p>;
  if (error) {
    return(<p>ERROR</p>)
  }

  return (
    <Layout>
      <h1>Hello.</h1>
      {data.admins ? data.admins.map((admin) => <p key={admin.id}>ID:{admin.id} NAME: {admin.name}</p>) : <p></p>}
    </Layout>
  )
}

export default IndexPage