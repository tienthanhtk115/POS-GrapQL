import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { orderCreate } from "../graphql/mutations/order.mutations";
import { orderBankAccountGetList, orderGetList } from "../graphql/queries/order-query";
import { Order } from "../models/order";
import { OrderBankAccount } from "../models/order-bank-account";


export interface ResponseBankAccount {
    orderBankAccountGetList: OrderBankAccount[]
}
export interface ResponseOrder {
    orderGetList: { nodes: Order[] }
}
export interface ResponseCreate {
    orderCreate: Order
}
@Injectable({ providedIn: 'root' })
export class OrderService {

    constructor(private apollo: Apollo) { }

    orderBankAccountGetList(): Observable<OrderBankAccount[]> {
        return this.apollo.watchQuery<ResponseBankAccount>({
            query: orderBankAccountGetList,
            fetchPolicy: 'no-cache'
        })
            .valueChanges
            .pipe(map(result => result.data.orderBankAccountGetList))
    }

    orderGetList(): Observable<Order[]> {
        return this.apollo.watchQuery<ResponseOrder>({
            query: orderGetList,
            fetchPolicy: 'no-cache'
        })
            .valueChanges
            .pipe(map(result => result.data.orderGetList.nodes))
    }

    orderCreate(data: any): Observable<Order> {
        return this.apollo.mutate<ResponseCreate>({
            mutation: orderCreate,
            variables: data
        }).pipe(map(result => result.data!.orderCreate))
    }

}

