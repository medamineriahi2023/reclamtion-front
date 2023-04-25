import { Injectable } from '@angular/core';
import {AbstractServiceService} from "../abstract-service.service";
import {Operation} from "../../../models/Operation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../../../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class OperationsService extends AbstractServiceService<Operation>{

  constructor(public http:HttpClient) {
      super("operations",http)
  }


  likeAnOperation(operationId: number , userId: string): Observable<Operation>{
      return this.http.put<Operation>(this.url + `/like/${operationId}/${userId}`, {});
  }
    dislikeAnOperation(operationId: number , userId: string): Observable<Operation>{
        return this.http.put<Operation>(this.url + `/dislike/${operationId}/${userId}`, {});
    }


    comment(commentDto: Comment , operationId: string): Observable<Operation>{
        return this.http.put<Operation>(this.url + `/comment/${operationId}`, commentDto);
    }

}
