import gql from 'graphql-tag';

export const productGetList = gql`
query {
  productGetList {
    nodes {
      id
      name
      barcode
      productCategory
      salePrice
      costPrice
      status
    }
  }
}
`;

export const productGetById = gql`
query productGetById (
    $id: Int!
  ){
    productGetById (
      id: $id
    ){
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

export const productGetDataScaleExcel = gql` 
query {
  productGetDataScaleExcel {
    name
    barcode
    salePrice
    description
    productCategory
    unitName 
  }
} 
`;
