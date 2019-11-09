import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const AboutPage = () => {
  return (
    <div>
      <Layout>
        <h1>About me</h1>
        <p>Hello! I'm <Link to='/contact'>Martin</Link> and I'm doing this project because I want to learn how to use gatsby to create my e-commerce website for my course D0018E!</p>
      </Layout>
    </div>
  )
}

export default AboutPage