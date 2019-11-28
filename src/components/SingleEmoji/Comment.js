import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div style={{margin:"5px", padding:"5px", backgroundColor:"#D0B7DA"}}>
      <p>{comment.by_name} @ {comment.date}</p>
      <p>{comment.contents}</p>
    </div>
    )
  }

  export default Comment