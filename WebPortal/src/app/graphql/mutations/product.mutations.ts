import gql from 'graphql-tag';

export const productCreate = gql`
mutation productCreate (
    $name: String!,
    $barcode: String!,
    $productCategory: Int!,
    $salePrice: Int!,
    $costPrice: Int!,
    $status: String!,
    $unitId:Int!
){
  productCreate(productEntity: {
    name: $name,
    barcode: $barcode,
    productCategory: $productCategory,
    salePrice: $salePrice,
    costPrice: $costPrice,
    status: $status,
    unitId:$unitId
  }){
    id
    name
    barcode
    productCategory
    salePrice
    costPrice
    status
  }
}
`;

export const productModify = gql`
mutation productModify (
    $id: Int!,
    $name: String!,
    $barcode: String!,
    $productCategory: Int!,
    $salePrice: Int!,
    $costPrice: Int!,
    $status: String!
){
  productModify(productEntity: {
    id: $id,
    name: $name,
    barcode: $barcode,
    productCategory: $productCategory,
    salePrice: $salePrice,
    costPrice: $costPrice,
    status: $status
  }){
    id
    name
    barcode
    productCategory
    salePrice
    costPrice
    status
  }
}
`;