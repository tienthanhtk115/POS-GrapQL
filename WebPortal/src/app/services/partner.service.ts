import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { partnerCreate, partnerModify } from "../graphql/mutations/partner.mutations";
import { partnerGetById, partnerGetList } from "../graphql/queries/partner.query";
import { Partner } from "../models/partner";

  
export interface Response {
    partnerGetById: Partner
}

export interface ResponseList {
    partnerGetList: {nodes: Partner[]}
}

export interface ResponseCreate {
    partnerCreate: Partner
}

export interface ResponseModify {
    partnerModify: Partner
}

@Injectable({ providedIn: 'root' })
export class PartnerService {

    constructor(private apollo: Apollo) {}

    partnerGetList(): Observable<Partner[]> {

        return this.apollo.watchQuery<ResponseList>({
            query: partnerGetList,
            fetchPolicy: 'no-cache'
          })
          .valueChanges
          .pipe(map(result => result.data.partnerGetList.nodes))
    }

    partnerGetById(id: number): Observable<Partner> {

        return this.apollo.watchQuery<Response>({
            query: partnerGetById,
            variables: {
                id: id
            },
          })
          .valueChanges
          .pipe(map(result => result.data.partnerGetById))
    }

    partnerCreate(data: any): Observable<Partner> {
        return this.apollo.mutate<ResponseCreate>({
          mutation: partnerCreate,
          variables: data
        }).pipe(map(result => result.data!.partnerCreate))
    }

    partnerModify(data: any): Observable<Partner> {
        return this.apollo.mutate<ResponseModify>({
          mutation: partnerModify,
          variables: data
        }).pipe(map(result => result.data!.partnerModify))
    }
}

