import { EMOJIS } from "../components/enums"

// Utility creating a new cart object when adding / deleting emojis.
export const updateCartObject = (cart, toBeAdded, amount) => {
  let nr_of_items = 0
  let addedObject = false
  let result = []

  // Special case: Cart is empty, object returned from DB is an array of length 1
  // with values asset_type: null, amount: null
  if(cart.length === 1 && !cart[0].asset_type) {
    nr_of_items = nr_of_items + parseInt(amount)
    result.push({asset_type:toBeAdded, amount:parseInt(amount)})
    return { result, nr_of_items }
  }

  for(let i = 0; i < cart.length; i++) {
    if(cart[i].asset_type === toBeAdded) {
      cart[i].amount = parseInt(cart[i].amount) + parseInt(amount)
      addedObject = true
      if(cart[i].amount < 1) {

      } else {
        nr_of_items = nr_of_items + parseInt(cart[i].amount)
        result.push({asset_type:cart[i].asset_type, amount: parseInt(cart[i].amount)})
      }
    } else {
      nr_of_items = nr_of_items + parseInt(cart[i].amount)
      result.push({asset_type:cart[i].asset_type, amount:parseInt(cart[i].amount)})
    }
  }

  // Object does not exist in cart, add a new object
  if(addedObject === false ){
    nr_of_items = nr_of_items + parseInt(amount)
    result.push({asset_type:toBeAdded, amount:parseInt(amount)})
  }
  return { result, nr_of_items }
}

export const validInventory = (contents, assets) => {
  let valid = true
  let invalidEmoji = ""

  contents.forEach(content => {
    for(let i = 0; i < assets.length; i++) {
      if(assets[i].type === content.asset_type) {
        if(assets[i].amount - content.amount < 0) {
          valid = false
          invalidEmoji = assets[i].type
          break
        }
      }
    }
  })

  return [valid, invalidEmoji]
}

export const printOutEmojis = (contents) => {
  let result = ""
  contents.forEach(content => {
    result += EMOJIS[content.asset_type] + "x" + content.amount + " "
  })

  // Return all but the last whitespace
  return result.substring(0, result.length-1)
}
