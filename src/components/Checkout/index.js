import React, { useState, useEffect } from 'react'

import CheckoutContent from './checkoutContent'

const Checkout = () => {
  const [ loggedIn ] = useState(localStorage.getItem("loggedIn") || undefined)
  
  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  return (
    <>
      { !localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined" ?
        <p>Log in to view checkout.</p>
        : <CheckoutContent/>
      }
    </>
  )
}

export default Checkout