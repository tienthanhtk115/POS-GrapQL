export interface Product {
    id: number;
    name: string;
    barcode: string;
    productCategory: number;
    salePrice: number;
    costPrice: number;
    status: string;
    unitId:number;
}

export interface ProductScaleModel { 
    name: string;
    barcode: string;
    productCategory: string;
    salePrice: number;  
    unitName:number;
    description:string;
}