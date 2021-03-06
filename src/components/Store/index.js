import React, {useState, useEffect} from 'react'

import { Contents } from "./contents"

const Store = () => {
  const [ loggedIn ] = useState(localStorage.getItem("loggedIn") || undefined)
  

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  return (
    <>
      { !localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") === "undefined" ?
        <p>Log in to view store.</p>
        : <Contents/>
      }
    </>
  )
}

export default Store