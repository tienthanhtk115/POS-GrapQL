import gql from 'graphql-tag';

export const warehouseGetList = gql`
query {
  warehouseGetList {
    nodes {
      id
      code
      name
      address
      status
    }
  }
}
`;

export const warehouseGetById = gql`
query warehouseGetById (
    $id: Int!
  ){
    warehouseGetById (
      id: $id
    ){
      id
      code
      name
      address
      status
    }
  }
`;