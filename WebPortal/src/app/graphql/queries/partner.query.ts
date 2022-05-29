import gql from 'graphql-tag';

export const partnerGetList = gql`
query {
  partnerGetList
  { 
    nodes {
      id
      name
      phone
      email
      address
      isCustomer
      isSupplier
      status
    }
  }
}
`;

export const partnerGetById = gql`
query partnerGetById (
    $id: Int!
  ){
    partnerGetById (
      id: $id
    ){
      id
      name
      phone
      email
      address
      isCustomer
      isSupplier
      status
    }
  }
`;