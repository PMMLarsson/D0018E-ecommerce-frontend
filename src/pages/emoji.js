import React from 'react'
import URLSearchParams from 'url-search-params'

import Layout from '../components/layout'
import SingleEmoji from '../components/SingleEmoji'


export const EmojiPage = () => {
  var urlParams = new URLSearchParams(window.location.search)
  return (
    <Layout>
      <SingleEmoji type={urlParams.get("type")}/>
    </Layout>
  )
}

export default EmojiPage