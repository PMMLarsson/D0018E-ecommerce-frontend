import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import footerStyles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <footer className="theme-background-color">
      <div className={footerStyles.footer}>
        <div className={footerStyles.footerItem}>
          <p className={footerStyles.footerHeader}>Assistance</p>
          <Link to="/contact" className={footerStyles.footerContent}>Contact</Link>
        </div>
      </div>
      <p className={footerStyles.footerMadeBy}>Created by {data.site.siteMetadata.author}, 2019</p>
    </footer>
  )
}

export default Footer