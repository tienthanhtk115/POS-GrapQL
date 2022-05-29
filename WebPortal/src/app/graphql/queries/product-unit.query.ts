import gql from 'graphql-tag';
  
export const productUnitGetList = gql`
query productUnitGetList{
  productUnitGetList{
      id
      code
      name 
    }
  }
`;