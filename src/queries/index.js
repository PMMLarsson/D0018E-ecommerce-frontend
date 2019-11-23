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
