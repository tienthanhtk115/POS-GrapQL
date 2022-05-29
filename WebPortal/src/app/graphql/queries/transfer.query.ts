import gql from 'graphql-tag';

export const transferGetList = gql`
query {
  transferGetList {
    nodes {
      id
      code
      reference
      date
      partnerId
      warehouseSourceId
      warehouseDestId
      type
      note
      status
      transferLines {
        id
        productId
        quantity
      }
    }
  }
}
`;