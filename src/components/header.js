import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Button } from 'reactstrap'

import headerStyles from './header.module.scss'
import LoginButton from "./LoginButton"
import SignUpButton from "./SignUpButton"
import LogoutButton from "./LogoutButton"

const Header = () => {
  const [ loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") || undefined)

  React.useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

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
            <Button size="lg"  className={headerStyles.sideItems} style={{backgroundColor:"#745A89"}} title="Search">
              <Link to="/search" className={headerStyles.sideItems}>
                  Search
              </Link>
            </Button>
            {!loggedIn || loggedIn === "undefined" ?
              <>
                <LoginButton className={headerStyles.sideItems} setLoggedIn={setLoggedIn}/>
                <SignUpButton className={headerStyles.sideItems} setLoggedIn={setLoggedIn}/>
              </>
              : <LogoutButton className={headerStyles.sideItems} setLoggedIn={setLoggedIn}/>}
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