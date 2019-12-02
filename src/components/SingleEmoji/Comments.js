import React from 'react'
import {Card, CardBody, CardHeader} from "reactstrap"

import Comment from "./Comment"
import AddCommentButton from './AddCommentButton'

const Comments = ({ comments, asset_type, by_name }) => {
  return (
    <Card>
      <CardHeader>
      <div style={{ display: "flex", alignItems: "center"}}>
        <p style={{margin:"5px"}}>Comments</p>
        <div style={{ marginRight: "0", marginLeft: "auto" }}>
          <AddCommentButton asset_type={asset_type} by_name={by_name}/>
        </div>
      </div>
      </CardHeader>
      <CardBody>
        {comments.map(comment => <Comment key={comment.id} asset_type={asset_type} comment={comment}/>)}
      </CardBody>
    </Card>
    )
  }

  export default Comments