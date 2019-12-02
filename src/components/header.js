import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Button } from 'reactstrap'
import { ApolloConsumer } from '@apollo/react-hooks'

import headerStyles from './header.module.scss'
import LoginButton from "./LoginButton"
import SignUpButton from "./SignUpButton"
import LogoutButton from "./LogoutButton"
import CartButton from "./CartButton"

const Header = () => {
  const [ loggedIn, setLoggedIn ] = useState(localStorage.getItem("loggedIn") || undefined)
  

  React.useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ApolloConsumer>
      {client => (
    <header className={headerStyles.header}>
      <div style={{display:'flex', alignItems:'center'}}>
        <h1>
          <Link className={headerStyles.title} to="/">
            {siteData.site.siteMetadata.title}
          </Link>
        </h1>
        <div style={{marginRight: "0", marginLeft: "auto", display: "flex"}}>
            <Button size="lg"  className={headerStyles.sideItems} style={{backgroundColor:"#745A89"}} title="Search">
              <Link to="/search" className={headerStyles.sideItems}>
                  Search
              </Link>
            </Button>
            {!loggedIn || loggedIn === "undefined" ?
              <>
                <LoginButton className={headerStyles.sideItems} client={client} handleChange={(customer_id) => {
                  setLoggedIn(customer_id)
                  }}/>
                <SignUpButton className={headerStyles.sideItems} client={client} handleChange={(customer_id) => {
                  setLoggedIn(customer_id)
                  }}/>
              </>
              :
              <div style={{ margin: "0 1rem"}}>
                <Button size="lg" className={headerStyles.sideItems} style={{backgroundColor:"#745A89"}} title="Profile">
                  <Link to={`/profile?id=${loggedIn}`} className={headerStyles.sideItems}>
                      Profile
                  </Link>
                </Button>
                <LogoutButton className={headerStyles.sideItems} setLoggedIn={setLoggedIn}/>
                <CartButton className={headerStyles.sideItems} customer_id={loggedIn}/>
              </div>
              }
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
    )}
    </ApolloConsumer>
  )
}

export default Header