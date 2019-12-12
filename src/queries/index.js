import gql from 'graphql-tag';

 export const GET_ADMINS = gql`
  query getAdmins {
    admins {
      id
      name
    }
  }
`

export const GET_ASSETS = gql`
  query getAssets {
    assets {
      type
      amount
      cost
      currency
      description
    }
  }
`

export const GET_ASSET_BY_TYPE = gql`
  query assetByType($type: String!) {
    assetByType(type: $type) {
      type
      amount
      cost
      currency
      description
    }
  }
`

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id,
      success,
      isAdmin,
      message
    }
  }
`

export const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      fname
      lname
      email
    }
  }
`

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($fname: String!, $lname: String!, $email: String!, $password: String!) {
    createCustomer(fname: $fname, lname: $lname, email: $email, password: $password) {
      id
      success
      message
    }
  }
`

export const COMMENTS = gql`
  query comments($asset_type: String!) {
    comments(asset_type: $asset_type) {
      id
      customer_id
      asset_type
      date
      contents
      upvotes
      by_name
      edited
    }
  }
`

export const GRADE = gql`
  query grade($asset_type: String!) {
    grade(asset_type: $asset_type)
  }
`

export const CART = gql`
  query cart($customer_id:ID!) {
    cart(customer_id:$customer_id) {
      customer_id
      contents {
        asset_type
        amount
      }
      date
      nr_of_items
    }
  }
`

export const CART_SIZE = gql`
  query cartSize($customer_id: ID!) {
    cartSize(customer_id: $customer_id)
  }
`

export const CREATE_ORDER = gql`
  mutation createOrder($customer_id: ID!, $metadata: [OrderMetaInput]!, $total_cost: Int!, $currency: String!) {
    createOrder(customer_id: $customer_id, metadata: $metadata, total_cost: $total_cost, currency: $currency) {
      success
      message
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($asset_type: String!, $customer_id: ID!, $contents: String, $by_name: String) {
    addComment(asset_type: $asset_type, customer_id: $customer_id, contents: $contents, by_name: $by_name) {
      success
      message
    }
  }
`

export const EDIT_COMMENT = gql`
  mutation editComment($id: ID!, $contents: String) {
    editComment(id: $id, contents: $contents) {
      success
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      success
      message
    }
  }
`

export const UPDATE_GRADE = gql`
  mutation updateGrade($asset_type: String!, $customer_id: ID!, $grade: Int) {
    updateGrade(asset_type: $asset_type, customer_id: $customer_id, grade: $grade) {
      success
      message
    }
  }
`

export const UPDATE_CART = gql`
  mutation updateCart($customer_id: ID!, $contents: [ContentInput], $total_amount:Int!) {
    updateCart(customer_id: $customer_id, contents: $contents, total_amount: $total_amount) {
      success
      message
    }
  }
`
export const CLEAR_CART = gql`
  mutation clearCart($customer_id: ID!) {
    clearCart(customer_id: $customer_id) {
      success
      message
    }
  }
`

export const SINGLE_EMOJI_QUERY = gql`
  query singleEmojiQuery($type: String!, $customer_id: ID!) {
    assetByType(type: $type) {
      type
      amount
      cost
      currency
      description
    }
    grade(asset_type: $type)
    comments(asset_type: $type) {
      id
      customer_id
      asset_type
      date
      contents
      upvotes
      by_name
      edited
    }
    getCustomer(id: $customer_id) {
      id
      fname
      lname
      email
    }
  }
`

export const PROFILE_PAGE_QUERY = gql`
  query profilePage($id: ID!) {
    getCustomer(id: $id) {
      id
      fname
      lname
      email
    }
    orders(id: $id) {
      id
      buyer
      metadata {
        asset_type
        amount
      }
      date
      total_cost
      currency
    }
  }
`

export const IS_ADMIN_QUERY = gql`
  query isAdmin($id:ID!){
    isAdmin(id: $id)
  }
`

export const EDIT_EMOJI = gql`
  mutation editAsset($type: String!, $amount: Int!, $cost: Int!, $currency: String!, $description: String) {
    editAsset(type: $type, amount: $amount, cost: $cost, currency: $currency, description: $description){
      success
      message
    }
  }
`