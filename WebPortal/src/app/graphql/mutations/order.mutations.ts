import gql from 'graphql-tag';

export const orderCreate = gql`
mutation orderCreate(
  $partnerId: Int!,
  $date: DateTime!,
  $cashType: String!,
  $bankAccountId: Int,
  $bankAccount: OrderBankAccountEntityInput,
  $total: Int!,
  $status: Int!,
  $note:String!,
  $orderLines: [OrderLineEntityInput!]
  ){
    orderCreate(orderEntity: { 
      partnerId:$partnerId,
      date:$date,
      cashType:$cashType,
      bankAccountId:$bankAccountId,
      bankAccount:$bankAccount,  
      total:$total, 
      status:$status,
      note:$note,
      orderLines:$orderLines
    }){ 
      partnerId
      date
      cashType
      bankAccountId
      bankAccount {
        id 
        accountName
        accountNumber
        bankName
      } 
      total
      status
      orderLines {
        id
        productId
        quantity
        price
      }       
    }
  } 
  `;


