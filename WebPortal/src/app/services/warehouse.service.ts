import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { warehouseCreate, warehouseModify } from "../graphql/mutations/warehouse.mutations";
import { warehouseGetById, warehouseGetList } from "../graphql/queries/warehouse.query";
import { Warehouse } from "../models/warehouse";

export interface Response {
    warehouseGetById: Warehouse
}

export interface ResponseList {
    warehouseGetList: {nodes: Warehouse[]}
}

export interface ResponseCreate {
    warehouseCreate: Warehouse
}

export interface ResponseModify {
    warehouseModify: Warehouse
}

@Injectable({ providedIn: 'root' })
export class WarehouseService {

    constructor(private apollo: Apollo) {}

    warehouseGetList(): Observable<Warehouse[]> {

        return this.apollo.watchQuery<ResponseList>({
            query: warehouseGetList,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.warehouseGetList.nodes))
    }

    warehouseGetById(id: number): Observable<Warehouse> {

        return this.apollo.watchQuery<Response>({
            query: warehouseGetById,
            variables: {
                id: id
            },
          })
          .valueChanges
          .pipe(map(result => result.data.warehouseGetById))
    }

    warehouseCreate(data: any): Observable<Warehouse> {
        return this.apollo.mutate<ResponseCreate>({
          mutation: warehouseCreate,
          variables: data
        }).pipe(map(result => result.data!.warehouseCreate))
    }

    warehouseModify(data: any): Observable<Warehouse> {
        return this.apollo.mutate<ResponseModify>({
          mutation: warehouseModify,
          variables: data
        }).pipe(map(result => result.data!.warehouseModify))
    }
}

