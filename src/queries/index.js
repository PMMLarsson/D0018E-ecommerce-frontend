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

export const LOGIN = gql`
  query login($email:String!) {
    login(email:$email) {
      id
      message
    }
  }
`

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($fname:String!, $lname:String!, $email:String!) {
    createCustomer(fname:$fname, lname:$lname, email:$email) {
      id
      message
    }
  }
`
