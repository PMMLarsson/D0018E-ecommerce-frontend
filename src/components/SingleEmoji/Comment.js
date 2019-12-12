import React from 'react'
import EditCommentButton from "./EditCommentButton"
import DeleteCommentButton from "./DeleteCommentButton"

const Comment = ({ comment, asset_type }) => {
  return (
    <div style={{margin:"5px", padding:"5px", backgroundColor:"#D0B7DA"}}>
      <div style={{display:"flex", margin:"0", padding: "0"}}>
        <p>{comment.by_name} @ {comment.date} {comment.edited ? <i>edited</i> : ""}</p>
        {(comment.customer_id === localStorage.getItem("loggedIn") || localStorage.getItem("isAdmin")) && 
          <div style={{ marginRight: "0", marginLeft: "auto" }}>
            <EditCommentButton asset_type={asset_type} id={comment.id}/>
            <DeleteCommentButton asset_type={asset_type} id={comment.id}/>
          </div>
        }
      </div>
      <p>{comment.contents}</p>
    </div>
    )
  }

  export default Comment