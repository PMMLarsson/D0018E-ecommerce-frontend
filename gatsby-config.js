const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: 'Emoji Store 😊',
    author: 'Martin Larsson',
  },
  plugins: [
    'gatsby-plugin-sass'
  ]
}
