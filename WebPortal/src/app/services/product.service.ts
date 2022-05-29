import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { productCreate, productModify } from "../graphql/mutations/product.mutations";
import { productGetById, productGetDataScaleExcel, productGetList } from "../graphql/queries/product.query";
import { Product, ProductScaleModel } from "../models/product";

export interface Response {
    productGetById: Product
}

export interface ResponseList {
    productGetList: {nodes: Product[]}
}

export interface ResponseCreate {
    productCreate: Product
}

export interface ResponseModify {
    productModify: Product
}
export interface ResponseDataExcel {
    productGetDataScaleExcel:  ProductScaleModel[]
}

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private apollo: Apollo) {}

    productGetList(): Observable<Product[]> {

        return this.apollo.watchQuery<ResponseList>({
            query: productGetList,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.productGetList.nodes))
    }

    productGetById(id: number): Observable<Product> {

        return this.apollo.watchQuery<Response>({
            query: productGetById,
            variables: {
                id: id
            },
          })
          .valueChanges
          .pipe(map(result => result.data.productGetById))
    }

    productCreate(data: any): Observable<Product> {
        return this.apollo.mutate<ResponseCreate>({
          mutation: productCreate,
          variables: data
        }).pipe(map(result => result.data!.productCreate))
    }

    productModify(data: any): Observable<Product> {
        return this.apollo.mutate<ResponseModify>({
          mutation: productModify,
          variables: data
        }).pipe(map(result => result.data!.productModify))
    }

    productGetDataScaleExcel(): Observable<ProductScaleModel[]> { 
        return this.apollo.watchQuery<ResponseDataExcel>({
            query: productGetDataScaleExcel,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.productGetDataScaleExcel))
    }
}

