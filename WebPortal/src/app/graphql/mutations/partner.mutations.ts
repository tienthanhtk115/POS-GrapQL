import gql from 'graphql-tag';

export const partnerCreate = gql`
mutation partnerCreate (
  $name: String!,
  $phone: String!,
  $email: String!,
  $address: String!,
  $isCustomer: Boolean!,
  $isSupplier: Boolean!,
  $status: String!
){
  partnerCreate(partnerEntity: {
    name: $name,
    phone: $phone,
    email: $email,
    address: $address,
    isCustomer: $isCustomer,
    isSupplier: $isSupplier,
    status: $status
  }){
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

export const partnerModify = gql`
mutation partnerModify (
  $id: Int!,
  $name: String!,
  $phone: String!,
  $email: String!,
  $address: String!,
  $isCustomer: Boolean!,
  $isSupplier: Boolean!,
  $status: String!
){
  partnerModify(partnerEntity: {
    id: $id,
    name: $name,
    phone: $phone,
    email: $email,
    address: $address,
    isCustomer: $isCustomer,
    isSupplier: $isSupplier,
    status: $status
  }){
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