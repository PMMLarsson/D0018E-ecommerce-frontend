import React from 'react';
import Layout from '../components/layout'
import { Link } from 'gatsby'


export const IndexPage = () => {
  return (
    <Layout>
      <h1><Link to="/store" style={{color:'black'}}>Head over to the store!</Link></h1>
    </Layout>
  )
}

export default IndexPage