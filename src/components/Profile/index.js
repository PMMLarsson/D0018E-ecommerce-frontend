import React, { useState, useEffect} from 'react'
import { useQuery } from "@apollo/react-hooks"
import { Button } from "reactstrap"

import { PROFILE_PAGE_QUERY } from "../../queries"
import ProfileData from "./ProfileData"
import Orders from "./Orders"

const Profile = () => {

  const [ loggedIn ] = useState(localStorage.getItem("loggedIn") || undefined)
  const [ viewOrders, setViewOrders] = useState(false)
  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const { data } = useQuery(PROFILE_PAGE_QUERY, { variables: { id:loggedIn } })
  
  return (
    <>
      {!loggedIn || loggedIn === "undefined" ? 
      <p>Must be logged in to view profile</p>
        :
        <>
        { data ?
        <>
          <div style={{padding:"5px"}}>
            <ProfileData getCustomer={data.getCustomer}/>
          </div>
          <div style={{padding:"5px"}}>
          <Button
            className="ml-2"
            size="sm"
            style={{backgroundColor:"#745A89"}}
            title={viewOrders ? "Hide orders" : "View orders" }
            onClick={() => setViewOrders(!viewOrders)}
          >
            {viewOrders ? "Hide orders" : "View orders" }
          </Button>
            {viewOrders && data.orders &&
              <Orders orders={data.orders}/>
            }
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

export default Profile