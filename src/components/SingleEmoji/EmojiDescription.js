import React, { useState } from 'react'
import { useMutation } from "@apollo/react-hooks"
import {Card, CardBody, CardHeader, Input, Button} from "reactstrap"

import { EMOJIS } from "../enums"
import { UPDATE_GRADE, SINGLE_EMOJI_QUERY } from "../../queries"

const EmojiDescription = ({ emoji, grade }) => {
  const [newGrade, setNewGrade] = useState(0)
  const [submitGrade] = useMutation(UPDATE_GRADE,{
    variables: { asset_type: emoji.type, customer_id: localStorage.getItem("loggedIn"), grade: parseInt(newGrade) },
    refetchQueries: [{ query: SINGLE_EMOJI_QUERY, variables: { type: emoji.type, customer_id: localStorage.getItem("loggedIn") } }] 
  })
  
  return (
    <Card>
      <CardHeader>Emoji</CardHeader>
      <CardBody>
        <div style={{display:"flex"}}>
          <div>
            <p style={{fontSize:"10rem"}}>{EMOJIS[emoji.type]}</p>
          </div>
          <div>
            <p><strong>Name:</strong> {emoji.type}</p>
            <p><strong>Cost:</strong> {emoji.cost}</p>
            <p><strong>Amount in stock:</strong> {emoji.amount}</p>
            <p><strong>Description:</strong> {emoji.description}</p>
          </div>
        </div>
        <div style={{display:"flex", alignContent:"center"}}>
          <p style={{margin:"10px"}}><strong>Grade: </strong>{grade}</p>
          <Input type="select" name="select" style={{width:"50px"}} value={newGrade} onChange={(e) => setNewGrade(e.target.value)}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Button style={{backgroundColor:"#745A89", margin:"0 10px"}} onClick={() => { submitGrade()}}>
            Rate Emoji
          </Button>
        </div>
      </CardBody>
    </Card>
    )
  }

  export default EmojiDescription