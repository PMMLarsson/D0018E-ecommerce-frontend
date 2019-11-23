import React from 'react'
import { Button, Input } from "reactstrap"
import { EMOJIS } from '../enums'

const Emoji = ({ asset }) => {
  return(
    <div style={{width:"30%", padding:"1rem"}}>
      <p style={{fontSize:"5rem", textAlign:"center"}}>{EMOJIS[asset.type]}</p>
      <div style={{display:"flex"}}>
        <Input type="select" name="select" style={{minWidth:"20%"}}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
        <Button style={{minWidth:"80%", backgroundColor:"#745A89"}}>Add to cart</Button>
      </div>
    </div>
  )
}

export default Emoji