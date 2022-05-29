import gql from 'graphql-tag';

export const productCategoryCreate = gql`
mutation productCategoryCreate (
    $name: String!,
    $status: Int!
){
  productCategoryCreate(productCategoryEntity: {
    name: $name,
    status: $status
  }){
    name,
    status
  }
}
`;

export const productCategoryModify = gql`
mutation productCategoryModify (
    $id: Int!,
    $name: String!,
    $status: Int!
){
  productCategoryModify(productCategoryEntity: {
    id: $id,
    name: $name,
    status: $status
  }){
    name,
    status
  }
}
`;