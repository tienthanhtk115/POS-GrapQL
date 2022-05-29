import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { productCategoryCreate, productCategoryModify } from "../graphql/mutations/product-category.mutations";
import { productCategoryGetById, productCategoryGetList } from "../graphql/queries/product-category.query";
import { productUnitGetList } from "../graphql/queries/product-unit.query";
import { ProductCategory } from "../models/product-category";
import { ProductUnit } from "../models/product-unit";

export interface Response {
    productCategoryGetById: ProductCategory
}

export interface ResponseList {
    productCategoryGetList: {nodes: ProductCategory[]}
}

export interface ResponseCreate {
    productCategoryCreate: ProductCategory
}

export interface ResponseModify {
    productCategoryModify: ProductCategory
}

export interface ResponseUnit {
    productUnitGetList: ProductUnit[]
}

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {

    constructor(private apollo: Apollo) {}

    productCategoryGetList(): Observable<ProductCategory[]> {

        return this.apollo.watchQuery<ResponseList>({
            query: productCategoryGetList,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.productCategoryGetList.nodes))
    }

    productCategoryGetById(id: number): Observable<ProductCategory> {

        return this.apollo.watchQuery<Response>({
            query: productCategoryGetById,
            variables: {
                id: id
            },
          })
          .valueChanges
          .pipe(map(result => result.data.productCategoryGetById))
    }

    productCategoryCreate(data: any): Observable<ProductCategory> {
        return this.apollo.mutate<ResponseCreate>({
          mutation: productCategoryCreate,
          variables: data
        }).pipe(map(result => result.data!.productCategoryCreate))
    }

    productCategoryModify(data: any): Observable<ProductCategory> {
        return this.apollo.mutate<ResponseModify>({
          mutation: productCategoryModify,
          variables: data
        }).pipe(map(result => result.data!.productCategoryModify))
    }

    productUnitGetList(): Observable<ProductUnit[]> {
        return this.apollo.watchQuery<ResponseUnit>({
            query: productUnitGetList,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.productUnitGetList))
    }
}

