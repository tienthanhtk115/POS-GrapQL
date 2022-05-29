import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { transferCreate } from "../graphql/mutations/transfer.mutations";
import { transferGetList } from "../graphql/queries/transfer.query";
import { Transfer } from "../models/transfer";


export interface ResponseList {
    transferGetList: { nodes: Transfer[] }
}

export interface ResponseCreate {
    transferCreate: Transfer
}


@Injectable({ providedIn: 'root' })
export class TransferService {

    constructor(private apollo: Apollo) { }

    transferGetList(): Observable<Transfer[]> {
        return this.apollo.watchQuery<ResponseList>({
            query: transferGetList,
            fetchPolicy: 'no-cache'
        })
            .valueChanges
            .pipe(map(result => result.data.transferGetList.nodes))
    }

    transferCreate(data: any): Observable<Transfer> {
        return this.apollo.mutate<ResponseCreate>({
            mutation: transferCreate,
            variables: data
        }).pipe(map(result => result.data!.transferCreate))
    }
}

