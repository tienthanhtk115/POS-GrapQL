import gql from 'graphql-tag';

export const orderBankAccountGetList = gql`
query {
    orderBankAccountGetList
  { 
    id
    accountNumber
    bankName
    accountName
  }
}
`;

export const orderGetList = gql`
query{
  orderGetList {
    nodes{
      id
      partnerId
      date
      cashType
      bankAccount {
        id
        accountNumber
        bankName
        accountName
      }
      bankAccountId
      total
      orderLines {
        id
        productId
        quantity
        price
      }
      status
    }
  }
}
`;