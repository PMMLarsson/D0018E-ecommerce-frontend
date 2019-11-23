import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Button } from 'reactstrap'

import headerStyles from './header.module.scss'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <div style={{display:'flex', alignItems:'center'}}>
        <h1>
          <Link className={headerStyles.title} to="/">
            {data.site.siteMetadata.title}
          </Link>
        </h1>
        <div style={{marginRight: "0", marginLeft: "auto"}}>
            <Link to="/search" className={headerStyles.sideItems}>
              <Button size="lg" style={{backgroundColor:"#745A89"}} title="Search">
                Search
              </Button>
            </Link>
            <Link to="/login" className={headerStyles.sideItems}>Login</Link>
            <Link to="/sign-up" className={headerStyles.sideItems}>
              Sign up
            </Link>
            <Link to="/check-out" className={headerStyles.sideItems}>
              <Button size="lg" style={{backgroundColor:"#745A89"}} title="Check out">
                45<span role="img" aria-label="Shopping Cart">🛒</span>
              </Button>
              </Link>

        </div>
      </div>
      <div className="theme-background-color">
        <nav>
          <ul className={headerStyles.navList}>
            <li>
            <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to='/'>Home</Link>
            </li>
            <li>
            <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to='/store'>Store</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header