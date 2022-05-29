import gql from 'graphql-tag';

export const transferCreate = gql`
mutation transferCreate (
  $code: String!,
  $date: DateTime!,
  $reference: String!,
  $partnerId: Int!,
  $warehouseSourceId: Int!,
  $warehouseDestId: Int!,
  $type: String!,
  $note: String!,
  $status: String!,
  $transferLines: [TransferLineEntityInput!]
){
  transferCreate(transferEntity: {
    code: $code,
    date: $date,
    reference: $reference,
    partnerId: $partnerId,
    warehouseSourceId: $warehouseSourceId,
    warehouseDestId: $warehouseDestId,
    type: $type,
    note: $note,
    status: $status,
    transferLines: $transferLines,
  }){
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
`;