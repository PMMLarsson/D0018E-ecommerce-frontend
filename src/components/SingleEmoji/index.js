import React, { useState, useEffect} from 'react'
import { useQuery } from "@apollo/react-hooks"

import { SINGLE_EMOJI_QUERY } from "../../queries"
import EmojiDescription from "./EmojiDescription"
import Comments from "./Comments"

const SingleEmoji = ({ type }) => {

  const [ loggedIn ] = useState(localStorage.getItem("loggedIn") || undefined)
  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const { data } = useQuery(SINGLE_EMOJI_QUERY, { variables: { type, customer_id: loggedIn } })
  
  return (
    <>
      {!loggedIn || loggedIn === "undefined" ? 
      <p>Must be logged in to view emoji</p>
        :
        <>
        { data ?
        <>
          <div style={{padding:"5px"}}>
            <EmojiDescription emoji={data.assetByType} grade={data.grade}></EmojiDescription>
          </div>
          <div style={{padding:"5px"}}>
            <Comments comments={data.comments} asset_type={type} by_name={data.getCustomer.fname + " " + data.getCustomer.lname}></Comments>
          </div>
        </>
        : 
        <p>LOADING/ERROR</p>
        }
        </>
        }
    </>
  )
}

export default SingleEmoji