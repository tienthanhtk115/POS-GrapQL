import gql from 'graphql-tag';

export const warehouseCreate = gql`
mutation warehouseCreate (
  $code: String!,
  $name: String!,
  $address: String!,
  $status: String!
){
  warehouseCreate(warehouseEntity: {
    code: $code,
    name: $name,
    address: $address,
    status: $status
  }){
    id
    code
    name
    address
    status
  }
}
`;

export const warehouseModify = gql`
mutation warehouseModify (
  $id: Int!,
  $code: String!,
  $name: String!,
  $address: String!,
  $status: String!
){
  warehouseModify(warehouseEntity: {
    id: $id,
    code: $code,
    name: $name,
    address: $address,
    status: $status
  }){
    id
    code
    name
    address
    status
  }
}
`;