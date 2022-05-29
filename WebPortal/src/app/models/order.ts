import { OrderBankAccount } from "./order-bank-account";
export interface OrderLine {
    id?: string;
    productId: number;
    productName?: string;
    productBarcode?: string;
    salePrice: number;
    quantity?: number;
}

export interface Order {
    id: number
    partnerId: number
    date: Date
    cashType: string
    bankAccountId: number
    bankAccount: OrderBankAccount
    total: number
    note: string
    status: number
    orderLines: OrderLine[]
}