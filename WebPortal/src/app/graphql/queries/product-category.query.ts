import gql from 'graphql-tag';

export const productCategoryGetList = gql`
query {
  productCategoryGetList {
    nodes {
      id
      name
      status
    }
  }
}
`;

export const productCategoryGetById = gql`
query productCategoryGetById (
    $id: Int!
  ){
    productCategoryGetById (
      id: $id
    ){
      id
      name
      status
    }
  }
`;