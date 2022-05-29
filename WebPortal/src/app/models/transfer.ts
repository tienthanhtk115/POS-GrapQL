export interface Transfer {
    id: number;
    code: string;
    reference: string;
    date: string;
    partnerId: number;
    warehouseSourceId: number;
    warehouseDestId: number;
    type?: string;
    note?: string;
    status: string;
    expand?: boolean;
    transferLines?: any
}
export interface TransferLine {
    id: number;
    product?: string;
    productId: number;
    quantity: number;
}